/*
  Warnings:

  - You are about to drop the column `data_criacao` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `produto_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `texto` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `categoria` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `condicao` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `data_criacao` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imagens` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `localizacao` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `negociacao` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `preco_desconto` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `preco_original` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `telefone_contato` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `avaliado_id` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `avaliador_id` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `comentario` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `data_criacao` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `estrelas` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `data_criacao` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPhone` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratedId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewerId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stars` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_avaliado_id_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_avaliador_id_fkey";

-- DropIndex
DROP INDEX "Role_nome_key";

-- DropIndex
DROP INDEX "users_telefone_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "data_criacao",
DROP COLUMN "produto_id",
DROP COLUMN "texto",
DROP COLUMN "usuario_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoria",
DROP COLUMN "condicao",
DROP COLUMN "data_criacao",
DROP COLUMN "descricao",
DROP COLUMN "imagens",
DROP COLUMN "localizacao",
DROP COLUMN "negociacao",
DROP COLUMN "nome",
DROP COLUMN "preco_desconto",
DROP COLUMN "preco_original",
DROP COLUMN "telefone_contato",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "condition" TEXT NOT NULL,
ADD COLUMN     "contactPhone" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "discountPrice" DOUBLE PRECISION,
ADD COLUMN     "images" JSONB,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "negotiable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "originalPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "avaliado_id",
DROP COLUMN "avaliador_id",
DROP COLUMN "comentario",
DROP COLUMN "data_criacao",
DROP COLUMN "estrelas",
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ratedId" INTEGER NOT NULL,
ADD COLUMN     "reviewerId" INTEGER NOT NULL,
ADD COLUMN     "stars" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "data_criacao",
DROP COLUMN "nome",
DROP COLUMN "senha",
DROP COLUMN "telefone",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_ratedId_fkey" FOREIGN KEY ("ratedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
