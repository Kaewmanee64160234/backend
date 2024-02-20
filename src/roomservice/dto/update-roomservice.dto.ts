import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomserviceDto } from './create-roomservice.dto';

export class UpdateRoomserviceDto extends PartialType(CreateRoomserviceDto) {}
