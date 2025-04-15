import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth-guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('tarea')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TareaController {
  constructor(private readonly tareaService: TareaService) {}

  @Post()
  @Roles('ADMIN','JEFE_DEPARTAMENTO')
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
  @Roles('ADMIN','JEFE_DEPARTAMENTO')
  async update(@Param('id') id: string, @Body() updateTareaDto: UpdateTareaDto) {
    return this.tareaService.update(id, updateTareaDto);
  }

  @Delete(':id')
  @Roles('ADMIN','JEFE_DEPARTAMENTO')
  async remove(@Param('id') id: string) {
    return this.tareaService.remove(id);
  }
}
