import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function testLogin() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'info@placid.asia' }
    });
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    console.log('✅ User found:', user.email);
    console.log('Role:', user.role);
    
    // Test password
    const password = 'Placid2024!';
    const isValid = await bcrypt.compare(password, user.password!);
    
    console.log('Password test:', isValid ? '✅ VALID' : '❌ INVALID');
    console.log('Expected password:', password);
    console.log('Hash in database:', user.password?.substring(0, 20) + '...');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testLogin();
