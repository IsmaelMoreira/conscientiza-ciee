from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from datetime import datetime
from mangum import Mangum
import os
import sqlite3

app = Flask(__name__, template_folder="../templates", static_folder="../static")
CORS(app)

# Caminho do banco de dados
DB_PATH = os.path.join(os.path.dirname(__file__), "database.db")

# Inicializa o banco
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS registros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip TEXT,
            aceitou BOOLEAN,
            data_hora TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

# Rota principal
@app.route("/")
def index():
    return render_template("index.html")

# Rota para registrar IP e consentimento
@app.route("/registro", methods=["POST"])
def registro():
    ip = request.headers.get("x-forwarded-for", request.remote_addr)
    aceitou = request.json.get("aceitou", False)
    data_hora = datetime.now().isoformat()

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("INSERT INTO registros (ip, aceitou, data_hora) VALUES (?, ?, ?)", (ip, aceitou, data_hora))
    conn.commit()
    conn.close()

    return jsonify({"status": "ok"})

handler = Mangum(app)
