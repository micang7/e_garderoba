export enum ValidationErrorCode {
  EMPTY = 'EMPTY',
  INVALID_TYPE = 'INVALID_TYPE',
  INVALID_FORMAT = 'INVALID_FORMAT',
  INVALID_VALUE = 'INVALID_VALUE',
  MAX_LENGTH = 'MAX_LENGTH',
}

export enum ValidationErrorMessage {
  EMPTY = 'The non-empty value is required',
  INVALID_TYPE = 'The value has invalid type',
  INVALID_FORMAT = 'The value has invalid format',
  INVALID_VALUE = 'The value is not allowed',
  MAX_LENGTH = 'The value is too long',
}

export const ValidationErrorCodes: Record<string, ValidationErrorCode> = {
  isNotEmpty: ValidationErrorCode.EMPTY,
  isString: ValidationErrorCode.INVALID_TYPE,
  isInt: ValidationErrorCode.INVALID_TYPE,
  isEmail: ValidationErrorCode.INVALID_FORMAT,
  matches: ValidationErrorCode.INVALID_FORMAT,
  isDateString: ValidationErrorCode.INVALID_FORMAT,
  isEnum: ValidationErrorCode.INVALID_VALUE,
  min: ValidationErrorCode.INVALID_VALUE,
  maxLength: ValidationErrorCode.MAX_LENGTH,
};
