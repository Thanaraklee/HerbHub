import psycopg2
import requests
import psycopg2.extras
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

class ImageDatabase:
    def __init__(self, host, port, database, user, password):
        self.host = host
        self.port = port
        self.database = database
        self.user = user
        self.password = password

    def connect(self):
        """Connect to PostgreSQL database."""
        return psycopg2.connect(
            host=self.host,
            port=self.port,
            database=self.database,
            user=self.user,
            password=self.password
        )

    def delete_all_images(self, conn):
        """Delete all data in the 'images' table."""
        try:
            with conn.cursor() as cursor:
                query = "DELETE FROM images"
                cursor.execute(query)
            conn.commit()
            print("All images deleted")
        except Exception as e:
            print(f"Error deleting images: {e}")
            conn.rollback()

    def insert_image(self, conn, name, image_data):
        """Insert image data into PostgreSQL without inserting duplicates."""
        try:
            with conn.cursor() as cursor:
                query = """
                INSERT INTO images (imgname, img) 
                VALUES (%s, %s)
                """
                cursor.execute(query, (name, psycopg2.Binary(image_data)))
            conn.commit()
            print(f"Inserted: {name}")
        except Exception as e:
            print(f"Error inserting {name}: {e}")
            conn.rollback()

    def get_image(self, conn, imgname):
        """Fetch image bytea from PostgreSQL."""
        with conn.cursor() as cursor:
            query = "SELECT img FROM images WHERE imgname = %s"
            cursor.execute(query, (imgname,))
            result = cursor.fetchone()
        if result:
            return result[0]
        else:
            return None
