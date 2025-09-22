from http.server import BaseHTTPRequestHandler, HTTPServer
import json, time

class Handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        # Preflight CORS
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        if self.path != '/webhook':
            self.send_response(404)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            return
        length = int(self.headers.get('content-length', 0))
        raw = self.rfile.read(length) if length else b''
        try:
            data = json.loads(raw.decode('utf-8'))
        except Exception:
            data = {'raw': raw.decode('utf-8', 'ignore')}
        print('\n=== Payload recebido ===')
        print(json.dumps(data, ensure_ascii=False, indent=2))
        print('Timestamp server:', time.strftime('%Y-%m-%d %H:%M:%S'))
        resp = {'status': 'ok', 'received': True}
        body = json.dumps(resp).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(body)

if __name__ == '__main__':
    print('Servidor webhook ouvindo em http://localhost:5000/webhook')
    HTTPServer(('0.0.0.0', 5000), Handler).serve_forever()
