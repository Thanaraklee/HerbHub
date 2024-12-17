from neo4j import GraphDatabase
from collections import Counter
import streamlit as st
from datetime import timedelta

class Neo4jGraph:
    def __init__(self, uri: str, auth: tuple):
        # Initializing connection details
        self.uri = uri
        self.auth = auth

    # @st.cache_resource(ttl=timedelta(minutes=10))
    def driver(_self):
        driver = GraphDatabase.driver(_self.uri, auth=_self.auth)
        return driver

    def standardize_part(self, part_name: str, part_mapping: dict):
        """
        Map a part name to its standardized name using part_mapping.
        If no match is found, return the original part name in lowercase.
        """
        if part_name:
            part_name = part_name.strip().lower()
            for standard, variations in part_mapping.items():
                if part_name.lower() in variations:
                    return standard
            return part_name.lower()
        else:
            return None
            
    
    @st.cache_data(ttl=timedelta(minutes=10))
    def fetch_for_stat_drug(_self, herb: str, part_mapping: dict):
        result_dict = {
            "Part": [],
            "Count": []
        }
        aggregated_result = {}
        with _self.driver().session() as session:
            query = f"""
            OPTIONAL MATCH (n1:Species {{name:'{herb}'}})-[:HAS_PART_USE]-(n2:Part {{species_name:'{herb}'}})-[:HAS_DRUG]-(n3:Drug {{species_name:'{herb}'}})
            RETURN properties(n2).name, count(properties(n2).name)
            """    
            result = session.run(query)
            for record in result:
                part_name = record["properties(n2).name"]
                count = record["count(properties(n2).name)"]
                
                standardized_part = _self.standardize_part(part_name=part_name, part_mapping=part_mapping)
                
                if standardized_part in aggregated_result:
                    aggregated_result[standardized_part] += count
                else:
                    aggregated_result[standardized_part] = count

        for part, count in aggregated_result.items():
            result_dict["Part"].append(part.capitalize())
            result_dict["Count"].append(count)
        
        return result_dict
    
    @st.cache_data(ttl=timedelta(minutes=10))
    def fetch_for_stat_chemical(_self, herb: str, part_mapping: dict):
        result_dict = {
            "Part": [],
            "Count": []
        }
        aggregated_result = {}
        with _self.driver().session() as session:
            query = f"""
            OPTIONAL MATCH (n1:Species {{name:'{herb}'}})-[:HAS_PART_USE]-(n2:Part {{species_name:'{herb}'}})-[:HAS_CHEMICAL]-(n3:Chemical {{species_name:'{herb}'}})
            RETURN properties(n2).name, count(properties(n2).name)
            """    
            result = session.run(query)
            for record in result:
                part_name = record["properties(n2).name"]
                count = record["count(properties(n2).name)"]
                
                standardized_part = _self.standardize_part(part_name=part_name, part_mapping=part_mapping)
                
                if standardized_part in aggregated_result:
                    aggregated_result[standardized_part] += count
                else:
                    aggregated_result[standardized_part] = count

        for part, count in aggregated_result.items():
            result_dict["Part"].append(part)
            result_dict["Count"].append(count)

        return result_dict
    
    @st.cache_data(ttl=timedelta(minutes=10))
    def fetch_for_clinical_and_pharma(_self, herb: str):
        result_list = []
        with _self.driver().session() as session:
            query = f"""
            OPTIONAL MATCH (n1:Species {{name:'{herb}'}})-[:HAS_CLINICAL_STUDIES]-(m1:ClinicalStudies)
            RETURN properties(m1).name
            UNION
            OPTIONAL MATCH (n1:Species {{name:'{herb}'}})-[:HAS_PHARMACOLOGICAL_STUDIES]-(m1:PharmacologicalStudies)
            RETURN properties(m1).name
            """
            result = session.run(query)
            for record in result:
                result_list.append(record["properties(m1).name"])
        return result_list

    @st.cache_data(ttl=timedelta(minutes=10))
    def fetch_for_summary(_self, node_id: str):
        with _self.driver().session() as session:
            query = f"""
            MATCH (n) WHERE elementId(n) = '{node_id}'
            RETURN n.content as content, n.name as name
            """
            results = session.run(query)
            for result in results:
                name = result['name']
                content = result['content']

        return {'topic': name, 'content': content}

    @st.cache_data(ttl=timedelta(minutes=10))
    def fetch_relationships_total(_self, herb: str):
        result_dict = {}
        with _self.driver().session() as session:
            query = f"""
            OPTIONAL MATCH(n4:Species {{name:'{herb}'}})-[r:HAS_PART_USE]-(n2:Part)-[r2:HAS_CHEMICAL]-(n3:Chemical {{species_name:'{herb}'}})
            RETURN type(r2), count(type(r2))
            UNION ALL
            OPTIONAL MATCH(n:Species {{name:'{herb}'}})-[r:HAS_PART_USE]-(n2:Part)-[r2:HAS_DRUG]-(n3:Drug {{species_name:'{herb}'}})
            RETURN type(r2), count(type(r2))
            UNION ALL
            MATCH(n:Species {{name:'{herb}'}})-[r2:HAS_CLINICAL_STUDIES|HAS_PHARMACOLOGICAL_STUDIES]-(n2)
            RETURN type(r2), count(type(r2))
            """
            result = session.run(query)

            for record in result:
                if record["type(r2)"] == 'HAS_CHEMICAL':
                    result_dict['Chemical'] = record["count(type(r2))"]
                elif record["type(r2)"] == 'HAS_DRUG':
                    result_dict['Drug'] = record["count(type(r2))"]
                elif record["type(r2)"] == 'HAS_CLINICAL_STUDIES':
                    result_dict['Clinical Studies'] = record["count(type(r2))"]
                elif record["type(r2)"] == 'HAS_PHARMACOLOGICAL_STUDIES':
                    result_dict['Pharmacological Studies'] = record["count(type(r2))"]
        return result_dict

    @st.cache_data(ttl=timedelta(minutes=10))
    def fetch_node_by_id(_self, node_id: str):
        with _self.driver().session() as session:
            query = f"MATCH (n) WHERE elementId(n) = '{node_id}' RETURN n"
            result = session.run(query)

            for record in result:
                node_data = {    
                    "data": {
                        "id": f"{record['n'].element_id}",
                        "label": list(record['n'].labels)[0] if record['n'].labels else "Node",
                        **record['n']._properties
                    }
                }
                return node_data

    @st.cache_data(ttl=timedelta(minutes=10))
    def fetch_relationship_options(_self, herb: str):
        options = []
        with _self.driver().session() as session:
            query = f"MATCH (n:Species {{name:'{herb}'}})-[r*]->(m) UNWIND r AS single_relationship RETURN DISTINCT type(single_relationship)"
            result = session.run(query)

            for record in result:
                options.append(record["type(single_relationship)"])

        return sorted(options)

    @st.cache_data(ttl=timedelta(minutes=10))
    def fetch_first_node(_self, herb: str):
        nodes = []
        with _self.driver().session() as session:
            query = f"MATCH (n:Species {{name:'{herb}'}}) RETURN n"
            result = session.run(query)

            for record in result:
                node_data = {
                    "data": {
                        "id": f"{record['n'].element_id}",
                        "label": list(record['n'].labels)[0] if record['n'].labels else "Node",
                        **record['n']._properties
                    }
                }
                nodes.append(node_data)
        return {"nodes": nodes}
    
    @st.cache_data(ttl=timedelta(minutes=10))
    def fetch_nodes_and_edges(_self, herb: str, selections: list):
        selections_use = selections.copy()
        nodes = []
        edges = []
        node_ids = set()

        try:
            selections_use.remove('HAS_CHEMICAL')
        except ValueError as e:
            pass
        try:
            selections_use.remove('HAS_DRUG')
        except ValueError as e:
            pass

        relationship_types = "|".join(selections_use)
        with _self.driver().session() as session:
            if 'HAS_DRUG' in selections and 'HAS_CHEMICAL' in selections:
                if selections_use:
                    query = f"""
                        MATCH (n1:Species {{name:'{herb}'}})
                        OPTIONAL MATCH (n1)-[r1:{relationship_types}]-(n2)
                        OPTIONAL MATCH (n1)-[r2:HAS_PART_USE]-(n3:Part)-[r3:HAS_CHEMICAL]-(n4:Chemical {{species_name:'{herb}'}})
                        OPTIONAL MATCH (n1)-[r4:HAS_PART_USE]-(n5:Part)-[r5:HAS_DRUG]-(n6:Drug {{species_name:'{herb}'}})
                        RETURN n1, n2, n3, n4, n5, n6, r1, r2, r3, r4, r5
                    """
                else:
                    query = f"""
                        MATCH (n1:Species {{name:'{herb}'}})
                        OPTIONAL MATCH (n1)-[r2:HAS_PART_USE]-(n3:Part)-[r3:HAS_CHEMICAL]-(n4:Chemical {{species_name:'{herb}'}})
                        OPTIONAL MATCH (n1)-[r4:HAS_PART_USE]-(n5:Part)-[r5:HAS_DRUG]-(n6:Drug {{species_name:'{herb}'}})
                        RETURN n1, n3, n4, n5, n6, r2, r3, r4, r5
                    """
            elif 'HAS_CHEMICAL' in selections:
                if selections_use:
                    query = f"""
                        MATCH (n1:Species {{name:'{herb}'}})
                        OPTIONAL MATCH (n1)-[r1:{relationship_types}]-(n2)
                        OPTIONAL MATCH (n1)-[r2:HAS_PART_USE]-(n3:Part)-[r3:HAS_CHEMICAL]-(n4:Chemical {{species_name:'{herb}'}})
                        RETURN n1, n2, n3, n4, r1, r2, r3
                    """
                else:
                    query = f"""
                        MATCH (n1:Species {{name:'{herb}'}})
                        OPTIONAL MATCH (n1)-[r2:HAS_PART_USE]-(n3:Part)-[r3:HAS_CHEMICAL]-(n4:Chemical {{species_name:'{herb}'}})
                        RETURN n1, n3, n4, r2, r3
                    """
            elif 'HAS_DRUG' in selections:
                if selections_use:
                    query = f"""
                        MATCH (n1:Species {{name:'{herb}'}})
                        OPTIONAL MATCH (n1)-[r1:{relationship_types}]-(n2)
                        OPTIONAL MATCH (n1)-[r2:HAS_PART_USE]-(n3:Part)-[r3:HAS_DRUG]-(n4:Drug {{species_name:'{herb}'}})
                        RETURN n1, n2, n3, n4, r1, r2, r3
                    """
                else:
                    query = f"""
                        MATCH (n1:Species {{name:'{herb}'}})
                        OPTIONAL MATCH (n1)-[r2:HAS_PART_USE]-(n3:Part)-[r3:HAS_DRUG]-(n4:Drug {{species_name:'{herb}'}})
                        RETURN n1, n3, n4, r2, r3
                    """
            else:
                query = f"""
                    MATCH (n1:Species {{name:'{herb}'}})
                    OPTIONAL MATCH (n1)-[r1:{relationship_types}]-(n2)
                    RETURN n1, n2, r1
                """
            print(query)
            result = session.run(query)
            for record in result:
                # print(record['n1'])
                all_node = [record[_] for _ in record.keys() if _.startswith('n')]
                all_edge = [record[_] for _ in record.keys() if _.startswith('r')]
                # ----------------------------------- Node ----------------------------------- #
                for node in all_node:
                    if node:
                        if node.element_id not in node_ids:
                            node_data = {
                                "data": {
                                    "id": f"{node.element_id}",
                                    "label": list(node.labels)[0] if node.labels else "Node",
                                    **{key: value for key, value in node._properties.items() if key not in ['content']}
                                }
                            }
                            nodes.append(node_data)
                            node_ids.add(node.element_id)

                # ------------------------------- Relationship ------------------------------- #
                for relationship in all_edge:
                    if relationship is not None:
                        if isinstance(relationship, list): 
                            for relation in relationship:
                                edge_data = {
                                    "data": {
                                        "id": f"{relation.element_id}",
                                        "label": relation.type,
                                        "source": f"{relation.start_node.element_id}",
                                        "target": f"{relation.end_node.element_id}"
                                    }
                                }
                                edges.append(edge_data)
                        else:  # In case there is just one relationship
                            edge_data = {
                                "data": {
                                    "id": f"{relationship.element_id}",
                                    "label": relationship.type,
                                    "source": f"{relationship.start_node.element_id}",
                                    "target": f"{relationship.end_node.element_id}"
                                }
                            }
                            edges.append(edge_data)


        return {"nodes": nodes, "edges": edges}

    @st.cache_data(ttl=timedelta(minutes=10))
    def fetch_species_names(_self):
        # This function fetches species_name from all nodes
        species_names = []
        
        with _self.driver().session() as session:
            query = "MATCH (n:Species) RETURN n.name"
            result = session.run(query)

            for record in result:
                species_names.append(record["n.name"])

        return sorted(species_names)

    @st.cache_data(ttl=timedelta(minutes=10))
    def fetch_descriptions(_self, herb: str):
        result_dict = {
            "authored_by": None,
            "updated_by": None,
            "image": None,
            "local_names": [],
            "common_names": [],
            "synonyms": []
        }
        with _self.driver().session() as session:
            query = f"""
            OPTIONAL MATCH (n1:Species {{name: '{herb}'}})-[r:HAS_COMMON_NAME|HAS_LOCAL_NAME|HAS_SYNONYM|AUTHORED_BY|UPDATED_BY]-(n2)
            RETURN type(r) AS col1, properties(n2) AS col2
            UNION ALL
            OPTIONAL MATCH (n1:Species {{name: '{herb}'}})
            RETURN  'IMAGE' AS col1, properties(n1).image AS col2
            """
            result = session.run(query)

            for record in result:
                relationship_type = record["col1"]
                properties = record["col2"]
                
                if relationship_type == "AUTHORED_BY":
                    result_dict["authored_by"] = properties["name"]
                elif relationship_type == "UPDATED_BY":
                    result_dict["updated_by"] = properties["name"]                    
                elif relationship_type == "HAS_COMMON_NAME":
                    result_dict["common_names"].append({
                        "name": properties["name"],
                        "language": properties.get("language"),
                        "reference": properties.get("name_ref")
                    })
                elif relationship_type == "HAS_LOCAL_NAME":
                    result_dict["local_names"].append({
                        "name": properties["name"],
                        "reference": properties.get("name_ref")
                    })
                elif relationship_type == "HAS_SYNONYM":
                    result_dict["synonyms"].append({
                        "name": properties["name"],
                        "protologue": properties.get("protologue"),
                        "reference_link": properties.get("link_ref")
                    })
                elif relationship_type == "IMAGE":
                    result_dict["image"] = properties
        return result_dict

    def fetch_all_herb_names(self):
        result_dict = {}
        with self.driver().session() as session:
            query = """
            MATCH (n1:Species)-[r1:HAS_COMMON_NAME|HAS_LOCAL_NAME]-(n2) 
            RETURN properties(n1).name AS species, properties(n2).name AS name
            """
            records = session.run(query)

            for record in records:
                species = record["species"]
                name = record["name"].replace('&nbsp;', '')

                if species not in result_dict:
                    result_dict[species] = []

                result_dict[species].append(name)

        return result_dict
    