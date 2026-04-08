import { faker } from "@faker-js/faker";
import { prisma } from "../src/prisma-client";

function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const userIds = [
    "216c1653-7b13-49bd-9499-53007ead0126",
    "0cdbed84-0b12-4b89-91ae-5572e8e1258e",
    "4dd4510b-2b01-438d-be7a-0064460230a1",
];

async function main() {
    for(let i = 0; i < 3; i++) {
        await prisma.user.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            }
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });