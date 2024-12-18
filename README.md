[![Bandit](https://github.com/Thanaraklee/HerbHub/actions/workflows/main.yml/badge.svg)](https://github.com/Thanaraklee/HerbHub/actions/workflows/main.yml)
[![Dependabot Updates](https://github.com/Thanaraklee/HerbHub/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/Thanaraklee/HerbHub/actions/workflows/dependabot/dependabot-updates)
[![Check API Status](https://github.com/Thanaraklee/HerbHub/actions/workflows/checkstatus.yml/badge.svg)](https://github.com/Thanaraklee/HerbHub/actions/workflows/checkstatus.yml)

# Herb Hub Platform
## Overview
**Herb Hub Platform** is a web-based application designed to facilitate the exploration, analysis, and management of herbal knowledge. The platform integrates various tools, including a knowledge graph, Streamlit dashboards, and database management systems, to provide users with a comprehensive solution for managing herbal data and research.

## Features
- **Streamlit Interface:** A user-friendly dashboard for visualizing and analyzing herbal data.
- **Neo4j Integration:** A graph database to store and query relationships between herbs, compounds, and their effects.
- **MinIO Storage:** A scalable object storage system for managing supplementary data.
- **Dockerized Services:** Simplified deployment and scaling using Docker containers.

## Project Structure (*Sample*)
```bash
HerbHub/
├── backend/   # Handles scraping, transformation, loading, and database management
│
├── frontend/  # Hosts the Streamlit application and contains its configuration files
│
├── docker-compose.yml  # Docker Compose file for orchestrating services
├── .env  # Environment variables file
└── README.md  # Project documentation
```
## Prerequisites
Ensure the following tools are installed:
- [Docker](https://www.docker.com/)

## Installation  

1. **Clone the Repository**  
   Clone the repository and navigate to the project directory:  
   ```bash  
   git clone https://github.com/your-repository/herb-hub.git  
   cd herb-hub  
   ```  

2. **Set Up Environment Variables**  
   - Create a `.env` file in the root directory by referencing the `example.env` file provided in the `frontend/` folder.  
   - Make sure to update the API keys for OpenAI and other credentials as needed:  
     ```bash
     # Example for OpenAI
     OPENAI_API_1=your_api_key_1
     ```
     Replace the placeholder values (`your_api_key_1`, etc.) with your actual API keys.  

3. **Start the Required Services**  
   Use the following command to build and start the Neo4j and MinIO containers:  
   ```bash  
   docker-compose up neo4j minio -d --build  
   ```  

4. **Run the Scraping and Loading Process**  
   **Important:** To prevent clearing the database, ensure you comment out line 50 in the `master_pipe.py` file:  
   ```python  
   # neo4j_pipe.clear_database()  
   ```  
   Then, execute the following command to start the scraping and loading process (this may take approximately 1 hour):  
   ```bash  
   python backend/data_pipeline/pipeline/master_pipe.py  
   ```  

5. **Start Streamlit**  
   Launch the Streamlit application using the following command:  
   ```bash  
   docker compose up streamlit -d  
   ```  
6. **Access the Platform**
   - Streamlit Dashboard: Navigate to http://localhost:8503
   - Neo4j Browser: Navigate to http://localhost:7474
   - MinIO Console: Navigate to http://localhost:9001

# Workflow
<p align="center">
  <img src="https://github.com/Thanaraklee/HerbHub/blob/main/workflow.png" alt="Workflow" style="width:1000px;" />
</p>


# References
- Herb images: [GBIF](https://www.gbif.org)  
- Species names, synonyms, and taxonomy: [WFO Plant List](https://www.wfoplantlist.org)  
- Plant parts and medicinal uses: [Kew Science - Medicinal Plant Names Services](https://mpns.science.kew.org)  
- Plant parts and chemical properties: [USDA Phytochemical Database](https://phytochem.nal.usda.gov)  
- Common names, local names, and pharmacological data: [CosmeHerb Database](https://cosmeherb.nbt.or.th)
