import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DepartamentoService } from 'src/departamento/departamento.service';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto } from './dto/login.dto';
import { hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwt.constants';

@Injectable()
export class AuthService {
  constructor( private userService : UsuarioService, private departamentoService : DepartamentoService, private readonly jwtService : JwtService ){}

  async register(newUser: CreateUsuarioDto) {
    const { password, departamentoId, nombreUsuario } = newUser;
    const departamento = await this.departamentoService.findOne(departamentoId);

    if (!nombreUsuario || !password) {
      throw new HttpException('NOMBRE DE USUARIO Y PASSWORD SON REQUERIDOS', HttpStatus.BAD_REQUEST);
  }

    if (!departamento) {
        throw new HttpException('DEPARTAMENTO NO EXISTE', HttpStatus.BAD_REQUEST);
    }

    const existingUser = await this.userService.findUserByUserName(nombreUsuario);
    if (existingUser) {
        throw new HttpException('EL NOMBRE DE USUARIO YA ESTA EN USO', HttpStatus.BAD_REQUEST);
    }

    const crypto = await hash(password, 10);
    newUser.password = crypto;

    return this.userService.createUsuario(newUser);
}

  async login( login : LoginDto ){
    const { nombreUsuario, password } = login
    const user = await this.userService.findUserByUserName(nombreUsuario);

    if(user){
      if(!(user.departamentoId == null)){
        const departamento = await this.departamentoService.findOne(user.departamentoId);
        if(!departamento) throw new HttpException('USUARIO O DEPARTAMENTO NO EXISTE', HttpStatus.BAD_REQUEST);
      }else if( user.rol == 'ADMIN'){
        
     const checkPassword = await compare(password, user.password)

     if(!checkPassword){
      throw new HttpException('CONTRASEÑA INCORRECTA', HttpStatus.BAD_REQUEST);
     }else{
      const payload = { id : user.usuarioId, nombreUsuario : user.nombreUsuario, rol : user.rol }

      const token = this.jwtService.sign(payload, { secret : jwtConstants.secret })

      const data = {
        payload : payload,
        token : token,
      }
      return data;
     }
      }
    
    

    }else{
      throw new HttpException('USUARIO NO EXISTE', HttpStatus.NOT_FOUND)
    }
  }
}
