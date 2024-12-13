import os 
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from etl import ExtractHerb
from etl import TransformHerb
import logging

def fetching_kew(extract_herb: object) -> list:
    kew_dict = extract_herb.fetching_kew_part_formused()
    return {"data": kew_dict}

def transform_kew(transform_herb: object, kew_dict: dict) -> dict:
    table_dict = transform_herb.kew_transform(kew_dict)
    return {"data": table_dict}

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
    # ----------- Initialize instance of ExtractHerb and TransformHerb ----------- #
    herb_name = "Musa paradisiaca"
    extract_herb = ExtractHerb(herb_name=herb_name)
    transform_herb = TransformHerb(herb_name=herb_name)

    kew_dict = fetching_kew(extract_herb=extract_herb)
    kew_clean = transform_kew(transform_herb=transform_herb,kew_dict=kew_dict['data'])
