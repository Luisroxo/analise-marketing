import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
  canProceed: boolean;
  isSubmitting?: boolean;
}

export const NavigationButtons = ({ 
  currentSection, 
  totalSections, 
  onPrevious, 
  onNext, 
  canProceed,
  isSubmitting = false
}: NavigationButtonsProps) => {
  const isLastSection = currentSection === totalSections - 1;
  
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentSection === 0}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </Button>
      
      <Button
        onClick={onNext}
        disabled={!canProceed || isSubmitting}
        className="flex items-center gap-2 bg-primary hover:bg-primary/90"
      >
        {isSubmitting ? (
          "Enviando..."
        ) : isLastSection ? (
          "Enviar Análise"
        ) : (
          <>
            Próximo
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  );
};