import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.role.upsert({
        where: { name: 'comun' },
        update: {},
        create: { name: 'comun' },
    });

    await prisma.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: { name: 'admin' },
    });

    const userCount = await prisma.user.count();
    if (userCount === 0) {
        await prisma.user.create({
            data: {
                name: 'Usuário Admin',
                email: 'admin@email.com',
                password: '12345',
                phone: '99999999999',
                role: {
                    connect: { name: 'admin' }
                }
            }
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
