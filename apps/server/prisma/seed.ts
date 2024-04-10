import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const data = await prisma.user.delete({
    where: {
      email: "son.tran@enouvo.com",
    },
  });
  const dete = await prisma.user.findMany({
    where:{
      email:"nhat.nguyen@enouvo.com"
    }
  });
  console.log(data);
  console.log(
    dete
  )
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
