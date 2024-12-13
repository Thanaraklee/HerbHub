import streamlit as st
from streamlit_extras.stylable_container import stylable_container
from config import mapping_information, mapping_relationship, layout_options, node_styles, edge_styles, events, mapping_clinical_pharma, part_mapping
from src import Neo4jGraph, on_change_selectbox, insert_space_between_caps, load_css, encode_image_to_data_url_png, encode_image_to_data_url_svg, map_effects_to_categories, summarize_text_pharma, summarize_text_clinical
from st_link_analysis import st_link_analysis
import os
import pandas as pd
from streamlit_echarts import st_echarts
import streamlit.components.v1 as components
import time
from dotenv import load_dotenv

load_dotenv()

# ---------------------------- set innitial state ---------------------------- #
st.set_page_config(
    layout="wide",
    initial_sidebar_state="collapsed"
)

api_keys = [
    os.environ['OPENAI_API_1'], 
    os.environ['OPENAI_API_2'], 
    os.environ['OPENAI_API_3'],
    os.environ['OPENAI_API_4'],
    os.environ['OPENAI_API_5'],
]

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

# ----------------------------- set session state ---------------------------- #
if 'xyz' not in st.session_state:
    st.session_state.xyz = {}
if 'herb_select' not in st.session_state:
    st.session_state.herb_select = sorted(filtered_options_name_list)[0]
if 'summarize_success' not in st.session_state:
    st.session_state.summarize_success = False

# ---------------------------------------------------------------------------- #

# ------------------------------ herb selection ------------------------------ #
herb_select = st.session_state.herb_select

herb = None
for k, v in options_name.items():
    if herb_select in v:
        herb = k
        break

if herb is None:
    herb = herb_select  


# ---------------------------------------------------------------------------- #
#                     Preparing data for streamlit by Neo4j                    #
# ---------------------------------------------------------------------------- #

# ---------------------------- Fetching First node --------------------------- #
data_first_node = neo4j_graph.fetch_first_node(herb=herb)
id_first_node = data_first_node['nodes'][0]['data']['id']

# --------------------------- Fetching description --------------------------- #
description = neo4j_graph.fetch_descriptions(herb=herb)
options_information = [mapping_information[k] for k in description.keys() if k in mapping_information.keys() and (description[k] is not None and description[k] != '' and description[k] != [])]
# ---------------------------------------------------------------------------- #

# ----------------------- Fetching clinical and pharma ----------------------- #
clinical_and_pharma = neo4j_graph.fetch_for_clinical_and_pharma(herb=herb)
# ---------------------------------------------------------------------------- #

# -------------------------- Fetching relationship -------------------------- #
options = neo4j_graph.fetch_relationship_options(herb=herb)

# ------------------- Mathing key & value & filter options ------------------- #
matching_keys = [key for key, value in mapping_relationship.items() if value in options and value not in ['HAS_LOCAL_NAME', 'HAS_COMMON_NAME', 'AUTHORED_BY', 'UPDATED_BY', 'CONTAINS', 'HAS_PART_USE', 'HAS_SYNONYM']]

relationship_total = neo4j_graph.fetch_relationships_total(herb=herb)

updated_matching_keys = []
for matching_key in matching_keys:
    if matching_key in relationship_total:
        updated_matching_keys.append(f"{matching_key} **:red[({relationship_total[matching_key]})]**")
    else:
        updated_matching_keys.append(matching_key)

# ---------------------------------------------------------------------------- #


# --------------------------------- Load CSS --------------------------------- #
load_css("./styles/style.css") # -- Remove Header and Pedding
load_css("./styles/font.css")
# ---------------------------------------------------------------------------- #




# ---------------------------------------------------------------------------- #
#                                    Header                                    #
# ---------------------------------------------------------------------------- #

with stylable_container(
    key="banner",
    css_styles=[f'''
    {{
        background-color: #2F6050;
        padding: 2rem 0rem 53px;
        background-image: url("{encode_image_to_data_url_svg('./images/bg_cover.svg')}");
        background-size: cover;
        
    }}
    ''']
):
    banner_1, banner_2, banner_3 = st.columns([3, 4, 3])
    with banner_2:
        # ---------------------------------------------------------------------------- #
        #                                     Title                                    #
        # ---------------------------------------------------------------------------- #
        st.markdown(f"<img src=\"{encode_image_to_data_url_svg('./images/title.svg')}\" alt=\"Title Image\" style=\"max-width: 100%; height: auto;\">", unsafe_allow_html=True)
        # ---------------------------------------------------------------------------- #
        #                                  Search box                                  #
        # ---------------------------------------------------------------------------- #
        with stylable_container(
            key="search_box",
            css_styles=[
            """
            div {
                border-radius: 50px;
            }
            """,
            """
            div[data-testid="stSelectbox"] > div > div > div:nth-child(1) {
                justify-content: center;
                padding-left: 40px;
            }
            """,
            """
            div[data-testid="stSelectbox"] {
                width: 350px !important;
                height: 48px;
            }
            """,
            """
            div[data-testid="stElementContainer"] {
                display: flex;
                border-radius: 50px;
                justify-content: center;
                padding-top: 10px;
            }
            """]
        ):
            herb_select = st.selectbox(
                label="#",
                options=sorted(filtered_options_name_list),
                index=0,
                on_change=on_change_selectbox,
                label_visibility='collapsed',
                placeholder='Search',
                key='herb_select'
            )

        # ---------------------------------------------------------------------------- #
        #                                  Select Title                                 #
        # ---------------------------------------------------------------------------- #

        with stylable_container(
            key="buttont_information",
            css_styles=[
            """
            {
                padding-top: 25px;
            }
            """,
            """
            a:hover {    
                color: white !important;
                background-color: rgb(49 175 77) !important;
            }
            """,
            """
            p {    
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            """]
        ):
            select_page_gap1, select_page_1, select_page_2, select_page_gap2 = st.columns([1,3,3,1], gap='small')
                
            with select_page_1:
                st.markdown('''
                            <a href="#herb-name" 
                            style="
                                text-decoration: none;
                                color: #51390D;
                                font-size: 16px;
                                font-weight: 700;
                                display: flex;
                                background-color: white;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                border-radius: 42px;
                                width: 200px;
                                height: 35px;
                            ">
                                Information
                            </a>
                            ''', unsafe_allow_html=True)

            with select_page_2:
                st.markdown('''
                            <a href="#analysis" 
                            style="
                                text-decoration: none;
                                color: #51390D;
                                font-size: 16px;
                                font-weight: 700;
                                display: flex;
                                background-color: white;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                border-radius: 42px;
                                width: 200px;
                                height: 35px;
                            ">
                                Graph Summarize
                            </a>
                            ''', unsafe_allow_html=True)

# ---------------------------------------------------------------------------- #


st.markdown('<br><br>', unsafe_allow_html=True)


# ---------------------------------------------------------------------------- #
#                               Information Body                               #
# ---------------------------------------------------------------------------- #
with stylable_container(
    key="body_information",
    css_styles=[
        '''
        {
            text-align: center;
        }
        '''
    ]
):
    information_1, information_2, information_3 = st.columns([1,8,1])
    with information_2:
        # ---------------------------------------------------------------------------- #
        #                               Title Information                              #
        # ---------------------------------------------------------------------------- #
        st.markdown('''
                    <h1 style="font-weight: 700;font-size: 40px;padding-bottom: 35px;padding-top: 55px;">
                        Herb Name
                    </h1>''', unsafe_allow_html=True)

        # ---------------------------------------------------------------------------- #
        #                                     Body                                     #
        # ---------------------------------------------------------------------------- #

        with st.container(height=470, border=True):
            with stylable_container(
                key='body_information_image',
                css_styles=[
                """
                div:nth-child(2) > div:nth-child(1) > div > div > div[data-testid="stVerticalBlock"] {
                    gap: 0rem !important;
                }
                """]
            ):
                body_information_1, body_information_2 = st.columns([3,7])
                with body_information_1:
                    html_grid = f""" 
                    <html>
                    <head>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                    <style>
                    .mySlides {{
                        display: none;
                    }}
                    .img {{
                        height: 421px; 
                        width: 100%; 
                        object-fit: cover; 
                        border-radius: 7px;
                    }}
                    .w3-button {{
                        border-radius: 100rem;
                        margin: 0px 5px 0px 5px;
                        background-color: #00000091 !important;
                    }}
                    .w3-button:hover {{
                        background-color: #ffffffb5 !important;
                    }}
                    </style>
                    </head>
                    <body>
                    <div class="w3-content w3-display-container">
                        <img class="mySlides img" src="http://localhost:9000/images/{description['image'][0]}">
                        <img class="mySlides img" src="http://localhost:9000/images/{description['image'][1]}">
                        <img class="mySlides img" src="http://localhost:9000/images/{description['image'][2]}">
                        <img class="mySlides img" src="http://localhost:9000/images/{description['image'][3]}">
                        <img class="mySlides img" src="http://localhost:9000/images/{description['image'][4]}">
                        <img class="mySlides img" src="http://localhost:9000/images/{description['image'][5]}">
                        <img class="mySlides img" src="http://localhost:9000/images/{description['image'][6]}">
                        <img class="mySlides img" src="http://localhost:9000/images/{description['image'][7]}">
                        <img class="mySlides img" src="http://localhost:9000/images/{description['image'][8]}">
                        <img class="mySlides img" src="http://localhost:9000/images/{description['image'][9]}">

                        <button class="w3-button w3-black w3-display-left" onclick="plusDivs(-1)">
                            &#10094;
                        </button>
                        <button class="w3-button w3-black w3-display-right" onclick="plusDivs(1)">
                            &#10095;
                        </button>
                    </div>

                    <script>
                    var slideIndex = 1;
                    showDivs(slideIndex);

                    function plusDivs(n) {{
                        showDivs(slideIndex += n);
                    }}

                    function showDivs(n) {{
                        var i;
                        var x = document.getElementsByClassName("mySlides");
                        if (n > x.length) {{slideIndex = 1}}
                        if (n < 1) {{slideIndex = x.length}}
                        for (i = 0; i < x.length; i++) {{
                            x[i].style.display = "none";  
                        }}
                        x[slideIndex-1].style.display = "block";  
                    }}
                    </script>
                    </body>
                    </html>
                    """
                    components.html(html_grid, height=421)
                    st.markdown(f'<p style="font-size: 10px;display: flex;opacity: 60%;margin-bottom: 10px;">Reference images by gdif</p>', unsafe_allow_html=True)
                
                with body_information_2:
                    st.markdown(f'<p style="font-size: 20px; font-weight: 500; text-align: left;margin-bottom: 8px !important;">{herb} (Scientific Name)</p>', unsafe_allow_html=True)
                    st.markdown(f'<p style="font-size: 16px; font-weight: 400; color: #777777; text-align: left;margin-bottom: 19px !important;">Essential facts about the herb\'s identity and usage.</p>', unsafe_allow_html=True)

                    with stylable_container(
                        key="selectbox_information",
                        css_styles=[
                        """
                        button > div[data-testid="stMarkdownContainer"] > p {
                            font-size: 12px !important;
                            font-weight: 400 !important;
                        }
                        """,
                        """
                        button {
                            border-radius: 7px !important;
                            padding-top: 10px !important;
                            padding-bottom: 10px !important;
                        }
                        """]
                    ):
                        select_information = st.pills(label="#", default=options_information[0], options=sorted(options_information), selection_mode="single", key="selection_information", label_visibility='collapsed')
                        if select_information:
                            reversed_select_information = list(mapping_information.keys())[list(mapping_information.values()).index(select_information)] # --Reverse the dictionary--
                            with stylable_container(
                                key="information_body_2",
                                css_styles=[
                                """
                                div[data-testid="stVerticalBlockBorderWrapper"] {
                                    text-align: left;
                                }
                                """,
                                """
                                div[data-testid="stVerticalBlockBorderWrapper"] {
                                    border-radius: 7px;
                                }
                                """]
                            ):
                                with st.container(height=284,border=True):
                                    st.markdown(f"<p style='font-size: 12px; font-weight: 700; color: #999999;'>{select_information}</p>", unsafe_allow_html=True)
                                    if select_information == 'Authored':
                                        st.markdown(f"<p style='font-size: 20px; font-weight: 700;'>{description[reversed_select_information]}</p>", unsafe_allow_html=True)
                                    elif select_information == 'Updated':
                                        st.markdown(f"<p style='font-size: 20px; font-weight: 700;'>{description[reversed_select_information]}</p>", unsafe_allow_html=True)
                                    elif select_information == 'Local Name':
                                        for local_name in description[reversed_select_information]:
                                            st.markdown(f"- **Name:** {local_name['name']} <br> **Reference:** {local_name['reference']}", unsafe_allow_html=True)
                                    elif select_information == 'Common Name':
                                        for common_name in description[reversed_select_information]:
                                            st.markdown(f"- **Name:** {common_name['name']} **({common_name['language']})** <br> **Reference:** {common_name['reference']}", unsafe_allow_html=True)
                                    elif select_information == 'Synonyms':
                                        for synonym in description[reversed_select_information]:
                                            st.markdown(f"- **Name:** {synonym['name']}<br>**Protologue:** {synonym['protologue']} [Reference Link]({synonym['reference_link']})", unsafe_allow_html=True)
                        else:
                            with stylable_container(
                                key="please_select_a_tab",
                                css_styles=["""
                                {
                                    height: 100%;
                                }
                                """]
                            ):
                                st.markdown(
                                    f'''
                                    <div style="display: flex; justify-content: center; align-items: center; height: 282px; border: 2px solid rgba(0, 0, 0, 0.1); border-radius: 6px;">
                                        <p style="font-size: 22px; font-weight: 700; color: #999999; text-align: center;">Please select a tab</p>
                                    </div>
                                    ''',
                                    unsafe_allow_html=True,
                                )

# ---------------------------------------------------------------------------- #

st.markdown("<br><br><br><br><br>", unsafe_allow_html=True)

# ---------------------------------------------------------------------------- #
#                            Header Graph Summarize                            #
# ---------------------------------------------------------------------------- #
with stylable_container(
    key="body_summarize",
    css_styles=[f'''
    {{
        text-align: center;
        background-color: #FEFDF9;
        font-size: 24px;
        padding: 2rem 0rem 3rem;
        background-image: url("{encode_image_to_data_url_svg('./images/bg_graph_summarize.svg')}");
        background-size: cover;
        background-repeat: no-repeat;
    }}
    ''']
):
    summarize_1, summarize_2, summarize_3 = st.columns([1,8,1])
    with summarize_2:
        # ---------------------------------------------------------------------------- #
        #                             Title Graph Summarize                            #
        # ---------------------------------------------------------------------------- #
        st.markdown('<h1 style="font-weight: 700;font-size: 64px;margin: 90px 0px 40px 0px;color: #2F6050;">Analysis</h1>', unsafe_allow_html=True)
    
    # ---------------------------------------------------------------------------- #
    #                                Graph optional                                #
    # ---------------------------------------------------------------------------- #
    with stylable_container(
        key="graph_option_css",
        css_styles=[
        """
        label > div > p {
            font-size: 14px;
            font-weight: 500;
            color: #777777;
        }
        """,
        """
        button {
            height: 36px !important;
            padding: 20px 15px 20px 15px !important;
        }
        """,
        """
        button > p {
            font-size: 14px;
            font-weight: 400;
        }
        """]
    ):
        graph_option_gap1, graph_option_1, graph_option_gap2, graph_option_2, graph_option_gap3 = st.columns([1.3,4,0.5,4,1.3])
        with graph_option_1:
            selections = st.pills(label="Directions", default=None, options=updated_matching_keys, selection_mode="multi", key="selections")
            selections = [mapping_relationship[key.rsplit(' ',1)[0]] for key in selections]
        with graph_option_2:
            selection_layout = st.pills(label="Layout", default='cose', options=sorted(layout_options), selection_mode="single", key="selection_layout")
# ---------------------------------------------------------------------------- #

with stylable_container(
    key="body_summarize_container",
    css_styles=[
        """
        {
            background-color: #FEFDF9;
        }
        """
    ]
):
    st.markdown("<br><br>", unsafe_allow_html=True)

    # ---------------------------------------------------------------------------- #
    #                             Body Graph Summarize                             #
    # ---------------------------------------------------------------------------- #

    with stylable_container(
        key="overflow_hidden_sum",
        css_styles=[
            """
            div[data-testid="stVerticalBlockBorderWrapper"] {
                overflow: visible;
            }
            """,
            """
            div[data-testid="stVerticalBlock"] {
                gap: 0rem !important;
            }
            """
        ]
    ):
        body_summarize_gap1, body_summarize_1, body_summarize_2, body_summarize_gap3 = st.columns([1,7,8,1])

        with body_summarize_1:
            with st.container(height=500, border=True, key="body_summarize_1_container"):
                st.markdown(f'<h1 style="font-weight: 500;font-size: 20px;color: #000000;padding-top: 0px;padding-bottom: 30px;">{herb} (Scientific Name)</h1>', unsafe_allow_html=True)
                if st.session_state.xyz:
                    node_id = st.session_state.xyz['data']['target_id']
                else:
                    node_id = id_first_node
                node = neo4j_graph.fetch_node_by_id(node_id=node_id)
                node_filter = {}
                for key, value in node['data'].items():
                    if key != 'content' and value:
                        if isinstance(value, str) and value.strip():
                            node_filter[key] = value.strip()
                        elif isinstance(value, list) and any(value):
                            node_filter[key] = [item.strip() for item in value if isinstance(item, str) and item.strip()]
                        else:
                            node_filter[key] = value

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

                name_node = insert_space_between_caps(node_filter['label'])

                import numpy as np
                _LOREM_IPSUM = """
                Lorem ipsum dolor sit amet, **consectetur adipiscing** elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                """


                def stream_data():
                    for word in _LOREM_IPSUM.split(" "):
                        yield word + " "
                        time.sleep(0.02)

                    yield pd.DataFrame(
                        np.random.randn(5, 10),
                        columns=["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
                    )

                    for word in _LOREM_IPSUM.split(" "):
                        yield word + " "
                        time.sleep(0.02)
                if node_filter['label'] in ['PharmacologicalStudies','ClinicalStudies']:
                    with stylable_container(
                        key="summarize_ai",
                        css_styles=[
                            """
                            div[data-testid="stPopover"] {
                                position: absolute;
                                z-index: 1;
                                top: 370px;
                                left: 500px;
                            }
                            """,
                            f"""
                            button[data-testid="stPopoverButton"] {{
                                height: 48px;
                                width: 48px;
                                border-radius: 35px;
                                display: flex;
                                flex-direction: column;
                                background-color: #2F6050;
                                background-image: url("{encode_image_to_data_url_svg('./images/icon_button_sum.svg')}");
                                background-size: contain;
                                background-repeat: no-repeat;
                                box-shadow: 2px 3px 10px rgb(0 0 0 / 40%);
                            }}
                            """,
                            """
                            svg {
                                display: none;
                            }
                            """
                            """,
                            span {
                                margin: 0 !important;
                            }
                            """
                        ]
                    ):
                        with st.popover('#'):
                            if st.button("Summary with AI", key="summarize_with_ai", use_container_width=True):
                                node_id = st.session_state.xyz['data']['target_id']
                                with st.spinner('Processing... 🚀'):
                                    try:
                                        content_law = neo4j_graph.fetch_for_summary(node_id=node_id)
                                        if node_filter['label'] == 'ClinicalStudies':
                                            content_summary = summarize_text_clinical(content_law['content'], api_keys)
                                            result_summary = f"**Clinical Studies:** {content_law['topic']} \n\n **Summary:**\n\n{content_summary}"
                                        elif node_filter['label'] == 'PharmacologicalStudies':
                                            content_summary = summarize_text_pharma(content_law['content'], api_keys)
                                            result_summary = f"**Pharmacological Studies:** {content_law['topic']} \n\n **Summary:**\n\n{content_summary}"
                                    except Exception as e:
                                        st.write('Please try again later. 😢')
                                if result_summary:
                                    st.markdown(result_summary, unsafe_allow_html=True)
                                    st.session_state.summarize_content = result_summary

                                    st.session_state.summarize_success = True
                            else:
                                if st.session_state.summarize_success:
                                    st.write(st.session_state.summarize_content)



                st.markdown(
                    f"""
                    <style>
                    .outer {{
                        border: 5px solid {color_css};
                        border-radius: 7px;
                        background-color: {color_css};
                        margin-bottom: 45px;
                    }}

                    .inner {{
                        border-radius: 4px;
                        background: #FEFDF9;
                        margin: 0;
                        padding: 0.5rem;
                        text-align: center;
                        font-weight: 500;
                        font-size: 20px;
                    }}
                    </style>
                    <div class="outer">
                        <p class="inner">
                        {name_node}
                        </p>
                    </div>
                    """,
                    unsafe_allow_html=True
                )
                with stylable_container(
                    key="container_graph_detail",
                    css_styles=[
                        """
                        div[data-testid="stVerticalBlockBorderWrapper"] {
                            padding: 15px 20px 15px 20px;
                            overflow: auto;
                        }
                        """
                    ]
                ):
                    with st.container(height=360, border=True, key="body_summarize_1_container_2"):
                        st.markdown(f"<p style='font-size: 12px; font-weight: 700; color: #999999;'>{name_node}</p>", unsafe_allow_html=True)
                        # -------------------------------- Graph desc -------------------------------- #
                        if node_filter["label"] == 'Species':
                            if 'name' in node_filter and node_filter['name']:
                                st.markdown(f"**Species:** {node_filter['name'].capitalize()}")
                            if 'name_ref' in node_filter and node_filter['name_ref']:
                                st.markdown(f"**Reference:** {node_filter['name_ref']}")
                            if 'link_ref' in node_filter and node_filter['link_ref']:
                                st.markdown(f"**Link reference:** {node_filter['link_ref']}")

                        elif node_filter["label"] == 'Chemical':
                            if 'name' in node_filter and node_filter['name']:
                                st.markdown(f"**Chemical:** {node_filter['name']}")
                            if 'response_count' in node_filter and node_filter['response_count']:
                                st.markdown(f"**Response count:** {node_filter['response_count']}")
                            if 'high_parts_per_million' in node_filter and node_filter['high_parts_per_million']:
                                st.markdown(f"**High parts per million:** {node_filter['high_parts_per_million']}")
                            if 'low_parts_per_million' in node_filter and node_filter['low_parts_per_million']:
                                st.markdown(f"**Low parts per million:** {node_filter['low_parts_per_million']}")
                            if 'standard_deviation' in node_filter and node_filter['standard_deviation']:
                                st.markdown(f"**Standard deviation:** {node_filter['standard_deviation']}")
                            if 'part_use' in node_filter and node_filter['part_use']:
                                st.markdown(f"**Part use:** {node_filter['part_use'].capitalize()}")
                            if 'name_ref' in node_filter and node_filter['name_ref']:
                                st.markdown(f"**Reference:** {node_filter['name_ref']}")

                        elif node_filter["label"] == 'PharmacologicalStudies':
                            if 'name' in node_filter and node_filter['name']:
                                st.markdown(f"**Pharmacological Studies:** {node_filter['name'].capitalize()}")
                            if 'name_ref' in node_filter and node_filter['name_ref']:
                                st.write("**Reference:**")
                                for ref in node_filter['name_ref']:
                                    st.markdown(f"- {ref}")

                        elif node_filter["label"] == 'Drug':
                            if 'name' in node_filter and node_filter['name']:
                                st.markdown(f"**Drug:** {node_filter['name'].capitalize()}")
                            if 'part' in node_filter and node_filter['part']:
                                st.markdown(f"**Part use:** {node_filter['part'].capitalize()}")
                            if 'name_ref' in node_filter and node_filter['name_ref']:
                                st.markdown(f"**Reference:** {node_filter['name_ref']}")
                            if 'link_ref' in node_filter and node_filter['link_ref']:
                                st.markdown(f"**Link reference:** {node_filter['link_ref']}")

                        elif node_filter["label"] == 'Part':
                            if 'name' in node_filter and node_filter['name']:
                                st.markdown(f"**Part:** {node_filter['name'].capitalize()}")

                        elif node_filter["label"] == 'ClinicalStudies':
                            if 'name' in node_filter and node_filter['name']:
                                st.markdown(f"**Clinical Studies:** {node_filter['name'].capitalize()}")
                            if 'name_ref' in node_filter and node_filter['name_ref']:
                                st.write("**Reference:**")
                                for ref in node_filter['name_ref']:
                                    st.markdown(f"- {ref}")


    with body_summarize_2:
        if selections:
            data_first_node = neo4j_graph.fetch_nodes_and_edges(herb=herb, selections=selections)
        vals = st_link_analysis(
            data_first_node, selection_layout, node_styles, edge_styles, events=events, key="xyz"
        )

    # ---------------------------------------------------------------------------- #

    body_stat_gap1, body_stat_1, body_stat_gap3 = st.columns([0.6,9,0.6])

    with body_stat_1:
        with stylable_container(
            key="body_stat_container",
            css_styles=[
                """
                div[data-testid="stVerticalBlockBorderWrapper"] {
                    background-color: #2F6050;
                    overflow: visible;
                }
                """
            ]
        ):
            with st.container(height=350, border=True, key='container_stat'):
                # ---------------------------------------------------------------------------- #
                #                                     Stat                                     #
                # ---------------------------------------------------------------------------- #
                st.markdown(f"""
                            <div>
                                <p style='color: white;font-size: 20px; font-weight: 500;padding-left: 5px;display: flex;'>
                                    Advanced Analysis of Herb Utilization
                                    <img src=\'{encode_image_to_data_url_svg('./images/test.svg')}\' style="height: 30px;padding-left: 5px;">
                                </p>
                            </div>
                            """, unsafe_allow_html=True)

                with stylable_container(
                    key="body_stat_container_barchart",
                    css_styles=[
                        """
                        div:nth-child(1) > div > div > div > div[data-testid="stElementContainer"] {
                            background-color: white !important;
                            border-radius: 10px !important;
                            height: 250px;
                        }
                        """,
                        """
                        div:nth-child(1) {
                            margin-left: 3px !important;
                            height: 250px !important;
                        }
                        """,
                        """
                        div:nth-child(2) {
                            margin-right: 10px !important;
                        }
                        """,
                        """
                        div:nth-child(2) > div > div > div > div[data-testid="stElementContainer"] {
                            background-color: white !important;
                            border-radius: 10px !important;
                            margin-right: 10px !important;
                            height: 250px;
                        }
                        """
                    ]
                ):
                    body_stat_1, body_stat_2 = st.columns([5,5], gap='medium')
                    with body_stat_1:
                        data_clinical_and_pharma = map_effects_to_categories(clinical_and_pharma, mapping_clinical_pharma)
                        categories = list(data_clinical_and_pharma.keys())
                        counts = [len(data_clinical_and_pharma[category]) for category in categories]

                        category_colors = {
                            "ผิวกาย": "#A1C6EA",  
                            "ผิวปาก": "#F4C6A1", 
                            "ผิวหน้า": "#F1D1D1", 
                            "เส้นผม": "#A8D5BA" 
                        }
                        df_clinical_and_pharma = pd.DataFrame({'Category': categories, 'Count': counts}).sort_values(by='Category', ascending=True)
                        category_data = df_clinical_and_pharma.set_index('Category')['Count'].to_dict()
                        if df_clinical_and_pharma['Count'].values.sum() > 0:
                            b_data = category_data.get('ผิวกาย', 0)
                            l_data = category_data.get('ผิวปาก', 0)
                            f_data = category_data.get('ผิวหน้า', 0)
                            m_data = category_data.get('เส้นผม', 0)
                            options = {
                                "tooltip": {"trigger": "item"},
                                "xAxis": {
                                    "type": "category",
                                    "data": ['ผิวกาย', 'ผิวปาก', 'ผิวหน้า', 'เส้นผม'],
                                },
                                "yAxis": {
                                    "type": "value",
                                },
                                "series": [
                                    {
                                        "data": [
                                            {"value": b_data, "itemStyle": {"color": "#A1C6EA"}},
                                            {"value": l_data, "itemStyle": {"color": "#F4C6A1"}},
                                            {"value": f_data, "itemStyle": {"color": "#F1D1D1"}},
                                            {"value": m_data, "itemStyle": {"color": "#A8D5BA"}},
                                        ],
                                        "type": "bar",
                                    }
                                ],
                            }
                            chart_clinical_and_pharma = st_echarts(
                                options=options,
                                height="250px",
                                key="stat_clinical_and_pharma",
                                events={"click": "function(params) { return params.name; }"}
                            )
                                    

                    with body_stat_2:
                        stat_drug = neo4j_graph.fetch_for_stat_drug(herb=herb, part_mapping=part_mapping)
                        if stat_drug['Part'][0]:
                            df_drug = pd.DataFrame(stat_drug)
                            top_parts = df_drug.nlargest(4, 'Count')

                            other_parts = df_drug.drop(top_parts.index)
                            others = pd.DataFrame({"Part": ["Other"], "Count": [other_parts['Count'].sum()]})

                            top_parts_sorted = top_parts.sort_values(by='Count', ascending=False)

                            pie_data = [{"name": row['Part'], "value": int(row['Count'])} for _, row in top_parts_sorted.iterrows()]

                            if others['Count'].values[0] > 0:
                                pie_data.append({
                                    "name": "Other", 
                                    "value": int(others['Count'].values[0]),
                                    "itemStyle": {"color": "#808080"}  # สีเทา
                                })

                            options = {
                                "title": {
                                    "text": "Drug",
                                    "left":'center',
                                    "top": 'center',
                                    "textStyle": {
                                        "fontSize": 20,
                                    }
                                },
                                "tooltip": {"trigger": "item"},
                                "legend": {"top": "center", "right": "5%", "orient": "vertical"},
                                "label": {"show": True, "position": "center"},
                                "series": [
                                    {
                                        "type": "pie",
                                        "radius": ["40%", "70%"],
                                        "avoidLabelOverlap": False,
                                        "selectedMode": 'single',
                                        "itemStyle": {
                                            "borderRadius": 0,
                                            # "borderColor": "#fff",
                                            "borderWidth": 2,
                                        },
                                        # "label": {"show": False, "position": "center"},
                                        "emphasis": {
                                            # "label": {"show": True, "fontSize": "20", "fontWeight": "bold"},
                                            "itemStyle": {
                                                "shadowBlur": 10,
                                                "shadowOffsetX": 0,
                                                "shadowColor": 'rgba(0, 0, 0, 0.5)'
                                            }
                                        },
                                        "labelLine": {"show": False},
                                        "data": pie_data,
                                    }
                                ],
                            }

                            chart_drug = st_echarts(
                                options=options, 
                                height="240px", 
                                key="stat_drug",
                                events={"click": "function(params) { return params.name; }"}
                            )

                # ---------------------------------------------------------------------------- #
    
    st.write(selections)
    st.write(chart_clinical_and_pharma)
    st.markdown("<br><br><br><br><br>", unsafe_allow_html=True)