import psycopg2
import requests
from dotenv import load_dotenv
import os

load_dotenv()

HOST = "localhost"
PORT = "5432"
DATABASE = os.environ['DB_POSTGRES']
USER = os.environ['USER_POSTGRES']
PASSWORD = os.environ['PASSWORD_POSTGRES']

image_urls = [
    'https://inaturalist-open-data.s3.amazonaws.com/photos/352988543/original.jpeg',
    'https://inaturalist-open-data.s3.amazonaws.com/photos/358570856/original.jpeg',
    # 'https://inaturalist-open-data.s3.amazonaws.com/photos/350695748/original.jpg',
    # 'https://inaturalist-open-data.s3.amazonaws.com/photos/358838480/original.jpeg',
    # 'https://inaturalist-open-data.s3.amazonaws.com/photos/355767328/original.jpeg',
    # 'https://inaturalist-open-data.s3.amazonaws.com/photos/358226993/original.jpeg',
    # 'https://inaturalist-open-data.s3.amazonaws.com/photos/358259617/original.jpg',
    # 'https://inaturalist-open-data.s3.amazonaws.com/photos/358791166/original.jpg',
    # 'https://inaturalist-open-data.s3.amazonaws.com/photos/369844763/original.jpg',
    # 'https://inaturalist-open-data.s3.amazonaws.com/photos/372500263/original.jpg'
]

def download_image(url):
    """Download image from URL and return its binary content."""
    response = requests.get(url)
    if response.status_code == 200:
        return response.content
    else:
        raise Exception(f"Failed to download image: {url} (Status code: {response.status_code})")

def insert_image_to_db(conn, name, image_data):
    """Insert image data into PostgreSQL."""
    try:
        with conn.cursor() as cursor:
            query = "INSERT INTO images (imgname, img) VALUES (%s, %s)"
            cursor.execute(query, (name, psycopg2.Binary(image_data)))
        conn.commit()
        print(f"Inserted: {name}")
    except Exception as e:
        print(f"Error inserting {name}: {e}")
        conn.rollback()

def main():
    # Connect to PostgreSQL
    conn = psycopg2.connect(
        host=HOST,
        port=PORT,
        database=DATABASE,
        user=USER,
        password=PASSWORD
    )
    print("Connected to PostgreSQL")

    try:
        for idx, url in enumerate(image_urls):
            # Generate image name
            imgname = f"Ai_{idx+1}"

            # Download image
            print(f"Downloading image: {url}")
            image_data = download_image(url)

            # Insert image into database
            insert_image_to_db(conn, imgname, image_data)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        conn.close()
        print("PostgreSQL connection closed")

if __name__ == "__main__":
    main()
