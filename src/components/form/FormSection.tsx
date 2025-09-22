import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface FormSectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  isActive: boolean;
}

export const FormSection = ({ title, icon, children, isActive }: FormSectionProps) => {
  if (!isActive) return null;
  
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-0 bg-card">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-3xl">{icon}</span>
          <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        </div>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <div className="space-y-6">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};