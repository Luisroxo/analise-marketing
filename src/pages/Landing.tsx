import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Rocket, Clock, Target, CheckCircle, Star, TrendingUp } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const handleStartAnalysis = () => {
    navigate("/formulario");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <Rocket className="w-12 h-12 text-primary animate-pulse" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Descubra como <span className="text-primary">expandir seu negócio</span> com estratégias personalizadas.
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Este questionário estratégico nos ajudará a entender seu negócio e identificar 
              oportunidades de crescimento específicas para seu setor.
            </p>
          </div>

          {/* Main Card */}
          <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-0 shadow-elegant max-w-2xl mx-auto mb-12">
            <div className="space-y-6">
              {/* Info Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                  <Clock className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">Tempo estimado</p>
                    <p className="text-sm text-muted-foreground">6-8 minutos</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-success/5 rounded-lg">
                  <Target className="w-6 h-6 text-success" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">Resultado</p>
                    <p className="text-sm text-muted-foreground">Análise gratuita em 24h</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                onClick={handleStartAnalysis}
                size="lg" 
                className="w-full md:w-auto px-12 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Iniciar Análise Gratuita
              </Button>
            </div>
          </Card>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Gratuito</h3>
              <p className="text-muted-foreground">Sem taxas ocultas ou compromissos</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalizado</h3>
              <p className="text-muted-foreground">Análise específica para seu negócio</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Resultados Rápidos</h3>
              <p className="text-muted-foreground">Insights em até 24 horas</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              ✨ Mais de 500 empresas já descobriram seu potencial de crescimento
            </p>
            <div className="flex justify-center items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">4.9/5 (127 avaliações)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;