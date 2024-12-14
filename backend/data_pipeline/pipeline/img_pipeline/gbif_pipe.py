import sys
import os
from dotenv import load_dotenv

load_dotenv()
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))
from etl import ExtractHerbImage

def fetching_gbif(extract_herb_image: object) -> dict:
    image_list = extract_herb_image.fetching_gbif()
    return {"data": image_list}

if __name__ == "__main__":
    herbs = ["Zingiber officinale","Glycine max","Cymbopogon citratus","Curcuma longa","Aloe vera","Centella asiatica","Sesamum indicum","Camellia sinensis","Cannabis sativa","Hibiscus sabdariffa","Musa paradisiaca","Carthamus tinctorius","Cucumis sativus","Portulaca oleracea","Tamarindus indica","Carica papaya","Lawsonia inermis","Capsicum annuum","Phyllanthus emblica","Cocos nucifera","Moringa oleifera","Terminalia chebula","Terminalia bellirica"]

    for herb in herbs:
        extract_herb_image = ExtractHerbImage(herb_name=herb)
        image_dict = fetching_gbif(extract_herb_image=extract_herb_image)
        print(image_dict['data'])
        break

