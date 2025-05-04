from flask import Blueprint, request, jsonify
from .models import User
from . import db

users_bp = Blueprint('users', __name__)

@users_bp.route("/", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])

@users_bp.route("/", methods=["POST"])
def create_user():
    data = request.get_json()
    new_user = User(username=data["username"], email=data["email"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201
