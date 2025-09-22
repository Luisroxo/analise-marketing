import { Label } from "@/components/ui/label";

interface FormQuestionProps {
  title: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormQuestion = ({ title, description, required, children }: FormQuestionProps) => {
  return (
    <div className="space-y-3">
      <div>
        <Label className="text-lg font-medium text-foreground flex items-center gap-2">
          {title}
          {required && <span className="text-destructive">*</span>}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
};