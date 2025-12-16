
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function check() {
  const slm = await prisma.category.findFirst({
    where: { slug: 'sound-level-meters-analyzers' }
  });
  console.log('Sound Level Meters & Analyzers:', slm?.name_en, 'Count:', slm?.product_count);
  
  const nvh = await prisma.category.findFirst({
    where: { slug: 'vibration-nvh-shakers' }
  });
  console.log('Vibration & NVH Shakers:', nvh?.name_en, 'Count:', nvh?.product_count);
  
  const amp = await prisma.category.findFirst({
    where: { slug: 'power-amplifiers-nvh-shakers' }
  });
  console.log('Power Amplifiers for NVH Shakers:', amp?.name_en, 'Count:', amp?.product_count);
  
  const preamp = await prisma.category.findFirst({
    where: { slug: 'preamplifiers' }
  });
  console.log('Preamplifiers:', preamp?.name_en, 'Count:', preamp?.product_count, 'Parent:', preamp?.parent_id ? 'Has parent' : 'Top-level');
  
  await prisma.$disconnect();
}

check().catch(console.error);
