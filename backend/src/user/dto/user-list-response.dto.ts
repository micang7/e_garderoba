import { ApiProperty } from '@nestjs/swagger';
import { ListResponseDto } from '../../common/dto/list-response.dto';
import { UserDto } from './user.dto';

export class UserListResponseDto extends ListResponseDto {
  @ApiProperty({ type: UserDto, isArray: true })
  data: UserDto[];
}
