import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { JwtAuthGuard } from './jwt/jwt-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Post('login')
async login(@Body() login : LoginDto){
  return this.authService.login(login)
}

}
