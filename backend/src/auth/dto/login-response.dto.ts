import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';

class LoginResponsePayloadDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty({ example: 'token' })
  token: string;
}

export class LoginResponseDto {
  @ApiProperty({ type: LoginResponsePayloadDto })
  data: LoginResponsePayloadDto;
}
