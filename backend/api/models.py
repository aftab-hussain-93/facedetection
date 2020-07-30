from api import db, bcrypt, ma
from flask import current_app
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

class Base(db.Model):
	__abstract__ = True

	id = db.Column(db.Integer, primary_key=True)
	date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
	date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

class User(Base):
	name = db.Column(db.String, nullable=False)
	password = db.Column(db.String, nullable=False)
	email = db.Column(db.String, nullable=False, unique=True)
	entries = db.Column(db.Integer)

	def hash_password(self):
		self.password = bcrypt.generate_password_hash(self.password).decode('utf8')

	def check_password(self, password):
		return bcrypt.check_password_hash(self.password, password)

	def get_login_token(self, expires_sec=1800):
		s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
		return s.dumps({'user_id':self.id}).decode('utf-8')

	@staticmethod
	def verify_token(token):
		s = Serializer(current_app.config['SECRET_KEY'])
		try:
			user_id = s.loads(token)['user_id']
		except:
			return None
		return User.query.get(user_id)
	
	def __repr__(self):
		return f"Username - {self.name}"

class UserSchema(ma.SQLAlchemySchema):
	class Meta:
		model = User
	id = ma.auto_field()
	name = ma.auto_field()
	entries = ma.auto_field()
	email = ma.auto_field()
