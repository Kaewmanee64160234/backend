import { PartialType } from '@nestjs/mapped-types';
import { CreateUilityDto } from './create-uility.dto';

export class UpdateUilityDto extends PartialType(CreateUilityDto) {}
