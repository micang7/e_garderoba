import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(message = 'Authorization required') {
    super({ error: message }, HttpStatus.UNAUTHORIZED);
  }
}

export class NoPermissionException extends HttpException {
  constructor(message = 'Permission denied') {
    super({ error: message }, HttpStatus.FORBIDDEN);
  }
}

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
