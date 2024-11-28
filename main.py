from langchain_ollama import ChatOllama
from langchain.chains import GraphCypherQAChain
from langchain_community.graphs.neo4j_graph import Neo4jGraph
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
import os

load_dotenv()

graph = Neo4jGraph(
    url=os.environ['NEO4j_URI'],
    username=os.environ['NEO4j_USER'],
    password=os.environ['NEO4j_PASSWORD'],
    database=os.environ['NEO4j_DATABASE']
)

schema = graph.schema

CYPHER_GENERATION_TEMPLATE = """
Based on the user's question, generate a Cypher query to fetch relevant data.
Ensure the query is optimized for performance and includes any necessary filtering.
Use only the provided relationship types and properties in the schema.
Do not use any other relationship types or properties that are not provided.

Relationships Explained:
- `(:Species_name)-[:AUTHORED_BY]->(:People)`: A species name is authored or documented by a person.
- `(:Species_name)-[:UPDATED_BY]->(:People)`: A species name is updated or modified by a person.
- `(:Species_name)-[:IS_IN]->(:Taxonomy)`: A species name belongs to a particular taxonomy.
- `(:Species_name)-[:IS_SYNONYM_OF]->(:Synonyms)`: A species name has a synonym.
- `(:Species_name)-[:IS_COMMON_NAME_TH]->(:CommonNameTH)`: A species name has a common name in Thai.
- `(:Species_name)-[:IS_COMMON_NAME_EN]->(:CommonNameEN)`: A species name has a common name in English.
- `(:Species_name)-[:IS_LOCAL_NAME]->(:LocalName)`: A species name has a local name.
- `(:Species_name)-[:IS_PHARMACOLOGICAL_STUDIES]->(:PharmacologicalStudies)`: A species name is part of pharmacological studies.
- `(:Species_name)-[:IS_CLINICAL_STUDIES]->(:ClinicalStudies)`: A species name is part of clinical studies.
- `(:Species_name)-[:HAS_PART_USE]->(:Part)`: A species name has specific parts used for various purposes.
- `(:Taxonomy)-[:IS_IN]->(:Taxonomy)`: Represents a hierarchical relationship in taxonomic classifications.
- `(:Part)-[:HAS_DRUG]->(:Drug)`: A part of a species is associated with a drug.
- `(:Part)-[:HAS_CHEMICAL]->(:Chemical)`: A part of a species contains a chemical compound.

#Schema:
{schema}

Note: Do not include any explanations or apologies in your responses.
If difference local name but same species name, result of query will be same.
Do not respond to any questions that might ask anything else than for you to construct a Cypher statement.
Do not include any text except the generated Cypher statement.
If you do not know the answer, respond with "I don't know". 

#Example
Question: What is species name of local name "ขมิ้นหัว"?
Cypher Query:
MATCH(s:Species_name)-[r:IS_LOCAL_NAME]->(l:LocalName)
WHERE l.local_name CONTAINS 'ขมิ้นหัว'
RETURN DISTINCT s.species_name, type(r), l.local_name

Qestion: What is species name of local name "งาขาว"
Cypher Query:
MATCH(s:Species_name)-[r:IS_LOCAL_NAME]->(l:LocalName)
WHERE l.local_name CONTAINS 'งาขาว'
RETURN DISTINCT s.species_name, type(r), l.local_name

Qestion: What is species name of local name "กระ"
Cypher Query:
MATCH(s:Species_name)-[r:IS_LOCAL_NAME]->(l:LocalName)
WHERE l.local_name CONTAINS 'กระ'
RETURN DISTINCT s.species_name, type(r), l.local_name

Question: What is chemical of "cannabis"
Cypher Query:
MATCH (s:Species_name)-[:HAS_PART_USE]->(p:Part)-[:HAS_CHEMICAL]->(c:Chemical)
WHERE tolower(s.species_name) CONTAINS tolower('cannabis') 
RETURN DISTINCT s.species_name, c.checimal_name

# Explanation:
In case the species name is the same but the local names are different, return all local names that refer to the same species name.

Question: What is the species name for local names "ขมิ้นหัว" and "ขมิ้นชัน"?
Cypher Query:
MATCH (s:Species_name)-[:IS_LOCAL_NAME]->(l:LocalName)
WHERE l.local_name CONTAINS 'ขมิ้นหัว' OR l.local_name CONTAINS 'ขมิ้นชัน'
RETURN DISTINCT s.species_name

Question: What is chemical of local name "กัญชา"
Cypher Query:
MATCH (l:LocalName)<-[:IS_LOCAL_NAME]-(s:Species_name)-[:HAS_PART_USE]->(p:Part)-[:HAS_CHEMICAL]->(c:Chemical)
WHERE l.local_name CONTAINS 'กัญชา'
RETURN DISTINCT s.species_name, c.checimal_name

Question: What is chemical of root part in "cannabis"
Cypher Query:
MATCH (s:Species_name)-[:HAS_PART_USE]->(p:Part)-[:HAS_CHEMICAL]->(c:Chemical)
WHERE tolower(s.species_name) CONTAINS tolower('cannabis') 
    AND ANY(name IN p.name WHERE tolower(name) CONTAINS tolower('root'))
RETURN DISTINCT s.species_name, p.name, c.checimal_name

Question: What is the chemical of the root part in the local name "กัญชา"?
Cypher Query:
MATCH (l:LocalName)<-[:IS_LOCAL_NAME]-(s:Species_name)-[:HAS_PART_USE]->(p:Part)-[:HAS_CHEMICAL]->(c:Chemical)
WHERE l.local_name CONTAINS 'กัญชา' 
    AND ANY(name IN p.name WHERE tolower(name) CONTAINS tolower('root'))
RETURN DISTINCT p.name, c.checimal_name

Question: What are all The Genus in the plantae Kingdom?
Cypher Query:
MATCH(t1:Taxonomy {{type:"Kingdom"}})<-[:IS_IN]-(t2:Taxonomy {{type:"Subkingdom"}})<-[:IS_IN]-(t3:Taxonomy {{type: "Phylum"}})<-[:IS_IN]-(t4:Taxonomy {{type:"Family"}})<-[:IS_IN]-(t5:Taxonomy {{type:"Genus"}})
WHERE tolower(t1.name) CONTAINS tolower('plantae')
RETURN DISTINCT  t1.name+'('+t1.type+')', t5.name+'('+t5.type+')'

Question: What are all The Pylum in the plantae Kingdom?
Cypher Query:
MATCH(t1:Taxonomy {{type:"Kingdom"}})<-[:IS_IN]-(t2:Taxonomy {{type:"Subkingdom"}})<-[:IS_IN]-(t3:Taxonomy {{type: "Phylum"}})<-[:IS_IN]-(t4:Taxonomy {{type:"Family"}})<-[:IS_IN]-(t5:Taxonomy {{type:"Genus"}})
WHERE tolower(t1.name) CONTAINS tolower('plantae')
RETURN DISTINCT  t1.name+'('+t1.type+')', t3.name+'('+t3.type+')'

Question: What are all The Genus in the Apiales Phylum?
Cypher Query:
MATCH(t1:Taxonomy {{type:"Kingdom"}})<-[:IS_IN]-(t2:Taxonomy {{type:"Subkingdom"}})<-[:IS_IN]-(t3:Taxonomy {{type: "Phylum"}})<-[:IS_IN]-(t4:Taxonomy {{type:"Family"}})<-[:IS_IN]-(t5:Taxonomy {{type:"Genus"}})
WHERE tolower(t4.name) CONTAINS tolower('Apiales')
RETURN DISTINCT  t4.name+'('+t4.type+')', t5.name+'('+t5.type+')'


Question: {question}
Cypher Query:
"""

CYPHER_GENERATION_PROMPT = PromptTemplate(
    input_variables=["schema", "question"], template=CYPHER_GENERATION_TEMPLATE
)

llm = ChatOllama(model="llama3.1:8b", temperature=0)

chain = GraphCypherQAChain.from_llm(
    graph=graph, 
    llm=llm, 
    verbose=True,
    validate_cypher=True,
    allow_dangerous_requests=True,
    top_k=30,
    cypher_prompt=CYPHER_GENERATION_PROMPT
)

# question = "What is species name of local name 'ขมิ้นหัว'?"
while True:
    question = input("Question: ")
    if question == "exit":
        break
    response = chain.run(query=question, question=question, schema=graph.schema)
    print(f"Answer: {response}")