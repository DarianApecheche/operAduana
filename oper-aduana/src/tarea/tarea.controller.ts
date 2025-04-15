import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth-guard';

@Controller('tarea')
@UseGuards(JwtAuthGuard)
export class TareaController {
  constructor(private readonly tareaService: TareaService) {}

  @Post()
  async create(@Body() createTareaDto: CreateTareaDto) {
    return this.tareaService.create(createTareaDto);
  }

  // @Get()
  // async findAllByDepartamento() {
  //   return this.tareaService
  // }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tareaService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTareaDto: UpdateTareaDto) {
    return this.tareaService.update(id, updateTareaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tareaService.remove(id);
  }
}
