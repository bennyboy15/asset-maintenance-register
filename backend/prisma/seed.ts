import { faker } from '@faker-js/faker';
import { prisma } from "../src/prisma-client";

async function main() {

    // 1. Clean the database (Optional but recommended for development)
    await prisma.asset.deleteMany();
    await prisma.assetGroup.deleteMany();
    await prisma.supplier.deleteMany();
    await prisma.user.deleteMany();

    // 2. Create Users
    const users = await Promise.all(
        Array.from({ length: 5 }).map(() =>
            prisma.user.create({
                data: {
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    password: 'hashed_password_123', // In real life, use bcrypt
                },
            })
        )
    );

    // 3. Create Suppliers
    const suppliers = await Promise.all(
        Array.from({ length: 10 }).map(() =>
            prisma.supplier.create({
                data: { name: faker.company.name() },
            })
        )
    );

    // 4. Create Asset Groups
    const groupNames = ['Heavy Machinery', 'IT Equipment', 'Vehicles', 'Safety Gear'];
    const assetGroups = await Promise.all(
        groupNames.map((name) =>
            prisma.assetGroup.create({
                data: { name },
            })
        )
    );

    // 5. Create Assets
    for (let i = 0; i < 20; i++) {
        const frequency = faker.helpers.arrayElement([30, 90, 180, 365]);
        const lastService = faker.date.past();

        // Logic: Next service is last service + frequency days
        const nextService = new Date(lastService);
        nextService.setDate(nextService.getDate() + frequency);

        await prisma.asset.create({
            data: {
                name: `${faker.commerce.productName()} - ${faker.string.alphanumeric(5).toUpperCase()}`,
                frequency,
                lastService,
                nextService,
                isRetired: faker.datatype.boolean(0.1), // 10% chance of being retired
                retiredOn: faker.date.recent(),
                responsibleUserId: faker.helpers.arrayElement(users).id,
                supplierId: faker.helpers.arrayElement(suppliers).id,
                assetGroupId: faker.helpers.arrayElement(assetGroups).id,
            },
        });
    }
}

main()
    .catch((e) => {

    })
    .finally(async () => {
        await prisma.$disconnect();
    });