FROM python:3.12-slim

RUN apt-get update && apt-get upgrade -y
RUN pip install --upgrade pip

WORKDIR /app

COPY ./requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

ENV DOCKER_ENV_STREAMLIT=1

CMD ["streamlit", "run", "streamlit.py"]