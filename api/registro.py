import os
from supabase import create_client
from datetime import datetime

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def handler(request, context):
    try:
        data = request.json
        ip = request.headers.get("x-forwarded-for", "0.0.0.0")
        aceitou = data.get("aceitou", False)

        supabase.table("registros").insert({
            "ip": ip,
            "aceitou": aceitou,
            "data_hora": datetime.now().isoformat()
        }).execute()

        return {"status": 200, "body": {"status": "ok"}}

    except Exception as e:
        return {"status": 500, "body": {"status": "erro", "mensagem": str(e)}}
