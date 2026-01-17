import { ParseIntPipe, BadRequestException } from '@nestjs/common';
import {
  ValidationErrorCodes,
  ValidationErrorMessage,
} from '../validation-errors';

export const IdParamValidationPipe = new ParseIntPipe({
  exceptionFactory: () => {
    const code = ValidationErrorCodes['isInt'] || 'UNKNOWN_ERROR';
    return new BadRequestException([
      {
        field: 'id',
        code,
        message: ValidationErrorMessage[code] || 'Invalid value',
      },
    ]);
  },
});
