-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "FullName" TEXT,
    "createdAt" TIMESTAMP(3)  DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) ,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
