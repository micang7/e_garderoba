import { Form, FormSelect } from 'react-bootstrap';

interface SelectTextInputProps {
  value: string;
  name?: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClick?: (e: React.FormEvent) => void;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
}

const SelectTextInput: React.FC<SelectTextInputProps> = ({
  value,
  name,
  options,
  onChange,
  onClick,
  placeholder,
  errorMessage,
  required,
  disabled,
}) => {
  return (
    <div>
      <FormSelect
        value={value}
        name={name}
        onChange={onChange}
        onClick={onClick}
        isInvalid={!!errorMessage}
        required={required}
        disabled={disabled}
      >
        {placeholder && <option>{placeholder}</option>}
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </FormSelect>
      {errorMessage && (
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </div>
  );
};

export default SelectTextInput;
