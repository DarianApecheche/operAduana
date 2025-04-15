import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth-guard';

@Controller('departamento')
// @UseGuards(JwtAuthGuard)
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @Post()
  async create(@Body() createDepartamentoDto: CreateDepartamentoDto) {
    return this.departamentoService.createDepartamento(createDepartamentoDto);
  }

  @Get()
  async findAll() {
    return this.departamentoService.getAllDepartamentos();
  }

    @Get('usuarios/:id')
    async getAllByDepartamento(@Param('id') id : string){
      return this.departamentoService.getAllUsuariosByDepartamento(id)
    }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.departamentoService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDepartamentoDto: UpdateDepartamentoDto) {
    return this.departamentoService.updateDepartamento(id, updateDepartamentoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.departamentoService.deleteDepartamento(id);
  }
}
