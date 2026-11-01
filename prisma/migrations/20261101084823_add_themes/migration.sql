-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Theme" ADD VALUE 'LINEN';
ALTER TYPE "Theme" ADD VALUE 'INK';
ALTER TYPE "Theme" ADD VALUE 'MATCHA';
ALTER TYPE "Theme" ADD VALUE 'TANGERINE';
ALTER TYPE "Theme" ADD VALUE 'TERMINAL';
ALTER TYPE "Theme" ADD VALUE 'BLUEPRINT';
ALTER TYPE "Theme" ADD VALUE 'PEACH';
ALTER TYPE "Theme" ADD VALUE 'NEWSPRINT';
ALTER TYPE "Theme" ADD VALUE 'AURORA';
