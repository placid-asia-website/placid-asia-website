import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    console.log('Checking for admin user...');
    
    const admin = await prisma.user.findUnique({
      where: { email: 'info@placid.asia' }
    });
    
    if (admin) {
      console.log('✅ Admin user exists');
      console.log('Email:', admin.email);
      console.log('Name:', admin.name);
      console.log('Role:', admin.role);
      console.log('Password hash exists:', !!admin.password);
      console.log('Password hash starts with:', admin.password?.substring(0, 7));
    } else {
      console.log('❌ Admin user NOT found');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();
