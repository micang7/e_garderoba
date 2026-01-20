import type { ValidationError } from '../api/interfaces/error-interfaces';
import { ValidationErrorMessage } from './validation-errors';

export default function mapValidationErrors(
  validationErrors: ValidationError[],
): Record<string, string> {
  return validationErrors.reduce(
    (errors: Record<string, string>, err: ValidationError) => {
      errors[err.field] = ValidationErrorMessage[err.code];
      return errors;
    },
    {},
  );
}
