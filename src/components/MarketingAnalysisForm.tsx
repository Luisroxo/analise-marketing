import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormSection } from "./form/FormSection";
import { FormQuestion } from "./form/FormQuestion";
import { TextInput } from "./form/inputs/TextInput";
import { TextareaInput } from "./form/inputs/TextareaInput";
import { DropdownInput } from "./form/inputs/DropdownInput";
import { MultipleChoiceInput } from "./form/inputs/MultipleChoiceInput";
import { ScaleInput } from "./form/inputs/ScaleInput";
import { ProgressBar } from "./form/ProgressBar";
import { NavigationButtons } from "./form/NavigationButtons";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  // Seção 1: Fundamentos
  companyName: string;
  businessType: string;
  valueProposition: string;
  foundationYear: number;
  customerReach: string;
  
  // Seção 2: Objetivos
  mainObjective: string[];
  growthGoal: string;
  
  // Seção 3: Clientes
  idealCustomer: string;
  howCustomersFind: string[];
  mainReason: string;
  problemSolved: string;
  
  // Seção 4: Satisfação
  satisfactionLevel: number;
  recommendationProbability: number;
  
  // Seção 5: Concorrência
  mainCompetitors: string;
  mainDifferential: string;
  competitorMarketing: string[];
  
  // Seção 6: Vendas
  salesChannels: string[];
  bestChannel: string;
  currentMarketing: string[];
  
  // Seção 7: Digital
  onlinePresence: string[];
  socialLinks: string;
  digitalTools: string[];
  
  // Seção 8: Finais
  preferredContact: string;
  extraInfo: string;
}

const initialFormData: FormData = {
  companyName: "",
  businessType: "",
  valueProposition: "",
  foundationYear: 2020,
  customerReach: "",
  mainObjective: [],
  growthGoal: "",
  idealCustomer: "",
  howCustomersFind: [],
  mainReason: "",
  problemSolved: "",
  satisfactionLevel: 3,
  recommendationProbability: 5,
  mainCompetitors: "",
  mainDifferential: "",
  competitorMarketing: [],
  salesChannels: [],
  bestChannel: "",
  currentMarketing: [],
  onlinePresence: [],
  socialLinks: "",
  digitalTools: [],
  preferredContact: "",
  extraInfo: ""
};

export const MarketingAnalysisForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const sections = [
    {
      title: "Fundamentos do Negócio",
      icon: "🏢",
      fields: ["companyName", "businessType", "valueProposition", "foundationYear", "customerReach"]
    },
    {
      title: "Objetivos e Metas", 
      icon: "🎯",
      fields: ["mainObjective", "growthGoal"]
    },
    {
      title: "Conhecendo Seus Clientes",
      icon: "👥", 
      fields: ["idealCustomer", "howCustomersFind", "mainReason", "problemSolved"]
    },
    {
      title: "Satisfação e Indicação",
      icon: "📊",
      fields: ["satisfactionLevel", "recommendationProbability"]
    },
    {
      title: "Concorrência e Diferenciais",
      icon: "🏆",
      fields: ["mainCompetitors", "mainDifferential", "competitorMarketing"]
    },
    {
      title: "Vendas e Canais",
      icon: "💰",
      fields: ["salesChannels", "bestChannel", "currentMarketing"]
    },
    {
      title: "Presença Digital",
      icon: "🌐",
      fields: ["onlinePresence", "socialLinks", "digitalTools"]
    },
    {
      title: "Informações Finais",
      icon: "📝",
      fields: ["preferredContact", "extraInfo"]
    }
  ];

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateCurrentSection = () => {
    const currentFields = sections[currentSection].fields;
    const requiredFields = getRequiredFields(currentSection);
    
    console.log("🔍 Debug validação:", {
      currentSection,
      requiredFields,
      formData: Object.fromEntries(
        requiredFields.map(field => [field, formData[field as keyof FormData]])
      )
    });
    
    return requiredFields.every(field => {
      const value = formData[field as keyof FormData];
      if (Array.isArray(value)) {
        console.log(`Array field ${field}:`, value, "length:", value.length);
        return value.length > 0;
      }
      console.log(`Single field ${field}:`, value);
      return value !== "" && value !== null && value !== undefined;
    });
  };

  const getRequiredFields = (sectionIndex: number) => {
    const requiredBySection = [
      ["companyName", "businessType", "valueProposition", "foundationYear", "customerReach"],
      ["mainObjective", "growthGoal"],
      ["idealCustomer", "howCustomersFind", "mainReason", "problemSolved"],
      ["satisfactionLevel", "recommendationProbability"],
      ["mainCompetitors", "mainDifferential", "competitorMarketing"],
      ["salesChannels", "bestChannel", "currentMarketing"],
      ["onlinePresence", "digitalTools"],
      ["preferredContact"]
    ];
    return requiredBySection[sectionIndex] || [];
  };

  const handleNext = () => {
    // Limpa erro anterior
    setValidationError(null);
    const requiredFields = getRequiredFields(currentSection);
    const missing = requiredFields.filter(field => {
      const value = formData[field as keyof FormData];
      if (Array.isArray(value)) return value.length === 0;
      return value === "" || value === null || value === undefined;
    });

    if (missing.length > 0) {
      setValidationError(`Preencha: ${missing.map(m => mapFieldToLabel(m)).join(', ')}`);
      toast({
        title: "Campos obrigatórios faltando",
        description: "Complete os campos destacados antes de avançar.",
        variant: "destructive"
      });
      return;
    }

    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // URL do webhook - substitua pela URL do ngrok quando testar localmente
      const webhookUrl = process.env.NODE_ENV === 'development' 
        ? 'https://seu-ngrok-url.ngrok.app/webhook' // Para desenvolvimento local
        : 'https://seu-servidor-producao.com/webhook'; // Para produção
      
      // Preparar dados no formato esperado pelo backend
      const submitData = {
        timestamp: new Date().toISOString(),
        source: 'lovable_form',
        data: {
          // Seção 1: Fundamentos
          nome_empresa: formData.companyName,
          tipo_negocio: formData.businessType,
          proposta_valor: formData.valueProposition,
          ano_fundacao: formData.foundationYear,
          alcance_clientes: formData.customerReach,
          
          // Seção 2: Objetivos
          objetivo_principal: Array.isArray(formData.mainObjective) 
            ? formData.mainObjective.join(', ') 
            : formData.mainObjective,
          meta_crescimento: formData.growthGoal,
          
          // Seção 3: Clientes
          cliente_ideal: formData.idealCustomer,
          como_encontram: Array.isArray(formData.howCustomersFind) 
            ? formData.howCustomersFind.join(', ') 
            : formData.howCustomersFind,
          motivo_escolha: formData.mainReason,
          problema_resolve: formData.problemSolved,
          
          // Seção 4: Satisfação
          nivel_satisfacao: formData.satisfactionLevel,
          probabilidade_indicacao: formData.recommendationProbability,
          
          // Seção 5: Concorrência
          principais_concorrentes: formData.mainCompetitors,
          principal_diferencial: formData.mainDifferential,
          marketing_concorrentes: Array.isArray(formData.competitorMarketing) 
            ? formData.competitorMarketing.join(', ') 
            : formData.competitorMarketing,
          
          // Seção 6: Vendas
          canais_venda: Array.isArray(formData.salesChannels) 
            ? formData.salesChannels.join(', ') 
            : formData.salesChannels,
          melhor_canal: formData.bestChannel,
          marketing_atual: Array.isArray(formData.currentMarketing) 
            ? formData.currentMarketing.join(', ') 
            : formData.currentMarketing,
          
          // Seção 7: Digital
          presenca_online: Array.isArray(formData.onlinePresence) 
            ? formData.onlinePresence.join(', ') 
            : formData.onlinePresence,
          links_sociais: formData.socialLinks,
          ferramentas_digitais: Array.isArray(formData.digitalTools) 
            ? formData.digitalTools.join(', ') 
            : formData.digitalTools,
          
          // Seção 8: Finais
          contato_preferido: formData.preferredContact,
          informacoes_extras: formData.extraInfo
        }
      };

      // Enviar para o webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      toast({
        title: "Análise enviada com sucesso! 🎉",
        description: "Sua análise foi recebida e processada. Entraremos em contato em breve!",
      });
      
      console.log("Formulário enviado com sucesso:", result);
      
      // Redirecionar para página de sucesso após 1.5 segundos
      setTimeout(() => {
        navigate("/sucesso");
      }, 1500);
      
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      
      toast({
        title: "Erro ao enviar análise",
        description: "Ocorreu um problema ao enviar sua análise. Tente novamente ou entre em contato conosco.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const businessTypeOptions = [
    "Loja Física",
    "Serviços", 
    "Loja Virtual/E-commerce",
    "Produtos Digitais",
    "Consultoria",
    "Restaurante/Alimentação",
    "Beleza/Estética",
    "Saúde/Bem-estar",
    "Educação",
    "Outros"
  ];

  const customerReachOptions = [
    "Principalmente local (cidade/bairro)",
    "Regional (estado/região)",
    "Nacional",
    "Internacional"
  ];

  const mainObjectiveOptions = [
    "Aumentar vendas",
    "Conquistar novos clientes",
    "Melhorar presença online",
    "Expandir para novos mercados",
    "Aumentar ticket médio",
    "Fidelizar clientes atuais",
    "Outros"
  ];

  const growthGoalOptions = [
    "Até 20%",
    "20% a 50%",
    "50% a 100%",
    "Mais de 100%",
    "Manter o atual",
    "Não sei ainda"
  ];

  const howCustomersFindOptions = [
    "Indicação de amigos/família",
    "Passam em frente ao local",
    "Redes sociais",
    "Google/Internet",
    "WhatsApp",
    "Anúncios tradicionais",
    "Eventos/feiras",
    "Outros"
  ];

  const mainReasonOptions = [
    "Preço competitivo",
    "Qualidade superior",
    "Atendimento diferenciado",
    "Localização conveniente",
    "Variedade de produtos",
    "Confiança/tradição",
    "Inovação",
    "Outros"
  ];

  const mainDifferentialOptions = [
    "Preço mais baixo",
    "Qualidade superior",
    "Atendimento personalizado",
    "Localização estratégica",
    "Inovação/tecnologia",
    "Tradição/confiança",
    "Variedade de produtos",
    "Agilidade/rapidez",
    "Outros"
  ];

  const marketingChannelsOptions = [
    "Redes sociais",
    "Google Ads",
    "Panfletos",
    "Rádio/TV",
    "Outdoor",
    "Eventos",
    "Parcerias",
    "Boca a boca",
    "Não fazem muito marketing",
    "Outros"
  ];

  const salesChannelsOptions = [
    "Loja física",
    "WhatsApp",
    "Instagram",
    "Site próprio",
    "Marketplace (Mercado Livre, etc)",
    "Telefone",
    "Vendedor externo",
    "Eventos/feiras",
    "Outros"
  ];

  const currentMarketingOptions = [
    "Redes sociais orgânicas",
    "Google Ads",
    "Facebook/Instagram Ads",
    "WhatsApp Marketing",
    "E-mail marketing",
    "Panfletos",
    "Boca a boca",
    "Parcerias",
    "Não faço marketing",
    "Outros"
  ];

  const onlinePresenceOptions = [
    "Instagram",
    "Facebook",
    "WhatsApp Business",
    "Site próprio",
    "Google Meu Negócio",
    "LinkedIn",
    "TikTok",
    "YouTube",
    "Não tenho presença online",
    "Outros"
  ];

  const digitalToolsOptions = [
    "WhatsApp Business",
    "Sistema de vendas/PDV",
    "Planilhas Excel/Google",
    "CRM (RD, Pipedrive, etc)",
    "E-mail marketing",
    "Agendamento online",
    "Delivery apps",
    "Não uso ferramentas digitais",
    "Outros"
  ];

  const contactOptions = [
    "WhatsApp",
    "E-mail",
    "Telefone",
    "Instagram Direct",
    "Outros"
  ];

  const mapFieldToLabel = (field: string) => {
    const labels: Record<string, string> = {
      companyName: 'Nome da empresa',
      businessType: 'Tipo do negócio',
      valueProposition: 'Proposta de valor',
      foundationYear: 'Ano de fundação',
      customerReach: 'Alcance dos clientes',
      mainObjective: 'Objetivo principal',
      growthGoal: 'Meta de crescimento',
      idealCustomer: 'Cliente ideal',
      howCustomersFind: 'Como encontram',
      mainReason: 'Motivo da escolha',
      problemSolved: 'Problema resolvido',
      satisfactionLevel: 'Nível de satisfação',
      recommendationProbability: 'Probabilidade de indicação',
      mainCompetitors: 'Principais concorrentes',
      mainDifferential: 'Principal diferencial',
      competitorMarketing: 'Marketing dos concorrentes',
      salesChannels: 'Canais de venda',
      bestChannel: 'Canal que mais vende',
      currentMarketing: 'Marketing atual',
      onlinePresence: 'Presença online',
      digitalTools: 'Ferramentas digitais',
      preferredContact: 'Melhor forma de contato'
    };
    return labels[field] || field;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-8 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Formulário de Análise de Marketing
          </h1>
          <p className="text-lg text-muted-foreground">
            Ajude-nos a entender seu negócio para criar estratégias personalizadas
          </p>
        </div>

        <ProgressBar currentSection={currentSection} totalSections={sections.length} />

        {/* Seção 1: Fundamentos */}
        <FormSection
          title={sections[0].title}
          icon={sections[0].icon}
          isActive={currentSection === 0}
        >
          <FormQuestion title="🏢 Nome da sua empresa?" required>
            <TextInput
              value={formData.companyName}
              onChange={(value) => updateFormData("companyName", value)}
              placeholder="Digite o nome da sua empresa"
            />
          </FormQuestion>

          <FormQuestion title="🎯 Tipo do seu negócio" description="Selecione a categoria que melhor descreve sua empresa" required>
            <DropdownInput
              value={formData.businessType}
              onChange={(value) => updateFormData("businessType", value)}
              options={businessTypeOptions}
              placeholder="Selecione o tipo de negócio"
            />
          </FormQuestion>

          <FormQuestion 
            title="💡 Sua proposta de valor (Coração do seu negócio)"
            description="Complete a frase: Nós ajudamos _____ a _____ através de _____"
            required
          >
            <TextInput
              value={formData.valueProposition}
              onChange={(value) => updateFormData("valueProposition", value)}
              placeholder="Ex: pequenos empresários a aumentar vendas através de marketing digital"
            />
          </FormQuestion>

          <FormQuestion title="📅 Ano de fundação" required>
            <TextInput
              value={formData.foundationYear.toString()}
              onChange={(value) => updateFormData("foundationYear", parseInt(value) || 2020)}
              placeholder="Ex: 2020"
              type="number"
            />
          </FormQuestion>

          <FormQuestion title="🌍 Alcance dos seus clientes" required>
            <MultipleChoiceInput
              value={formData.customerReach}
              onChange={(value) => updateFormData("customerReach", value)}
              options={customerReachOptions}
            />
          </FormQuestion>
        </FormSection>

        {/* Seção 2: Objetivos */}
        <FormSection
          title={sections[1].title}
          icon={sections[1].icon}
          isActive={currentSection === 1}
        >
          <FormQuestion title="📈 Principal objetivo para os próximos 12 meses" required>
            <MultipleChoiceInput
              value={formData.mainObjective}
              onChange={(value) => updateFormData("mainObjective", value)}
              options={mainObjectiveOptions}
              multiple={true}
            />
          </FormQuestion>

          <FormQuestion title="💰 Meta de crescimento em vendas" required>
            <MultipleChoiceInput
              value={formData.growthGoal}
              onChange={(value) => updateFormData("growthGoal", value)}
              options={growthGoalOptions}
            />
          </FormQuestion>
        </FormSection>

        {/* Seção 3: Clientes */}
        <FormSection
          title={sections[2].title}
          icon={sections[2].icon}
          isActive={currentSection === 2}
        >
          <FormQuestion 
            title="👤 Perfil do seu cliente ideal"
            description="Descreva brevemente quem é seu cliente típico (idade, perfil, necessidades)"
            required
          >
            <TextareaInput
              value={formData.idealCustomer}
              onChange={(value) => updateFormData("idealCustomer", value)}
              placeholder="Ex: Mulheres de 25-45 anos, mães, que buscam praticidade no dia a dia"
              rows={3}
            />
          </FormQuestion>

          <FormQuestion title="🔍 Como seus clientes te encontram?" required>
            <MultipleChoiceInput
              value={formData.howCustomersFind}
              onChange={(value) => updateFormData("howCustomersFind", value)}
              options={howCustomersFindOptions}
              multiple
            />
          </FormQuestion>

          <FormQuestion title="⭐ Principal motivo para escolherem você" required>
            <MultipleChoiceInput
              value={formData.mainReason}
              onChange={(value) => updateFormData("mainReason", value)}
              options={mainReasonOptions}
            />
          </FormQuestion>

          <FormQuestion 
            title="🎯 Problema que você resolve"
            description="Qual a principal dificuldade dos seus clientes que você resolve?"
            required
          >
            <TextareaInput
              value={formData.problemSolved}
              onChange={(value) => updateFormData("problemSolved", value)}
              placeholder="Ex: Falta de tempo para cozinhar refeições saudáveis"
              rows={3}
            />
          </FormQuestion>
        </FormSection>

        {/* Seção 4: Satisfação */}
        <FormSection
          title={sections[3].title}
          icon={sections[3].icon}
          isActive={currentSection === 3}
        >
          <FormQuestion 
            title="😊 Nível de satisfação dos clientes"
            description="Como você avalia a satisfação geral dos seus clientes?"
            required
          >
            <ScaleInput
              value={formData.satisfactionLevel}
              onChange={(value) => updateFormData("satisfactionLevel", value)}
              min={1}
              max={5}
              minLabel="Pouco satisfeitos"
              maxLabel="Muito satisfeitos"
            />
          </FormQuestion>

          <FormQuestion 
            title="🗣️ Probabilidade de indicação"
            description="Qual a chance de um cliente indicar sua empresa? (NPS)"
            required
          >
            <ScaleInput
              value={formData.recommendationProbability}
              onChange={(value) => updateFormData("recommendationProbability", value)}
              min={0}
              max={10}
              minLabel="Jamais indicaria"
              maxLabel="Com certeza indicaria"
            />
          </FormQuestion>
        </FormSection>

        {/* Seção 5: Concorrência */}
        <FormSection
          title={sections[4].title}
          icon={sections[4].icon}
          isActive={currentSection === 4}
        >
          <FormQuestion 
            title="🎯 Principais concorrentes"
            description="Cite 2-3 empresas que considera como principais concorrentes"
            required
          >
            <TextInput
              value={formData.mainCompetitors}
              onChange={(value) => updateFormData("mainCompetitors", value)}
              placeholder="Ex: Empresa A, Empresa B, Empresa C"
            />
          </FormQuestion>

          <FormQuestion title="💎 Seu principal diferencial" required>
            <MultipleChoiceInput
              value={formData.mainDifferential}
              onChange={(value) => updateFormData("mainDifferential", value)}
              options={mainDifferentialOptions}
            />
          </FormQuestion>

          <FormQuestion 
            title="📢 Marketing dos concorrentes"
            description="Como seus concorrentes fazem divulgação?"
            required
          >
            <MultipleChoiceInput
              value={formData.competitorMarketing}
              onChange={(value) => updateFormData("competitorMarketing", value)}
              options={marketingChannelsOptions}
              multiple
            />
          </FormQuestion>
        </FormSection>

        {/* Seção 6: Vendas */}
        <FormSection
          title={sections[5].title}
          icon={sections[5].icon}
          isActive={currentSection === 5}
        >
          <FormQuestion title="📦 Principais canais de venda" required>
            <MultipleChoiceInput
              value={formData.salesChannels}
              onChange={(value) => updateFormData("salesChannels", value)}
              options={salesChannelsOptions}
              multiple
            />
          </FormQuestion>

          <FormQuestion 
            title="🏅 Canal que mais vende"
            description="Qual canal trouxe mais vendas nos últimos 12 meses?"
            required
          >
            <MultipleChoiceInput
              value={formData.bestChannel}
              onChange={(value) => updateFormData("bestChannel", value)}
              options={salesChannelsOptions}
            />
          </FormQuestion>

          <FormQuestion 
            title="📊 Marketing atual"
            description="Que tipo de marketing você faz atualmente?"
            required
          >
            <MultipleChoiceInput
              value={formData.currentMarketing}
              onChange={(value) => updateFormData("currentMarketing", value)}
              options={currentMarketingOptions}
              multiple
            />
          </FormQuestion>
        </FormSection>

        {/* Seção 7: Digital */}
        <FormSection
          title={sections[6].title}
          icon={sections[6].icon}
          isActive={currentSection === 6}
        >
          <FormQuestion 
            title="📱 Redes sociais e site"
            description="Onde sua empresa tem presença online?"
            required
          >
            <MultipleChoiceInput
              value={formData.onlinePresence}
              onChange={(value) => updateFormData("onlinePresence", value)}
              options={onlinePresenceOptions}
              multiple
            />
          </FormQuestion>

          <FormQuestion 
            title="🔗 Links das redes sociais"
            description="Compartilhe os links das suas redes sociais e site (se tiver)"
          >
            <TextareaInput
              value={formData.socialLinks}
              onChange={(value) => updateFormData("socialLinks", value)}
              placeholder="Instagram: @suaempresa&#10;Site: www.suaempresa.com"
              rows={3}
            />
          </FormQuestion>

          <FormQuestion 
            title="🤖 Ferramentas que usa"
            description="Que ferramentas digitais você utiliza?"
            required
          >
            <MultipleChoiceInput
              value={formData.digitalTools}
              onChange={(value) => updateFormData("digitalTools", value)}
              options={digitalToolsOptions}
              multiple
            />
          </FormQuestion>
        </FormSection>

        {/* Seção 8: Finais */}
        <FormSection
          title={sections[7].title}
          icon={sections[7].icon}
          isActive={currentSection === 7}
        >
          <FormQuestion title="📞 Melhor forma de contato" required>
            <MultipleChoiceInput
              value={formData.preferredContact}
              onChange={(value) => updateFormData("preferredContact", value)}
              options={contactOptions}
            />
          </FormQuestion>

          <FormQuestion 
            title="💡 Informações extras"
            description="Há algo mais importante que devemos saber sobre sua empresa?"
          >
            <TextareaInput
              value={formData.extraInfo}
              onChange={(value) => updateFormData("extraInfo", value)}
              placeholder="Alguma informação especial, desafios específicos, projetos futuros..."
              rows={4}
            />
          </FormQuestion>
        </FormSection>

        {validationError && (
          <div className="max-w-4xl mx-auto mt-4 mb-2 p-4 rounded-md bg-destructive/10 border border-destructive text-sm text-destructive">
            {validationError}
          </div>
        )}

        <NavigationButtons
          currentSection={currentSection}
          totalSections={sections.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          canProceed={validateCurrentSection()}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};