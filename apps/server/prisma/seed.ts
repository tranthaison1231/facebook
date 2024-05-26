import { PrismaClient, PublishType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.like.create({
    data: {
      userId: "clutx2uws0000xodzr08i58r7",
      postId: "clwnomanv00018rcwqbci4cz0",
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
