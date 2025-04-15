import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwt.constants';
import { UsuarioService } from 'src/usuario/usuario.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DepartamentoService } from 'src/departamento/departamento.service';

@Module({
  imports : [JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '24h' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsuarioService, PrismaService, DepartamentoService],
})
export class AuthModule {}
