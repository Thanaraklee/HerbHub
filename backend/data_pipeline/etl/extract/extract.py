import requests
from bs4 import BeautifulSoup 
from lxml import etree 
import json
import time
import os 
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from utils.logging import logger

class ExtractHerb:

    def __init__(self, herb_name: str):
        self.herb_name = herb_name

    # ------------------------------------ wfo ----------------------------------- #
    def fetching_wfo(self) -> dict:
        url = "https://list.worldfloraonline.org/gql.php"

        payload = f"""{{\"query\":\"query {{\\n\\t\\t\\t\\t\\t\\t\\ttaxonNameSuggestion(termsString: \\\"{self.herb_name}\\\", excludeDeprecated: true) {{\\n\\t\\t\\t\\t\\t\\t\\t\\t...taxonFields\\n\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\tclassifications(classificationId:\\\"DEFAULT\\\") {{\\n\\t\\t\\t\\t\\t\\t\\t\\tid\\n\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\tfragment taxonFields on TaxonName {{\\n\\t\\t\\t\\t\\t\\t\\tid\\n\\t\\t\\t\\t\\t\\t\\ttitle\\n\\t\\t\\t\\t\\t\\t\\tnameString\\n\\t\\t\\t\\t\\t\\t\\tfullNameStringHtml\\n\\t\\t\\t\\t\\t\\t\\tfullNameStringNoAuthorsHtml\\n\\t\\t\\t\\t\\t\\t\\tfullNameStringNoAuthorsPlain\\n\\t\\t\\t\\t\\t\\t\\tfullNameStringPlain\\n\\t\\t\\t\\t\\t\\t\\tspeciesString\\n\\t\\t\\t\\t\\t\\t\\tgenusString\\n\\t\\t\\t\\t\\t\\t\\tauthorsString\\n\\t\\t\\t\\t\\t\\t\\tauthorsStringHtml\\n\\t\\t\\t\\t\\t\\t\\tcitationMicro\\n\\t\\t\\t\\t\\t\\t\\tclassificationId\\n\\t\\t\\t\\t\\t\\t\\tnomenclaturalStatus\\n\\t\\t\\t\\t\\t\\t\\trank\\n\\t\\t\\t\\t\\t\\t\\trole\\n\\t\\t\\t\\t\\t\\t\\tstableUri\\n\\t\\t\\t\\t\\t\\t\\tcurrentPreferredUsage {{\\n\\t\\t\\t\\t\\t\\t\\t\\tid\\n\\t\\t\\t\\t\\t\\t\\t}}\\t\\n\\t\\t\\t\\t\\t\\t}}\"}}"""
        headers = {
            'Content-Type': 'text/plain',
            'Cookie': 'PHPSESSID=jjd5ononem1rh7as2hv6mnob4s'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        logger.info(f"Fetching WFO: {self.herb_name} status code: {response.status_code}")
        response_json = response.json()

        return response_json

    def fetching_wfo_stableUri(self, stable_uri: str) -> str:
        response = requests.get(stable_uri)
        logger.info(f"Fetching WFO stableUri status code: {response.status_code} link: {stable_uri}")
        return response.content.decode('utf-8')
    
    # ------------------------------------ kew ----------------------------------- #
    def fetching_kew_part_formused(self) -> dict:
        url = f"https://mpns.science.kew.org/mpns-portal/plantDetail?plantId=235249&query={self.herb_name.replace(' ', '+')}&filter=&fuzzy=false&nameType=latin&dbs=wcs"

        response = requests.get(url) 
        logger.info(f"Fetching KEW Part&Form used status code: {response.status_code}")
        soup = BeautifulSoup(response.content, "html.parser") 
        dom = etree.HTML(str(soup)) 

        # ----------------------------------- part ----------------------------------- #
        parts = dom.xpath('//*[@id="partsFormUsed"]/tbody/tr/td[1]/text()')
        part_list = []
        for part in parts:
            part_list.append(part.replace("\r\n", "").strip())

        # ----------------------------------- drug ----------------------------------- #
        drugs = dom.xpath('//*[@id="partsFormUsed"]/tbody/tr/td[2]/text()')
        drug_list = []
        for drug in drugs:
            drug_list.append(drug.replace("\r\n", "").strip())

        # --------------------------------- medicinal -------------------------------- #
        medicinals = dom.xpath('//*[@id="partsFormUsed"]/tbody/tr/td[3]//a[@href]')
        medicinal_name_list = [] # name
        medicinal_source_list = [] # source
        for medicinal in medicinals:
            source = f"https://mpns.science.kew.org/mpns-portal/{medicinal.get('href')}"
            medicinal_name_list.append(medicinal.text.replace("\r\n", "").strip())
            medicinal_source_list.append(source)

        # -------------------------------- data verify ------------------------------- #

        if len(part_list) == len(drug_list) == len(medicinal_name_list) == len(medicinal_source_list):
            logger.info(f"Fetching KEW Data is correct.")
        else:
            logger.error(f"Fetching KEW Data isn't correct.")

        kew_dict = {
            "part": part_list,
            "drug": drug_list,
            "medicinal_name": medicinal_name_list,
            "medicinal_source": medicinal_source_list
        }

        return kew_dict

    def fetching_usda_part_chemical_csv(self) -> str:
        if self.herb_name == "Musa paradisiaca":
            url = f"https://phytochem.nal.usda.gov/plant-musa-x-paradisiaca"
        else:
            url = f"https://phytochem.nal.usda.gov/plant-{self.herb_name.replace(' ','-')}"
        time.sleep(30)
        response = requests.get(url, timeout=20)
        logger.info(f"Fetching USDA Part&Chemical status code: {response.status_code}")
        soup = BeautifulSoup(response.content, "html.parser") 
        dom = etree.HTML(str(soup)) 
        time.sleep(30)
        csv_link = dom.xpath('//*[@id="quicktabs-tabpage-plant-0"]/div[2]/div/div/div[2]/div[2]/a')[0].get('href')
        logger.info(f"Fetching USDA CSV file status code: {requests.get(csv_link, timeout=20).status_code}")
        return csv_link
        
    def fetching_cosmeherb(self) -> dict:
        # ---------------------------------- get id ---------------------------------- #
        url_herb = "https://cosmeherb.nbt.or.th/api/herbs/"
        if self.herb_name == "Musa paradisiaca":
            payload = json.dumps({
                "selected_cosmetic":[],
                "selected_part_use":[],
                "selected_cd":[],
                "selected_cg":[],
                "selected_category":[],
                "herb_search": "Musa × paradisiaca",
                "rows_per_page":24,
                "sorting":{
                    "column":"",
                    "order":""
                },
                "current_page":1
            })
        else:
            payload = json.dumps({
                "selected_cosmetic":[],
                "selected_part_use":[],
                "selected_cd":[],
                "selected_cg":[],
                "selected_category":[],
                "herb_search": self.herb_name,
                "rows_per_page":24,
                "sorting":{
                    "column":"",
                    "order":""
                },
                "current_page":1
            })
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.request("POST", url_herb, headers=headers, data=payload)
        logger.info(f"Fetching CosmeHerb Id herb: {self.herb_name} status code: {response.status_code}")
        id_herb = response.json()['list_herb'][0]['id']

        # ---------------------------------- get data --------------------------------- #
        url = f"https://cosmeherb.nbt.or.th/api/herb/{id_herb}/"
        logger.info(f"Fetching Link CosmeHerb data herb: {url}")
        response = requests.request("GET", url)
        logger.info(f"Fetching CosmeHerb data herb: {self.herb_name} status code: {response.status_code} encoding: {response.encoding}")
        result = response.json()
        return result
    
class ExtractHerbImage:
    def __init__(self, herb_name: str) -> None:
        self.herb_name = herb_name
    
    def fetching_gbif(self) -> list:
        image_list = []
        # ------------------------------ Limit 10 image ------------------------------ #
        url = f"https://api.gbif.org/v1/occurrence/search?scientificName={self.herb_name.replace(' ','%20')}&mediaType=StillImage&limit=10"
        response = requests.get(url)
        logger.info(f"Fetching Herb Image: '{self.herb_name}' status code: {response.status_code}")
        response_json = response.json()
        response_json = response_json['results']
        logger.info(f"Fetching Herb Image: '{self.herb_name}' Result Total: {len(response_json)}")
        for result in response_json:
            image_list.append(result['media'][0]['identifier'])
        
        return image_list