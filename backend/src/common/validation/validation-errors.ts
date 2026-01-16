export const ValidationErrorCodes: Record<string, string> = {
  isNotEmpty: 'EMPTY',
  isString: 'INVALID_TYPE',
  isInt: 'INVALID_TYPE',
  isEmail: 'INVALID_FORMAT',
  matches: 'INVALID_FORMAT',
  isDateString: 'INVALID_FORMAT',
  isEnum: 'INVALID_VALUE',
  min: 'INVALID_VALUE',
  maxLength: 'MAX_LENGTH',
};

export const ValidationErrorMessages: Record<string, string> = {
  EMPTY: 'The value cannot be empty',
  INVALID_TYPE: 'The value has invalid type',
  INVALID_FORMAT: 'The value has invalid format',
  INVALID_VALUE: 'The value is not allowed',
  MAX_LENGTH: 'The value is too long',
};
