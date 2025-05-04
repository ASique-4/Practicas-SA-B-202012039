from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from dotenv import load_dotenv
import os, requests, re

# Cargar variables
load_dotenv(".env")

PRODUCTOS_URL = os.getenv('PRODUCTOS_URL', 'http://localhost:5002/products/graphql')
ORDERS_URL = os.getenv('ORDERS_URL', 'http://localhost:5003/orders/graphql')
INVENTORY_URL = os.getenv('INVENTORY_URL', 'http://localhost:5004/inventory')

app = Flask(__name__)
CORS(app)

chat = ChatOpenAI(temperature=0, api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    pregunta = data.get("question", "")
    usuario_id = data.get("usuario_id", 1)

    if not pregunta:
        return jsonify({"response": "Por favor, ingresa una pregunta."}), 400

    pregunta_lower = pregunta.lower()

    # --- 1. Consultar productos disponibles
    mostrar_keywords = ["mostrar", "muéstrame", "ver", "productos", "catálogo"]
    if any(k in pregunta_lower for k in mostrar_keywords):
        query = {"query": "{ products { id name price } }"}
        r = requests.post(PRODUCTOS_URL, json=query)

        if r.status_code != 200:
            return jsonify({"response": f"Error al consultar productos: {r.text}"}), 500

        try:
            productos = r.json()["data"]["products"]
        except Exception:
            return jsonify({"response": "Error al interpretar la lista de productos."}), 500

        if not productos:
            return jsonify({"response": "No se encontraron productos."})

        lista = "\n".join([f"{p['id']} - {p['name']} (${p['price']})" for p in productos])
        return jsonify({"response": f"Productos disponibles:\n{lista}"})


    # --- 2. Agregar orden: "quiero comprar 2 camisas"
    match = re.search(r"comprar\s+(\d+)\s+([\w\s]+)", pregunta_lower)
    if match:
        cantidad = int(match.group(1))
        nombre_producto = match.group(2).strip().capitalize()
        mutation = {
            "query": f"""mutation {{
                createOrder(userId: {usuario_id}, productName: "{nombre_producto}", quantity: {cantidad}) {{
                    id
                    productName
                }}
            }}"""
        }
        r = requests.post(ORDERS_URL, json=mutation)
        data = r.json()
        if "errors" in data:
            return jsonify({"response": "No se pudo crear la orden. Intenta con otro producto."})
        return jsonify({"response": f"Se ha realizado tu pedido de {cantidad} unidad(es) de {nombre_producto}."})

    # --- 3. Consultar inventario
    if "inventario" in pregunta_lower:
        r = requests.get(INVENTORY_URL)
        inventario = r.json()
        if not inventario:
            return jsonify({"response": "Inventario no disponible."})
        items = "\n".join([f"{item['product_name']}: {item['stock']} unidades" for item in inventario])
        return jsonify({"response": f"Inventario actual:\n{items}"})

    # --- 4. Cualquier otra cosa, responde con IA
    messages = [
        SystemMessage(content="""
Eres un asistente virtual para una tienda. Puedes mostrar productos, registrar pedidos o consultar inventario. 
Si la solicitud no coincide con una acción conocida, responde con una explicación útil.
"""),
        HumanMessage(content=pregunta)
    ]
    respuesta = chat.invoke(messages)
    return jsonify({"response": respuesta.content})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5010)
