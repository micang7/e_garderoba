import { ApiProperty } from '@nestjs/swagger';
import { ErrorResponseDto } from './error-response.dto';
import {
  ValidationErrorCode,
  ValidationErrorMessage,
} from '../validation/validation-errors';

class ValidationErrorDto {
  @ApiProperty({ example: 'email' })
  field: string;

  @ApiProperty({
    enum: ValidationErrorCode,
    example: ValidationErrorCode.INVALID_FORMAT,
  })
  code: ValidationErrorCode;

  @ApiProperty({
    enum: ValidationErrorMessage,
    example: ValidationErrorMessage.INVALID_FORMAT,
  })
  message: ValidationErrorMessage;
}

export class ValidationErrorResponseDto extends ErrorResponseDto {
  @ApiProperty({ type: ValidationErrorDto, isArray: true })
  validationErrors: ValidationErrorDto[];
}
