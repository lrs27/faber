import { config } from 'dotenv';
import { resolve } from 'path';
import { PrismaClient } from '@prisma/client';

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') });

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Define all templates
  const templates = [
    {
      templateId: 'minimal',
      name: 'Minimal',
      description: 'Clean, typographic, timeless. Perfect for those who let their work speak.',
      category: 'Professional',
      isPremium: false,
      isActive: true,
    },
    {
      templateId: 'developer',
      name: 'Developer',
      description: 'Terminal-inspired, dark mode ready. Built for devs who live in the command line.',
      category: 'Technical',
      isPremium: false,
      isActive: true,
    },
    {
      templateId: 'creative',
      name: 'Creative',
      description: 'Bold colors, playful layout. Stand out from the crowd with personality.',
      category: 'Creative',
      isPremium: false,
      isActive: true,
    },
    {
      templateId: 'academic',
      name: 'Academic',
      description: 'Research-focused, publication ready. Showcase your papers and coursework.',
      category: 'Academic',
      isPremium: false,
      isActive: true,
    },
    {
      templateId: 'startup',
      name: 'Startup',
      description: 'Bold and modern. For builders who want to show off side projects and MVPs.',
      category: 'Business',
      isPremium: false,
      isActive: true,
    },
    {
      templateId: 'retro',
      name: 'Retro',
      description: 'Nostalgic vibes, pixel-perfect. A throwback aesthetic with modern functionality.',
      category: 'Creative',
      isPremium: false,
      isActive: true,
    },
  ];

  // Upsert each template (create if doesn't exist, update if exists)
  for (const template of templates) {
    const result = await prisma.templates.upsert({
      where: { templateId: template.templateId },
      update: {
        name: template.name,
        description: template.description,
        category: template.category,
        isPremium: template.isPremium,
        isActive: template.isActive,
      },
      create: template,
    });
    console.log(`✅ Template "${result.name}" (${result.templateId}) seeded`);
  }

  console.log('🎉 Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
