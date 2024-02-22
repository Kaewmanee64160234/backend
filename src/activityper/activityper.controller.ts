import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActivityperService } from './activityper.service';
import { CreateActivityperDto } from './dto/create-activityper.dto';
import { UpdateActivityperDto } from './dto/update-activityper.dto';

@Controller('activityper')
export class ActivityperController {
  constructor(private readonly activityperService: ActivityperService) {}

  @Post()
  create(@Body() createActivityperDto: CreateActivityperDto) {
    return this.activityperService.create(createActivityperDto);
  }

  @Get()
  findAll() {
    return this.activityperService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityperService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityperDto: UpdateActivityperDto,
  ) {
    return this.activityperService.update(+id, updateActivityperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityperService.remove(+id);
  }
}
