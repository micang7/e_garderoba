import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message = 'Not found') {
    super({ error: message }, HttpStatus.NOT_FOUND);
  }
}

export class AlreadyExistsException extends HttpException {
  constructor(message = 'Already exists') {
    super({ error: message }, HttpStatus.CONFLICT);
  }
}
