import os 
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from etl import ExtractHerb
from etl import TransformHerb

def fetching_usda_csv(extract_herb: object) -> list:
    csv_link = extract_herb.fetching_usda_part_chemical_csv()
    return csv_link

def transform_usde(transform_herb: object, csv_link: str) -> dict:
    table_dict = transform_herb.usda_transform(csv_link=csv_link)
    return {"data": table_dict}

if __name__ == "__main__":
    # ----------- Initialize instance of ExtractHerb and TransformHerb ----------- #
    herb_name = "Curcuma longa"
    extract_herb = ExtractHerb(herb_name=herb_name)
    transform_herb = TransformHerb(herb_name=herb_name)

    csv_link = fetching_usda_csv(extract_herb=extract_herb)
    usda_clean = transform_usde(transform_herb=transform_herb, csv_link=csv_link)
    # print(usda_clean['data'])


