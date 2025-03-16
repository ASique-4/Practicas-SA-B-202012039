from flask import Flask, request, jsonify

app = Flask(__name__)

# Simulated database for payments
payments_db = []

@app.route('/payments', methods=['POST'])
def create_payment():
    data = request.json
    payment_id = len(payments_db) + 1
    payment = {
        'id': payment_id,
        'reservation_id': data['reservation_id'],
        'amount': data['amount'],
        'status': 'completed'
    }
    payments_db.append(payment)
    return jsonify(payment), 201

@app.route('/payments/<int:payment_id>', methods=['GET'])
def get_payment(payment_id):
    payment = next((p for p in payments_db if p['id'] == payment_id), None)
    if payment is None:
        return jsonify({'error': 'Payment not found'}), 404
    return jsonify(payment)

@app.route('/payments/<int:payment_id>', methods=['DELETE'])
def cancel_payment(payment_id):
    global payments_db
    payments_db = [p for p in payments_db if p['id'] != payment_id]
    return jsonify({'message': 'Payment canceled'}), 204

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)