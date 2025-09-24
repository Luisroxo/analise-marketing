import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TextInput } from "./TextInput";

interface RadioWithDetailsInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  details: string;
  onDetailsChange: (details: string) => void;
  examples: { [key: string]: string };
}

export const RadioWithDetailsInput = ({ 
  value, 
  onChange, 
  options, 
  details, 
  onDetailsChange, 
  examples 
}: RadioWithDetailsInputProps) => {
  const handleRadioChange = (selectedValue: string) => {
    onChange(selectedValue);
    // Limpa os detalhes quando muda de opção
    if (selectedValue !== value) {
      onDetailsChange("");
    }
  };

  return (
    <RadioGroup value={value} onValueChange={handleRadioChange} className="space-y-4">
      {options.map((option, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`radio-${index}`} />
            <Label 
              htmlFor={`radio-${index}`}
              className="text-sm font-normal text-foreground cursor-pointer"
            >
              {option}
            </Label>
          </div>
          
          {value === option && (
            <div className="ml-6 mt-2">
              <TextInput
                value={details}
                onChange={onDetailsChange}
                placeholder={examples[option] || "Descreva detalhadamente..."}
              />
            </div>
          )}
        </div>
      ))}
    </RadioGroup>
  );
};