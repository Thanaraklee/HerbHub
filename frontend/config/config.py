from st_link_analysis import NodeStyle, EdgeStyle, Event

part_mapping = {
    "root": ["root", "roots"],
    "leaf": ["leaf", "leafs", "leaves", "leaf exudate", "leaf mucilage", "whole aerial part (leaves)", "folhas", "folha"],
    "flower": ["flower", "flowers"],
    "plant": ["whole plant", "herb", "partes aéreas", "Partes aéreas", "wood"],
    "seed": ["seed", "seeds", "semillas"],
    "calyx": ["Cáliz", "cáliz", "Calyces", "calyces"],
    "fruit": ["fruit", "fruits", "fruto", "frutos"],
    "endosperm":["endospermo","endosperm"],
    "rhizome":["rizoma", "rizomas", "rhizome"]
}

mapping_clinical_pharma = {
    "ผิวกาย": [
        "ทำให้ผิวขาว",
        "ทำความสะอาดผิว",
        "บำรุงผิว/ลดความหมองคล้ำของผิว/ทำให้ผิวกระจ่างใส",
        "ทำให้ผิวชุ่มชื้น/ทำให้ผิวนุ่ม/ทำให้ผิวนวล",
        "ต้านสิวบนผิวกาย",
        "ต้านอนุมูลอิสระบนผิวกาย",
        "ทำให้ผิวอ่อนเยาว์/ลดเลือนริ้วรอย",
        "กันแดดสำหรับผิวกาย",
        "ทำให้ผิวสีแทน",
        "ระงับกลิ่น/ระงับเหงื่อ",
        "ป้องกันผิวแตกลาย",
        "รักษาส้นเท้าแตก",
        "ต้านเซลลูไลท์/กระชับผิว",
        "ต้านการอักเสบของผิวกาย",
        "รักษาแผล",
        "ต้านการแพ้ของผิวกาย",
        "ลดความมันบนผิวกาย",
    ],
    "ผิวปาก": [
        "น้ำยาบ้วนปาก/ฆ่าเชื้อในช่องปาก",
        "ยาสีฟัน",
        "ทำให้ริมฝีปากชุ่มชื้น",
        "ลิปสติก",
        "ระงับกลิ่นปาก/ระงับกลิ่นลมหายใจเหม็น",
        "รักษาแผลในปาก/รักษาแผลร้อนใน",
    ],
    "ผิวหน้า": [
        "ทำให้ผิวหน้าขาว",
        "ลดเลือนฝ้า",
        "ทำความสะอาดผิวหน้า",
        "บำรุงผิวหน้า/ลดความหมองคล้ำของผิวหน้า/ทำให้ผิวหน้ากระจ่างใส",
        "ทำให้ผิวหน้าชุ่มชื้น/ทำให้ผิวหน้านุ่ม/ทำให้ผิวหน้านวล",
        "ต้านสิวบนใบหน้า",
        "ต้านอนุมูลอิสระบนใบหน้า",
        "ลดเลือนริ้วรอยบนใบหน้า/ทำให้ผิวหน้าอ่อนเยาว์",
        "ตกแต่งผิวหน้า",
        "ต้านการอักเสบของผิวหน้า",
        "รักษาแผลบนใบหน้า",
        "กันแดดสำหรับผิวหน้า",
        "ต้านการแพ้ของผิวหน้า",
        "ลดความมันบนใบหน้า",
    ],
    "เส้นผม": [
        "ทำความสะอาดเส้นผม/แชมพู",
        "บำรุงเส้นผม/ครีมนวดผม",
        "ย้อมสีผม",
        "ยับยั้งการหลุดร่วงของเส้นผม",
        "กระตุ้นการงอกของเส้นผม",
        "ป้องกันผมหงอก",
        "ขจัดรังแค",
        "ต้านเชื้อราบนหนังศีรษะ",
        "ตกแต่งเส้นผม",
    ],
}


layout_options = ['cose', 'random', 'grid', 'circle', 'concentric', 'breadthfirst', 'cola', 'fcose']

mapping_information = {
    "authored_by": "Authored",
    "updated_by": "Updated",
    "local_names": "Local Name",
    "common_names": "Common Name",
    "synonyms": "Synonyms",
}

mapping_relationship = {
    "Chemical": "HAS_CHEMICAL",
    "Part": "HAS_PART_USE",
    "Drug": "HAS_DRUG",
    "Taxonomy": "CONTAINS",
    "Clinical Studies": "HAS_CLINICAL_STUDIES",
    "Local Name": "HAS_LOCAL_NAME",
    "Pharmacological Studies": "HAS_PHARMACOLOGICAL_STUDIES",
    "Synonym": "HAS_SYNONYM",
    "Common Name": "HAS_COMMON_NAME",
    "Authored": "AUTHORED_BY",
    "Updated": "UPDATED_BY",
}

node_styles = [
    NodeStyle("Species", "#57937f", "name", "url('plant.svg')"),
    NodeStyle("Part", "#f56664", "name", "url('part.svg')"),
    NodeStyle("Drug", "#8dcd92", "name", "url('drug.svg')"),
    NodeStyle("Chemical", "#efb6ca", "name", "url('chemical.svg')"),
    NodeStyle("ClinicalStudies", "#57c4e2", "name", "url('clinical.svg')"),
    NodeStyle("PharmacologicalStudies", "#ffc05b", "name", "url('pharmacological.svg')"),
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
