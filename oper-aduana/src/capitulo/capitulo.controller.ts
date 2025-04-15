import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CapituloService } from './capitulo.service';
import { CreateCapituloDto } from './dto/create-capitulo.dto';
import { UpdateCapituloDto } from './dto/update-capitulo.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth-guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('capitulo')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CapituloController {
  constructor(private readonly capituloService: CapituloService) {}

  @Post()
  @Roles('ADMIN')
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
  @Roles('ADMIN')
  async update(@Param('id') id: string, @Body() updateCapituloDto: UpdateCapituloDto) {
    return this.capituloService.update(id, updateCapituloDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async remove(@Param('id') id: string) {
    return this.capituloService.remove(id);
  }
}
