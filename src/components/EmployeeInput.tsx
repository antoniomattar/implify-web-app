import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Employee } from "@/lib/Employee";

type EmployeeInputProps = {
  id: keyof Employee;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const EmployeeInput = ({ id, label, value, onChange, placeholder }: EmployeeInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} placeholder={placeholder} required value={value} onChange={onChange} />
    </div>
  );
};

export default EmployeeInput;
