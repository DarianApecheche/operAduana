-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'JEFE_DEPARTAMENTO');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('COMPLETADA', 'NO_COMPLETADA', 'SUSPENDIDA', 'POSPUESTA');

-- CreateTable
CREATE TABLE "Usuario" (
    "usuarioId" TEXT NOT NULL,
    "nombreUsuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "departamentoId" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("usuarioId")
);

-- CreateTable
CREATE TABLE "Departamento" (
    "departamentoId" TEXT NOT NULL,
    "nombreDepartamento" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("departamentoId")
);

-- CreateTable
CREATE TABLE "PlanAnual" (
    "planAnualId" TEXT NOT NULL,
    "año" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "PlanAnual_pkey" PRIMARY KEY ("planAnualId")
);

-- CreateTable
CREATE TABLE "Capitulo" (
    "capituloId" TEXT NOT NULL,
    "tituloCapitulo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "planAnualId" TEXT NOT NULL,

    CONSTRAINT "Capitulo_pkey" PRIMARY KEY ("capituloId")
);

-- CreateTable
CREATE TABLE "Tarea" (
    "tareaId" TEXT NOT NULL,
    "nombreTarea" TEXT NOT NULL,
    "fechas" TIMESTAMP(3)[],
    "lugar" TEXT NOT NULL,
    "dirigente" TEXT NOT NULL,
    "participantes" TEXT[],
    "estado" "Estado" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "capituloId" TEXT NOT NULL,
    "planAnualId" TEXT NOT NULL,
    "tareaPadreId" TEXT,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("tareaId")
);

-- CreateTable
CREATE TABLE "Departamento_Tarea" (
    "departamentoId" TEXT NOT NULL,
    "tareaId" TEXT NOT NULL,
    "fechas" TIMESTAMP(3)[],
    "lugar" TEXT NOT NULL,
    "dirigente" TEXT NOT NULL,
    "participantes" TEXT[],
    "estado" "Estado" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Departamento_Tarea_pkey" PRIMARY KEY ("departamentoId","tareaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_departamentoId_key" ON "Usuario"("departamentoId");

-- CreateIndex
CREATE UNIQUE INDEX "Departamento_usuarioId_key" ON "Departamento"("usuarioId");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("departamentoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanAnual" ADD CONSTRAINT "PlanAnual_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("usuarioId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capitulo" ADD CONSTRAINT "Capitulo_planAnualId_fkey" FOREIGN KEY ("planAnualId") REFERENCES "PlanAnual"("planAnualId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_capituloId_fkey" FOREIGN KEY ("capituloId") REFERENCES "Capitulo"("capituloId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_planAnualId_fkey" FOREIGN KEY ("planAnualId") REFERENCES "PlanAnual"("planAnualId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_tareaPadreId_fkey" FOREIGN KEY ("tareaPadreId") REFERENCES "Tarea"("tareaId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departamento_Tarea" ADD CONSTRAINT "Departamento_Tarea_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("departamentoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departamento_Tarea" ADD CONSTRAINT "Departamento_Tarea_tareaId_fkey" FOREIGN KEY ("tareaId") REFERENCES "Tarea"("tareaId") ON DELETE RESTRICT ON UPDATE CASCADE;
