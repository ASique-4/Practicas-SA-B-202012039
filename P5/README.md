
# 🧾 Práctica 5 - Kubernetes y Microservicios

## 🎯 Objetivo

Implementar una arquitectura de microservicios en un entorno local de Kubernetes utilizando Docker Desktop. Los servicios deben estar aislados en un `namespace` llamado `sa-p5`, con configuraciones de recursos, escalamiento automático y un cronjob funcional.

---

## 📁 Estructura del Proyecto

```
P5/
├── namespace.yaml
├── deployments/
│   ├── users-deployment.yaml
│   ├── products-deployment.yaml
│   ├── orders-deployment.yaml
│   ├── inventory-deployment.yaml
│   └── api-gateway-deployment.yaml
├── hpa/
│   ├── users-hpa.yaml
│   ├── products-hpa.yaml
│   ├── orders-hpa.yaml
│   ├── inventory-hpa.yaml
│   └── api-gateway-hpa.yaml
├── services/
│   ├── users-service.yaml
│   ├── products-service.yaml
│   ├── orders-service.yaml
│   ├── inventory-service.yaml
│   └── api-gateway-service.yaml
├── cronjob/
│   ├── cronjob.yaml
│   └── script.py
├── deploy_sa_p5.sh
└── README.md
```

---

## ⚙️ Comandos Utilizados y Explicación

### 🚀 Iniciar entorno y aplicar todo

```bash
chmod +x deploy_sa_p5.sh
./deploy_sa_p5.sh
```

Este script:
- Elimina el namespace `sa-p5` si existe
- Aplica todos los `deployments`, `hpa`, `services`
- Reinstala el entorno completo desde cero

---

### 🧼 Eliminar todo el entorno

```bash
kubectl delete namespace sa-p5
```

Esto elimina todos los recursos relacionados con la práctica.

---

### 🔍 Verificación de recursos

```bash
kubectl get all -n sa-p5
kubectl get pods -n sa-p5
kubectl get svc -n sa-p5
kubectl get hpa -n sa-p5
kubectl get cronjob -n sa-p5
```

---

### 🔁 Reiniciar el API Gateway

```bash
kubectl rollout restart deployment/api-gateway -n sa-p5
```

---

### 🧪 Probar desde navegador o Postman

```http
GET http://localhost:30000/users/
POST http://localhost:30000/users/
```

GraphQL:
```
http://localhost:30000/products/graphql
http://localhost:30000/orders/graphql
```

---

## 🧠 Explicación del CronJob

### Script en Python (`script.py`)

Registra el carné y la fecha/hora en zona GMT-6 en una base de datos SQLite temporal cada 2 minutos.

```python
from datetime import datetime, timezone, timedelta
import sqlite3

carne = "202012039"
zona_horaria_gmt6 = datetime.now(timezone.utc) - timedelta(hours=6)
fecha_hora = zona_horaria_gmt6.strftime("%Y-%m-%d %H:%M:%S")

conn = sqlite3.connect("/registro/registro.db")
cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS registros (id INTEGER PRIMARY KEY AUTOINCREMENT, carne TEXT, fecha_hora TEXT)")
cursor.execute("INSERT INTO registros (carne, fecha_hora) VALUES (?, ?)", (carne, fecha_hora))
conn.commit()
conn.close()
```

### Dockerfile

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY script.py .
CMD ["python", "script.py"]
```

### Comandos usados:

```bash
docker build -t angelsique/cron-registro .
docker push angelsique/cron-registro
```

### CronJob (cronjob.yaml)

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: registro-cronjob
  namespace: sa-p5
spec:
  schedule: "*/2 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: cron-registro
              image: angelsique/cron-registro:latest
              volumeMounts:
                - name: data-volume
                  mountPath: /registro
          volumes:
            - name: data-volume
              emptyDir: {}
          restartPolicy: OnFailure
```

---

## 🧾 Resultado esperado

- Microservicios funcionando bajo el namespace `sa-p5`
- Comunicación interna entre servicios por nombre DNS (`users-service`, `orders-service`, etc.)
- Acceso externo solo a través del `API Gateway` (`NodePort`)
- CronJob ejecutándose cada 2 minutos y guardando registros

---

## 🏁 Estado final del entorno

```bash
kubectl get all -n sa-p5
```

Y salida del cronjob (logs):

```bash
kubectl logs job/<nombre-del-job> -n sa-p5
```

---


---

## 🐳 Comandos adicionales usados durante la práctica

### 🔧 Construcción de imágenes Docker personalizadas

```bash
docker build -t angelsique/users-service ./users-service
docker build -t angelsique/products-service ./products-service
docker build -t angelsique/orders-service ./orders-service
docker build -t angelsique/inventory-service ./inventory-service
docker build -t angelsique/api-gateway ./api-gateway
docker build -t angelsique/cron-registro .
```

---

### 🚀 Subida de imágenes a Docker Hub

```bash
docker login
docker push angelsique/users-service
docker push angelsique/products-service
docker push angelsique/orders-service
docker push angelsique/inventory-service
docker push angelsique/api-gateway
docker push angelsique/cron-registro
```

---

### 📥 Descarga de imágenes desde Docker Hub

```bash
docker pull angelsique/users-service
docker pull angelsique/products-service
docker pull angelsique/orders-service
docker pull angelsique/inventory-service
docker pull angelsique/api-gateway
docker pull angelsique/cron-registro
```

---

### 📦 Probar conectividad entre pods (dentro del clúster)

```bash
kubectl run testpod -n sa-p5 --rm -it --image=busybox -- /bin/sh
wget -qO- users-service:5001/users
wget -qO- api-gateway-service/users
```

---

### 🔍 Ver detalles de recursos

```bash
kubectl describe pod <pod-name> -n sa-p5
kubectl logs <pod-name> -n sa-p5
```

---

### 🧪 Probar localmente con port forwarding

```bash
kubectl port-forward service/api-gateway-service 8080:80 -n sa-p5
```

Y luego acceder a:

```
http://localhost:8080/users/
```

---

### 🔄 Eliminar y recrear CronJob

```bash
kubectl delete cronjob registro-cronjob -n sa-p5
kubectl apply -f cronjob.yaml
```

---

### 🗂 Ver todos los recursos por tipo

```bash
kubectl get deployment -n sa-p5
kubectl get hpa -n sa-p5
kubectl get cronjob -n sa-p5
kubectl get job -n sa-p5
kubectl get svc -n sa-p5
kubectl get pod -n sa-p5
```

---

## 🧾 Explicación de los archivos YAML

### 📄 `namespace.yaml`
Define un espacio lógico llamado `sa-p5` para agrupar y aislar todos los recursos del proyecto en Kubernetes.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: sa-p5
```

---

### 📄 `deployments/*.yaml`
Cada archivo representa un `Deployment`, que define cómo se debe ejecutar y mantener un contenedor para un microservicio.

Ejemplo (`users-deployment.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: users-deployment
  namespace: sa-p5
spec:
  replicas: 1
  selector:
    matchLabels:
      app: users
  template:
    metadata:
      labels:
        app: users
    spec:
      containers:
        - name: users
          image: angelsique/users-service:latest
          ports:
            - containerPort: 5001
          resources:
            requests:
              memory: "64Mi"
              cpu: "250m"
            limits:
              memory: "128Mi"
              cpu: "500m"
```

Define:
- Imagen del contenedor
- Puerto expuesto
- Recursos solicitados y límites
- Etiquetas para los selectores

---

### 📄 `hpa/*.yaml`
Define un `HorizontalPodAutoscaler` que ajusta automáticamente la cantidad de pods en función del uso de CPU.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: users-hpa
  namespace: sa-p5
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: users-deployment
  minReplicas: 1
  maxReplicas: 2
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 80
```

---

### 📄 `services/*.yaml`
Define un `Service` para permitir la comunicación entre pods o exponer un puerto hacia el exterior.

Ejemplo interno (`users-service.yaml`):

```yaml
apiVersion: v1
kind: Service
metadata:
  name: users-service
  namespace: sa-p5
spec:
  type: ClusterIP
  selector:
    app: users
  ports:
    - port: 5001
      targetPort: 5001
```

Ejemplo externo (`api-gateway-service.yaml`):

```yaml
apiVersion: v1
kind: Service
metadata:
  name: api-gateway-service
  namespace: sa-p5
spec:
  type: NodePort
  selector:
    app: gateway
  ports:
    - port: 80
      targetPort: 5000
      nodePort: 30000
```

---

### 📄 `cronjob/cronjob.yaml`
Define una tarea programada que se ejecuta cada 2 minutos para insertar la fecha, hora (GMT-6) y carné del estudiante en una base de datos SQLite dentro del pod.

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: registro-cronjob
  namespace: sa-p5
spec:
  schedule: "*/2 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: cron-registro
              image: angelsique/cron-registro:latest
              volumeMounts:
                - name: data-volume
                  mountPath: /registro
          volumes:
            - name: data-volume
              emptyDir: {}
          restartPolicy: OnFailure
```

---

