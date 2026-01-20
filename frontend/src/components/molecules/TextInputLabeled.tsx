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
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  plaintext?: boolean;
  disabled?: boolean;
}

const TextInputLabeled = ({
  id,
  label,
  value,
  type = 'text',
  placeholder,
  name,
  required = true,
  className,
  errorMessage,
  onChange,
  plaintext,
  disabled,
}: TextInputLabeledProps) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>

      <TextInput
        id={id}
        name={name ?? id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        required={required}
        isInvalid={errorMessage}
        plaintext={plaintext}
        readOnly={plaintext}
        disabled={disabled}
      />

      {errorMessage && (
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default TextInputLabeled;
