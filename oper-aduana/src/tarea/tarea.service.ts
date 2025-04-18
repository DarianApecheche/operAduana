import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Estado } from '@prisma/client';

@Injectable()
export class TareaService {
  constructor( private prisma : PrismaService ){}


  async create(createTareaDto: CreateTareaDto) {
    const { departamentoId, planAnualId, capituloId, lugar, dirigente, fechas, nombreTarea, participantes,tareaPadreId } = createTareaDto
    const departamento = await this.prisma.departamento.findMany({
      where : { departamentoId : { in : departamentoId }}
    })
    const planAnual = await this.prisma.planAnual.findUnique({
      where : { planAnualId : planAnualId }
    })
    const capitulo = await this.prisma.capitulo.findUnique({
      where : { capituloId : capituloId }
    })

    if(departamento.length == 0){
      throw new HttpException('Debe asignar al menos un Departamento a la Tarea', HttpStatus.BAD_REQUEST)
    }else if(departamento.length !== departamentoId.length){
      throw new HttpException('Uno o varios Departamentos no existen', HttpStatus.NOT_FOUND)
    }else if(!planAnual){
      throw new HttpException('No existe el Plan Anual', HttpStatus.NOT_FOUND)
    }else if(!capitulo){
      throw new HttpException('No existe el Capitulo', HttpStatus.NOT_FOUND)
    }else if(participantes.length == 0){
      throw new HttpException('Debe asignar al menos un participante', HttpStatus.BAD_REQUEST)
    }else{
      if(tareaPadreId !== null){
        const tarea = await this.prisma.tarea.findUnique({
          where : { tareaId : tareaPadreId }
        })
        if(!tarea) throw new HttpException('NO EXISTE LA TAREA', HttpStatus.NOT_FOUND)
      }

        return await this.prisma.tarea.create({
        data : { dirigente , lugar,  estado : Estado.NO_COMPLETADA, nombreTarea, capituloId, planAnualId, participantes, tareaPadreId,
          departamentoTareas : {createMany : {
            data : departamentoId.map((id) => ({
              departamentoId : id,
              lugar,
              dirigente,
              estado : Estado.NO_COMPLETADA,
              fechas,
              participantes,
            }))
          }},
         },
         include : { departamentoTareas : true}

      })
    }
      
    }


  async findOne(id: number) {
    return `This action returns a #${id} tarea`;
  }

  async update(id: string, updateTareaDto: UpdateTareaDto) {
    return this.prisma.tarea.update({
      where : { tareaId : id },
      data : { ...updateTareaDto },
      include : { departamentoTareas : true }
    });
  }

  async remove(id: string) {
    await this.prisma.departamento_Tarea.deleteMany({
      where : { tareaId : id }
    })

    return this.prisma.tarea.delete({
      where : { tareaId : id }
    })
  }
}
