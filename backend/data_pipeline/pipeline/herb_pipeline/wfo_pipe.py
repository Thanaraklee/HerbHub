import os 
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from etl import ExtractHerb
from etl import TransformHerb

def fetching_wfo(extract_herb: object) -> dict:
    response_json = extract_herb.fetching_wfo()
    return response_json

def transform_wfo(transform_herb: object, response_json: dict) -> str:
    return transform_herb.wfo_transform(response_json=response_json)

def fetching_wfo_stableUri(extract_herb: object, stable_uri: str) -> dict:
    stable_uri_response = extract_herb.fetching_wfo_stableUri(stable_uri=stable_uri)
    return {"data": stable_uri_response}

def transform_wfo_name(transform_herb: object, response: str) -> dict:
    name = transform_herb.wfo_transform_name(response=response)
    return {"data": name}

def transform_wfo_taxonomy(transform_herb: object, response: str) -> dict:
    taxonomy = transform_herb.wfo_transform_taxonomy(response=response)
    return {"data": taxonomy}

def transform_wfo_synonyms(transform_herb: object, response: str) -> dict:
    synonyms = transform_herb.wfo_transform_synonyms(response=response)
    return {"data": synonyms}

if __name__ == "__main__":
    # ----------- Initialize instance of ExtractHerb and TransformHerb ----------- #
    herb_name = "Curcuma longa"
    extract_herb = ExtractHerb(herb_name=herb_name)
    transform_herb = TransformHerb(herb_name=herb_name)

    wfo_response_json = fetching_wfo(extract_herb=extract_herb)
    wfo_stable_uri = transform_wfo(transform_herb=transform_herb, response_json=wfo_response_json)
    response = fetching_wfo_stableUri(extract_herb=extract_herb, stable_uri=wfo_stable_uri)
    name = transform_wfo_name(transform_herb=transform_herb, response=response['data'])
    taxonomy = transform_wfo_taxonomy(transform_herb=transform_herb, response=response['data'])
    synonyms = transform_wfo_synonyms(transform_herb=transform_herb, response=response['data'])
