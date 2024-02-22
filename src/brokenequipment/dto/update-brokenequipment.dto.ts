import { PartialType } from '@nestjs/mapped-types';
import { CreateBrokenequipmentDto } from './create-brokenequipment.dto';

export class UpdateBrokenequipmentDto extends PartialType(
  CreateBrokenequipmentDto,
) {}
