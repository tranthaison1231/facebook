import { PrismaClient, PublishType } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.createMany({
    data: {
      postId: "clwruqzrl00058c8420isezmp",
      userId: "clvf9vi2800006n7a6ea28ggz",
      content: faker.lorem.sentence(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
