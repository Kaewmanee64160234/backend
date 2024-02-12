import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrokenequipmentService } from './brokenequipment.service';
import { CreateBrokenequipmentDto } from './dto/create-brokenequipment.dto';
import { UpdateBrokenequipmentDto } from './dto/update-brokenequipment.dto';

@Controller('brokenequipment')
export class BrokenequipmentController {
  constructor(private readonly brokenequipmentService: BrokenequipmentService) {}

  @Post()
  create(@Body() createBrokenequipmentDto: CreateBrokenequipmentDto) {
    return this.brokenequipmentService.create(createBrokenequipmentDto);
  }

  @Get()
  findAll() {
    return this.brokenequipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brokenequipmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrokenequipmentDto: UpdateBrokenequipmentDto) {
    return this.brokenequipmentService.update(+id, updateBrokenequipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brokenequipmentService.remove(+id);
  }
}
