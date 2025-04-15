import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartamentoModule } from './departamento/departamento.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PlanAnualModule } from './plan-anual/plan-anual.module';
import { CapituloModule } from './capitulo/capitulo.module';
import { TareaModule } from './tarea/tarea.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DepartamentoModule, UsuarioModule, PlanAnualModule, CapituloModule, TareaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
