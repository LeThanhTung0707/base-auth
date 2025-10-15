"use client";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  checked: boolean;
  onChange: () => void;
  label: string;
}

export const FormCheckbox = ({ checked, onChange, label }: Props) => (
  <label className="flex items-center space-x-2 text-sm cursor-pointer">
    <Checkbox checked={checked} onCheckedChange={onChange} />
    <span>{label}</span>
  </label>
);
