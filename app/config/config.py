from st_link_analysis import NodeStyle, EdgeStyle, Event

mapping_relationship = {
    "Chemical": "HAS_CHEMICAL",
    "Part": "HAS_PART_USE",
    "Drug": "HAS_DRUG",
    "Taxonomy": "CONTAINS",
    "ClinicalStudies": "HAS_CLINICAL_STUDIES",
    "LocalName": "HAS_LOCAL_NAME",
    "PharmacologicalStudies": "HAS_PHARMACOLOGICAL_STUDIES",
    "Synonym": "HAS_SYNONYM",
    "CommonName": "HAS_COMMON_NAME",
    "Authored": "AUTHORED_BY",
    "Updated": "UPDATED_BY",
}

node_styles = [
    NodeStyle("Species", "#57937f", "name", "url('plant.svg')"),
    NodeStyle("Part", "#f56664", "name", "url('part.svg')"),
    NodeStyle("Drug", "#8dcd92", "name", "url('drug.svg')"),
    NodeStyle("Chemical", "#efb6ca", "name", "url('chemical.svg')"),
    NodeStyle("ClinicalStudies", "#57c4e2", "name", "url('clinical.svg')"),
    # NodeStyle("LocalName", "#da7094", "name"),
    NodeStyle("PharmacologicalStudies", "#ffc05b", "name", "url('pharmacological.svg')"),
    # NodeStyle("Synonym", "#795e26", "name"),
    # NodeStyle("CommonName", "#813a6a", "name"),
    # NodeStyle("Taxonomy", "#fadd68", "name"),
    # NodeStyle("Person", "#f79767", "name"),
]

edge_styles = [
    EdgeStyle("HAS_DRUG", caption="label", directed=True, color="#dfdfdf"),
    EdgeStyle("HAS_PART_USE", caption="label", directed=True, color="#dfdfdf"),
    EdgeStyle("AUTHORED_BY", caption="label", directed=True, color="#dfdfdf"),
    EdgeStyle("HAS_CHEMICAL", caption="label", directed=True, color="#dfdfdf"),
    EdgeStyle("HAS_CLINICAL_STUDIES", caption="label", directed=True, color="#dfdfdf"),
    EdgeStyle("HAS_COMMON_NAME", caption="label", directed=True, color="#dfdfdf"),
    EdgeStyle("CONTAINS", caption="label", directed=True, color="#dfdfdf"),
    EdgeStyle("HAS_LOCAL_NAME", caption="label", directed=True, color="#dfdfdf"),
    EdgeStyle("HAS_PHARMACOLOGICAL_STUDIES", caption="label", directed=True, color="#dfdfdf"),
    EdgeStyle("HAS_SYNONYM_OF", caption="label", directed=True, color="#dfdfdf"),
    EdgeStyle("UPDATED_BY", caption="label", directed=True, color="#dfdfdf"),
]

events = [
    Event("clicked_node", "click tap", "node"),
    Event("another_name", "dblclick dbltap", "*"),
]

layout = "cose"