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

@app.route('/reservations', methods=['POST'])
def create_reservation():
    data = request.get_json()
    cursor = db.cursor()
    cursor.execute("INSERT INTO reservations (name, date, time, party_size) VALUES (%s, %s, %s, %s)",
                   (data['name'], data['date'], data['time'], data['party_size']))
    db.commit()
    return jsonify({"message": "Reserva creada"}), 201

@app.route('/reservations/<int:reservation_id>', methods=['PUT'])
def modify_reservation(reservation_id):
    data = request.get_json()
    cursor = db.cursor()
    cursor.execute("UPDATE reservations SET date=%s, time=%s, party_size=%s WHERE id=%s",
                   (data['date'], data['time'], data['party_size'], reservation_id))
    db.commit()
    return jsonify({"message": "Reserva modificada"}), 200

@app.route('/reservations/<int:reservation_id>', methods=['DELETE'])
def cancel_reservation(reservation_id):
    cursor = db.cursor()
    cursor.execute("DELETE FROM reservations WHERE id=%s", (reservation_id,))
    db.commit()
    return jsonify({"message": "Reserva cancelada"}), 200

if __name__ == '__main__':
    app.run(port=5000)