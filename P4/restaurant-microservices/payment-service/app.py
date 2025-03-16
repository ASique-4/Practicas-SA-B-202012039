from flask import Flask, request, jsonify
import mysql.connector
from dotenv import load_dotenv
import os

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

app = Flask(__name__)

db = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)

@app.route('/payments', methods=['POST'])
def process_payment():
    data = request.get_json()
    cursor = db.cursor()
    cursor.execute("INSERT INTO payments (reservation_id, amount, payment_method, card_number, expiration_date, cvv) VALUES (%s, %s, %s, %s, %s, %s)",
                   (data['reservation_id'], data['amount'], data['payment_method'], data['card_number'], data['expiration_date'], data['cvv']))
    db.commit()
    return jsonify({"message": "Pago procesado"}), 200

if __name__ == '__main__':
    app.run(port=5003)