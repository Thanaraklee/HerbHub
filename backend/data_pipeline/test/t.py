import psycopg2
import requests
from flask import Flask, Response, jsonify
from dotenv import load_dotenv
import os

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


class ImageDownloader:
    def __init__(self, image_urls):
        self.image_urls = image_urls

    def download_image(self, url):
        """Download image from URL and return its binary content."""
        response = requests.get(url)
        if response.status_code == 200:
            return response.content
        else:
            raise Exception(f"Failed to download image: {url} (Status code: {response.status_code})")

class ImageService:
    def __init__(self, db: ImageDatabase, downloader: ImageDownloader):
        self.db = db
        self.downloader = downloader

    def download_and_store_images(self):
        """Download and store images into PostgreSQL."""
        conn = self.db.connect()
        print("Connected to PostgreSQL")
        self.db.delete_all_images(conn)

        try:
            for idx, url in enumerate(self.downloader.image_urls):
                imgname = f"Ai_{idx+1}"

                print(f"Downloading image: {url}")
                image_data = self.downloader.download_image(url)

                self.db.insert_image(conn, imgname, image_data)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            conn.close()
            print("PostgreSQL connection closed")


class ImageAPI:
    def __init__(self, app: Flask, db: ImageDatabase):
        self.app = app
        self.db = db

    def serve_image(self, imgname):
        """Serve image as response."""
        conn = self.db.connect()
        image_data = self.db.get_image(conn, imgname)
        conn.close()

        if image_data:
            return Response(image_data, mimetype="image/jpeg")
        else:
            return jsonify({"error": f"Image '{imgname}' not found"}), 404


def create_app():
    # Load environment variables
    load_dotenv()

    # PostgreSQL connection details
    host = "localhost"
    port = "5432"
    database = os.environ['DB_POSTGRES']
    user = os.environ['USER_POSTGRES']
    password = os.environ['PASSWORD_POSTGRES']

    # List of image URLs
    image_urls = [
        'https://inaturalist-open-data.s3.amazonaws.com/photos/352988543/original.jpeg',
        'https://inaturalist-open-data.s3.amazonaws.com/photos/358570856/original.jpeg',
    ]

    # Initialize the components
    db = ImageDatabase(host, port, database, user, password)
    downloader = ImageDownloader(image_urls)
    image_service = ImageService(db, downloader)

    # Initialize Flask app
    app = Flask(__name__)
    image_api = ImageAPI(app, db)

    # Route for serving image
    app.add_url_rule('/image/<imgname>', 'serve_image', image_api.serve_image, methods=["GET"])

    # Download and store images when the app starts
    image_service.download_and_store_images()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
