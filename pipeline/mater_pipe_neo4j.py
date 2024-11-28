import os 
import sys
import json
import time
from dotenv import load_dotenv

load_dotenv()

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utils.logging import logger

from etl import ExtractHerb
from etl import TransformHerb
from etl import SaveHerbtoJson, LoadHerbtoNeo4j
from validation import ValidateHerb

from herb_pipeline.wfo_pipe import fetching_wfo, fetching_wfo_stableUri, transform_wfo, transform_wfo_name, transform_wfo_taxonomy, transform_wfo_synonyms
from herb_pipeline.kew_pipe import fetching_kew, transform_kew
from herb_pipeline.usda_pipe import fetching_usda_csv, transform_usde
from herb_pipeline.cosmeherb_pipe import fetching_cosmeherb, transform_cosmeherb

def integrate_tasks(name: dict, synonyms: dict, taxonomy: dict, kew: dict, usda: dict, cosmeherb: dict) -> dict:
    master_dict = transform_herb.transform_master(name=name, synonyms=synonyms, taxonomy=taxonomy, kew=kew, usda=usda, cosmeherb=cosmeherb)
    return {"data": master_dict}

def pretty_json(json_data):
    return json.dumps(json_data, indent=4)

def validation(validate_herb: object, master_dict: dict) -> dict:
    validate = validate_herb.validate(data=master_dict)
    return validate

if __name__ == "__main__":
    # ---------------------------------- Config ---------------------------------- #
    host_name = "localhost"
    port = 7687
    uri = f"neo4j://{host_name}:{port}"
    user = os.getenv('USER_NEO4J')
    password = os.getenv('PASSWORD_NEO4J')

    if not user or not password:
        logger.error("Neo4j credentials are missing. Check your environment variables.")
        sys.exit(1)

    # ---------------------------------------------------------------------------- #
    #                        **IMPORTANT** Clear database ‼️                       #
    # ---------------------------------------------------------------------------- #
    # LoadHerbtoNeo4j.clear_database(uri=uri, auth=(user, password))

    
    # ----------- Initialize instance of ExtractHerb and TransformHerb ----------- #
    herb_names = [
        "Curcuma longa",
        "Aloe vera",
        "Centella asiatica",
        "Sesamum indicum",
        "Camellia sinensis",
        "Cannabis sativa",
        "Hibiscus sabdariffa",
        "Musa paradisiaca",
        "Carthamus tinctorius",
        "Cucumis sativus",
        "Portulaca oleracea",
        "Tamarindus indica",
        "Carica papaya",
        "Lawsonia inermis",
        "Capsicum annuum", # ไม่มี clinical & pharmacological
        "Phyllanthus emblica",
        "Cocos nucifera",
        "Moringa oleifera",
        "Terminalia chebula",
        "Terminalia bellirica",
        "Zingiber officinale",
        "Glycine max",
        "Cymbopogon citratus"
    ]
    
    for herb_name in herb_names:
        try:
            extract_herb = ExtractHerb(herb_name=herb_name)
            transform_herb = TransformHerb(herb_name=herb_name)
            load_herb = SaveHerbtoJson()
            validate_herb = ValidateHerb()

            # ------------------------------------ WFO tasks ----------------------------------- #
            wfo_response_json = fetching_wfo(extract_herb=extract_herb)
            wfo_stable_uri = transform_wfo(transform_herb=transform_herb, response_json=wfo_response_json)
            response = fetching_wfo_stableUri(extract_herb=extract_herb, stable_uri=wfo_stable_uri)
            name = transform_wfo_name(transform_herb=transform_herb, response=response['data'])
            synonyms = transform_wfo_synonyms(transform_herb=transform_herb, response=response['data'])
            taxonomy = transform_wfo_taxonomy(transform_herb=transform_herb, response=response['data'])

            # ------------------------------------ KEW tasks ----------------------------------- #
            kew_dict = fetching_kew(extract_herb=extract_herb)
            kew_clean = transform_kew(transform_herb=transform_herb, kew_dict=kew_dict["data"])

            # ----------------------------------- USDA tasks ----------------------------------- #
            csv_link = fetching_usda_csv(extract_herb=extract_herb)
            usda_clean = transform_usde(transform_herb=transform_herb, csv_link=csv_link)

            # --------------------------------- Cosmeherb tasks -------------------------------- #
            cosmeherb_dict = fetching_cosmeherb(extract_herb=extract_herb)
            cosmeherb_clean = transform_cosmeherb(transform_herb=transform_herb, cosmeherb_dict=cosmeherb_dict['data'])

            # --------------------------------- Master tasks -------------------------------- #
            master_dict = integrate_tasks(
                name=name['data'],
                synonyms=synonyms['data'],
                taxonomy=taxonomy['data'],
                kew=kew_clean['data'],
                usda=usda_clean['data'],
                cosmeherb=cosmeherb_clean['data']
            )

            # ----------------------------- Validating tasks ----------------------------- #
            validate = validation(validate_herb=validate_herb, master_dict=master_dict['data'])
            if validate:

                # ------------------------------- Loading tasks ------------------------------ #
                neo4j_pipe = LoadHerbtoNeo4j(uri=uri, auth=(user, password), json_data=master_dict.get("data"))
                neo4j_pipe.main()

                # ---------------------------------------------------------------------------- #
                #                             C O M P L E T E D 🎉                             #
                # ---------------------------------------------------------------------------- #
                logger.info("All data ingestion completed successfully. 🎉")

            time.sleep(10)
        except Exception as e:
            logger.error(f"Exception: {herb_name}")
            logger.error(f"Exception: {e}")
            break