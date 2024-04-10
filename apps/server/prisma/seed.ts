import { PrismaClient, PublishType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const data = await prisma.post.create({
    data: {
      userId: "clumqswgs00008m39wl1wpnut",
      content: "Hello world",
      media: [
        "https://vcdn-giaitri.vnecdn.net/2023/05/05/son-tung-mmw-2824-1683249980.jpg",
      ],
      publishType: PublishType.PUBLIC,
    },
  });

  console.log(data);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
