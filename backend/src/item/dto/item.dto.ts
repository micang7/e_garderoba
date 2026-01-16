import { Expose } from 'class-transformer';
import { ItemGender } from '../../common/enums/item-gender.enum';

export class ItemDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  size?: string;

  @Expose()
  gender?: ItemGender;

  @Expose()
  description?: string;

  @Expose()
  createdAt: Date;
}
