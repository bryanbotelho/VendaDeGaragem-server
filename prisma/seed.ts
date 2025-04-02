import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.role.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'comun',
        },
    });

    await prisma.role.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            name: 'admin',
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
