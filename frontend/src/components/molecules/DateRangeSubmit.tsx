import { Form } from 'react-bootstrap';
import DateInput from '../atoms/DateInput';
import { PrimaryButton, SecondaryButton } from '../atoms/Button';
import { useState } from 'react';

interface DateRangeSubmitProps {
  startDate: string;
  endDate: string;
  onSubmit: (startDate: string, endDate: string) => void;
  clearButtonText?: string;
  submitButtonText?: string;
  onClick?: (e: React.FormEvent) => void;
}

const DateRangeSubmit: React.FC<DateRangeSubmitProps> = ({
  startDate,
  endDate,
  onSubmit,
  clearButtonText = 'Clear',
  submitButtonText = 'Submit',
  onClick,
}) => {
  const [_startDate, _setStartDate] = useState(startDate);
  const [_endDate, _setEndDate] = useState(endDate);
  const [errors, setErrors] = useState<{ start?: string; end?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const start = _startDate ? new Date(_startDate) : null;
    const end = _endDate ? new Date(_endDate) : null;

    if (start && end && start > end)
      setErrors({
        start: 'Data początkowa nie powinna być po dacie końcowej',
        end: 'Data końcowa nie powinna być przed datą początkową',
      });
    else onSubmit(_startDate, _endDate);
  };

  return (
    <Form onClick={onClick}>
      <div
        style={{
          display: 'grid',
          gap: 10,
        }}
      >
        <div>
          <Form.Label>Od:</Form.Label>
          <DateInput
            value={_startDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              _setStartDate(e.target.value)
            }
            isInvalid={!!errors.start}
          />
          <Form.Control.Feedback type="invalid">
            {errors.start}
          </Form.Control.Feedback>
        </div>

        <div>
          <Form.Label>Do:</Form.Label>
          <DateInput
            value={_endDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              _setEndDate(e.target.value)
            }
            isInvalid={!!errors.end}
          />
          <Form.Control.Feedback type="invalid">
            {errors.end}
          </Form.Control.Feedback>
        </div>

        <SecondaryButton
          onClick={() => {
            _setStartDate('');
            _setEndDate('');
          }}
        >
          {clearButtonText}
        </SecondaryButton>
        <PrimaryButton onClick={handleSubmit}>{submitButtonText}</PrimaryButton>
      </div>
    </Form>
  );
};

export default DateRangeSubmit;
