import streamlit as st
from streamlit_extras.stylable_container import stylable_container
from langchain.prompts import ChatPromptTemplate
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import PromptTemplate
import os
import json
from langchain_ollama.llms import OllamaLLM

@st.cache_data
def load_css(file_name):
    with open(file_name) as f:
        st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

def initialize_page():
    """Set up the Streamlit page configuration."""
    st.set_page_config(
        page_title="🧌HerbQA",
        page_icon="🧌",
        layout="wide",
        initial_sidebar_state="collapsed"
    )

def initialize_state():
    """Initialize session state variables."""
    if 'first_run' not in st.session_state:
        st.session_state.first_run = False
    if 'herb_search' not in st.session_state:
        st.session_state.herb_search = None
    if "messages" not in st.session_state.keys():
        st.session_state.messages = [{"role": "assistant", "content": "How may I assist you today?"}]
    # if "herb_search_local" not in st.session_state:
    #     st.session_state.herb_search_local = None
    # if "herb_search_species" not in st.session_state:
    #     st.session_state.herb_search_species = None 

def load_herb_data(data_folder='data/'):
    """Load herb data from JSON files."""
    herb_name_dict = {}
    herb_name_options = []

    for filename in os.listdir(data_folder):
        file_path = os.path.join(data_folder, filename)
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)['data']
        
        species_name = data['species_name']['species_name']
        herb_name_options_for_species = []

        # Common names in Thai and English
        herb_name_options_for_species.extend(
            extract_names(data['common_name_th']['common_name_th'])
        )
        herb_name_options_for_species.extend(
            extract_names(data['common_name_en']['common_name_en'])
        )

        # Local names
        for local_name in data['local_name']['local_name']:
            herb_name_options_for_species.extend(extract_names(local_name))

        herb_name_dict[species_name] = herb_name_options_for_species
        herb_name_options.extend(herb_name_options_for_species)

    return herb_name_dict, herb_name_options

def extract_names(name_string):
    """Split names by commas and return as a list."""
    if ',' in name_string:
        return [name.strip() for name in name_string.split(',')]
    return [name_string.strip()]

def species_name_from_keyword(keyword, herb_name_dict):
    """Find species name based on a keyword."""
    for k, v in herb_name_dict.items():
        if keyword in v:
            return k
        elif keyword in k:
            return k

def clear_chat_history():
    """Clear all chat history and reset input."""
    st.session_state.messages = [{"role": "assistant", "content": "How may I assist you today?"}]
    st.session_state.text_to_chat = ""

def generate_llama3_response(prompt_input, context_str):
    """Generate a response from the LLaMA model using Langchain."""
    template = """Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\n{context}\n\nQuestion: {question}\nHelpful Answer:"""
    prompt = ChatPromptTemplate.from_template(template)
    model = OllamaLLM(model="llama3.1:8b")
    chain = prompt | model
    response = chain.invoke({"question": prompt_input, "context": context_str})
    return response

def display_first_run(herb_name_options, herb_name_dict, radio_options):
    """Display the first run interface."""
    load_css('styles/style.css')
    l, c, r = st.columns([2, 6, 2])
    with c:
        with stylable_container(
            key="first_run_container",
            css_styles=[
                "{text-align: center;}",
                "h1 {font-size: 9rem;}"
            ]
        ):
            st.title(f'🧌HerbQA')
            first_radio = st.radio("**Choose your search method:**", label_visibility="collapsed",options=radio_options, key="search_method", horizontal=True)
            if first_radio == "Local name":
                st.selectbox(
                    label_visibility="collapsed",
                    label="#",
                    index=None,
                    options=herb_name_options,
                    placeholder="Select a herb",
                    key="herb_search_local",
                    on_change=set_first_run
                )
            elif first_radio == "Species name":
                st.selectbox(
                    label_visibility="collapsed",
                    label="#",
                    index=None,
                    options=list(herb_name_dict.keys()),
                    placeholder="Select a herb",
                    key="herb_search_species",
                    on_change=set_first_run
                )
            st.write('<br><br><br><br>', unsafe_allow_html=True)

def set_first_run():
    """Mark first run as complete."""
    st.session_state.first_run = True

def read_data(species_name: str):
    with open(f'data/{species_name.replace(" ", "_")}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)['data']
    return data

def information(herb: str, herb_name_dict: dict):
    st.title('Information')
    species_name = species_name_from_keyword(herb, herb_name_dict)
    data = read_data(species_name)
    st.markdown(f"Species name: {data['species_name']['species_name']}")
    st.markdown(f"Authorship: {data['species_name']['authorship']}")
    st.markdown(f"Updated by: {data['species_name']['updated_by']}")
    st.markdown(f"Name Reference.: {data['species_name']['name_ref']}")
    st.markdown(f"Link Reference.: {data['species_name']['link_ref']}")
    st.markdown('<hr>', unsafe_allow_html=True)
    st.markdown(f"Local name: ")
    for local_name in data['local_name']['local_name']:
        st.markdown(f"- {local_name}")
    st.markdown(f"Local name reference:")
    for local_name_ref in data['local_name']['local_name_ref']:
        st.markdown(f"- {local_name_ref}")
    st.write(data)

# def chat_summarize(herb: str, herb_name_dict: dict):
#     species_name = species_name_from_keyword(herb, herb_name_dict)
#     data = read_data(species_name)
#     with st.container(height=500,border=True):
#         pass


def chat_summarize(herb: str, herb_name_dict: dict):
    # Retrieve species name and data
    species_name = species_name_from_keyword(herb, herb_name_dict)
    data = read_data(species_name)

    # ---------------------------------- Species --------------------------------- #
    species_prompt = "\n\nSpecies information:\n\n"
    species_name = data['species_name'].get('species_name', 'Not specified')
    species_authorship = data['species_name'].get('authorship', 'Not specified')
    species_updated_by = data['species_name'].get('updated_by', 'Not specified')
    species_name_reference = data['species_name'].get('name_ref', 'Not specified')
    species_name_link_reference = data['species_name'].get('link_ref', 'Not specified')
    species_prompt += f"ชื่อชนิด (Species): {species_name}\n"
    species_prompt += f"ผู้ตั้งชื่อ (Authorship): {species_authorship}\n"
    species_prompt += f"ปรับปรุงข้อมูลล่าสุดโดย: {species_updated_by}\n"
    species_prompt += f"Reference: {species_name_reference}\n"
    species_prompt += f"Link Reference: {species_name_link_reference}\n"

    common_name_th = data['common_name_th'].get('common_name_th', 'Not specified')
    common_name_th_ref = data['common_name_th'].get('common_name_th_ref', 'Not specified')
    common_name_en = data['common_name_en'].get('common_name_en', 'Not specified')
    common_name_en_ref = data['common_name_th'].get('common_name_en_ref', 'Not specified')

    species_prompt += f"ชื่อสามัญ ภาษาไทย ของ {species_name}: {common_name_th} (Reference: {common_name_th_ref}), ชื่อสามัญ ภาษาอังกฤษ ของ {species_name}: {common_name_en} (Reference: {common_name_en_ref})"
    species_prompt += f"ชื่อท้องถิ่น ของ {species_name}: {data['local_name'].get('local_name')}, (Reference: {data['local_name'].get('local_name_ref', 'Not specified')})"
    
    # --------------------------------- Synonyms --------------------------------- #
    synonym_prompt = f"\n\nList all the synonyms for the herb {species_name} have {len(data['synonyms'])} synonym\n\n"
    synonym_prompt += f"| index | synnonym name | authorship | protologue | protologue_reference |\n"
    for synonym_index in range(len(data['synonyms'])):
        synonym_name = data['synonyms'][synonym_index].get('name', 'Not specified')
        synonym_authorship = data['synonyms'][synonym_index].get('author', 'Not specified')
        synonym_protologue = data['synonyms'][synonym_index].get('protologue', 'Not specified')
        synonym_protologue_reference = data['synonyms'][synonym_index].get('wfo_link', 'Not specified')
        synonym_prompt += f"| {synonym_index} | {synonym_name} | {synonym_authorship} | {synonym_protologue} | {synonym_protologue_reference} |\n"

    # --------------------------------- Taxonomy --------------------------------- #
    taxonomy_prompt = f"\n\nTaxonomy of {species_name}:\n\n"
    for taxonomy in ['kingdom', 'subkingdom', 'phylum', 'family', 'genus']:
        tax_name = data['taxonomy'][taxonomy].get(f"{taxonomy}_name", 'Not specified')
        tax_ref = data['taxonomy'][taxonomy].get('ref', 'Not specified')
        taxonomy_prompt += f"- {taxonomy.capitalize()}: {tax_name} (Reference: {tax_ref})\n"

    # ---------------------------- part_and_medicinal ---------------------------- #
    part_and_medicinal_prompt = f"\n\nPart and Medicinal of {species_name}:\n\n"
    for part_and_medicinal in data['part_and_medicinal']:
        part_use = part_and_medicinal.get('part', 'Not specified')
        drug = part_and_medicinal.get('drug', 'Not specified')
        medicinal_name = part_and_medicinal.get('medicinal_name', 'Not specified')
        medicinal_name_reference = part_and_medicinal.get('medicinal_source', 'Not specified')
        part_and_medicinal_prompt += f"- Part use: {part_use}, Drug: {drug}, Medicinal name: {medicinal_name}, (Reference: {medicinal_name_reference})\n"
    
    # ---------------------------- part_and_checimal ---------------------------- #
    part_and_chemical_prompt = f"\n\nChemical Composition by Plant Part for {species_name}:\n\n"

    for part_and_chemical in data['part_and_checimal']:
        chemical_name = part_and_chemical.get('chemical_name', 'Not specified')
        activity_count = part_and_chemical.get('activity_count', 'Not specified')
        plant_part = part_and_chemical.get('plant_part', 'Not specified')
        low_parts_per_million = part_and_chemical.get('low_parts_per_million', 'Not specified')
        high_parts_per_million = part_and_chemical.get('high_parts_per_million', 'Not specified')
        standard_deviation = part_and_chemical.get('standard_deviation', 'Not specified')
        reference = part_and_chemical.get('ref', 'Not specified')

        part_and_chemical_prompt += (
            f"- **Plant Part**: {plant_part}\n"
            f"  - **Chemical Name**: {chemical_name}\n"
            f"  - **Concentration Range (PPM)**: {low_parts_per_million} - {high_parts_per_million}\n"
            f"  - **Standard Deviation**: {standard_deviation}\n"
            f"  - **Activity Count**: {activity_count}\n"
            f"  - **Reference**: {reference}\n\n"
        )

    # clinical_studies_prompt = f"\n\n"
    # for clinical_studies in data['clinical_studies']:
        
    # st.write(part_and_chemical_prompt)

    # # # Prompt for summarization optimization
    # template = """
    # You are an expert herbalist. Summarize the following data about the herb {species_name}.
    # Highlight its key uses, active compounds, and effects concisely:
    
    # {data}
    # """
    # prompt = PromptTemplate(
    #     input_variables=["essay"],
    #     template=template
    # )
    # summary_prompt = prompt.format(species_name=species_name, data=data)

    # llm = OllamaLLM(model="Llama3.1:8b", temperature=0)  

    # try:
    #     summary = llm(summary_prompt)
    # except Exception as e:
    #     summary = f"Error during summarization: {e}"

    with st.container():
        st.markdown(f"<h3> Summarized Information for <span style='color:#87ff87; font-weight: bold;'>{species_name}</span>", unsafe_allow_html=True)
        st.text_area(
            label="Summarized Data:",
            label_visibility='collapsed',
            value="summary",
            height=500,
            disabled=True,
        )

def chat(herb: str, herb_name_dict: dict):
    species_name = species_name_from_keyword(herb, herb_name_dict)
    data = read_data(species_name)
    with st.container(height=500,border=True):
        pass

def display_main_interface(herb_name_options, herb_name_dict, radio_options):
    """Display the main interface after the first run."""
    with st.sidebar:
        with stylable_container(
            key="title_sidebar",
            css_styles=[
                """
                {
                    text-align: center;
                    font-size: -webkit-xxx-large;
                }
                """
            ]
        ):
            st.markdown(f'<h1>🧌HerbQA - <span style="color:red; font-weight: bold;">{len(herb_name_dict.keys())}</span> species', unsafe_allow_html=True)

        def on_change_radio():
            st.session_state.herb_search_local = None
            st.session_state.herb_search_species = None

        species_keys = list(herb_name_dict.keys())
        st.session_state.select_box_local = herb_name_options
        st.session_state.select_box_species = species_keys
        search_method = st.radio(
            "**Choose your search method:**",
            label_visibility="collapsed",
            index=radio_options.index(st.session_state.search_method),
            options=radio_options,
            key="search_method",
            horizontal=True,
            on_change=on_change_radio
        )
        if search_method == "Local name":
            herb = st.selectbox(
                label_visibility="collapsed",
                label="#",
                index=(st.session_state.select_box_local.index(st.session_state.herb_search_local) if st.session_state.herb_search_local is not None else None),
                options=st.session_state.select_box_local,
                placeholder="Select a herb",
                key='herb_search_local',
            )

        elif search_method == "Species name":
            herb = st.selectbox(
                label_visibility="collapsed",
                label="#",
                index=(st.session_state.select_box_species.index(st.session_state.herb_search_species) if st.session_state.herb_search_species is not None else None),
                options=st.session_state.select_box_species,
                placeholder="Select a herb",
                key='herb_search_species',
            )

        if herb:
            st.markdown(
                f"Selected Herb: <span style='color:#87ff87; font-weight:bold;'>{herb}</span>",
                unsafe_allow_html=True,
            )

        st.sidebar.button('Clear Chat History', on_click=clear_chat_history)

    # st.write(st.session_state)
    if herb:
        c1, c2 = st.columns([5,5], gap="large")
        with c1:
            with st.container(height=600,border=False):
                information(herb=herb, herb_name_dict=herb_name_dict)
        with c2:
            d1, d2 = st.columns([5,5])
            with d1:
                submit_summerize = st.button('Summarize', use_container_width=True)
            with d2:
                submit_chatqa = st.button('ChatQA', use_container_width=True)
            if submit_summerize:
                chat_summarize(herb=herb, herb_name_dict=herb_name_dict)
            if submit_chatqa:
                chat(herb=herb, herb_name_dict=herb_name_dict)
    else:
        load_css("styles/center_no_herb_selected.css")
        with stylable_container(
            key="title_sidebar",
            css_styles=[
                """
                {
                    text-align: center;
                    font-size: -webkit-xxx-large;
                }
                """,
                """
                p {
                    font-size: 5rem;
                    font-weight: bold;
                    color: #ffffff17;
                }
                """
            ]
        ):
            st.markdown('No herb selected. 😢')
# ----------------------------- Main Script Execution ----------------------------- #

def main():
    initialize_page()
    initialize_state()
    herb_name_dict, herb_name_options = load_herb_data()
    radio_options = ["Local name", "Species name"]
    if not st.session_state.first_run:
        display_first_run(herb_name_options, herb_name_dict, radio_options)
    else:
        display_main_interface(herb_name_options, herb_name_dict, radio_options)

if __name__ == "__main__":
    main()
