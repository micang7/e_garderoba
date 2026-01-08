import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistsException extends HttpException {
  constructor(message = 'Already exists') {
    super({ error: message }, HttpStatus.CONFLICT);
  }
}
