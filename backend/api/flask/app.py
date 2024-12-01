import psycopg2
from flask import Flask, Response, jsonify
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=r'C:\Users\bzank\Desktop\chatbot314\.env')

# Flask app
app = Flask(__name__)

# Database configuration
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PORT = os.getenv('POSTGRES_PORT')
POSTGRES_DB = os.getenv('POSTGRES_DB')
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')

def get_image_from_db(imgname):
    try:
        conn = psycopg2.connect(
            host=POSTGRES_HOST,
            port=POSTGRES_PORT,
            database=POSTGRES_DB,
            user=POSTGRES_USER,
            password=POSTGRES_PASSWORD,
        )
        with conn.cursor() as cursor:
            query = "SELECT img FROM images WHERE imgname = %s"
            cursor.execute(query, (imgname,))
            result = cursor.fetchone()
        conn.close()
        if result:
            return result[0]
        else:
            return None
    except Exception as e:
        print(f"Error fetching image: {e}")
        return None

@app.route("/image/<imgname>", methods=["GET"])
def serve_image(imgname):
    image_data = get_image_from_db(imgname)
    if image_data:
        return Response(image_data, mimetype="image/jpeg")
    else:
        return jsonify({"error": f"Image '{imgname}' not found"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
