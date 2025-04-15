import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlanAnualService } from './plan-anual.service';
import { CreatePlanAnualDto } from './dto/create-plan-anual.dto';
import { UpdatePlanAnualDto } from './dto/update-plan-anual.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth-guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class PlanAnualController {
  constructor(private readonly planAnualService: PlanAnualService) {}

  @Post('plan-anual')
  async create(@Body() createPlanAnualDto: CreatePlanAnualDto) {
    return this.planAnualService.create(createPlanAnualDto);
  }

  @Get(':usuarioId/planes-anuales')
  async findAllByUserId(@Param('usuarioId') usuarioId : string) {
    return this.planAnualService.findAllByUsuarioId(usuarioId);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlanAnualDto: UpdatePlanAnualDto) {
    return this.planAnualService.update(id,updatePlanAnualDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.planAnualService.delete(id);
  }
}
