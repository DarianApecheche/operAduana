import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CapituloService } from './capitulo.service';
import { CreateCapituloDto } from './dto/create-capitulo.dto';
import { UpdateCapituloDto } from './dto/update-capitulo.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth-guard';

@Controller('capitulo')
@UseGuards(JwtAuthGuard)
export class CapituloController {
  constructor(private readonly capituloService: CapituloService) {}

  @Post()
  async create(@Body() createCapituloDto: CreateCapituloDto) {
    return this.capituloService.create(createCapituloDto);
  }

  @Get()
  async findAll() {
    return this.capituloService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.capituloService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCapituloDto: UpdateCapituloDto) {
    return this.capituloService.update(id, updateCapituloDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.capituloService.remove(id);
  }
}
