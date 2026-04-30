import React from 'react';
import InputField from './ui/InputField';

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}

const Input = ({ label, value, onChange, type = "text" }: Props) => {
  return (
    <InputField
      label={label}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
