import Form from 'react-bootstrap/Form';
import SelectTextInput from '../atoms/SelectTextInput';

interface SelectTextInputLabeledProps {
  label: string;
  name?: string;
  required?: boolean;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClick?: (e: React.FormEvent) => void;
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
}

const SelectTextInputLabeled = ({
  label,
  name,
  required = true,
  value,
  options,
  onChange,
  onClick,
  placeholder,
  errorMessage,
  disabled,
}: SelectTextInputLabeledProps) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>

      <SelectTextInput
        value={value}
        name={name}
        options={options}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        errorMessage={errorMessage}
        required={required}
        disabled={disabled}
      />
    </Form.Group>
  );
};

export default SelectTextInputLabeled;
