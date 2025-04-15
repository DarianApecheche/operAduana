import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartamentoService {
  constructor( private prisma : PrismaService ){}
  async createDepartamento(createDepartamentoDto: CreateDepartamentoDto) {
    return this.prisma.departamento.create({
    data : { ...createDepartamentoDto }  
  })
  }
  async getAllDepartamentos() {
    return this.prisma.departamento.findMany();
  }

  async getAllUsuariosByDepartamento(departamentoId : string){
    const departamento = await this.findOne(departamentoId)
    if(departamento){
      return this.prisma.usuario.findMany({
        where : { departamentoId : departamentoId }
      })
    }
  }

  async findOne(id: string) {
    return this.prisma.departamento.findUnique({
      where : { departamentoId : id },
      include : { departamentoTareas : {include : {tarea : {include : { capitulo : true, planAnual : true}}}} }
    });
  }

 async updateDepartamento(departamentoId : string, updateDepartamentoDto : UpdateDepartamentoDto) {
    return this.prisma.departamento.update({
      where : { departamentoId : departamentoId },
      data : { nombreDepartamento : updateDepartamentoDto.nombreDepartamento }
    });
  }

 async deleteDepartamento(departamentoId : string) {
    const departamento = await this.prisma.departamento.findUnique({
      where : { departamentoId : departamentoId }
    })

    if(departamento){
      this.prisma.usuario.deleteMany({
        where : { departamentoId : departamentoId }
      })
      return this.prisma.departamento.delete({
        where : { departamentoId : departamentoId }
      });
    }else{
      throw new HttpException('DEPARTAMENTO NO EXISTE', HttpStatus.BAD_REQUEST)
    }
    
  }
}
