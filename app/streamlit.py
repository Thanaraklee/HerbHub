import json
import streamlit as st
from st_link_analysis import st_link_analysis
from config import node_styles, edge_styles, events, layout, mapping_relationship
from streamlit_extras.stylable_container import stylable_container
from utils import Neo4jGraph

st.set_page_config(layout="wide")

if 'xyz' not in st.session_state:
    st.session_state.xyz = None

@st.cache_data
def load_css(file_name):
    with open(file_name) as f:
        st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

neo4j_graph = Neo4jGraph()

species_names = neo4j_graph.get_species_names()

if hasattr(st.session_state, "counter"):
    st.session_state.counter += 1
else:
    st.session_state.counter = 1


herb = st.selectbox(label="Species name", options=species_names, index=0, key="herb")
options = neo4j_graph.fetch_relationship_options(herb=herb)
summary = neo4j_graph.fetching_for_summary(herb=herb)

# ------------------- Mathing key & value & filter options ------------------- #
matching_keys = [key for key, value in mapping_relationship.items() if value in options and value not in ['HAS_LOCAL_NAME', 'HAS_COMMON_NAME', 'AUTHORED_BY', 'UPDATED_BY', 'CONTAINS', 'HAS_PART_USE', 'HAS_SYNONYM']]
# relationship_total = neo4j_graph.fetch_relationships_total(herb=herb)
# mapped_counts = {mapping_relationship.get(key, key): value for key, value in relationship_total.items()}
# st.write(mapped_counts)

c1, c2 = st.columns([4,6], gap='small')

# Aloe vera,Camellia sinensis,Cannabis sativa,Capsicum annuum,Carica papaya,Curcuma longa,Moringa oleifera,Musa paradisiaca,Phyllanthus emblica,Zingiber officinale

vals = False
with c1:
    selections = st.pills(label="Directions", default=None, options=matching_keys, selection_mode="multi", key="selections")
    selections = [mapping_relationship[key] for key in selections]
    st.markdown(f"## {herb}")
    st.write('All node for summary **seting index[0]:')
    st.write(summary[0])
with c2:
    if selections:
        data = neo4j_graph.fetch_nodes_and_edges(herb=herb, selections=selections)
    else:
        data = neo4j_graph.fetch_first_node(herb=herb)

    vals = st_link_analysis(
        data, layout, node_styles, edge_styles, events=events, key="xyz"
    )

start_comparing = st.button("Compare", key="start_comparing", use_container_width=True)
if start_comparing:
    st.markdown(f"#### Status:")
    st.write('node interaction:')
    if st.session_state.xyz:
        node_id = st.session_state.xyz['data']['target_id'].replace('n','')
        st.write(neo4j_graph.fetch_node_by_id(node_id=node_id))
