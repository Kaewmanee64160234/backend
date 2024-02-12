import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UilityService } from './uility.service';
import { CreateUilityDto } from './dto/create-uility.dto';
import { UpdateUilityDto } from './dto/update-uility.dto';

@Controller('uility')
export class UilityController {
  constructor(private readonly uilityService: UilityService) {}

  @Post()
  create(@Body() createUilityDto: CreateUilityDto) {
    return this.uilityService.create(createUilityDto);
  }

  @Get()
  findAll() {
    return this.uilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uilityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUilityDto: UpdateUilityDto) {
    return this.uilityService.update(+id, updateUilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uilityService.remove(+id);
  }
}
