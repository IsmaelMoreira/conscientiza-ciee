import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from datetime import datetime
from mangum import Mangum
from supabase import create_client, Client

# --- Pegar variáveis de ambiente ---
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise EnvironmentError("As variáveis SUPABASE_URL e SUPABASE_KEY não estão definidas no ambiente Vercel.")

# --- Criar client Supabase ---
try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    raise RuntimeError(f"Falha ao criar client Supabase: {e}")

# --- Inicializar Flask ---
app = Flask(__name__, template_folder="../templates", static_folder="../static")
CORS(app)

# --- Logs para debugar ---
@app.before_request
def log_request_info():
    print(f"[DEBUG] Request: {request.method} {request.path}")

# --- Rota principal ---
@app.route("/")
def index():
    return render_template("index.html")

# --- Rota de registro ---
@app.route("/registro", methods=["POST"])
def registro():
    ip = request.headers.get("x-forwarded-for", request.remote_addr)
    aceitou = request.json.get("aceitou", False)
    data_hora = datetime.now().isoformat()

    try:
        response = supabase.table("registros").insert({
            "ip": ip,
            "aceitou": aceitou,
            "data_hora": data_hora
        }).execute()
        print(f"[DEBUG] Supabase response: {response}")
    except Exception as e:
        print(f"[ERROR] Falha ao inserir no Supabase: {e}")
        return jsonify({"status": "erro", "mensagem": str(e)}), 500

    return jsonify({"status": "ok"})

# --- Adaptador serverless ---
handler = Mangum(app)
