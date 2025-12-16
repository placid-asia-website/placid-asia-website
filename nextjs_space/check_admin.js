require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    const users = await prisma.user.findMany();
    
    console.log('All users in database:');
    users.forEach(user => {
      console.log(`- Email: ${user.email}, Role: ${user.role}, Name: ${user.name}`);
    });
    
    const adminUser = await prisma.user.findUnique({
      where: { email: 'info@placid.asia' }
    });
    
    if (adminUser) {
      console.log('\nAdmin user (info@placid.asia) found!');
      console.log('Password hash starts with:', adminUser.password.substring(0, 10) + '...');
    } else {
      console.log('\nAdmin user (info@placid.asia) NOT FOUND in database!');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();
