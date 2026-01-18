import Form from 'react-bootstrap/Form';
import TextInput from '../atoms/TextInput';

interface TextInputLabeledProps {
  id: string;
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInputLabeled = ({
  id,
  label,
  value,
  type,
  placeholder,
  name,
  required,
  className,
  onChange,
}: TextInputLabeledProps) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>

      <TextInput
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        required={required}
      />
    </Form.Group>
  );
};

export default TextInputLabeled;
