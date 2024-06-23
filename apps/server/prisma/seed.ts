import { PrismaClient, PublishType } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.createMany({
  //   data: {
  //     email: faker.internet.email(),
  //     firstName: faker.name.firstName(),
  //     lastName: faker.name.lastName(),
  //     password: faker.internet.password(),
  //   },
  // });

  const vehicles = await prisma.category.create({
    data: {
      id: 'propertyrentals',
      name: 'Tài sản cho thuê',
      icon:"https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2024/3/22/chung-cu-1711099332080108224776.jpeg",
      subCategories: {
        create: [
          {
            id: 'apartments-for-rent',
            name: 'Căn hộ cho thuê',
          },
          {
            id: 'condos-for-rent',
            name: 'Chung cư',
          }
        ],
      },
    },
  });

  console.log({ vehicles });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
