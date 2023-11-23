from flask import Flask
from .extension import db
from .models import *
from .routes.jobseeker import Jobseeker_bp
from .routes.hiringmanager import hiring_manager_bp
from .routes.jobposting import Jobposting_bp
from .routes.application import Application_bp
def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///apexrecruit.sqlite3'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['DEBUG'] = True  # Add this line to enable debug mode

    db.init_app(app)

    @app.route("/")
    def home():
        return "Welcome to Apex Recruit"
    
    app.register_blueprint(Jobseeker_bp)
    app.register_blueprint(hiring_manager_bp)
    app.register_blueprint(Jobposting_bp)
    app.register_blueprint(Application_bp)
    
    
    # This will create the database tables based on your models
    with app.app_context():
        db.create_all()
    return app