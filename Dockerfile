FROM python:3.12-slim

WORKDIR /app

COPY ./app/requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY ./app .

CMD ["streamlit", "run", "streamlit.py"]