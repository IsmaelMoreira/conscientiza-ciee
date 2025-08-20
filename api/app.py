import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from datetime import datetime
from mangum import Mangum
from supabase import create_client, Client

# --- Configuração direta ---
SUPABASE_URL = "https://kcdgimmlegvcritxaupt.supabase.co"
SUPABASE_KEY = "sb_secret_WBJlWyjU3nT7DBHR3BcH-w_iOMKQUkH"

# Cria client Supabase
try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    raise RuntimeError(f"Falha ao criar client Supabase: {e}")

# Inicializa Flask
app = Flask(__name__, template_folder="../templates", static_folder="../static")
CORS(app)

# Rota principal
@app.route("/")
def index():
    return render_template("index.html")

# Rota de registro de IP e consentimento
@app.route("/registro", methods=["POST"])
def registro():
    ip = request.headers.get("x-forwarded-for", request.remote_addr)
    aceitou = request.json.get("aceitou", False)
    data_hora = datetime.now().isoformat()

    try:
        supabase.table("registros").insert({
            "ip": ip,
            "aceitou": aceitou,
            "data_hora": data_hora
        }).execute()
    except Exception as e:
        return jsonify({"status": "erro", "mensagem": str(e)}), 500

    return jsonify({"status": "ok"})

# Adaptador serverless para Vercel
handler = Mangum(app)
