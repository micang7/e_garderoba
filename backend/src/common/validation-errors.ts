export const ValidationErrorCodes: Record<string, string> = {
  isNotEmpty: 'REQUIRED',
  minLength: 'MIN_LENGTH',
  maxLength: 'MAX_LENGTH',
  isString: 'INVALID_FORMAT',
  isEmail: 'INVALID_FORMAT',
  matches: 'INVALID_FORMAT',
  isEnum: 'INVALID_VALUE',
};

export const ValidationErrorMessages: Record<string, string> = {
  REQUIRED: 'The value is required',
  MIN_LENGTH: 'The value is too short',
  MAX_LENGTH: 'The value is too long',
  INVALID_FORMAT: 'The value has invalid format',
  INVALID_VALUE: 'The value is not allowed',
};
