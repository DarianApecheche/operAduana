/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Departamento` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_departamentoId_fkey";

-- DropIndex
DROP INDEX "Departamento_usuarioId_key";

-- DropIndex
DROP INDEX "Usuario_departamentoId_key";

-- AlterTable
ALTER TABLE "Departamento" DROP COLUMN "usuarioId";

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "departamentoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("departamentoId") ON DELETE SET NULL ON UPDATE CASCADE;
