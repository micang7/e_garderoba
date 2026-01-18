import { Form } from 'react-bootstrap';
import TextInput from '../atoms/TextInput';
import { PrimaryButton, SecondaryButton } from '../atoms/Button';
import { useState } from 'react';

interface TextInputSubmitProps {
  value: string;
  onSubmit: (value: string) => void;
  onClick?: (e: React.FormEvent) => void;
  clearButtonLabel?: string;
  submitButtonLabel?: string;
  placeholder?: string;
}

const TextInputSubmit: React.FC<TextInputSubmitProps> = ({
  value,
  onSubmit,
  onClick,
  clearButtonLabel = 'Clear',
  submitButtonLabel = 'Submit',
  placeholder,
}) => {
  const [_value, _setValue] = useState(value);

  return (
    <Form>
      <div style={{ display: 'flex' }}>
        <TextInput
          value={_value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            _setValue(e.target.value);
          }}
          onClick={onClick}
          placeholder={placeholder}
        />
        <SecondaryButton onClick={() => onSubmit('')}>
          {clearButtonLabel}
        </SecondaryButton>
        <PrimaryButton onClick={() => onSubmit(_value)}>
          {submitButtonLabel}
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default TextInputSubmit;
