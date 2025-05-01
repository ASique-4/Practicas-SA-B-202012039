from flask import Flask, request
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base
from app.schema import schema
from strawberry.flask.views import GraphQLView
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST

engine = create_engine("sqlite:///database.db")
SessionLocal = sessionmaker(bind=engine)

# Crear métricas Prometheus
graphql_requests_total = Counter(
    "graphql_requests_total", 
    "Total de solicitudes a /graphql"
)

graphql_response_time_seconds = Histogram(
    "graphql_response_time_seconds", 
    "Tiempo de respuesta de /graphql en segundos",
    buckets=[0.01, 0.1, 0.5, 1, 2, 5]
)

def create_app():
    app = Flask(__name__)

    # Crear base de datos
    Base.metadata.create_all(bind=engine)

    # Endpoint de métricas Prometheus
    @app.route("/metrics")
    def metrics():
        return generate_latest(), 200, {'Content-Type': CONTENT_TYPE_LATEST}

    # Agregar endpoint de GraphQL con medición Prometheus
    @app.before_request
    def before_request():
        if request.path == "/graphql":
            request.prometheus_timer = graphql_response_time_seconds.time()

    @app.after_request
    def after_request(response):
        if request.path == "/graphql":
            graphql_requests_total.inc()
            request.prometheus_timer.observe_duration()
        return response

    # Agregar GraphQL view
    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view("graphql_view", schema=schema),
    )

    return app
