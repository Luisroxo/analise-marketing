import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface ScaleInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
}

export const ScaleInput = ({ 
  value, 
  onChange, 
  min, 
  max, 
  step = 1, 
  minLabel, 
  maxLabel 
}: ScaleInputProps) => {
  return (
    <div className="space-y-4">
      <div className="px-2">
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />
      </div>
      
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        {minLabel && <span>{min} = {minLabel}</span>}
        <div className="flex-1 text-center">
          <span className="text-lg font-semibold text-primary">Valor: {value}</span>
        </div>
        {maxLabel && <span>{max} = {maxLabel}</span>}
      </div>
    </div>
  );
};