import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TextInput } from "./TextInput";

interface MultipleChoiceWithDetailsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  details: { [key: string]: string };
  onDetailsChange: (option: string, details: string) => void;
  examples: { [key: string]: string };
}

export const MultipleChoiceWithDetailsInput = ({ 
  value, 
  onChange, 
  options, 
  details, 
  onDetailsChange, 
  examples 
}: MultipleChoiceWithDetailsInputProps) => {
  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      onChange([...value, option]);
    } else {
      onChange(value.filter(v => v !== option));
      // Limpa os detalhes quando desmarca
      onDetailsChange(option, "");
    }
  };

  return (
    <div className="space-y-4">
      {options.map((option, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`option-${index}`}
              checked={value.includes(option)}
              onCheckedChange={(checked) => handleCheckboxChange(option, !!checked)}
            />
            <Label 
              htmlFor={`option-${index}`}
              className="text-sm font-normal text-foreground cursor-pointer"
            >
              {option}
            </Label>
          </div>
          
          {value.includes(option) && (
            <div className="ml-6 mt-2">
              <TextInput
                value={details[option] || ""}
                onChange={(detailValue) => onDetailsChange(option, detailValue)}
                placeholder={examples[option] || "Descreva detalhadamente..."}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};