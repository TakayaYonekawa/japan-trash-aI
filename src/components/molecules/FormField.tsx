import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";
import { ReactNode, InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
}

export function FormField({ label, icon, ...inputProps }: FormFieldProps) {
  return (
    <div className="input-group">
      <Label icon={icon}>{label}</Label>
      <Input {...inputProps} />
    </div>
  );
}
