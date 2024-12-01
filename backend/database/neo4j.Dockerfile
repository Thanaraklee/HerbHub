FROM neo4j:community-ubi9

COPY ./neo4j/data /data
COPY ./neo4j/logs /logs
COPY ./neo4j/config /config
COPY ./neo4j/plugins /plugins

ENV NEO4J_AUTH=neo4j/P@ssw0rd
ENV NEO4J_initial_dbms_default__database=graphherb  
ENV NEO4JLABS_PLUGINS=["apoc"]  
ENV NEO4J_PLUGINS=["apoc"]  

EXPOSE 7474 7687  

CMD ["neo4j"]