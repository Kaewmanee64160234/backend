import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Get('/status/:roomstatus/room_type_name/:type')
  findRoomTypeByStatusAndType(
    @Param('roomstatus') roomstatus: string,
    @Param('type') roomTypeName: string,
  ) {
    return this.roomsService.getRoomByType(roomstatus, roomTypeName);
  }

  // @Get('/status/:roomstatus/room_type_id/:type')
  // findRoomTypeByStatusAndTypeID(
  //   @Param('roomstatus') roomstatus: string,
  //   @Param('type') roomTypeId: number,
  // ) {
  //   return this.roomsService.getRoomByType(roomstatus, roomTypeId);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
