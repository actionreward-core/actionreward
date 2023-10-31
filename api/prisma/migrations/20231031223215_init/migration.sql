-- CreateEnum
CREATE TYPE "RewardType" AS ENUM ('GIFT_CARD', 'CUSTOM_HTTP');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "accessToken" TEXT NOT NULL,
    "issuerIdentifier" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectActionSchema" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "schemaTypeName" TEXT,
    "schemaUrl" TEXT,
    "key" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "data" JSONB,

    CONSTRAINT "ProjectActionSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectUser" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "did" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectAction" (
    "id" TEXT NOT NULL,
    "projectUserId" TEXT NOT NULL,
    "projectActionSchemaId" TEXT NOT NULL,
    "claimId" TEXT NOT NULL,
    "qrcode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectReward" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "projectId" TEXT NOT NULL,
    "type" "RewardType" NOT NULL,
    "conditionField" TEXT NOT NULL,
    "conditionOperator" TEXT NOT NULL,
    "conditionValue" TEXT NOT NULL,
    "projectActionSchemaId" TEXT NOT NULL,

    CONSTRAINT "ProjectReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectRewardCoupon" (
    "id" TEXT NOT NULL,
    "projectRewardId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "claimedAt" TIMESTAMP(3),

    CONSTRAINT "ProjectRewardCoupon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_accessToken_key" ON "Project"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectActionSchema_projectId_key_key" ON "ProjectActionSchema"("projectId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectUser_projectId_userId_key" ON "ProjectUser"("projectId", "userId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectActionSchema" ADD CONSTRAINT "ProjectActionSchema_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectUser" ADD CONSTRAINT "ProjectUser_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectAction" ADD CONSTRAINT "ProjectAction_projectUserId_fkey" FOREIGN KEY ("projectUserId") REFERENCES "ProjectUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectAction" ADD CONSTRAINT "ProjectAction_projectActionSchemaId_fkey" FOREIGN KEY ("projectActionSchemaId") REFERENCES "ProjectActionSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectReward" ADD CONSTRAINT "ProjectReward_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectReward" ADD CONSTRAINT "ProjectReward_projectActionSchemaId_fkey" FOREIGN KEY ("projectActionSchemaId") REFERENCES "ProjectActionSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRewardCoupon" ADD CONSTRAINT "ProjectRewardCoupon_projectRewardId_fkey" FOREIGN KEY ("projectRewardId") REFERENCES "ProjectReward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
