import json 
import re
import joblib
import subprocess
import time
import os
from urllib.parse import unquote
from datetime import datetime

model = joblib.load("/root/xss_detection_model.pkl")
signatures = [
    "Login attempt detected",
    "Login attempt failed",
    "GET /persons/ accessed",
    "POST /persons/ accessed",
    "PUT /persons/ accessed",
    "DELETE /persons/ accessed",
    "GET /products/ accessed",
    "POST /products/ accessed",
    "PUT /products/ accessed",
    "DELETE /products/ accessed",
    "GET /asociaciones/ accessed",
    "POST /asociaciones/ accessed",
    "PUT /asociaciones/ accessed",
    "DELETE /asociaciones/ accessed",
    "GET /entities/ accessed",
    "POST /entities/ accessed",
    "PUT /entities/ accessed",
    "DELETE /entities/ accessed"
]

palabras_clave = [
    "username", "password", "name", "birthDate", "deathDate", "wikiUrl", "imageUrl",
    "entities", "products", "birthPlace", "deathPlace", "placeOfBirth", "placeOfDeath",
    "placeOfOrigin", "placeOfBurial"
]

def clean_text(text):
    text = text.lower()
    text = re.sub(r'&[a-z]+;', '', text)  
    text = re.sub(r'&#[0-9]+;', '', text)  
    for palabra in palabras_clave:
        text = re.sub(re.escape(palabra.lower()), '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text 

def apply_iptables_rule(ip_source):
    command = [
        "iptables", "-t", "nat", "-A", "PREROUTING",
        "-p", "tcp",
        "-s", ip_source,
        "-j", "DNAT",
        "--to-destination", "172.16.0.14"
    ]
    try:
        subprocess.run(command, check=True)
        print(f"Regla iptables aplicada para {ip_source}")
    except subprocess.CalledProcessError as e:
        print(f"Error al aplicar iptables: {e}")

def log_xss_detection(ip, payload):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_entry = {
        "timestamp": timestamp,
        "ip": ip,
        "payload": payload
    }
    with open("xss_detected.log", "a") as log_file:
        log_file.write(json.dumps(log_entry) + "\n")

def detect_xss(script, ip_source):
    script_clean = clean_text(script)
    prediction = model.predict([script_clean])
    if prediction[0] == 1:
        print(f"Script Malicioso {script} Detectado en IP {ip_source}!")
        apply_iptables_rule(ip_source)
        log_xss_detection(ip_source, script)
        return f"XSS Detectado: IP {ip_source} Bloqueada"
    else:
        print(f"Script Seguro Detectado en IP {ip_source}.")
        return "Script Seguro"

def monitor_eve_json(file_path="/var/log/suricata/eve.json"):
    with open(file_path, "r") as file:
        file.seek(0, os.SEEK_END)
        while True:
            line = file.readline()
            if not line:
                time.sleep(1)
                continue
            try:
                event = json.loads(line)
                ip_source = event.get('src_ip', '')
                if event.get("event_type") == "alert":
                    print(f"Alerta de Suricata - IP: {ip_source}")
                    alert = event.get("alert", {})
                    if alert.get("signature") in signatures:
                        http = event.get('http', {})
                        url = http.get('url', '')
                        user_agent = http.get('http_user_agent', '')
                        content_type = http.get('http_content_type', '')
                        hostname = http.get('hostname', '')
                        api_query = http.get('http_request_body_printable', '')
                        api_query_decoded = unquote(api_query)
                        print(f"Analizando api_query: {api_query_decoded} desde IP {ip_source}...")
                        detect_xss(api_query_decoded, ip_source)
                        full_http_content = f"URL: {url} | Agent: {user_agent} | Type: {content_type} | Host: {hostname} | api_query: {api_query_decoded}"
                        print(f"Procesando HTTP - IP: {ip_source} - Contenido: {full_http_content}")
                        detect_xss(full_http_content, ip_source)
            except json.JSONDecodeError:
                print("Error al decodificar línea JSON")

if __name__ == "__main__":
    monitor_eve_json()
