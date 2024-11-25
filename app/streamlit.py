import json
import streamlit as st
from neo4j import GraphDatabase
from st_link_analysis import st_link_analysis
from config import node_styles, edge_styles, events, layout, mapping_relationship

st.set_page_config(layout="wide")

if 'xyz' not in st.session_state:
    st.session_state.xyz = None

# ---------------------------------------------------------------------------- #
class Neo4jGraph:
    def __init__(self, uri="neo4j://localhost:7687", auth=("neo4j", "P@ssw0rd")):
        # Initializing connection details
        self.uri = uri
        self.auth = auth

    def fetch_node_by_id(self, node_id: str):
        with GraphDatabase.driver(self.uri, auth=self.auth) as driver:
            with driver.session() as session:
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
    
    def fetch_relationship_options(self, herb: str):
        options = []
        with GraphDatabase.driver(self.uri, auth=self.auth) as driver:
            with driver.session() as session:
                query = f"MATCH (n:Species {{name:'{herb}'}})-[r*]->(m) UNWIND r AS single_relationship RETURN DISTINCT type(single_relationship)"
                result = session.run(query)

                for record in result:
                    options.append(record["type(single_relationship)"])

        return sorted(options)

    def fetch_first_node(self, herb: str):
        nodes = []
        with GraphDatabase.driver(self.uri, auth=self.auth) as driver:
            with driver.session() as session:
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
                
    def fetch_nodes_and_edges(self, herb: str, selections: list):
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
        with GraphDatabase.driver(self.uri, auth=self.auth) as driver:
            with driver.session() as session:
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
        
        with GraphDatabase.driver(self.uri, auth=self.auth) as driver:
            with driver.session() as session:
                query = "MATCH (n:Species) RETURN n.name"
                result = session.run(query)

                for record in result:
                    species_names.append(record["n.name"])

        return species_names


neo4j_graph = Neo4jGraph()


species_names = neo4j_graph.get_species_names()

# ---------------------------------------------------------------------------- #

if hasattr(st.session_state, "counter"):
    st.session_state.counter += 1
else:
    st.session_state.counter = 1




herb = st.selectbox(label="Species name", options=species_names, index=0, key="herb")
options = neo4j_graph.fetch_relationship_options(herb=herb)
matching_keys = [key for key, value in mapping_relationship.items() if value in options]
selections = st.pills(label="Directions", options=matching_keys, selection_mode="multi", key="selections")
selections = [mapping_relationship[key] for key in selections]
c1, c2 = st.columns([5,5], gap='small')
vals = False
with c1:
    if st.session_state.xyz:
        node_id = st.session_state.xyz['data']['target_id'].replace('n','')
        st.write(neo4j_graph.fetch_node_by_id(node_id=node_id))
with c2:
    if selections:
        data = neo4j_graph.fetch_nodes_and_edges(herb=herb, selections=selections)
    else:
        data = neo4j_graph.fetch_first_node(herb=herb)

    vals = st_link_analysis(
        data, layout, node_styles, edge_styles, events=events, key="xyz"
    )


