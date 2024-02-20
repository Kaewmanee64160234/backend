import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckinandoutDto } from './create-checkinandout.dto';

export class UpdateCheckinandoutDto extends PartialType(CreateCheckinandoutDto) {}
