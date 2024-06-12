import { PrismaClient, PublishType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const category = await prisma.category.delete({
    where: {
      id: "test"
    }
    })

    console.log(category)

  // npx prisma db seed

}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
