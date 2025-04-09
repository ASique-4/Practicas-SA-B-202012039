#!/bin/bash

echo "🧼 Limpiando namespace anterior (si existe)..."
kubectl delete namespace sa-p5 --ignore-not-found

echo "🚀 Creando namespace sa-p5..."
kubectl apply -f namespace.yaml

echo "📦 Aplicando deployments..."
kubectl apply -f users-deployment.yaml
kubectl apply -f products-deployment.yaml
kubectl apply -f orders-deployment.yaml
kubectl apply -f inventory-deployment.yaml
kubectl apply -f api-gateway-deployment.yaml

echo "🔁 Aplicando autoscalers (HPA)..."
kubectl apply -f users-hpa.yaml
kubectl apply -f products-hpa.yaml
kubectl apply -f orders-hpa.yaml
kubectl apply -f inventory-hpa.yaml
kubectl apply -f api-gateway-hpa.yaml

echo "🌐 Aplicando services..."
kubectl apply -f api-gateway-service.yaml
kubectl apply -f users-service.yaml
kubectl apply -f products-service.yaml
kubectl apply -f orders-service.yaml
kubectl apply -f inventory-service.yaml

echo "✅ Despliegue completo en el namespace sa-p5"
