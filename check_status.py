import requests
import logging
import json
import sys

logging.basicConfig(level=logging.INFO)

class CheckStatus:
    def __init__(self, herb_name: str) -> None:
        self.herb_name = herb_name

    def fetching_wfo(self):
        url = "https://list.worldfloraonline.org/gql.php"
        payload = f"""{{\"query\":\"query {{ taxonNameSuggestion(termsString: \\\"{self.herb_name}\\\", excludeDeprecated: true) {{ ...taxonFields }} }}\"}}"""
        headers = {'Content-Type': 'text/plain'}
        response = requests.post(url, headers=headers, data=payload)
        if response.status_code != 200:
            logging.error(f"Failed to fetch WFO: {self.herb_name} (status code: {response.status_code})")
            sys.exit(1)
        logging.info(f"Fetching WFO: {self.herb_name} - Success")

    def fetching_kew_part_formused(self):
        url = f"https://mpns.science.kew.org/mpns-portal/searchName?searchTerm={self.herb_name.replace(' ', '%20')}&nameType=latin"
        response = requests.get(url)
        if response.status_code != 200:
            logging.error(f"Failed to fetch KEW Part & Form Used: {self.herb_name} (status code: {response.status_code})")
            sys.exit(1)
        logging.info(f"Fetching KEW Part & Form Used: {self.herb_name} - Success")

    def fetching_usda_part_chemical_csv(self):
        url = f"https://phytochem.nal.usda.gov/plant-{self.herb_name.replace(' ', '-')}"
        try:
            response = requests.get(url, timeout=20)
            if response.status_code != 200:
                logging.error(f"Failed to fetch USDA Part & Chemical: {self.herb_name} (status code: {response.status_code})")
                sys.exit(1)
        except requests.exceptions.RequestException as e:
            logging.error(f"Failed to fetch USDA Part & Chemical: {self.herb_name} - Error: {e}")
            sys.exit(1)
        logging.info(f"Fetching USDA Part & Chemical: {self.herb_name} - Success")

    def fetching_cosmeherb(self):
        url_herb = "https://cosmeherb.nbt.or.th/api/herbs/"
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
        # logging.info(f"Fetching CosmeHerb Id herb: {self.herb_name} status code: {response.status_code}")
        id_herb = response.json()['list_herb'][0]['id']

        # ---------------------------------- get data --------------------------------- #
        url = f"https://cosmeherb.nbt.or.th/api/herb/{id_herb}/"
        response = requests.request("GET", url)
        if response.status_code != 200:
            logging.error(f"Failed to fetch CosmeHerb: {self.herb_name} (status code: {response.status_code})")
            sys.exit(1)
        logging.info(f"Fetching CosmeHerb: {self.herb_name} - Success")

    def fetching_gbif(self):
        url = f"https://api.gbif.org/v1/occurrence/search?scientificName={self.herb_name.replace(' ', '%20')}&mediaType=StillImage&limit=10"
        response = requests.get(url)
        if response.status_code != 200:
            logging.error(f"Failed to fetch GBIF Images: {self.herb_name} (status code: {response.status_code})")
            sys.exit(1)
        logging.info(f"Fetching GBIF Images: {self.herb_name} - Success")

if __name__ == '__main__':
    herb_name = "Aloe vera"
    check_status = CheckStatus(herb_name=herb_name)
    try:
        check_status.fetching_wfo()
        check_status.fetching_kew_part_formused()
        check_status.fetching_usda_part_chemical_csv()
        check_status.fetching_cosmeherb()
        check_status.fetching_gbif()
    except Exception as e:
        logging.error(f"Error occurred during API checks: {e}")
        sys.exit(1)
