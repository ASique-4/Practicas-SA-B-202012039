from flask import Flask, request, jsonify

app = Flask(__name__)

reservations = {}

@app.route('/reservations', methods=['POST'])
def create_reservation():
    data = request.json
    reservation_id = len(reservations) + 1
    reservations[reservation_id] = data
    return jsonify({"id": reservation_id, "reservation": data}), 201

@app.route('/reservations/<int:reservation_id>', methods=['PUT'])
def update_reservation(reservation_id):
    if reservation_id not in reservations:
        return jsonify({"error": "Reservation not found"}), 404
    data = request.json
    reservations[reservation_id] = data
    return jsonify({"id": reservation_id, "reservation": data})

@app.route('/reservations/<int:reservation_id>', methods=['DELETE'])
def cancel_reservation(reservation_id):
    if reservation_id not in reservations:
        return jsonify({"error": "Reservation not found"}), 404
    del reservations[reservation_id]
    return jsonify({"message": "Reservation cancelled"}), 204

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)