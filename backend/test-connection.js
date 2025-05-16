// test-connection.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Failed to connect:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
