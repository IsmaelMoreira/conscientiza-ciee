import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from datetime import datetime
from mangum import Mangum
from supabase import create_client

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = Flask(__name__, template_folder="../templates", static_folder="../static")
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/registro", methods=["POST"])
def registro():
    ip = request.headers.get("x-forwarded-for", request.remote_addr)
    aceitou = request.json.get("aceitou", False)
    data_hora = datetime.now().isoformat()

    supabase.table("registros").insert({
        "ip": ip,
        "aceitou": aceitou,
        "data_hora": data_hora
    }).execute()

    return jsonify({"status": "ok"})

handler = Mangum(app)
