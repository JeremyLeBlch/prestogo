import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    // Empty the database
    await prisma.restaurant.deleteMany();
    await prisma.manager.deleteMany();
    await prisma.city.deleteMany();
    await prisma.cuisine.deleteMany();

    // Generate 40 managers
    await prisma.manager.createMany({
        data: Array.from({ length: 40 }).map(() => {
            return {
                email: faker.internet.email(),
                phone: faker.phone.number(),
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName()
            }
        }),
        skipDuplicates: true
    })

    // Generate 50 cities
    await prisma.city.createMany({
        data: Array.from({length: 50}).map(() => ({
          name: faker.location.city(),
          postcode: faker.location.zipCode(),
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude()
        })),
        skipDuplicates: true
    });

// Generate 30 cuisines
  await prisma.cuisine.createMany({
    data: Array.from({length: 30}).map(() => ({
      label: faker.location.country()
    })),
    skipDuplicates: true
  });

  // Get the managers and cities
  const managers = await prisma.manager.findMany();
  const cities = await prisma.city.findMany();

  await prisma.restaurant.createMany({
    data: Array.from({ length: 50 }).map(() => {
        return {
            name: `${faker.company.catchPhraseAdjective()} ${faker.person.firstName()}`,
            description: faker.company.catchPhraseDescriptor(),
            address: faker.location.streetAddress(),
            terrace: faker.datatype.boolean(),
            managerId: faker.helpers.shuffle(managers)[0].id,
            cityId: faker.helpers.shuffle(cities)[0].id
        }
    })
  })

  // Get the restaurants and cuisines
  const restaurants = await prisma.restaurant.findMany();
  const cuisines = await prisma.cuisine.findMany();

  for (const restaurant of restaurants) {
    await prisma.restaurant.update({
        where: { id: restaurant.id },
        data: {
            cuisines: {
                connect: faker.helpers.shuffle(cuisines).slice(0, 3).map(cuisine => ({ id: cuisine.id })) // Pick 3 random cuisines
            }
        }
    });
  } 
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
})