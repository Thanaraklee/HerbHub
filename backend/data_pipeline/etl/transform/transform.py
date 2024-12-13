import pandas as pd
import re
from lxml import etree 
import requests
from bs4 import BeautifulSoup
import time
import os 
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utils.logging import logger

class TransformHerb:
    def __init__(self, herb_name: str):
        self.herb_name = herb_name

    def wfo_transform(self, response_json: dict) -> str:
        response_json = response_json["data"]["taxonNameSuggestion"][0]
        stable_uri = response_json["stableUri"]
        full_name_no_authors = response_json["fullNameStringNoAuthorsPlain"]
        logger.info(f"Transforming WFO: {full_name_no_authors}")
        return stable_uri
    
    def wfo_transform_name(self, response: str) -> dict:
        pattern = r'\b\d{4}(?:-\d+)?\b'
        logger.info(f"Transforming WFO name")
        html_soup = BeautifulSoup(response, "html.parser") 
        dom = etree.HTML(str(html_soup)) 
        species_name = dom.xpath(r'/html/body/main/div/section/h2/text()')[0].strip()
        
        # ---------------- Condition if length list of authorship > 1 ---------------- #
        if len(dom.xpath(r'/html/body/main/div/section/h2/span/span/a')) > 1:
            logger.info(f"Transforming WFO name: {species_name} has authorship and has updated by")

            authorship = dom.xpath(r'/html/body/main/div/section/h2/span/span/a')[0].get('title').strip()
            authorship = re.sub(pattern, '', authorship)
            authorship = re.sub(r'\s+', ' ', authorship).strip()

            updated_by = dom.xpath(r'/html/body/main/div/section/h2/span/span/a')[1].get('title').strip()
            updated_by = re.sub(pattern, '', updated_by)
            updated_by = re.sub(r'\s+', ' ', updated_by).strip()
        else:
            logger.warning(f"Transforming WFO name: {species_name} has authorship but has not been updated by")
            authorship = dom.xpath(r'/html/body/main/div/section/h2/span/span/a')[0].get('title').strip()
            authorship = re.sub(pattern, '', authorship)
            authorship = re.sub(r'\s+', ' ', authorship).strip()
            updated_by = ''
        name_ref = dom.xpath(r'/html/body/main/div/section/div[2]/p[1]/i/text()')[0].strip()
        link_ref = dom.xpath(r'/html/body/main/div/section/div[2]/p[1]/a')[0].get('href')
        name = {
            "species_name": species_name,
            "authorship": authorship,
            "updated_by": updated_by,
            "name_ref": name_ref,
            "link_ref": link_ref
        }
        return name
    
    def wfo_transform_taxonomy(self, response: str) -> dict:
        logger.info(f"Transforming WFO taxonomy")
        html_soup = BeautifulSoup(response, "html.parser") 
        dom = etree.HTML(str(html_soup))

        # ------------------------------- taxonomy name ------------------------------ #
        taxonomy_list = dom.xpath('/html/body/main/div/section/ul/li/a[text()] | /html/body/main/div/section/ul/li[11]')
        print([_.text for _ in taxonomy_list[2:]])
        taxonomy_list = [_.text.strip() for _ in taxonomy_list[2:] if _.text]

        # ----------------------------- taxonomy name ref ---------------------------- #
        taxonomy_ref_list_xpath_raw = dom.xpath('/html/body/main/div/section/ul/li/a')
        base_url = "https://wfoplantlist.org"
        taxonomy_ref_list_xpath = [f"{base_url}{_.get('href')}" for _ in taxonomy_ref_list_xpath_raw[2:]]
        taxonomy_ref_list = []
        taxonomy_name_list = []
        for i_ref in range(len(taxonomy_ref_list_xpath)):
            response = requests.get(taxonomy_ref_list_xpath[i_ref])
            logger.info(f"Transforming WFO taxonomy {taxonomy_list[i_ref]} ref status code: {response.status_code}")
            soup = BeautifulSoup(response.content, "html.parser")
            dom = etree.HTML(str(soup))
            taxonomy_verify = dom.xpath('/html/body/main/div/section/p')[0].text.strip()
            ref_list = dom.xpath('/html/body/main/div/section/div[2]/p/a')
            if taxonomy_verify in ['kingdom', 'subkingdom', 'phylum', 'family', 'genus']:
                if len(ref_list) > 1:
                    ref_list = ref_list[1]
                else:
                    ref_list = ref_list[0]
                re = ref_list.get('href')
                taxonomy_ref_list.append(re)
                taxonomy_name_list.append(taxonomy_list[i_ref])
        
        logger.info(f"Transforming WFO taxonomy: {taxonomy_name_list}")
        logger.info(f"Transforming WFO taxonomy ref: {taxonomy_ref_list}")

        if len(taxonomy_name_list) == len(taxonomy_ref_list):
            logger.info(f"Transforming WFO taxonomy & ref correct.")
        else:
            logger.error(f"Transforming WFO taxonomy & ref not correct.")

        taxonomy = {
            "kingdom": {
                "kingdom_name": taxonomy_list[0],
                "ref": taxonomy_ref_list[0]
            },
            "subkingdom": {
                "subkingdom_name": taxonomy_list[1],
                "ref": taxonomy_ref_list[1]
            },
            "phylum": {
                "phylum_name": taxonomy_list[2],
                "ref": taxonomy_ref_list[2]
            },
            "family": {
                "family_name": taxonomy_list[3],
                "ref": taxonomy_ref_list[3]
            },
            "genus": {
                "genus_name": taxonomy_list[4],
                "ref": taxonomy_ref_list[4]
            },
        }
        return taxonomy

    def wfo_transform_synonyms(self, response: str) -> dict:
        logger.info(f"Transforming WFO synonyms")
        html_soup = BeautifulSoup(response, "html.parser")
        rows = []
        for row in html_soup.select('#el > table > tbody > tr'):
            name = row.select_one('td[data-th="Name"] .wfo-name')
            if row.select_one('td[data-th="Author"] a'):
                author = row.select_one('td[data-th="Author"] a').get('title').strip()
            else:
                author = row.select_one('td[data-th="Author"]').get_text(strip=True)

            protologue = row.select_one('td[data-th="Protologue"]')
            wfo_link = row.select_one('td[data-th="WFO link"] a')
            if name and name.text.strip() and author and protologue and protologue.text.strip() and wfo_link and wfo_link.get('href'):
                rows.append([
                    name.text.strip(),
                    author,
                    protologue.text.strip(),
                    wfo_link.get('href')
                ]) 

        names = [row[0] for row in rows]
        authors = [row[1] for row in rows]
        protologues = [row[2] for row in rows]
        wfo_links = [row[3] for row in rows]
        if names and authors and protologues and wfo_links:
            if len(names) == len(authors) == len(protologues) == len(wfo_links):
                logger.info(f"Transforming WFO synonyms correct.")
                logger.info(f"Transforming WFO First synonyms names: {names[0]} authors: {authors[0]} protologues: {protologues[0]} wfo_links: {wfo_links[0]}")
            else:
                logger.error(f"Transforming WFO synonyms not correct.")
                logger.error(f"Transforming WFO synnonyms names: {len(names)} authors: {len(authors)} protologues: {len(protologues)} wfo_links: {len(wfo_links)}")
                # return None
        else:
            logger.error(f"Transforming WFO synonyms not found.")

        synonyms = []
        for name, author, protologue, wfo_link in zip(names, authors, protologues, wfo_links):
            name_text = name
            author_text = author
            protologue_text = protologue
            wfo_link_href = wfo_link
            synonyms.append({
                "name": name_text,
                "author": author_text,
                "protologue": protologue_text,
                "wfo_link": wfo_link_href
            })
        result = {
            "synonyms": synonyms
        }
        return result

    def kew_transform(self, kew_dict: dict) -> dict:
        filtered_data = []
        logger.info(f"Transforming KEW Part&Form used")
        for part, drug, medicinal_name, medicinal_source in zip(kew_dict['part'], kew_dict['drug'], kew_dict['medicinal_name'], kew_dict['medicinal_source']):
            if part and drug and medicinal_name and medicinal_source:
                if part in ['rizomas', 'rizoma']:
                    part = 'rhizome'
                filtered_data.append({
                    "part": part,
                    "drug": drug,
                    "medicinal_name": medicinal_name,
                    "medicinal_source": medicinal_source
                })
        
        return filtered_data
    
    def usda_transform(self, csv_link: str) -> dict:
        logger.info('Transforming USDA Part & Chemical')
        time.sleep(30)
        df = pd.read_csv(csv_link)
        df.dropna(inplace=True)
        activity = df['Activity Count'] > 1
        low_ppm = df['Low Parts Per Million'] != "not available"
        high_ppm = df['High Parts Per Million'] != "not available"
        sd = df['Standard Deviation'] != "not available"
        reference = df['Reference'] != "Duke, 1992 *"
        df = df[activity & reference & low_ppm & high_ppm & sd]
        result_dict = df.to_dict(orient='records')
        result = []
        for item in result_dict:
            result_item = {
                "chemical_name": item["Chemical Name"],
                "activity_count": int(float(item["Activity Count"])),
                "plant_part": item["Plant Part"],
                "low_parts_per_million": float(item["Low Parts Per Million"]),
                "high_parts_per_million": float(item["High Parts Per Million"]),
                "standard_deviation": float(item["Standard Deviation"]),
                "ref": item["Reference"]
            }
            result.append(result_item)
        return result

    def cosmeherb_transform(self, cosmeherb_dict: dict) -> dict:
        time.sleep(10)
        categorys = requests.get('https://cosmeherb.nbt.or.th/api/all_category/').json()['category'][:4]
        logger.info(f'Fetching COSMEHERB category: {len(categorys)} category')
        logger.info('Transforming COSMEHERB')
        # ------------------------------ Common name TH ------------------------------ #
        common_name_th = re.sub(r'<.*?>', '', cosmeherb_dict['herb_name']).strip()
        try:
            common_name_th_rf = [_.strip() for _ in re.findall(r'\((\d+(?:,\s*\d+)*)\)', cosmeherb_dict['herb_name_rf'])[0].split(',')]
        except IndexError:
            common_name_th_rf = []
        logger.info(f"Transforming COSMEHERB name TH {common_name_th} ref: {len(common_name_th_rf)}")

        # ------------------------------ Common name EN ------------------------------ #
        common_name_en = re.sub(r'<.*?>', '', cosmeherb_dict['en_name']).strip()
        try:
            common_name_en_rf = [_.strip() for _ in re.findall(r'\((\d+(?:,\s*\d+)*)\)', cosmeherb_dict['en_name_rf'])[0].split(',')]
        except IndexError:
            common_name_en_rf = []
        logger.info(f"Transforming COSMEHERB name EN {common_name_en} ref: {len(common_name_en_rf)}")

        # ------------------------------- Local name TH ------------------------------ #
        if self.herb_name == "Cocos nucifera":
            local_name = ["ดุง","โดง", "มะแพร้ว","ย่อ","หมากอุ๋น","หมากอูน"]
        else:
            local_name = [_.strip() for _ in re.sub(r'<.*?>', '', cosmeherb_dict['local_name']).split()]
        try:
            local_name_rf = [_.strip() for _ in re.findall(r'\((\d+(?:,\s*\d+)*)\)', cosmeherb_dict['local_name_rf'])[0].split(',')]
        except IndexError:
            local_name_rf = []
        logger.info(f"Transforming COSMEHERB local name {local_name} ref: {len(local_name_rf)}")

        # ----------------------- All Pattern for split section ---------------------- #
        pattern = r'(\d\.\d\s*[\u0E00-\u0E7F, ]+?\s+\([SLFHM]0[01]\d\))([\s\S]*?)(?=\d\.\d\s*[\u0E00-\u0E7F, ]+?\s+\([SLFHM]0[01]\d\)|$)'

        # pattern_title = r'\d\.\d\s*([\u0E00-\u0E7F ,]+?)\s*(\([\u0E00-\u0E7F ]+\))?\s*\([SLFHM]0[01]\d\)'
        pattern_title = r'[SLFHM]\d{3}'


        # ----------------------------- clinical studies ----------------------------- #
        logger.info(f"Transforming COSMEHERB clinical studies")
        clinical_studies_list = []
        section_soup = BeautifulSoup(cosmeherb_dict['process_trial']['clinical_studies'], "html.parser")
        sections_clinical = re.findall(pattern, section_soup.text.strip())
        for section in sections_clinical:

            # ----------------------------------- Title ---------------------------------- #
            match = re.search(pattern_title, section[0].replace("\xa0"," ").strip())
            if match:
                title = match.group().strip()
                for category in categorys:
                    for activity in category['bio_activity']:
                        if activity['name'] == title:
                            title = activity['prowess_name_th']

            logger.info(f"Transforming COSMEHERB clinical studies title: {title}")

            content = section[1].strip()
            number_ref = [_.strip() for _ in re.findall(r'\((\d+(?:,\s*\d+)*)\)', content)[0].split(',')]
            # number_ref = re.findall(r'\((\d+)\)', content)
            clinical_studies_list.append({
                'clinical': title,
                'clinical_content': content,
                'clinical_ref': number_ref
            })
        logger.info(f"Transforming COSMEHERB all clinical studies: {len(clinical_studies_list)}")
        
        # --------------------------- pharmacological study -------------------------- #
        logger.info(f"Transforming COSMEHERB pharmacological study")
        pharmacological_study_list = []

        section_soup = BeautifulSoup(cosmeherb_dict['process_trial']['pharmacological_study'], "html.parser")
        sections_pharmacological = re.findall(pattern, section_soup.text.strip())
        for section in sections_pharmacological:

            # ----------------------------------- Title ---------------------------------- #
            match = re.search(pattern_title, section[0].replace("\xa0"," ").strip())
            if match:
                title = match.group().strip()
                for category in categorys:
                    for activity in category['bio_activity']:
                        if activity['name'] == title:
                            title = activity['prowess_name_th']
            # title = section[0].replace("\xa0"," ").strip().split(" ", 1)[1].rsplit(" ",1)[0]
            logger.info(f"Transforming COSMEHERB pharmacological study title: {title}")

            content = section[1].strip()
            number_ref = [_.strip() for _ in re.findall(r'\((\d+(?:,\s*\d+)*)\)', content)[0].split(',')]
            # number_ref = re.findall(r'\((\d+)\)', content)
            pharmacological_study_list.append({
                'pharmacological': title,
                'pharmacological_content': content,
                'pharmacological_ref': number_ref
            })
        logger.info(f"Transforming COSMEHERB all pharmacological study: {len(pharmacological_study_list)}")
        
        # ---------------------------------- All ref. --------------------------------- #
        soup = BeautifulSoup(cosmeherb_dict['summary']['references'], "html.parser")
        topics = []
        if self.herb_name in ['Musa paradisiaca','Carthamus tinctorius', 'Cucumis sativus', 'Portulaca oleracea', 'Tamarindus indica', 'Carica papaya']:
            for p_tag in soup.find_all(['p']):
                # text = p_tag.get_text(separator=" ").strip()
                text = p_tag.get_text().strip()
                text = re.sub(r'^\d+\.\s*', '', text)
                if text:
                    topics.append(text.replace('\xa0', ' '))
        else:
            for p_tag in soup.find_all(['p'], class_=['MsoNormal', 'MsoListParagraphCxSpFirst']):
                # text = p_tag.get_text(separator=" ").strip()
                text = p_tag.get_text().strip()
                text = re.sub(r'^\d+\.\s*', '', text)
                if text:
                    topics.append(text.replace('\xa0', ' '))

        logger.info(f"Transforming COSMEHERB convert number references to text ref.: {len(topics)}")
        # ------------------------------ Add pharmacological ref. ------------------------------ #
        if pharmacological_study_list != []:
            for study in pharmacological_study_list:
                study['pharmacological_ref'] = [topics[int(ref) - 1] for ref in study['pharmacological_ref']]
            
        # ------------------------------ Add clinical ref. ------------------------------ #
        if clinical_studies_list != []:
            for study in clinical_studies_list:
                study['clinical_ref'] = [topics[int(ref) - 1] for ref in study['clinical_ref']]

        # ------------------------------ Local name TH rf. ------------------------------ #
        local_name_rf_list = []
        if local_name_rf:
            for _ in local_name_rf:
                local_name_rf_list.append(topics[int(_)-1])

        # ------------------------------ Common name TH rf. ------------------------------ #
        common_name_th_rf_list = []
        if common_name_th_rf:
            for _ in common_name_th_rf:
                common_name_th_rf_list.append(topics[int(_)-1])

        # ------------------------------ Common name EN rf. ------------------------------ #
        common_name_en_rf_list = []
        if common_name_en_rf:
            for _ in common_name_en_rf:
                common_name_en_rf_list.append(topics[int(_)-1])

        result = {
            "common_name_th": {
                "common_name_th": common_name_th,
                "common_name_th_ref": common_name_th_rf_list,
            },
            "common_name_en": {
                "common_name_en": common_name_en,
                "common_name_en_ref": common_name_en_rf_list,
            },
            "local_name": {
                "local_name": local_name,
                "local_name_ref": local_name_rf_list
            },
            "clinical_studies": clinical_studies_list,
            "pharmacological_studies": pharmacological_study_list
        }
        return result

    def transform_master(self, name: dict = None, img: list = None, synonyms: dict = None, taxonomy: dict = None,kew: dict = None, usda: dict = None, cosmeherb: dict = None) -> dict:
        result = {
            "species_name": {
                "species_name": name['species_name'],
                "species_image": img,
                "authorship": name['authorship'],
                "updated_by": name['updated_by'],
                "name_ref": name['name_ref'],
                "link_ref": name['link_ref']
            },
            "synonyms": synonyms['synonyms'],
            "taxonomy": taxonomy,
            "part_and_medicinal": kew,
            "part_and_checimal": usda,
            "common_name_th": cosmeherb['common_name_th'],
            "common_name_en": cosmeherb['common_name_en'],
            "local_name": cosmeherb['local_name'],
            "clinical_studies": cosmeherb['clinical_studies'],
            "pharmacological_studies": cosmeherb['pharmacological_studies']
        }
        return result
        
