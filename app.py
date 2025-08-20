from flask import Flask, render_template, request
from datetime import datetime

app = Flask(__name__)

# Rota principal
@app.route("/")
def index():
    return render_template("index.html")

# Rota para registrar IP e consentimento
@app.route("/registro", methods=["POST"])
def registro():
    ip = request.remote_addr
    aceitou = request.json.get("aceitou", False)
    with open("registro.txt", "a") as f:
        f.write(f"[{datetime.now().isoformat()}] IP: {ip} aceitou: {aceitou}\n")
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(debug=True)
