import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomtypesService } from './roomtypes.service';
import { CreateRoomtypeDto } from './dto/create-roomtype.dto';
import { UpdateRoomtypeDto } from './dto/update-roomtype.dto';

@Controller('roomtypes')
export class RoomtypesController {
  constructor(private readonly roomtypesService: RoomtypesService) {}

  @Post()
  create(@Body() createRoomtypeDto: CreateRoomtypeDto) {
    return this.roomtypesService.create(createRoomtypeDto);
  }

  @Get()
  findAll() {
    return this.roomtypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomtypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomtypeDto: UpdateRoomtypeDto) {
    return this.roomtypesService.update(+id, updateRoomtypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomtypesService.remove(+id);
  }
}
