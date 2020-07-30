from flask import Blueprint, jsonify, request
from api.models import User, UserSchema
from api import bcrypt, db

auth = Blueprint('auth',__name__)

@auth.route('/signin', methods = ['POST'])
def signin():
    user_schema = UserSchema()
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email:
        return jsonify({'error':'no credentials provided'}), 400
    user = User.query.filter_by(email=email).first()
    isAuthenticated = user.check_password(password) if user else False
    if isAuthenticated:
       # Send the marshmallow serialized object back
       output = user_schema.dump(user)
       return jsonify({"user":output})
    else:
       return jsonify({"error":"not a user"})

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    password = data.get('password')
    email = data.get('email')
    if not name or not password or not email:
        return jsonify({'error':'no name provided'}), 400

    user = User.query.filter_by(name=name).first()
    if user:
        return jsonify({'error':'Invalid name. Already exists.'}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'error':'Invalid email address. Already exists.'}), 400

    new_user = User(name=name, email=email, password=password, entries=0)
    new_user.hash_password()
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'user' :f'{email}' }), 201

@auth.route('/image', methods=['PUT'])
def image():
	# Check if ID should be provided in the body
	print("Entering image")
	user_id = int(request.get_json().get('id', 0))
	print("user id", user_id)
	user = [user for user in database if user["id"] == user_id]
	if user:
		usr = user[0]
		usr["entries"] += 1
		return jsonify(usr.get("entries"))

@auth.route('/users')
def users():
    users = User.query.all()
    user_schema = UserSchema(many=True)
    output = user_schema.dump(users)
    return jsonify({"users":output})


