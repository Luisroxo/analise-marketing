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

## 🔧 **Configuração do Webhook**

### **1. Desenvolvimento Local**

1. **Configure o ngrok** para expor seu webhook local:
```bash
ngrok http 5000
```

2. **Copie a URL gerada** (ex: `https://abc123.ngrok.app`)

3. **Atualize o arquivo** `src/components/MarketingAnalysisForm.tsx`:
```tsx
const webhookUrl = 'https://abc123.ngrok.app/webhook'; // Linha ~185
```

### **2. Produção**

Substitua a URL na mesma linha pela URL do seu servidor em produção.

### **3. Configurar WhatsApp**

No arquivo `src/pages/Success.tsx`, linha 10:
```tsx
const phoneNumber = "5511999999999"; // Substitua pelo seu número
```

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
