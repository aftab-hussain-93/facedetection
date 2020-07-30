import os

class Config:
	SECRET_KEY = 'secret key'
	SQLALCHEMY_TRACK_MODIFICATIONS = False
	SQLALCHEMY_DATABASE_URI = r"sqlite:///test.db"