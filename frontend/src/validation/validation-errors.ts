export const ValidationErrorCode = {
  EMPTY: 'EMPTY',
  INVALID_TYPE: 'INVALID_TYPE',
  INVALID_FORMAT: 'INVALID_FORMAT',
  INVALID_VALUE: 'INVALID_VALUE',
  MAX_LENGTH: 'MAX_LENGTH',
} as const;

export type ValidationErrorCode =
  (typeof ValidationErrorCode)[keyof typeof ValidationErrorCode];

export const ValidationErrorMessage = {
  EMPTY: 'Pole jest wymagane',
  INVALID_TYPE: 'Nieprawidłowy typ wartości',
  INVALID_FORMAT: 'Nieprawidłowy format wartości',
  INVALID_VALUE: 'Nieprawidłowa wartość',
  MAX_LENGTH: 'Wartość przekracza dozwoloną długość',
} as const;

export type ValidationErrorMessage =
  (typeof ValidationErrorMessage)[keyof typeof ValidationErrorMessage];
