import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  currentSection: number;
  totalSections: number;
}

export const ProgressBar = ({ currentSection, totalSections }: ProgressBarProps) => {
  const progress = ((currentSection + 1) / totalSections) * 100;
  
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Seção {currentSection + 1} de {totalSections}</span>
        <span>{Math.round(progress)}% concluído</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};