import { FormSelect } from 'react-bootstrap';

interface SelectTextInputProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  onClick?: (e: React.FormEvent) => void;
  placeholder?: string;
}

const SelectTextInput: React.FC<SelectTextInputProps> = ({
  value,
  options,
  onChange,
  onClick,
  placeholder,
}) => {
  return (
    <FormSelect
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={onClick}
    >
      {placeholder && <option>{placeholder}</option>}
      {options?.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </FormSelect>
  );
};

export default SelectTextInput;
