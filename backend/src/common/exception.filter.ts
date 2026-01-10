import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let error: string = 'Internal server error';
    let validationErrors: any[] | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (
        status === (HttpStatus.BAD_REQUEST as number) &&
        Array.isArray((exceptionResponse as any).message)
      ) {
        error = 'Validation failed';
        validationErrors = (exceptionResponse as any).message;
      } else
        error =
          typeof exceptionResponse === 'object'
            ? (exceptionResponse as any).message || exception.message
            : exceptionResponse;
    } else console.error('[Unhandled Exception]:', exception);

    response.status(status).json({
      error,
      ...(validationErrors ? { validationErrors } : {}),
    });
  }
}
