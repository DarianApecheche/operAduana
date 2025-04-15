import { Module } from '@nestjs/common';
import { PlanAnualService } from './plan-anual.service';
import { PlanAnualController } from './plan-anual.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PlanAnualController],
  providers: [PlanAnualService, PrismaService],
})
export class PlanAnualModule {}
