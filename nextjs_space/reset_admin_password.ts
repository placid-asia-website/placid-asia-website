import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function resetAdminPassword() {
  const email = 'info@placid.asia';
  const newPassword = 'Admin2024!';
  
  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  // Update the admin user
  const updatedUser = await prisma.user.update({
    where: { email },
    data: { password: hashedPassword }
  });
  
  console.log('✅ Admin password reset successfully!');
  console.log('Email:', email);
  console.log('New Password:', newPassword);
  console.log('User:', updatedUser.name, '(', updatedUser.role, ')');
  
  await prisma.$disconnect();
}

resetAdminPassword().catch((error) => {
  console.error('Error resetting password:', error);
  process.exit(1);
});
