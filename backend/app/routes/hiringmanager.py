from flask import Blueprint, jsonify, request
from app.models import Hiringmanager, db
from flask_bcrypt import Bcrypt
import jwt
import os

hiring_manager_bp = Blueprint('hiring_manager', __name__, url_prefix="/hiringmanager")
bcrypt = Bcrypt()

@hiring_manager_bp.route("/signup", methods=['POST'])
def signup():
    try:
        data = request.get_json()
        exist = Hiringmanager.query.all()

        for user in exist:
            if data['email'] == user.email:
                return jsonify({'msg': "User is already registered, please login"})

        hashed = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

        new_hiring_manager = Hiringmanager(
            name=data['name'],
            email=data['email'],
            password=hashed,
            company_name=data['company_name'],
            company_address=data['company_address']
        )
        
        db.session.add(new_hiring_manager)
        db.session.commit()
        return jsonify({'message': 'Hiring manager created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@hiring_manager_bp.route("/login", methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']

        manager = Hiringmanager.query.filter_by(email=email).first()

        if manager and bcrypt.check_password_hash(manager.password, password):
            token = jwt.encode({'email': manager.email, 'role': "hiring_manager", "id": manager.id},os.environ.get("SECRET_KEY"), algorithm='HS256')
            return jsonify({'msg': "Logged in Successfully",'role':"Hiring Manager", 'token': token, 'id': manager.id})
        else:
            return jsonify({"msg": "Wrong Credentials. Please try again"}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@hiring_manager_bp.route('/profile/<int:id>', methods=['GET'])
def get_manager_profile(id):
    try:
        manager = Hiringmanager.query.get_or_404(id)

        profile_data = {
            'id': manager.id,
            'name': manager.name,
            'email': manager.email,
            'company_name': manager.company_name,
            'company_address': manager.company_address
        }

        return jsonify({"msg": "User Details", "data": profile_data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@hiring_manager_bp.route('/update/<int:id>', methods=['PUT', 'PATCH'])
def update_jobseeker(id):
    try:
        manager = Hiringmanager.query.get(id)

        if not manager:
            return jsonify({'message': 'Hiring Manager not found'}), 404

        data = request.get_json()
        token = request.headers.get("Authorization")
        decode = jwt.decode(token, os.environ.get("SECRET_KEY"), algorithms=['HS256'])
        role = decode.get('role')
        manager_id = decode.get('id')

        if manager_id != id or role != "hiring_manager":
            return jsonify({'msg': "Not Authorized to make changes"}), 403
        else:
            for key, value in data.items():
                # Use setattr to dynamically set attributes based on the request data
                setattr(manager, key, value)

            db.session.commit()
            return jsonify({'message': 'Hiring Manager updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@hiring_manager_bp.route('/delete/<int:id>', methods=['DELETE'])
def delete_jobseeker(id):
    try:
        manager = Hiringmanager.query.get_or_404(id)
        token = request.headers.get("Authorization")
        decode = jwt.decode(token, os.environ.get("SECRET_KEY"), algorithms=['HS256'])
        role = decode.get('role')
        manager_id = decode.get('id')

        if manager_id != id or role != "hiring_manager":
            return jsonify({'msg': "Not Authorized to make changes"}), 403
        else:
            db.session.delete(manager)
            db.session.commit()
            return jsonify(message='Hiring Manager deleted successfully'), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
