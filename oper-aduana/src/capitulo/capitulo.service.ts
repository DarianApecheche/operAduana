import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCapituloDto } from './dto/create-capitulo.dto';
import { UpdateCapituloDto } from './dto/update-capitulo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CapituloService {
  constructor( private prisma : PrismaService ){}


  async create(createCapituloDto: CreateCapituloDto) {
    const plan = await this.prisma.planAnual.findUnique({
      where : { planAnualId : createCapituloDto.planAnualId }
    })
    if(plan){
      return this.prisma.capitulo.create({
        data : { ...createCapituloDto }
      });
    }else{
      throw new HttpException('NO EXISTE EL PLAN ANUAL', HttpStatus.BAD_REQUEST)
    }
  
  }

  async findAll() {
    return `This action returns all capitulo`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} capitulo`;
  }

  async update(id: string, updateCapituloDto: UpdateCapituloDto) {
    return this.prisma.capitulo.update({
     where : { capituloId : id },
     data : { ...updateCapituloDto }
    });
  }

  async remove(id: string) {
    return this.prisma.capitulo.delete({
      where : { capituloId : id }
    });
  }
}
