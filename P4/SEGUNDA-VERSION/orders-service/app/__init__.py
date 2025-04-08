from flask import Flask
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base
from app.schema import schema
from strawberry.flask.views import GraphQLView

engine = create_engine("sqlite:///database.db")
SessionLocal = sessionmaker(bind=engine)

def create_app():
    app = Flask(__name__)

    # Crear base de datos
    Base.metadata.create_all(bind=engine)

    # Agregar endpoint de GraphQL
    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view("graphql_view", schema=schema),
    )

    return app
