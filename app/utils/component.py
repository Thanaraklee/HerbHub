from neo4j import GraphDatabase
from collections import Counter
import streamlit as st
from datetime import timedelta

class Neo4jGraph:
    def __init__(self, uri="neo4j://localhost:7687", auth=("neo4j", "P@ssw0rd")):
        # Initializing connection details
        self.uri = uri
        self.auth = auth

    @st.cache_resource(ttl=timedelta(minutes=10))
    def driver(_self):
        driver = GraphDatabase.driver(_self.uri, auth=_self.auth)
        return driver

    @st.cache_data(ttl=timedelta(minutes=10))
    def fetching_for_summary(_self, herb: str):
        nodes = []
        node_ids = set()
        with _self.driver().session() as session:
            query = f"""
            MATCH (n1:Species {{name:'{herb}'}})
            OPTIONAL MATCH (n1)-[r1:HAS_PHARMACOLOGICAL_STUDIES|HAS_CLINICAL_STUDIES]-(n2)
            OPTIONAL MATCH (n1)-[r2:HAS_PART_USE]-(n3:Part)-[r3:HAS_CHEMICAL]-(n4:Chemical {{species_name:'{herb}'}})
            OPTIONAL MATCH (n1)-[r4:HAS_PART_USE]-(n5:Part)-[r5:HAS_DRUG]-(n6:Drug {{species_name:'{herb}'}})
            RETURN n1, n2, n3, n4, n5, n6
            """
            print(query)
            result = session.run(query)
            for record in result:
                all_node = [record[_] for _ in record.keys() if _.startswith('n')]
                for node in all_node:
                    if node:
                        if node.element_id not in node_ids:
                            # filtered_properties = {key: value for key, value in node._properties.items() if key not in ['content']}
                            # print(filtered_properties)
                            node_data = {
                                "data": {
                                    "id": f"n{node.element_id}",
                                    "label": list(node.labels)[0] if node.labels else "Node",
                                    **{key: value for key, value in node._properties.items() if key not in ['content']}
                                }
                            }
                            nodes.append(node_data)
                            node_ids.add(node.element_id)
        return nodes

    @st.cache_data(ttl=timedelta(minutes=10))
    def fetch_relationships_total(self, herb: str):
        total_list = []
        with self.driver().session() as session:
            query = f"MATCH (n:Species {{name:'{herb}'}})-[r]->(m) RETURN type(r)"
            result = session.run(query)

            for record in result:
                total_list.append(record['type(r)'])
        return dict(Counter(total_list))

    @st.cache_data(ttl=timedelta(minutes=10))
    def fetch_node_by_id(self, node_id: str):
        with self.driver().session() as session:
            query = f"MATCH (n) WHERE elementId(n) = '{node_id}' RETURN n"
            result = session.run(query)

            for record in result:
                node_data = {    
                    "data": {
                        "id": f"n{record['n'].element_id}",
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
                        "id": f"n{record['n'].element_id}",
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
                            # filtered_properties = {key: value for key, value in node._properties.items() if key not in ['content']}
                            # print(filtered_properties)
                            node_data = {
                                "data": {
                                    "id": f"n{node.element_id}",
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
                                        "id": f"e{relation.element_id}",
                                        "label": relation.type,
                                        "source": f"n{relation.start_node.element_id}",
                                        "target": f"n{relation.end_node.element_id}"
                                    }
                                }
                                edges.append(edge_data)
                        else:  # In case there is just one relationship
                            edge_data = {
                                "data": {
                                    "id": f"e{relationship.element_id}",
                                    "label": relationship.type,
                                    "source": f"n{relationship.start_node.element_id}",
                                    "target": f"n{relationship.end_node.element_id}"
                                }
                            }
                            edges.append(edge_data)


        return {"nodes": nodes, "edges": edges}

    def get_species_names(self):
        # This function fetches species_name from all nodes
        species_names = []
        
        with self.driver().session() as session:
            query = "MATCH (n:Species) RETURN n.name"
            result = session.run(query)

            for record in result:
                species_names.append(record["n.name"])

        return sorted(species_names)
