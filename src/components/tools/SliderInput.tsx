import { Slider } from "@/components/ui/slider";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
  unit?: string;
}

const SliderInput = ({ label, value, min, max, step, onChange, format, unit }: SliderInputProps) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <span className="text-sm font-heading font-semibold text-foreground">
        {format ? format(value) : value}{unit && ` ${unit}`}
      </span>
    </div>
    <Slider
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={([v]) => onChange(v)}
      className="w-full"
    />
  </div>
);

export default SliderInput;
