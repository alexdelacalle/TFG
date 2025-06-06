import random
import string
from datetime import datetime, timedelta, timezone
import json
import time
from scapy.all import IP, TCP, Raw, sendp

paquete =  [
    {
    "_index": "packets-2025-05-17",
    "_type": "doc",
    "_score": "null",
    "_source": {
      "layers": {
        "frame": {
          "frame.encap_type": "15",
          "frame.time": "May 17, 2025 17:36:10.709987000 Hora de verano romance",
          "frame.time_utc": "May 17, 2025 15:36:10.709987000 UTC",
          "frame.time_epoch": "1747496170.709987000",
          "frame.offset_shift": "0.000000000",
          "frame.time_delta": "0.002798000",
          "frame.time_delta_displayed": "0.002798000",
          "frame.time_relative": "350.636192000",
          "frame.number": "2392",
          "frame.len": "44",
          "frame.cap_len": "44",
          "frame.marked": "0",
          "frame.ignored": "0",
          "frame.protocols": "null:ip:tcp:http:json"
        },
        "null": {
          "null.family": "2"
        },
        "ip": {
          "ip.version": "4",
          "ip.hdr_len": "20",
          "ip.dsfield": "0x00",
          "ip.dsfield_tree": {
            "ip.dsfield.dscp": "0",
            "ip.dsfield.ecn": "0"
          },
          "ip.len": "40",
          "ip.id": "0x9cb3",
          "ip.flags": "0x02",
          "ip.flags_tree": {
            "ip.flags.rb": "0",
            "ip.flags.df": "1",
            "ip.flags.mf": "0"
          },
          "ip.frag_offset": "0",
          "ip.ttl": "128",
          "ip.proto": "6",
          "ip.checksum": "0x0000",
          "ip.checksum.status": "2",
          "ip.src": "127.0.0.1",
          "ip.addr": "127.0.0.1",
          "ip.src_host": "127.0.0.1",
          "ip.dst": "127.0.0.1",
          "ip.dst_host": "127.0.0.1",
          "ip.host": "127.0.0.1",
          "ip.stream": "0"
        },
        "tcp": {
          "tcp.srcport": "8000",
          "tcp.dstport": "62313",
          "tcp.port": "8000",
          "tcp.stream": "45",
          "tcp.stream.pnum": "10",
          "tcp.completeness": "15",
          "tcp.completeness_tree": {
            "tcp.completeness.rst": "0",
            "tcp.completeness.fin": "0",
            "tcp.completeness.data": "1",
            "tcp.completeness.ack": "1",
            "tcp.completeness.syn-ack": "1",
            "tcp.completeness.syn": "1",
            "tcp.completeness.str": "··DASS"
          },
          "tcp.len": "0",
          "tcp.seq": "828",
          "tcp.seq_raw": "1851135896",
          "tcp.nxtseq": "829",
          "tcp.ack": "564",
          "tcp.ack_raw": "2785837812",
          "tcp.hdr_len": "20",
          "tcp.flags": "0x0011",
          "tcp.flags_tree": {
            "tcp.flags.res": "0",
            "tcp.flags.ae": "0",
            "tcp.flags.cwr": "0",
            "tcp.flags.ece": "0",
            "tcp.flags.urg": "0",
            "tcp.flags.ack": "1",
            "tcp.flags.push": "0",
            "tcp.flags.reset": "0",
            "tcp.flags.syn": "0",
            "tcp.flags.fin": "1",
            "tcp.flags.fin_tree": {
              "_ws.expert": {
                "tcp.connection.fin": "",
                "_ws.expert.message": "Connection finish (FIN)",
                "_ws.expert.severity": "2097152",
                "_ws.expert.group": "33554432"
              }
            },
            "tcp.flags.str": "·······A···F",
            "tcp.flags.str_tree": {
              "_ws.expert": {
                "tcp.connection.fin_active": "",
                "_ws.expert.message": "This frame initiates the connection closing",
                "_ws.expert.severity": "4194304",
                "_ws.expert.group": "33554432"
              }
            }
          },
          "tcp.window_size_value": "253",
          "tcp.window_size": "64768",
          "tcp.window_size_scalefactor": "256",
          "tcp.checksum": "0xef3a",
          "tcp.checksum.status": "2",
          "tcp.urgent_pointer": "0",
          "Timestamps": {
            "tcp.time_relative": "9.451133000",
            "tcp.time_delta": "0.003567000"
          }
        },
        "tcp.segments": {
          "tcp.segment": "2392",
          "tcp.segment.count": "3",
          "tcp.reassembled.length": "827",
          "tcp.reassembled.data": "48:54:54:50:2f:31:2e:31:20:32:30:30:20:4f:4b:0d:0a:48:6f:73:74:3a:20:6c:6f:63:61:6c:68:6f:73:74:3a:38:30:30:30:0d:0a:44:61:74:65:3a:20:53:61:74:2c:20:31:37:20:4d:61:79:20:32:30:32:35:20:31:35:3a:33:36:3a:31:30:20:47:4d:54:0d:0a:43:6f:6e:6e:65:63:74:69:6f:6e:3a:20:63:6c:6f:73:65:0d:0a:58:2d:50:6f:77:65:72:65:64:2d:42:79:3a:20:50:48:50:2f:38:2e:33:2e:31:39:0d:0a:45:54:61:67:3a:20:64:65:34:61:64:65:32:63:31:61:61:31:30:66:64:63:37:34:38:64:64:63:33:61:35:38:66:62:65:32:32:34:0d:0a:43:61:63:68:65:2d:43:6f:6e:74:72:6f:6c:3a:20:70:72:69:76:61:74:65:0d:0a:43:6f:6e:74:65:6e:74:2d:54:79:70:65:3a:20:61:70:70:6c:69:63:61:74:69:6f:6e:2f:6a:73:6f:6e:0d:0a:41:63:63:65:73:73:2d:43:6f:6e:74:72:6f:6c:2d:45:78:70:6f:73:65:2d:48:65:61:64:65:72:73:3a:20:2a:0d:0a:41:63:63:65:73:73:2d:43:6f:6e:74:72:6f:6c:2d:45:78:70:6f:73:65:2d:48:65:61:64:65:72:73:3a:20:41:75:74:68:6f:72:69:7a:61:74:69:6f:6e:0d:0a:41:63:63:65:73:73:2d:43:6f:6e:74:72:6f:6c:2d:45:78:70:6f:73:65:2d:48:65:61:64:65:72:73:3a:20:45:54:61:67:0d:0a:41:63:63:65:73:73:2d:43:6f:6e:74:72:6f:6c:2d:41:6c:6c:6f:77:2d:4f:72:69:67:69:6e:3a:20:2a:0d:0a:41:63:63:65:73:73:2d:43:6f:6e:74:72:6f:6c:2d:41:6c:6c:6f:77:2d:4d:65:74:68:6f:64:73:3a:20:47:45:54:2c:48:45:41:44:2c:4f:50:54:49:4f:4e:53:2c:44:45:4c:45:54:45:2c:50:55:54:0d:0a:41:63:63:65:73:73:2d:43:6f:6e:74:72:6f:6c:2d:41:6c:6c:6f:77:2d:48:65:61:64:65:72:73:3a:20:2a:0d:0a:41:63:63:65:73:73:2d:43:6f:6e:74:72:6f:6c:2d:41:6c:6c:6f:77:2d:43:72:65:64:65:6e:74:69:61:6c:73:3a:20:74:72:75:65:0d:0a:43:6f:6e:74:65:6e:74:2d:53:65:63:75:72:69:74:79:2d:50:6f:6c:69:63:79:3a:20:66:72:61:6d:65:2d:61:6e:63:65:73:74:6f:72:73:20:27:6e:6f:6e:65:27:0d:0a:0d:0a:7b:22:70:65:72:73:6f:6e:22:3a:7b:22:69:64:22:3a:31:2c:22:6e:61:6d:65:22:3a:22:4c:69:6e:75:73:20:54:6f:72:76:61:6c:64:73:22:2c:22:62:69:72:74:68:44:61:74:65:22:3a:22:31:39:36:39:2d:31:32:2d:32:38:22:2c:22:64:65:61:74:68:44:61:74:65:22:3a:22:32:30:32:35:2d:30:35:2d:30:38:22:2c:22:69:6d:61:67:65:55:72:6c:22:3a:22:68:74:74:70:73:3a:5c:2f:5c:2f:75:70:6c:6f:61:64:2e:77:69:6b:69:6d:65:64:69:61:2e:6f:72:67:5c:2f:77:69:6b:69:70:65:64:69:61:5c:2f:63:6f:6d:6d:6f:6e:73:5c:2f:64:5c:2f:64:32:5c:2f:4c:69:6e:75:73:5f:54:6f:72:76:61:6c:64:73:2e:6a:70:65:67:22:2c:22:77:69:6b:69:55:72:6c:22:3a:22:68:74:74:70:73:3a:5c:2f:5c:2f:65:73:2e:77:69:6b:69:70:65:64:69:61:2e:6f:72:67:5c:2f:77:69:6b:69:5c:2f:4c:69:6e:75:73:5f:54:6f:72:76:61:6c:64:73:22:2c:22:70:72:6f:64:75:63:74:73:22:3a:5b:32:2c:37:5d:2c:22:65:6e:74:69:74:69:65:73:22:3a:5b:31:5d:7d:7d"
        },
        "http": {
          "HTTP/1.1 200 OK\\r\\n": {
            "http.response.version": "HTTP/1.1",
            "http.response.code": "200",
            "http.response.code.desc": "OK",
            "http.response.phrase": "OK"
          },
          "http.host": "localhost:8000",
          "http.response.line_host": "Host: localhost:8000\r\n",
          "http.date": "Sat, 17 May 2025 15:36:10 GMT",
          "http.connection": "close",
          "http.response.line_2": "Connection: close\r\n",
          "http.response.line_3": "X-Powered-By: PHP/8.3.19\r\n",
          "http.response.line_Etag": "ETag: de4ade2c1aa10fdc748ddc3a58fbe224\r\n",
          "http.cache_control": "private",
          "http.response.line_5": "Cache-Control: private\r\n",
          "http.content_type": "application/json",
          "http.response.line_6": "Content-Type: application/json\r\n",
          "http.response.line_7": "Access-Control-Expose-Headers: *\r\n",
          "http.response.line_8": "Access-Control-Expose-Headers: Authorization\r\n",
          "http.response.line_9": "Access-Control-Expose-Headers: ETag\r\n",
          "http.response.line_10": "Access-Control-Allow-Origin: *\r\n",
          "http.response.line_11": "Access-Control-Allow-Methods: GET,HEAD,OPTIONS,DELETE,PUT\r\n",
          "http.response.line_12": "Access-Control-Allow-Headers: *\r\n",
          "http.response.line_13": "Access-Control-Allow-Credentials: true\r\n",
          "http.response.line_14": "Content-Security-Policy: frame-ancestors 'none'\r\n",
          "\\r\\n": "",
          "http.response": "1",
          "http.request_in": "2357",
          "http.time": "0.442484000",
          "http.request.uri": "/api/v1/persons/1",
          "http.request.full_uri": "http://localhost:8000/api/v1/persons/1",
          "http.file_data": "7b:22:70:65:72:73:6f:6e:22:3a:7b:22:69:64:22:3a:31:2c:22:6e:61:6d:65:22:3a:22:4c:69:6e:75:73:20:54:6f:72:76:61:6c:64:73:22:2c:22:62:69:72:74:68:44:61:74:65:22:3a:22:31:39:36:39:2d:31:32:2d:32:38:22:2c:22:64:65:61:74:68:44:61:74:65:22:3a:22:32:30:32:35:2d:30:35:2d:30:38:22:2c:22:69:6d:61:67:65:55:72:6c:22:3a:22:68:74:74:70:73:3a:5c:2f:5c:2f:75:70:6c:6f:61:64:2e:77:69:6b:69:6d:65:64:69:61:2e:6f:72:67:5c:2f:77:69:6b:69:70:65:64:69:61:5c:2f:63:6f:6d:6d:6f:6e:73:5c:2f:64:5c:2f:64:32:5c:2f:4c:69:6e:75:73:5f:54:6f:72:76:61:6c:64:73:2e:6a:70:65:67:22:2c:22:77:69:6b:69:55:72:6c:22:3a:22:68:74:74:70:73:3a:5c:2f:5c:2f:65:73:2e:77:69:6b:69:70:65:64:69:61:2e:6f:72:67:5c:2f:77:69:6b:69:5c:2f:4c:69:6e:75:73:5f:54:6f:72:76:61:6c:64:73:22:2c:22:70:72:6f:64:75:63:74:73:22:3a:5b:32:2c:37:5d:2c:22:65:6e:74:69:74:69:65:73:22:3a:5b:31:5d:7d:7d"
        },
        "json": {
          "json.object": "{\"person\":{\"id\":1,\"name\":\"Linus Torvalds\",\"birthDate\":\"1969-12-28\",\"deathDate\":\"2025-05-08\",\"imageUrl\":\"https:\\/\\/upload.wikimedia.org\\/wikipedia\\/commons\\/d\\/d2\\/Linus_Torvalds.jpeg\",\"wikiUrl\":\"https:\\/\\/es.wikipedia.org\\/wiki\\/Linus_Torvalds\",\"products\":[2,7],\"entities\":[1]}}"
        }
      }
    }
  }]

def random_token(length=128):
    return ''.join(random.choices(string.ascii_letters + string.digits + "-_.", k=length))

def random_date():
    base = datetime.now(timezone.utc)
    rand_date = base - timedelta(days=random.randint(0, 365))
    return rand_date.strftime('%a, %d %b %Y %H:%M:%S GMT')

def random_etag():
    return ''.join(random.choices('abcdef0123456789', k=32))

def random_php_version():
    return f"{random.randint(7, 8)}.{random.randint(0, 4)}.{random.randint(0, 25)}"

def generate_http_body():
    connection_type = "keep-alive" if random.random() > 0.5 else "close"
    cache_control = "no-cache" if random.random() > 0.5 else "no-store"
    uri= random_uri()
    return {
        "http.response.version": "HTTP/1.1",
        "http.response.code": "200",
        "http.response.code.desc": "OK",
        "http.response.phrase": "OK",
        "http.host": "10.10.2.102:8001",
        "http.date": random_date(),
        "http.connection": connection_type,
        "http.content_type": "application/json",
        "http.cache_control": cache_control,
        "http.response.line.Host": "Host: 10.10.2.102:8001\r\n",
        "http.response.line.Connection": f"Connection: {connection_type}\r\n",
        "http.response.line.X-Powered-By": f"X-Powered-By: PHP/{random_php_version()}\r\n",
        "http.response.line.Content-Type": "Content-Type: application/json\r\n",
        "http.response.line.ETag": f"ETag: {random_etag()}\r\n",
        "http.response.line.Cache-Control": f"Cache-Control: {cache_control}\r\n",
        "http.response.line.Authorization": f"Authorization: Bearer {random_token(256)}\r\n",
        "http.response.line.Access-Control-Expose-Headers": "Access-Control-Expose-Headers: Authorization, ETag, *\r\n",
        "http.response.line.Access-Control-Allow-Origin": "Access-Control-Allow-Origin: *\r\n",
        "http.response.line.Access-Control-Allow-Methods": "Access-Control-Allow-Methods: OPTIONS,POST\r\n",
        "http.response.line.Access-Control-Allow-Headers": "Access-Control-Allow-Headers: *\r\n",
        "http.response.line.Access-Control-Allow-Credentials": "Access-Control-Allow-Credentials: true\r\n",
        "http.response.line.Content-Security-Policy": "Content-Security-Policy: frame-ancestors 'none'\r\n",
        "http.response.line.X-Fake-Server": f"X-Fake-Server: Server-{random.randint(100,999)}-EU\r\n",
        "http.response.line.X-Custom-Trace-ID": f"X-Custom-Trace-ID: {random_token(16)}\r\n",
        "http.response": "1",
        "http.request_in": str(random.randint(1000, 9999)),
        "http.time": f"{random.uniform(0.1, 1.0):.6f}",
        "http.request.uri": uri,
        "http.request.full_uri": f"http://localhost:8001{uri}",
    }

def random_uri():
    paths = ["/access_token", "/api/v1/product", "/api/v1/person", "/api/v1/entity"]
    return random.choice(paths)

def random_object():
    objects = ["product", "person", "entity"]
    return random.choice(objects)


def deterministic_date(seed, start_year=1950, end_year=2025):
    start = datetime(start_year, 1, 1)
    end = datetime(end_year, 12, 31)
    delta = end - start
    offset = (hash(seed) % delta.days)
    return (start + timedelta(days=offset)).strftime("%Y-%m-%d")

def generate_object(entity_type, obj_id=random.randint(1, 1000)):
    base = {
        "id": obj_id,
        "name": None,
        "birthDate": None,
        "deathDate": None
    }

    if entity_type == "person":
        first_names = ["Alice", "Bob", "Carol", "David", "Eva", "Frank"]
        last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia"]
        name = f"{first_names[obj_id % len(first_names)]} {last_names[obj_id % len(last_names)]}"
        base["name"] = name
        base["birthDate"] = deterministic_date(name + "birth", 1940, 2000)
        if obj_id % 3 == 0:
            base["deathDate"] = deterministic_date(name + "death", 2001, 2025)

    elif entity_type == "entity":
        entity_types = ["Organization", "Government", "Company", "Non-Profit"]
        names = ["OpenAI", "NASA", "UNICEF", "Acme Corp", "Globex"]
        name = names[obj_id % len(names)]
        base["name"] = name
        base["birthDate"] = entity_types[obj_id % len(entity_types)]
        base["deathDate"] = deterministic_date(name + "death", 1900, 2020)

    elif entity_type == "product":
        product_names = ["Linux", "Windows", "macOS", "Ubuntu", "Fedora"]
        
        name = product_names[obj_id % len(product_names)]
        base["name"] = name
        base["birthDate"] = deterministic_date(name + "birth", 1980, 2010)
        if obj_id % 10 == 0:
            base["deathDate"] = deterministic_date(name + "death", 2023, 2025)
        
    

    return {entity_type: base}

def generate_http_body_json(entity_type=random_object(), obj_id=random.randint(1, 1000)):
    content = generate_object(entity_type, obj_id)
    json_str = json.dumps(
        {"products": [content["product"]]} if entity_type == "product" else {entity_type + "s": [content[entity_type]]},
        ensure_ascii=False
    )
    return {
        "json": {
            "json.object": json_str
        }
    }



    

def modificar_paquete(paquete):
    modificado = json.loads(json.dumps(paquete))
    for paquete in modificado:
        layers = paquete["_source"]["layers"]
        if "ip" in layers:
            src = f"10.10.2.34"
            dst = f"127.0.0.{random.randint(2, 254)}"
            layers["ip"]["ip.src"] = src
            layers["ip"]["ip.dst"] = dst
            layers["ip"]["ip.addr"] = src
            layers["ip"]["ip.src_host"] = src
            layers["ip"]["ip.dst_host"] = dst
            layers["ip"]["ip.host"] = dst

        if "tcp" in layers:
            try:
                layers["tcp"]["tcp.srcport"] = str(int(layers["tcp"]["tcp.srcport"]) + random.randint(1, 100))
                layers["tcp"]["tcp.dstport"] = str(int(layers["tcp"]["tcp.dstport"]) + random.randint(1, 100))
            except ValueError:
                pass  

        if "frame" in layers:
            try:
                epoch = float(layers["frame"]["frame.time_epoch"])
                nuevo_epoch = epoch + random.uniform(0.1, 10.0)
                nueva_fecha = datetime.now(timezone.utc)

                layers["frame"]["frame.time_epoch"] = f"{nuevo_epoch:.9f}"
                layers["frame"]["frame.time_utc"] = nueva_fecha.strftime("%b %d, %Y %H:%M:%S.%f")[:-3] + " UTC"
                layers["frame"]["frame.time"] = nueva_fecha.strftime("%b %d, %Y %H:%M:%S.%f")[:-3] + " Hora de verano romance"
            except (ValueError, KeyError):
                pass

            try:
                layers["frame"]["frame.number"] = str(int(layers["frame"]["frame.number"]) + random.randint(1, 50))
            except ValueError:
                pass

            if "frame.protocols" in layers["frame"]:
                protocolos = layers["frame"]["frame.protocols"].split(":")
                random.shuffle(protocolos)
                layers["frame"]["frame.protocols"] = ":".join(protocolos)
        if "http" in layers:
            http = layers["http"]
            http.update(generate_http_body())
            
            if "json" in layers:
                layers["json"] = generate_http_body_json()

    return modificado

def json_to_scapy_packet(packet_json):
    layers = packet_json["_source"]["layers"]
    
    ip_layer = IP(src=layers["ip"].get("ip.src", "127.0.0.1"),
                  dst=layers["ip"].get("ip.dst", "127.0.0.1")) if "ip" in layers else None

    tcp_layer = TCP(sport=int(layers["tcp"].get("tcp.srcport", 1234)),
                    dport=int(layers["tcp"].get("tcp.dstport", 80))) if "tcp" in layers else None

    http_lines = []
    http = layers.get("http", {})
    for key in sorted(http.keys()):
        if key.startswith("http.response.line.") or key.startswith("http.response.line"):
            http_lines.append(http[key].strip())
    http_payload = "\r\n".join(http_lines) + "\r\n\r\n"
    
    if "json" in layers and "json.object" in layers["json"]:
        http_payload += layers["json"]["json.object"]

    if ip_layer and tcp_layer:
        packet = ip_layer / tcp_layer / Raw(load=http_payload.encode('utf-8'))
    elif ip_layer:
        packet = ip_layer / Raw(load=http_payload.encode('utf-8'))
    else:
        packet = Raw(load=http_payload.encode('utf-8'))

    return packet
while True:
    
  try:
      
      paquete_modificado = modificar_paquete(paquete)
      paquete_scapy = json_to_scapy_packet(paquete_modificado[0])
      sendp(paquete_scapy, verbose=False,iface="eth0")
      time.sleep(1)  
  
  except Exception as e:
      print(f"Error al modificar el paquete: {e}")