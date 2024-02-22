import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityperDto } from './create-activityper.dto';

export class UpdateActivityperDto extends PartialType(CreateActivityperDto) {}
