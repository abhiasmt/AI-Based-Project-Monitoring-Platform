-- CreateEnum
CREATE TYPE "ProjectDomain" AS ENUM ('SOFTWARE', 'CONSTRUCTION', 'EDUCATION', 'HEALTHCARE', 'MANUFACTURING', 'AGRICULTURE', 'GOVERNMENT', 'RESEARCH', 'ENERGY', 'FINANCE', 'OTHER');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "domain" "ProjectDomain" NOT NULL DEFAULT 'OTHER';

-- CreateIndex
CREATE INDEX "Project_domain_idx" ON "Project"("domain");
