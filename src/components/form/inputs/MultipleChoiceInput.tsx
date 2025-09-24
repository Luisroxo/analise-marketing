import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface MultipleChoiceInputProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: string[];
  multiple?: boolean;
}

export const MultipleChoiceInput = ({ value, onChange, options, multiple = false }: MultipleChoiceInputProps) => {
  if (multiple) {
    const values = Array.isArray(value) ? value : [];
    
    const handleCheckboxChange = (option: string, checked: boolean) => {
      if (checked) {
        onChange([...values, option]);
      } else {
        onChange(values.filter(v => v !== option));
      }
    };

    return (
      <div className="space-y-3">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`option-${index}`}
              checked={values.includes(option)}
              onCheckedChange={(checked) => handleCheckboxChange(option, !!checked)}
            />
            <Label 
              htmlFor={`option-${index}`}
              className="text-sm font-normal text-foreground cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    );
  }

  // Garante que o valor é sempre string para escolha única
  const singleValue = Array.isArray(value) ? (value[0] || "") : value;
  return (
    <RadioGroup value={singleValue} onValueChange={onChange} className="space-y-3">
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem value={option} id={`radio-${index}`} />
          <Label 
            htmlFor={`radio-${index}`}
            className="text-sm font-normal text-foreground cursor-pointer"
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};