import os 
import sys
import json
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from etl import ExtractHerb
from etl import TransformHerb

def fetching_cosmeherb(extract_herb: object) -> list:
    kew_dict = extract_herb.fetching_cosmeherb()
    return {"data": kew_dict}

def transform_cosmeherb(transform_herb: object, cosmeherb_dict: dict) -> dict:
    table_dict = transform_herb.cosmeherb_transform(cosmeherb_dict)
    return {"data": table_dict}

if __name__ == "__main__":
    # ----------- Initialize instance of ExtractHerb and TransformHerb ----------- #
    herb_name = "Curcuma longa"
    extract_herb = ExtractHerb(herb_name=herb_name)
    transform_herb = TransformHerb(herb_name=herb_name)

    cosmeherb_dict = fetching_cosmeherb(extract_herb=extract_herb)
    cosmeherb_clean = transform_cosmeherb(transform_herb=transform_herb, cosmeherb_dict=cosmeherb_dict['data'])
    # print(cosmeherb_clean['data'])

