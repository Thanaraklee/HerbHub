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
    NodeStyle("Species", "#57937f", "name"),
    NodeStyle("Part", "#f56664", "name"),
    NodeStyle("Drug", "#8dcd92", "name"),
    NodeStyle("Chemical", "#efb6ca", "name"),
    NodeStyle("ClinicalStudies", "#57c4e2", "name"),
    NodeStyle("LocalName", "#da7094", "name"),
    NodeStyle("PharmacologicalStudies", "#ffc05b", "name"),
    NodeStyle("Synonym", "#795e26", "name"),
    NodeStyle("CommonName", "#813a6a", "name"),
    NodeStyle("Taxonomy", "#fadd68", "name"),
    NodeStyle("Person", "#f79767", "name"),
]

edge_styles = [
    EdgeStyle("HAS_DRUG", caption="label", directed=True),
    EdgeStyle("HAS_PART_USE", caption="label", directed=True),
    EdgeStyle("AUTHORED_BY", caption="label", directed=True),
    EdgeStyle("HAS_CHEMICAL", caption="label", directed=True),
    EdgeStyle("HAS_CLINICAL_STUDIES", caption="label", directed=True),
    EdgeStyle("HAS_COMMON_NAME", caption="label", directed=True),
    EdgeStyle("CONTAINS", caption="label", directed=True),
    EdgeStyle("HAS_LOCAL_NAME", caption="label", directed=True),
    EdgeStyle("HAS_PHARMACOLOGICAL_STUDIES", caption="label", directed=True),
    EdgeStyle("HAS_SYNONYM_OF", caption="label", directed=True),
    EdgeStyle("UPDATED_BY", caption="label", directed=True),
]

events = [
    Event("clicked_node", "click tap", "node"),
    Event("another_name", "dblclick dbltap", "*"),
]

layout = "cose"