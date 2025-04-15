import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor( private prisma : PrismaService ){}
 async validate(createUsuarioDto: CreateUsuarioDto) {
  const { password, departamentoId, nombreUsuario, rol } = createUsuarioDto;
    
    if (!nombreUsuario || !password) {
    throw new HttpException('NOMBRE DE USUARIO Y PASSWORD SON REQUERIDOS', HttpStatus.BAD_REQUEST);
}

    if(rol == 'JEFE_DEPARTAMENTO'){
        const departamentoExiste = await this.prisma.departamento.findUnique({
          where : { departamentoId : departamentoId }
        })
        if(!departamentoExiste) throw new HttpException('NO EXISTE EL DEPARTAMENTO', HttpStatus.BAD_REQUEST)

          const userNameExiste = await this.findUserByUserName(nombreUsuario)

          if(userNameExiste) throw new HttpException('YA EXISTE UN USUARIO CON ESTE NOMBRE', HttpStatus.CONFLICT)

          
          return

    }else if(departamentoId == null){
      const userNameExiste = await this.findUserByUserName(nombreUsuario)
          if(userNameExiste) throw new HttpException('YA EXISTE UN USUARIO CON ESTE NOMBRE', HttpStatus.CONFLICT)
      return 
    }else{
      throw new HttpException('UN ADMIN NO DEBE TENER ASIGNADO UN DEPARTAMENTO', HttpStatus.BAD_REQUEST)
    }
  }

  async createUsuario(createUsuarioDto : CreateUsuarioDto){
   await this.validate(createUsuarioDto)
   const crypto = await hash(createUsuarioDto.password, 10);
       createUsuarioDto.password = crypto;
    return this.prisma.usuario.create({
      data : { ...createUsuarioDto }
    })
  }

  async getAllUsuarios() {
    return this.prisma.usuario.findMany();
  }

  async findUserByUserName(nombreUsuario : string ){
    const user = await this.prisma.usuario.findFirst({
      where : { nombreUsuario : nombreUsuario }
    })
    return user;
  }

  async updateUsuario(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prisma.usuario.update({
      where : { usuarioId : id},
      data : { nombreUsuario : updateUsuarioDto.nombreUsuario, password : updateUsuarioDto.password }
    });
  }

  async deleteUsuario(id: string) {
  return this.prisma.usuario.delete({
    where : { usuarioId : id }
  });
}
}
