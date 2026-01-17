import { ApiProperty } from '@nestjs/swagger';

class MetaDto {
  @ApiProperty({ example: 1 })
  total: number;
}

export class ListResponseDto {
  @ApiProperty()
  meta: MetaDto;
}
