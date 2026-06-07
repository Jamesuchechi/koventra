import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, resolve));
};

async function main() {
  console.log('\n--- Koventra Systems — Admin Creator CLI ---');
  
  const email = await question('Enter admin email: ');
  const name = await question('Enter admin name (optional): ');
  const password = await question('Enter admin password: ');

  if (!email.trim() || !password.trim()) {
    console.error('\n❌ Error: Email and password are required!');
    rl.close();
    process.exit(1);
  }

  try {
    const existing = await prisma.adminUser.findUnique({
      where: { email: email.trim() },
    });

    if (existing) {
      console.error('\n❌ Error: Admin user with this email already exists!');
      rl.close();
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.adminUser.create({
      data: {
        email: email.trim(),
        name: name.trim() || null,
        password: hashedPassword,
      },
    });

    console.log(`\n✅ Success: Admin user created successfully!`);
    console.log(`Email: ${admin.email}`);
    console.log(`ID: ${admin.id}`);
  } catch (error) {
    console.error('\n❌ Failed to create admin user:', error);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

main();
