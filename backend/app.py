from flask import Flask
from flask_cors import CORS
from routes.search import search_bp
from routes.admin import admin_bp

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(search_bp, url_prefix='/search')
app.register_blueprint(admin_bp, url_prefix='/admin')

if __name__ == '__main__':
    app.run(debug=True)
