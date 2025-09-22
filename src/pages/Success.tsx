import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle, MessageCircle, Home, Clock } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    const phoneNumber = "5511999999999"; // ⚠️ SUBSTITUA pelo seu número do WhatsApp
    const message = "Olá! Acabei de enviar o formulário de análise de marketing e gostaria de agendar uma conversa.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/5 via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="max-w-2xl mx-auto p-8 text-center bg-card/80 backdrop-blur-sm border-0 shadow-elegant">
        <div className="mb-6">
          <div className="bg-success/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Análise Enviada com Sucesso! 🎉
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            Recebemos sua análise de marketing e nossa equipe já está trabalhando 
            para criar estratégias personalizadas para seu negócio.
          </p>
        </div>

        <div className="bg-primary/5 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">📋 Próximos Passos:</h2>
          <div className="text-left space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">1</span>
              </div>
              <p className="text-sm">
                <strong>Análise dos dados</strong> - Nossa equipe processará suas informações (2-4 horas)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">2</span>
              </div>
              <p className="text-sm">
                <strong>Estratégia personalizada</strong> - Criação do plano específico para seu negócio (12-24h)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">3</span>
              </div>
              <p className="text-sm">
                <strong>Contato direto</strong> - Enviaremos suas recomendações via WhatsApp
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button 
            onClick={handleWhatsApp}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <MessageCircle className="w-4 h-4" />
            Falar no WhatsApp
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Voltar ao Início
          </Button>
        </div>

        <div className="bg-accent/5 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Tempo estimado para resposta: <strong>até 24 horas</strong></span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Success;