import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CheckinandoutService } from './checkinandout.service';
import { CreateCheckinandoutDto } from './dto/create-checkinandout.dto';
import { UpdateCheckinandoutDto } from './dto/update-checkinandout.dto';

@Controller('checkinandout')
export class CheckinandoutController {
  constructor(private readonly checkinandoutService: CheckinandoutService) {}

  @Post()
  create(@Body() createCheckinandoutDto: CreateCheckinandoutDto) {
    return this.checkinandoutService.create(createCheckinandoutDto);
  }

  @Get()
  findAll() {
    return this.checkinandoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkinandoutService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCheckinandoutDto: UpdateCheckinandoutDto,
  ) {
    return this.checkinandoutService.update(+id, updateCheckinandoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkinandoutService.remove(+id);
  }
}
