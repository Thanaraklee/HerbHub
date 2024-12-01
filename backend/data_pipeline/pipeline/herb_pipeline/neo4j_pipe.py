import os
import sys
from neo4j import GraphDatabase
from dotenv import load_dotenv
import json
import re

load_dotenv()
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utils.logging import logger
from etl import LoadHerbtoNeo4j

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
    LoadHerbtoNeo4j.clear_database(uri=uri, auth=(user, password))
    # ----------------------------------- Json ----------------------------------- #
    for file in os.listdir('data/'):
        json_file = f"data/{file}"
        print(json_file)
        if not os.path.exists(json_file):
            logger.error(f"JSON file not found: {json_file}")
            sys.exit(1)
            break

        with open(json_file, "r", encoding="utf-8") as f:
            try:
                json_data = json.load(f)
            except json.JSONDecodeError as e:
                logger.error(f"Failed to load JSON file: {e}")
                sys.exit(1)
                break

        # --------------------------------- Workflow --------------------------------- #
        neo4j_pipe = LoadHerbtoNeo4j(uri=uri, auth=(user, password), json_data=json_data.get("data"))
        neo4j_pipe.main()
