import json
import streamlit as st
from st_link_analysis import st_link_analysis
from config import node_styles, edge_styles, events, mapping_relationship
from streamlit_extras.stylable_container import stylable_container
from utils import Neo4jGraph, on_change_selectbox, insert_space_between_caps
from dotenv import load_dotenv
import os

load_dotenv()

st.set_page_config(layout="wide")

if 'xyz' not in st.session_state:
    st.session_state.xyz = None
if 'herb_select' not in st.session_state:
    st.session_state.herb_select = 'Aloe vera'

@st.cache_data
def load_css(file_name):
    with open(file_name) as f:
        st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

load_css("./styles/style.css")

# if os.getenv("DOCKER_ENV"):
#     neo4j_host = "neo4j"
# else:
#     neo4j_host = "localhost"

neo4j_graph = Neo4jGraph(
    uri=f"neo4j://localhost:7687", 
    auth=(os.environ['USER_NEO4J'], os.environ['PASSWORD_NEO4J']))

species_names = neo4j_graph.fetch_species_names()

if hasattr(st.session_state, "counter"):
    st.session_state.counter += 1
else:
    st.session_state.counter = 1

# --------------------------------- All herb --------------------------------- #
options_name = neo4j_graph.fetch_all_herb_names()
options_name_list = list(options_name.keys())

# ---------------------- Mapping herb with species_names --------------------- #
filtered_options_name_list = [value for values in options_name.values() for value in values]
filtered_options_name_list = filtered_options_name_list + options_name_list

# ---------------------------------------------------------------------------- #
#                                    Header                                    #
# ---------------------------------------------------------------------------- #
html_css = f"""
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<nav class="navbar fixed-top" style="width: 100%;height: 50px;background-color: #010101;box-shadow: 0 4px 8px rgb(0 0 0 / 30%);">
    <div style="text-align: center;width: 100%;position: absolute;display: inline-flex;justify-content: center;align-items: center;">
        <span style="color:#edc55c;font-weight:700;font-size:20px;">
            Website Name
        </span>
    </div>
</nav>
"""
st.markdown(html_css, unsafe_allow_html=True)

# ---------------------------------------------------------------------------- #
#                                     Body                                     #
# ---------------------------------------------------------------------------- #

# if st.session_state.herb_select is None:
#     herb_select = sorted(filtered_options_name_list)[0]
# else:
herb_select = st.session_state.herb_select

herb = None
for k, v in options_name.items():
    if herb_select in v:
        herb = k
        break

if herb is None:
    herb = herb_select  

# --------------------------- Fetching description --------------------------- #
description = neo4j_graph.fetch_descriptions(herb=herb)

a2, gap_column, a3, a4 = st.columns([6, 0.2, 4, 0.2])

# ---------------------------- Display Herb image ---------------------------- #
with a2:
    html_grid = f'''
    <style>
    .container {{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-auto-rows: 200px;
        grid-gap: 10px;
        grid-auto-flow: dense;
    }}
    .container img {{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
        transition: transform 0.5s ease, box-shadow 0.5s ease;
    }}
    .container img:hover {{
        transform: scale(1.1);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35);
    }}
    .horizontal {{
        grid-column: span 2;
    }}
    .vertical {{
        grid-row: span 2;
    }}
    .big {{
        grid-column: span 2;
        grid-row: span 2;
    }}
    </style>
    <div class="container">
        <div class="big">
            <img src="http://localhost:9000/images/{description['image'][0]}" alt="">
        </div>
        <div class="vertical">
            <img src="http://localhost:9000/images/{description['image'][1]}" alt="">
        </div>
        <div>
            <img src="http://localhost:9000/images/{description['image'][2]}" alt="">
        </div>
        <div class="horizontal">
            <img src="http://localhost:9000/images/{description['image'][3]}" alt="">
        </div>
        <div class="vertical">
            <img src="http://localhost:9000/images/{description['image'][4]}" alt="">
        </div>
        <div>
            <img src="http://localhost:9000/images/{description['image'][5]}" alt="">
        </div>
        <div class="horizontal">
            <img src="http://localhost:9000/images/{description['image'][5]}" alt="">
        </div>
        <div class="big">
            <img src="http://localhost:9000/images/{description['image'][5]}" alt="">
        </div>
        <div>
            <img src="http://localhost:9000/images/{description['image'][5]}" alt="">
        </div>
        <div class="vertical">
            <img src="http://localhost:9000/images/{description['image'][5]}" alt="">
        </div>
    </div>
    <p style="font-size: 13px;padding: 10px 20px;">Reference images by gdif</p>
    '''
    st.markdown(html_grid, unsafe_allow_html=True)

# ---------------------------- Display Information --------------------------- #
with a3:
    herb_select = st.selectbox(
        label="#",
        options=sorted(filtered_options_name_list),
        index=0,
        on_change=on_change_selectbox,
        label_visibility='collapsed',
        key='herb_select'
    )
        
    with st.container(height=1400, border=False):
        st.title(f"{herb}")

        # Display the description
        st.markdown(f"**Authored By:** {description['authored_by']}")
        st.markdown(f"**Updated By:** {description.get('updated_by', 'N/A')}")

        # Display common names
        st.markdown("**Common Names**")
        for common_name in description.get('common_names', []):
            st.markdown(f"- **Name:** {common_name['name']} **({common_name['language']})** <br> **Reference:** {common_name['reference']}", unsafe_allow_html=True)

        # Display local names
        st.markdown("**Local Names:**")
        for local_name in description.get('local_names', []):
            st.markdown(f"- **Name:** {local_name['name']} <br> **Reference:** {local_name['reference']}", unsafe_allow_html=True)

        # Display synonyms
        # st.markdown("**Synonyms:**")
        for synonym in description.get('synonyms', []):
            st.markdown(f"- **Name:** {synonym['name']}<br>**Protologue:** {synonym['protologue']} [Reference Link]({synonym['reference_link']})", unsafe_allow_html=True)


options = neo4j_graph.fetch_relationship_options(herb=herb)
summary = neo4j_graph.fetch_for_summary(herb=herb)

# ------------------- Mathing key & value & filter options ------------------- #
matching_keys = [key for key, value in mapping_relationship.items() if value in options and value not in ['HAS_LOCAL_NAME', 'HAS_COMMON_NAME', 'AUTHORED_BY', 'UPDATED_BY', 'CONTAINS', 'HAS_PART_USE', 'HAS_SYNONYM']]

relationship_total = neo4j_graph.fetch_relationships_total(herb=herb)

updated_matching_keys = []
for matching_key in matching_keys:
    if matching_key in relationship_total:
        updated_matching_keys.append(f"{matching_key} **:red[({relationship_total[matching_key]})]**")
    else:
        updated_matching_keys.append(matching_key)

st.markdown("<br><br>", unsafe_allow_html=True)
st.divider()
st.markdown("<br>", unsafe_allow_html=True)

# ---------------------------------- Bottom ---------------------------------- #
bottom_1, bottom_2 = st.columns([5,5], gap='small')
with bottom_1:

    # --------------------------- Directions select box -------------------------- #
    selections = st.pills(label="Directions", default=None, options=updated_matching_keys, selection_mode="multi", key="selections")
    
    # ------------------------------- mapping label ------------------------------ #
    selections = [mapping_relationship[key.rsplit(' ',1)[0]] for key in selections]

with bottom_2:

    # --------------------------- Layout select box -------------------------- #
    layout_options = ['cose', 'random', 'grid', 'circle', 'concentric', 'breadthfirst', 'cola', 'fcose']
    selection_layout = st.pills(label="Layout", default='cose', options=sorted(layout_options), selection_mode="single", key="selection_layout")


with stylable_container(
    key="container_with_border",
    css_styles=[
        """
        div[class="stColumn st-emotion-cache-1yycg8b e1f1d6gn3"] {
            border-right: 1px solid #000000;
            padding-right: 20px;
        }
        """
    ]
):
    c1, c2 = st.columns([4,6], gap='small')
    vals = False
    with c1:
        listtabs = ["Summary", "Graph"]

        # tab1, tab2 = st.tabs([s.center(16,"\u2001") for s in listtabs])
        with stylable_container(
            key="tabs-container",
            css_styles=[
                """
                button[data-baseweb="tab"] {
                    font-size: 24px;
                    margin: 0;
                    width: 100%;
                }
                """
            ]
        ):
            tab1, tab2 = st.tabs([s for s in listtabs])
            with tab1:
                with st.container(height=450, border=False):
                    st.title(f"{herb}")

                    # st.write('All node for summary **seting index[0]:')
                    # st.write(summary[0])
                    st.write('Summary')

            with tab2:
                if st.session_state.xyz:
                    node_id = st.session_state.xyz['data']['target_id']
                    node = neo4j_graph.fetch_node_by_id(node_id=node_id)
                    node_filter = {}
                    for key, value in node['data'].items():
                        if key != 'content' and value:
                            if isinstance(value, str) and value.strip():
                                node_filter[key] = value.strip()
                            elif isinstance(value, list) and any(value):
                                node_filter[key] = [item.strip() for item in value if isinstance(item, str) and item.strip()]
                    
                    
                    name_node = insert_space_between_caps(node_filter['label'])

                    # ----------------------------- Label node color ----------------------------- #
                    if node_filter["label"] == 'Species':
                        color_css = "#58937f"
                    elif node_filter["label"] == 'ClinicalStudies':
                        color_css = "#55c5e3"
                    elif node_filter["label"] == 'PharmacologicalStudies':
                        color_css = "#ffbe5c"
                    elif node_filter["label"] == 'Part':
                        color_css = "#f76565"
                    elif node_filter["label"] == 'Drug':
                        color_css = "#90cb91"
                    elif node_filter["label"] == 'Chemical':
                        color_css = "#eeb6c9"

                    # -------------------------------- Label node -------------------------------- #
                    with stylable_container(
                        key="container_with_border",
                        css_styles=[f"""
                            div[data-testid="stVerticalBlock"]:has(> div.element-container > div.stMarkdown > div[data-testid="stMarkdownContainer"] > p > span.container_with_border) [data-testid="stMarkdownContainer"] {{
                                border-radius: 0.5rem;
                                padding: 0.5rem;
                                text-align: center;
                                background-color: {color_css};
                            }}
                            """,
                            """
                            .st-emotion-cache-12dxf02 {
                                width: auto;
                            }
                            """,
                            """
                            div.stMarkdown {
                                width: auto !important;
                            }
                            """,
                            """
                            div[data-testid="stVerticalBlock"]:has(> div.element-container > div.stMarkdown > div[data-testid="stMarkdownContainer"] > p > span.container_with_border) [data-testid="stMarkdownContainer"] p {
                                color: white;
                                font-size: 1.2rem;
                            }
                            """
                        ]
                    ):
                        st.markdown(f"{name_node}", unsafe_allow_html=True)


                    # -------------------------------- Graph desc -------------------------------- #
                    if node_filter["label"] == 'Species':
                        if 'name' in node_filter and node_filter['name']:
                            st.markdown(f"Species: {node_filter['name'].capitalize()}")
                        if 'name_ref' in node_filter and node_filter['name_ref']:
                            st.markdown(f"Reference: {node_filter['name_ref']}")
                        if 'link_ref' in node_filter and node_filter['link_ref']:
                            st.markdown(f"Link reference: {node_filter['link_ref']}")

                    elif node_filter["label"] == 'Chemical':
                        if 'name' in node_filter and node_filter['name']:
                            st.markdown(f"Chemical: {node_filter['name']}")
                        if 'response_count' in node_filter and node_filter['response_count']:
                            st.markdown(f"Response count: {node_filter['response_count']}")
                        if 'high_parts_per_million' in node_filter and node_filter['high_parts_per_million']:
                            st.markdown(f"High parts per million: {node_filter['high_parts_per_million']}")
                        if 'low_parts_per_million' in node_filter and node_filter['low_parts_per_million']:
                            st.markdown(f"Low parts per million: {node_filter['low_parts_per_million']}")
                        if 'standard_deviation' in node_filter and node_filter['standard_deviation']:
                            st.markdown(f"Standard deviation: {node_filter['standard_deviation']}")
                        if 'part_use' in node_filter and node_filter['part_use']:
                            st.markdown(f"Part use: {node_filter['part_use'].capitalize()}")
                        if 'name_ref' in node_filter and node_filter['name_ref']:
                            st.markdown(f"Reference: {node_filter['name_ref']}")

                    elif node_filter["label"] == 'PharmacologicalStudies':
                        if 'name' in node_filter and node_filter['name']:
                            st.markdown(f"Clinical Studies: {node_filter['name'].capitalize()}")
                        if 'name_ref' in node_filter and node_filter['name_ref']:
                            st.write("Reference:")
                            for ref in node_filter['name_ref']:
                                st.markdown(f"- {ref}")

                    elif node_filter["label"] == 'Drug':
                        if 'name' in node_filter and node_filter['name']:
                            st.markdown(f"Drug: {node_filter['name'].capitalize()}")
                        if 'part' in node_filter and node_filter['part']:
                            st.markdown(f"Part use: {node_filter['part'].capitalize()}")
                        if 'name_ref' in node_filter and node_filter['name_ref']:
                            st.markdown(f"Reference: {node_filter['name_ref']}")
                        if 'link_ref' in node_filter and node_filter['link_ref']:
                            st.markdown(f"Link reference: {node_filter['link_ref']}")

                    elif node_filter["label"] == 'Part':
                        if 'name' in node_filter and node_filter['name']:
                            st.markdown(f"Part: {node_filter['name'].capitalize()}")

                    elif node_filter["label"] == 'ClinicalStudies':
                        if 'name' in node_filter and node_filter['name']:
                            st.markdown(f"Clinical Studies: {node_filter['name'].capitalize()}")
                        if 'name_ref' in node_filter and node_filter['name_ref']:
                            st.write("Reference:")
                            for ref in node_filter['name_ref']:
                                st.markdown(f"- {ref}")


                else:
                    with stylable_container(
                        key="Please_select_a_node",
                        css_styles=[
                            """
                            div[data-testid="stVerticalBlockBorderWrapper"] {
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                text-align: center;
                            }
                            """,
                            """
                            div[data-testid="stHeadingWithActionElements"] {
                                padding-bottom: 1rem;
                            }
                            """,
                            """
                            h3 {
                                opacity: 40%;
                            }
                            """
                        ]
                    ):
                        with st.container(height=350, border=False):
                            st.markdown('<h3>Please select a node', unsafe_allow_html=True)

    with c2:
        if selections:
            data = neo4j_graph.fetch_nodes_and_edges(herb=herb, selections=selections)
        else:
            data = neo4j_graph.fetch_first_node(herb=herb)
        vals = st_link_analysis(
            data, selection_layout, node_styles, edge_styles, events=events, key="xyz"
        )

