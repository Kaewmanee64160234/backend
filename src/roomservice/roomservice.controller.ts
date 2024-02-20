import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomserviceService } from './roomservice.service';
import { CreateRoomserviceDto } from './dto/create-roomservice.dto';
import { UpdateRoomserviceDto } from './dto/update-roomservice.dto';

@Controller('roomservice')
export class RoomserviceController {
  constructor(private readonly roomserviceService: RoomserviceService) {}

  @Post()
  create(@Body() createRoomserviceDto: CreateRoomserviceDto) {
    return this.roomserviceService.create(createRoomserviceDto);
  }

  @Get()
  findAll() {
    return this.roomserviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomserviceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoomserviceDto: UpdateRoomserviceDto,
  ) {
    return this.roomserviceService.update(+id, updateRoomserviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomserviceService.remove(+id);
  }
}
