import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlanAnualDto } from './dto/create-plan-anual.dto';
import { UpdatePlanAnualDto } from './dto/update-plan-anual.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlanAnualService {
  constructor( private prisma : PrismaService){}
  create(createPlanAnualDto: CreatePlanAnualDto) {
    return this.prisma.planAnual.create({
      data : { ...createPlanAnualDto }
    });
  }

  async findAllByUsuarioId(id : string) {
    const user = await this.prisma.usuario.findUnique({
      where : { usuarioId : id }
    })
    if(user){
      return this.prisma.planAnual.findMany({
        where : { usuarioId : id }
      });
    }else{
      throw new HttpException('NO EXISTE EL USUARIO', HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: string, updatePlanAnualDto: UpdatePlanAnualDto) {
    return this.prisma.planAnual.update({
      where : {planAnualId : id },
      data : { ...updatePlanAnualDto }
    });
  }

  async delete(id: string) {
    return this.prisma.planAnual.delete({
      where : { planAnualId : id}
    });
  }
}
