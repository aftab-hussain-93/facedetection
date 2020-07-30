from flask import Flask
from api.config import Config
from flask_sqlalchemy import SQLAlchemy 
from flask_bcrypt import Bcrypt 
from flask_marshmallow import Marshmallow 

db = SQLAlchemy()
bcrypt = Bcrypt()
ma = Marshmallow()

def create_app(config_class=Config):
	app = Flask(__name__)
	app.config.from_object(Config)
	db.init_app(app)
	bcrypt.init_app(app)
	ma.init_app(app)
	from api.blueprints.auth.routes import auth
	app.register_blueprint(auth)
	with app.app_context():
		db.create_all()
	return app

# Use this while making calls to URLs that are absolute and you want to avoid the CORs error
# @app.route('/', methods=['OPTIONS','GET'])
# def greeting():
#     if request.method == 'OPTIONS': 
#         return build_preflight_response()
#     elif request.method == 'GET': 
#         return build_actual_response(jsonify({ 'message': 'Eric Helooo' }))

# def build_preflight_response():
# 	"""
# 	Use this if you are making calls to absolute URLs
# 	"""
#     response = make_response()
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     response.headers.add('Access-Control-Allow-Headers', "*")
#     response.headers.add('Access-Control-Allow-Methods', "*")
#     return response

# def build_actual_response(response):
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     return response