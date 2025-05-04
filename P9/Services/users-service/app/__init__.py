import logging
import time
from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST

db = SQLAlchemy()

# Contadores personalizados
users_requests_total = Counter('users_http_requests_total', 'Total de solicitudes a /users')
users_errors_total = Counter('users_http_errors_total', 'Total de errores HTTP en /users')
users_response_time_seconds = Histogram('users_response_time_seconds', 'Tiempo de respuesta en segundos en /users')

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    # Configurar logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("users-service")

    with app.app_context():
        from .models import User
        db.create_all()

    from .routes import users_bp
    app.register_blueprint(users_bp, url_prefix="/users")

    @app.before_request
    def before_request():
        request.start_time = time.time()
        if request.path.startswith("/users"):
            users_requests_total.inc()
            logger.info(f"Solicitud recibida: {request.method} {request.path}")

    @app.after_request
    def after_request(response):
        if request.path.startswith("/users"):
            resp_time = time.time() - request.start_time
            users_response_time_seconds.observe(resp_time)
            if response.status_code >= 400:
                users_errors_total.inc()
            logger.info(f"Solicitud completada: {request.method} {request.path} - Código {response.status_code} - Tiempo {resp_time:.4f} segundos")
        return response

    @app.route("/metrics")
    def metrics():
        return Response(generate_latest(), mimetype=CONTENT_TYPE_LATEST)

    return app
