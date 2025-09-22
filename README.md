# Formulário de Análise de Marketing - Lovable.dev

## 🚀 **FORMULÁRIO PROFISSIONAL INTEGRADO COM WEBHOOK**

Formulário React completo para análise de marketing empresarial, totalmente integrado com sistema de webhook para processamento automático dos dados.

## 🎯 **Características**

✅ **Visual extremamente profissional** - Interface moderna e responsiva
✅ **8 seções organizadas** - 24 perguntas estratégicas otimizadas
✅ **Integração com webhook** - Envio automático para sistema de análise
✅ **Página de sucesso** - UX completa com próximos passos
✅ **URL gratuita** - `analise-marketing.lovable.app`
✅ **Deploy automático** - Atualizações instantâneas

## 🔧 **Configuração do Webhook e Variáveis (.env)**

Agora o formulário lê a URL do webhook de `import.meta.env.VITE_WEBHOOK_URL`.

### 1. Criar `.env` local

Crie um arquivo `.env` na raiz do projeto (já existe exemplo):

```
VITE_WEBHOOK_URL=http://localhost:5000/webhook
VITE_WHATSAPP_NUMBER=5511999999999
```

### 2. Subir backend local (exemplo rápido Python)

Crie `webhook_server.py` (exemplo simples sem dependências externas):

```python
from http.server import BaseHTTPRequestHandler, HTTPServer
import json, time

class Handler(BaseHTTPRequestHandler):
  def do_POST(self):
    if self.path != '/webhook':
      self.send_response(404); self.end_headers(); return
    length = int(self.headers.get('content-length', 0))
    body = self.rfile.read(length) if length else b''
    try:
      data = json.loads(body.decode('utf-8'))
    except Exception:
      data = {'raw': body.decode('utf-8', 'ignore')}
    print('\n=== Payload recebido ===')
    print(json.dumps(data, ensure_ascii=False, indent=2))
    print('Timestamp server:', time.strftime('%Y-%m-%d %H:%M:%S'))
    # Resposta
    resp = {'status': 'ok', 'received': True}
    resp_bytes = json.dumps(resp).encode('utf-8')
    self.send_response(200)
    self.send_header('Content-Type', 'application/json')
    self.send_header('Content-Length', str(len(resp_bytes)))
    self.send_header('Access-Control-Allow-Origin', '*')
    self.end_headers()
    self.wfile.write(resp_bytes)

if __name__ == '__main__':
  print('Servidor webhook ouvindo em http://localhost:5000/webhook')
  HTTPServer(('0.0.0.0', 5000), Handler).serve_forever()
```

Execute:
```bash
python webhook_server.py
```

### 3. Expor com ngrok (opcional para testes externos)
```bash
ngrok http 5000
```
Copie a URL HTTPS gerada e atualize no `.env`:
```
VITE_WEBHOOK_URL=https://seu-subdominio.ngrok.app/webhook
```
Reinicie `npm run dev` (Vite precisa reler variáveis).

### 4. Produção

Defina `VITE_WEBHOOK_URL` com a URL real do backend (por exemplo em provedor / secrets de deploy) e faça build:
```bash
npm run build && npm run preview
```

### 5. WhatsApp na página de sucesso

O número usado no botão é lido de `VITE_WHATSAPP_NUMBER`. Basta alterar no `.env`.

## 📊 **Estrutura dos Dados Enviados**

O webhook recebe dados neste formato JSON:
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "lovable_form", 
  "data": {
    "nome_empresa": "Minha Empresa LTDA",
    "tipo_negocio": "Loja Física",
    "proposta_valor": "Ajudamos pequenos empresários...",
    // ... todos os 24 campos do formulário
  }
}
```

Observação: arrays multi-seleção são enviados como string única (itens separados por vírgula) para simplificar ingestão inicial. Você pode ajustar no backend conforme necessidade.

## Project info

**URL**: https://lovable.dev/projects/6f08d68a-c924-4694-9aa5-e75399c8e631

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/6f08d68a-c924-4694-9aa5-e75399c8e631) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6f08d68a-c924-4694-9aa5-e75399c8e631) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
