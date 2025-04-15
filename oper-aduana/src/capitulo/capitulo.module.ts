import { Module } from '@nestjs/common';
import { CapituloService } from './capitulo.service';
import { CapituloController } from './capitulo.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CapituloController],
  providers: [CapituloService, PrismaService],
})
export class CapituloModule {}
