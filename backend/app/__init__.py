# backend/app/__init__.py
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'  # SQLiteデータベースのファイルパス
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    CORS(app)
    db.init_app(app)

    from .routes import api
    app.register_blueprint(api, url_prefix='/api')

    with app.app_context():
        db.create_all()  # データベース初期化

    return app
