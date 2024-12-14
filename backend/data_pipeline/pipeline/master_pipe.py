import os 
import sys
import json
import time
from tqdm import tqdm
from dotenv import load_dotenv

load_dotenv()

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utils.logging import logger

from etl import ExtractHerb, ExtractHerbImage
from etl import TransformHerb
from etl import SaveHerbtoJson, LoadHerbtoNeo4j, LoadImagetoMinIO
from etl import ValidateHerb

from herb_pipeline.wfo_pipe import fetching_wfo, fetching_wfo_stableUri, transform_wfo, transform_wfo_name, transform_wfo_taxonomy, transform_wfo_synonyms
from herb_pipeline.kew_pipe import fetching_kew, transform_kew
from herb_pipeline.usda_pipe import fetching_usda_csv, transform_usde
from herb_pipeline.cosmeherb_pipe import fetching_cosmeherb, transform_cosmeherb

from img_pipeline.gbif_pipe import fetching_gbif

def integrate_tasks(name: dict, img: list, synonyms: dict, taxonomy: dict, kew: dict, usda: dict, cosmeherb: dict) -> dict:
    master_dict = transform_herb.transform_master(name=name, img=img, synonyms=synonyms, taxonomy=taxonomy, kew=kew, usda=usda, cosmeherb=cosmeherb)
    return {"data": master_dict}

def pretty_json(json_data):
    return json.dumps(json_data, indent=4)

def validation(validate_herb: object, master_dict: dict) -> dict:
    validate = validate_herb.validate(data=master_dict)
    return validate

if __name__ == "__main__":
    # ---------------------------------- Config ---------------------------------- #
    neo4j_pipe = LoadHerbtoNeo4j(
        uri=os.environ['URI_NEO4j'], 
        auth=(os.environ['USER_NEO4J'], os.environ['PASSWORD_NEO4J'])
    )
    minio_pipe = LoadImagetoMinIO(
        endpoint=os.environ['ENDPOINT_MINIO'], 
        access_key=os.environ['USER_MINIO_ROOT'], 
        secret_key=os.environ['PASSWORD_MINIO_ROOT'], 
    )
    # ---------------------------------------------------------------------------- #
    #                        **IMPORTANT** Clear database ‼️                       #
    # ---------------------------------------------------------------------------- #
    # neo4j_pipe.clear_database()
    
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
        "Capsicum annuum",
        "Phyllanthus emblica",
        "Cocos nucifera",
        "Moringa oleifera",
        "Terminalia chebula",
        "Terminalia bellirica",
        "Zingiber officinale",
        "Glycine max",
        "Cymbopogon citratus"
    ]
    
    try:
        for herb_name_inx in tqdm(range(len(herb_names)), desc="Processing herbs"):
            # --------------------------- Innitialize instance --------------------------- #
            extract_herb = ExtractHerb(herb_name=herb_names[herb_name_inx])
            extract_herb_image = ExtractHerbImage(herb_name=herb_names[herb_name_inx])
            transform_herb = TransformHerb(herb_name=herb_names[herb_name_inx])
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

            # --------------------------------- GBIF tasks -------------------------------- #
            gbif_list = fetching_gbif(extract_herb_image=extract_herb_image)
            image_name_list = minio_pipe.push_to_minio(herb_name=herb_names[herb_name_inx], image_list=gbif_list['data'], bucket_name="images")
            
            # --------------------------------- Master tasks -------------------------------- #
            master_dict = integrate_tasks(
                name=name['data'],
                img=image_name_list,
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
                
                neo4j_pipe.preparing_json(json_data=master_dict.get("data"))
                neo4j_pipe.main()

                # ---------------------------------------------------------------------------- #
                #                             C O M P L E T E D 🎉                             #
                # ---------------------------------------------------------------------------- #
                logger.info("All data ingestion completed successfully. 🎉")
            # break
            time.sleep(10)
    except Exception as e:
        logger.error(f"Exception: {herb_names[herb_name_inx]}")
        logger.error(f"Exception: {e}")
        raise
    finally:
        neo4j_pipe.close()
    
    