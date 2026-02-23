-- CreateTable
CREATE TABLE "Users" (
    "userId" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "displayName" VARCHAR(255) NOT NULL,
    "profileImageUrl" VARCHAR(500),
    "role" VARCHAR(50),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Templates" (
    "templateId" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "thumbnailUrl" VARCHAR(500),
    "category" VARCHAR(50),
    "layoutConfig" JSONB,
    "colorScheme" JSONB,
    "fontConfig" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Templates_pkey" PRIMARY KEY ("templateId")
);

-- CreateTable
CREATE TABLE "Portfolios" (
    "portfolioId" VARCHAR(255) NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "templateId" VARCHAR(255),
    "customDomain" VARCHAR(255),
    "isPublished" BOOLEAN DEFAULT false,
    "publishedUrl" VARCHAR(500),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    "aiScore" INTEGER,
    "viewCount" INTEGER DEFAULT 0,

    CONSTRAINT "Portfolios_pkey" PRIMARY KEY ("portfolioId")
);

-- CreateTable
CREATE TABLE "AIFeedback" (
    "feedbackId" VARCHAR(255) NOT NULL,
    "portfolioId" VARCHAR(255) NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "overallScore" INTEGER,
    "designScore" INTEGER,
    "contentScore" INTEGER,
    "professionalismScore" INTEGER,
    "suggestions" JSONB,
    "strengths" JSONB,
    "weaknesses" JSONB,
    "rawResponse" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIFeedback_pkey" PRIMARY KEY ("feedbackId")
);

-- CreateTable
CREATE TABLE "Projects" (
    "projectId" VARCHAR(255) NOT NULL,
    "portfolioId" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "imageUrls" JSONB,
    "projectUrl" VARCHAR(500),
    "githubUrl" VARCHAR(500),
    "technologies" JSONB,
    "order" INTEGER,
    "startDate" TIMESTAMP,
    "endDate" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "ContactSubmissions" (
    "submissionId" VARCHAR(255) NOT NULL,
    "portfolioId" VARCHAR(255) NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "senderName" VARCHAR(255) NOT NULL,
    "senderEmail" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "message" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactSubmissions_pkey" PRIMARY KEY ("submissionId")
);

-- CreateTable
CREATE TABLE "Media" (
    "mediaId" VARCHAR(255) NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "portfolioId" VARCHAR(255),
    "fileName" VARCHAR(255) NOT NULL,
    "fileType" VARCHAR(50),
    "mimeType" VARCHAR(100),
    "fileSize" INTEGER,
    "storageUrl" VARCHAR(500) NOT NULL,
    "thumbnailUrl" VARCHAR(500),
    "altText" VARCHAR(255),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("mediaId")
);

-- CreateTable
CREATE TABLE "Sections" (
    "sectionId" VARCHAR(255) NOT NULL,
    "portfolioId" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT,
    "order" INTEGER,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "settings" JSONB,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Sections_pkey" PRIMARY KEY ("sectionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Portfolios" ADD CONSTRAINT "Portfolios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolios" ADD CONSTRAINT "Portfolios_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Templates"("templateId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIFeedback" ADD CONSTRAINT "AIFeedback_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolios"("portfolioId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIFeedback" ADD CONSTRAINT "AIFeedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolios"("portfolioId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactSubmissions" ADD CONSTRAINT "ContactSubmissions_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolios"("portfolioId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactSubmissions" ADD CONSTRAINT "ContactSubmissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolios"("portfolioId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sections" ADD CONSTRAINT "Sections_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolios"("portfolioId") ON DELETE CASCADE ON UPDATE CASCADE;
