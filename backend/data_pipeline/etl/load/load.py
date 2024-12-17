import json
import os 
import sys
from neo4j import GraphDatabase
import re
from minio import Minio
import requests
from dotenv import load_dotenv

load_dotenv()

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utils.logging import logger


class SaveHerbtoJson:
    def __init__(self):
        pass

    def save_to_json(self, master_dict: dict, filename: str = "master.json"):
        logger.info(f"Saving {filename}")
        pretty_json = json.dumps(master_dict, ensure_ascii=False, indent=4)
        
        with open(filename, "w", encoding="utf-8") as f:
            f.write(pretty_json)

class LoadHerbtoNeo4j:
    def __init__(self, uri: str, auth: tuple, database: str = "graphherb"):
        self.driver = GraphDatabase.driver(uri, auth=auth, database=database)
        try:
            self.driver.verify_connectivity()
            logger.info(f"Connected to Neo4j at {uri}")
        except Exception as e:
            logger.error(f"Failed to connect to Neo4j: {e}")
            raise
        self.db = self.driver.session(database="graphherb")

    def preparing_json(self, json_data: dict = None):
        if not json_data or not isinstance(json_data, dict):
            logger.error("Invalid JSON data provided for ingestion.")
            return
        # ----------------------------------- json ----------------------------------- #
        self.species_name = json_data.get('species_name')
        self.herb_name = self.species_name.get('species_name') 
        if not self.herb_name:
            logger.error("Missing 'species_name' in JSON data.")
            return
        self.synonyms = json_data.get('synonyms')
        self.taxonomy = json_data.get('taxonomy')
        self.part_and_medicinal = json_data.get('part_and_medicinal')
        self.part_and_checimal = json_data.get('part_and_checimal')
        self.common_name_th = json_data.get('common_name_th')
        self.common_name_en = json_data.get('common_name_en')
        self.local_name = json_data.get('local_name')
        self.clinical_studies = json_data.get('clinical_studies')
        self.pharmacological_studies = json_data.get('pharmacological_studies')

    def clear_database(self):
        try:
            self.db.run("MATCH (n) DETACH DELETE n")
            logger.warning("Database Neo4j cleared . ✨")
        except Exception as e:
            logger.error(f"Failed to clear database: {e}")
            raise

    def close(self):
        if self.db:
            self.db.close()
            logger.info(f"Connection to Neo4j closed")
            
    def create_node_people(self, people: str):
        if not people:
            logger.error("Missing 'people' in data.")
            return
        query = """
        MERGE (:Person {name: $name})
        """
        try:
            self.db.run(query, name=people)
            logger.info(f"Data ingested successfully for people: {people}")
        except Exception as e:
            logger.error(f"Failed to ingest data: {e}")
            raise
    def create_relationship(self, source: str, source_name: str, target: str, target_name: str, relationship_type: str):
        if not source or not target:
            logger.error("Missing 'source' or 'target' in data.")
            return
        query = f"""
        MATCH (a {{{source_name}: $source}})
        MATCH (b {{{target_name}: $target}})
        MERGE (a)-[r:{relationship_type}]->(b)
        """
        try:
            self.db.run(query, source=source, target=target, RELATIONSHIP_TYPE=relationship_type)
            logger.info(f"Relationship created: {source} -[:{relationship_type}]-> {target}")
        except Exception as e:
            logger.error(f"Failed to create relationship: {source} -> {target}, Error: {e}")
            raise

    def create_relationship_specific_species(self, source: str, target: str, species_name: str, relationship_type: str):
        if not source or not target:
            logger.error("Missing 'source' or 'target' in data.")
            return
        query = f"""
        MATCH (a {{name: $source}})
        MATCH (b {{name: $target, species_name: $species_name}})
        MERGE (a)-[r:{relationship_type}]->(b)
        """
        try:
            self.db.run(query, source=source, target=target, species_name=species_name, RELATIONSHIP_TYPE=relationship_type)
            logger.info(f"Relationship created: {source} -[:{relationship_type}]-> {target} of species_name: {species_name}")
        except Exception as e:
            logger.error(f"Failed to create relationship: {source} -> {target}, Error: {e}")
            raise

    def create_relationship_part(self, source: str, target: str, species_name: str, relationship_type: str):
        if not source or not target:
            logger.error("Missing 'source' or 'target' in data.")
            return
        query = f"""
        MATCH (a {{name: $source, species_name: $species_name}})
        MATCH (b {{name: $target, species_name: $species_name}})
        MERGE (a)-[r:{relationship_type}]->(b)
        """
        try:
            self.db.run(query, source=source, target=target, species_name=species_name, RELATIONSHIP_TYPE=relationship_type)
            logger.info(f"Relationship created: {source} -[:{relationship_type}]-> {target} of species_name: {species_name}")
        except Exception as e:
            logger.error(f"Failed to create relationship part: {source} -> {target}, Error: {e}")
            raise

    def ingest_json_species_name(self):
        if not self.species_name:
            logger.error("Missing 'species_name' in JSON data.")
            return

        name = self.species_name.get('species_name')
        image = self.species_name.get('species_image')
        authorship = self.species_name.get('authorship')
        updated_by = self.species_name.get('updated_by', 'Unknown')
        name_ref = self.species_name.get('name_ref', 'Unknown')
        link_ref = self.species_name.get('link_ref', 'Unknown')

        if not name:
            logger.error("'species_name' cannot be None or empty.")
            return
        if not authorship:
            logger.error("'authorship' cannot be None or empty.")
            return

        query = """
        MERGE (:Species {name: $name, image: $image, name_ref: $name_ref, link_ref: $link_ref})
        """
        try:
            self.db.run(query, name=name, image=image,name_ref=name_ref, link_ref=link_ref)
            logger.info(f"Data ingested successfully for species_name: {name}")
        except Exception as e:
            logger.error(f"Failed to ingest data: {e}")
            raise

        self.create_node_people(authorship)
        self.create_relationship(source=name, source_name="name", target=authorship, target_name="name", relationship_type='AUTHORED_BY')
        if updated_by != 'Unknown' and updated_by != '':
            logger.info(f"Data ingested successfully for updated_by: {updated_by}")
            self.create_node_people(updated_by)
            self.create_relationship(source=name, source_name='name', target=updated_by, target_name="name", relationship_type='UPDATED_BY')

    def ingest_json_taxonomy(self):
        if not self.taxonomy:
            logger.error("Missing 'taxonomy' in JSON data.")
            return

        kingdom = self.taxonomy.get('kingdom')
        subkingdom = self.taxonomy.get('subkingdom')
        phylum = self.taxonomy.get('phylum')
        family = self.taxonomy.get('family')
        genus = self.taxonomy.get('genus')

        if not all([kingdom, subkingdom, phylum, family, genus]):
            logger.error("Missing 'kingdom', 'subkingdom', 'phylum', 'family', or 'genus' in JSON data.")
            return

        # ลูปเพื่อประมวลผลแต่ละ taxon และสร้าง nodes สำหรับแต่ละ taxon
        for taxon, label in zip([kingdom, subkingdom, phylum, family, genus], 
                                ['kingdom_name', 'subkingdom_name', 'phylum_name', 'family_name', 'genus_name']):
            
            name = taxon.get(f'{label}')
            link_ref = taxon.get('ref')
            
            if not name or not link_ref:
                logger.error(f"Missing 'name' or 'link_ref' for {label}.")
                continue
            
            # สร้าง query สำหรับ MERGE ข้อมูลลงใน Neo4j
            query = """
            MERGE (:Taxonomy {name: $name, link_ref: $link_ref, type: $type})
            """
            
            try:
                # ส่งข้อมูลไปยัง Neo4j
                self.db.run(query, name=name, link_ref=link_ref, type=label.split('_')[0].title())
                logger.info(f"Data ingested successfully for {label.replace('_', ' ').title()}: {name}")
            except Exception as e:
                logger.error(f"Failed to ingest data for {label}: {e}")
                raise

        try:
            if not self.herb_name:
                logger.error("Missing 'species_name' in JSON data.")
                return

            self.create_relationship(source=kingdom.get('kingdom_name'), source_name='name', target=subkingdom.get('subkingdom_name'), target_name='name', relationship_type='CONTAINS')
            self.create_relationship(source=subkingdom.get('subkingdom_name'), source_name='name', target=phylum.get('phylum_name'), target_name='name', relationship_type='CONTAINS')
            self.create_relationship(source=phylum.get('phylum_name'), source_name='name', target=family.get('family_name'), target_name='name', relationship_type='CONTAINS')
            self.create_relationship(source=family.get('family_name'), source_name='name', target=genus.get('genus_name'), target_name='name', relationship_type='CONTAINS')
            self.create_relationship(source=genus.get('genus_name'), source_name='name', target=self.herb_name, target_name='name', relationship_type='CONTAINS')

            logger.info(f"Created relationships for herb_name: {self.herb_name}")

        except Exception as e:
            logger.error(f"Failed to create relationships: {e}")
            raise

    def injest_json_synonyms(self):
        if not self.herb_name:
            logger.error("Missing 'species_name' in JSON data.")
            return
        if not self.synonyms:
            logger.error("Missing 'synonyms' in JSON data.")
            return
        for synonym in self.synonyms:
            name = synonym.get('name')
            author = re.sub(r'\d+', '', synonym.get('author').replace('–', '').replace('-','')).strip()
            protologue = synonym.get('protologue')
            wfo_link = synonym.get('wfo_link')

            if not name or not author or not protologue or not wfo_link:
                logger.error("Missing 'name', 'name_ref', or 'link_ref' in JSON data.")
                continue

            query = """
            MERGE (:Synonym {name: $name, protologue: $protologue, link_ref: $link_ref})
            """
            try:
                self.db.run(query, name=name, protologue=protologue, link_ref=wfo_link)
                logger.info(f"Data ingested successfully for synonyms: {name}")
                try:
                    self.create_relationship(source=self.herb_name, source_name='name', target=name, target_name='name', relationship_type='HAS_SYNONYM')
                except Exception as e:
                    logger.error(f"Failed to create relationship: {e}")
                    raise
            except Exception as e:
                logger.error(f"Failed to ingest data: {e}")
                raise
            self.create_node_people(author)
            self.create_relationship(source=name, source_name="name", target=author, target_name="name", relationship_type='AUTHORED_BY')

    def injest_json_common_name(self):
        if not self.common_name_th:
            logger.error("Missing 'common_name_th' in JSON data.")
            return
        if not self.common_name_en:
            logger.error("Missing 'common_name_en' in JSON data.")
            return
        
        common_name_th = self.common_name_th.get('common_name_th').split(',')
        common_name_en = self.common_name_en.get('common_name_en').split(',')

        for i in range(len(common_name_th)):
            common_name_th[i] = common_name_th[i].strip()
            reference = self.common_name_th.get('common_name_th_ref', ['Unknown'])
            if len(reference) == 1:
                reference = reference[0]
            if not reference:
                reference = 'Unknown'
            query = """
            MERGE (:CommonName {name: $name, language: $language, name_ref: $reference})
            """
            try:
                self.db.run(query, name=common_name_th[i], language='Thai', reference=reference)
                logger.info(f"Data ingested successfully for common_name_th: {common_name_th[i]}")
                try:
                    self.create_relationship(source=self.herb_name, source_name='name', target=common_name_th[i], target_name='name', relationship_type='HAS_COMMON_NAME')
                except Exception as e:
                    logger.error(f"Failed to create relationship: {e}")
                    raise
            except Exception as e:
                logger.error(f"Failed to ingest data: {e}")
                raise

        for i in range(len(common_name_en)):
            common_name_en[i] = common_name_en[i].strip()
            reference = self.common_name_en.get('common_name_en_ref', ['Unknown'])
            if len(reference) == 1:
                reference = reference[0]
            if not reference:
                reference = 'Unknown'
            query = """
            MERGE (:CommonName {name: $name, language: $language, name_ref: $reference})
            """
            try:
                self.db.run(query, name=common_name_en[i], language='English', reference=reference)
                logger.info(f"Data ingested successfully for common_name_en: {common_name_en[i]}")
                try:
                    self.create_relationship(source=self.herb_name, source_name='name', target=common_name_en[i], target_name='name', relationship_type='HAS_COMMON_NAME')
                except Exception as e:
                    logger.error(f"Failed to create relationship: {e}")
                    raise
            except Exception as e:
                logger.error(f"Failed to ingest data: {e}")
                raise

    def injest_json_local_name(self):
        if not self.local_name:
            logger.error("Missing 'local_name' in JSON data.")
            return
        
        local_name = self.local_name.get('local_name')
        for i in range(len(local_name)):
            local_name[i] = local_name[i].replace(',','').strip()
            reference = self.local_name.get('local_name_ref', ['Unknown'])
            if len(reference) == 1:
                reference = reference[0]
            if not reference:
                reference = 'Unknown'
            query = """
            MERGE (:LocalName {name: $name, name_ref: $reference})
            """
            try:
                self.db.run(query, name=local_name[i], reference=reference)
                logger.info(f"Data ingested successfully for local_name: {local_name[i]}")
                try:
                    self.create_relationship(source=self.herb_name, source_name='name', target=local_name[i], target_name='name', relationship_type='HAS_LOCAL_NAME')
                except Exception as e:
                    logger.error(f"Failed to create relationship: {e}")
                    raise
            except Exception as e:
                logger.error(f"Failed to ingest data: {e}")
                raise

    def injest_json_clinical_studies(self):
        if not self.clinical_studies:
            logger.error("Missing 'clinical_studies' in JSON data.")
            return
        
        for study in self.clinical_studies:
            clinical = study.get('clinical')
            clinical_content = study.get('clinical_content').strip()
            if clinical_content.endswith(')'):
                clinical_content = clinical_content.rsplit(' ', 1)[0].strip()
            clinical_ref = study.get('clinical_ref')

            query = """
            MERGE (:ClinicalStudies {name: $clinical, content: $clinical_content, name_ref: $clinical_ref})
            """
            try:
                self.db.run(query, clinical=clinical, clinical_content=clinical_content,clinical_ref=clinical_ref)
                logger.info(f"Data ingested successfully for clinical_studies: {clinical}")
                try:
                    self.create_relationship(source=self.herb_name, source_name='name', target=clinical, target_name='name', relationship_type='HAS_CLINICAL_STUDIES')
                except Exception as e:
                    logger.error(f"Failed to create relationship: {e}")
            except Exception as e:
                logger.error(f"Failed to ingest data: {e}")
                raise

    def injest_json_pharmacological_studies(self):
        if not self.pharmacological_studies:
            logger.error("Missing 'pharmacological_studies' in JSON data.")
            return
        
        for study in self.pharmacological_studies:
            pharmacological = study.get('pharmacological')
            pharmacological_content = study.get('pharmacological_content')
            if pharmacological_content.endswith(')'):
                pharmacological_content = pharmacological_content.rsplit(' ', 1)[0].strip()
            pharmacological_ref = study.get('pharmacological_ref')

            query = """
            MERGE (:PharmacologicalStudies {name: $pharmacological, content: $pharmacological_content, name_ref: $pharmacological_ref})
            """
            try:
                self.db.run(query, pharmacological=pharmacological, pharmacological_content=pharmacological_content, pharmacological_ref=pharmacological_ref)
                logger.info(f"Data ingested successfully for pharmacological_studies: {pharmacological}")
                try:
                    self.create_relationship(source=self.herb_name, source_name='name', target=pharmacological, target_name='name',  relationship_type='HAS_PHARMACOLOGICAL_STUDIES')
                except Exception as e:
                    logger.error(f"Failed to create relationship: {e}")
            except Exception as e:
                logger.error(f"Failed to ingest data: {e}")
                raise

    def injest_json_part_and_medicinal(self):
        if not self.part_and_medicinal:
            logger.error("Missing 'part_and_medicinal' in JSON data.")
            return
        for medicinal in self.part_and_medicinal:
            parts = [_.strip().lower() for _ in medicinal.get('part').split(',')]
            for part in parts:
                drug = medicinal.get('drug')
                medicinal_name = medicinal.get('medicinal_name')
                medicinal_name_ref = medicinal.get('medicinal_source')
                query_part = """
                MERGE (:Part {name: $part, species_name: $species_name})
                """
                query_medicinal = """
                MERGE (:Drug {name: $drug, part: $part, species_name: $species_name, name_ref: $medicinal_name, link_ref: $medicinal_name_ref})
                """
                try:
                    self.db.run(query_part, part=part, species_name=self.herb_name)
                    logger.info(f"Data ingested successfully for part: {part} species_name: {self.herb_name}")
                    try:
                        self.create_relationship_specific_species(self.herb_name, part, self.herb_name, 'HAS_PART_USE')
                        try:
                            self.db.run(query_medicinal, drug=drug, part=part, species_name=self.herb_name, medicinal_name=medicinal_name, medicinal_name_ref=medicinal_name_ref)
                            logger.info(f"Data ingested successfully for drug: {medicinal_name}")
                            try:
                                self.create_relationship_part(part, drug, self.herb_name, 'HAS_DRUG')
                            except Exception as e:
                                logger.error(f"Failed to create relationship: {e}")
                        except Exception as e:
                            logger.error(f"Failed to ingest data: {e}")
                            raise
                    except Exception as e:
                        logger.error(f"Failed to create relationship: {e}")
                except Exception as e:
                    logger.error(f"Failed to ingest data: {e}")
                    raise

    def injest_json_part_and_checimal(self):
        if not self.part_and_checimal:
            logger.error("Missing 'part_and_checimal' in JSON data.")
            return
        for checimal in self.part_and_checimal:
            parts = [_.strip().lower() for _ in checimal.get('plant_part').split(',')]
            for part in parts:
                checimal_name = checimal.get('chemical_name')
                activity = checimal.get('activity_count')
                lppm = checimal.get('low_parts_per_million')
                hppm = checimal.get('high_parts_per_million')
                sd = checimal.get('standard_deviation')
                checimal_name_ref = checimal.get('ref')
                query_part = """
                MERGE (:Part {name: $part, species_name: $species_name})
                """
                query_checimal = """
                MERGE (:Chemical {name: $checimal_name, species_name: $species_name, part_use: $part, response_count: $activity, low_parts_per_million: $low_parts_per_million, high_parts_per_million: $high_parts_per_million, standard_deviation: $standard_deviation, name_ref: $checimal_name_ref})
                """
                try:
                    self.db.run(query_part, part=part, species_name=self.herb_name)
                    logger.info(f"Data ingested successfully for part: {part} species_name: {self.herb_name}")
                    try:
                        self.create_relationship_specific_species(source=self.herb_name, target=part, species_name=self.herb_name, relationship_type='HAS_PART_USE')
                        try:
                            self.db.run(query_checimal, checimal_name=checimal_name, species_name=self.herb_name,part=part, activity=activity, low_parts_per_million=lppm, high_parts_per_million=hppm, standard_deviation=sd, checimal_name_ref=checimal_name_ref)
                            logger.info(f"Data ingested successfully for checimal: {checimal_name}")
                            try:
                                self.create_relationship_part(part, checimal_name, self.herb_name, 'HAS_CHEMICAL')
                            except Exception as e:
                                logger.error(f"Failed to create relationship: {e}")
                        except Exception as e:
                            logger.error(f"Failed to ingest data: {e}")
                            raise
                    except Exception as e:
                        logger.error(f"Failed to create relationship: {e}")
                except Exception as e:
                    logger.error(f"Failed to ingest data: {e}")
                    raise

    def main(self):
        try:
            # ------------------------------ clear database ------------------------------ #

            # ------------------------------- species_name ------------------------------- #
            self.ingest_json_species_name()

            # --------------------------------- synonyms --------------------------------- #
            self.injest_json_synonyms()

            # --------------------------------- taxonomy --------------------------------- #
            self.ingest_json_taxonomy()

            # ---------------------------- part_and_medicinal ---------------------------- #
            self.injest_json_part_and_medicinal()

            # ----------------------------- part_and_checimal ---------------------------- #
            self.injest_json_part_and_checimal()

            # -------------------------------- common_name ------------------------------- #
            self.injest_json_common_name()

            # --------------------------------- local_name --------------------------------- #
            self.injest_json_local_name()

            # ----------------------------- clinical_studies ----------------------------- #
            self.injest_json_clinical_studies()

            # -------------------------- pharmacological_studies ------------------------- #
            self.injest_json_pharmacological_studies()
        except Exception as e:
            logger.error(f"Failed to ingest data: {e}")

class LoadImagetoMinIO:
    def __init__(self, endpoint: str, access_key: str, secret_key: str) -> None:
        self.driver = Minio(endpoint=endpoint, access_key=access_key, secret_key=secret_key, secure=False)
        try:
            self.driver.list_buckets()
            logger.info(f"Connected to MinIO at {endpoint}")
        except Exception as e:
            logger.error(f"Failed to connect to MinIO: {e}")
            raise

    def push_to_minio(self, herb_name: str, image_list: list, bucket_name: str) -> list:
        image_name_list = []
        if not self.driver.bucket_exists(bucket_name):
            self.driver.make_bucket(bucket_name)
            
            public_policy = {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Effect": "Allow",
                        "Principal": {"AWS": ["*"]},
                        "Action": ["s3:GetObject"],
                        "Resource": [f"arn:aws:s3:::{bucket_name}/*"]
                    }
                ]
            }
            
            self.driver.set_bucket_policy(bucket_name, json.dumps(public_policy))

            logger.info(f"Bucket '{bucket_name}' created and set to public access.")

        for image_url_inx in range(len(image_list)):
            response = requests.get(image_list[image_url_inx], stream=True)
            if response.status_code == 200:
                object_name = f"{herb_name.replace(' ', '_')}_{image_url_inx}.jpg"
                self.driver.put_object(
                    bucket_name,
                    object_name,
                    data=response.raw,
                    length=int(response.headers.get('content-length', 0)), 
                    content_type=response.headers.get('content-type'), 
                )
                image_name_list.append(object_name)
                logger.info(f"'{object_name}' successfully uploaded to bucket '{bucket_name}'.")
            else:
                logger.error(f"Failed to download image from {image_list[image_url_inx]}. HTTP Status: {response.status_code}")
        return image_name_list