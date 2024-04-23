import { PrismaClient, PublishType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const data = await prisma.post.create({
  //   data: {
  //     userId: "clumqswgs00008m39wl1wpnut",
  //     content: "Hello world",
  //     media: [
  //       "https://vcdn-giaitri.vnecdn.net/2023/05/05/son-tung-mmw-2824-1683249980.jpg",
  //     ],
  //     publishType: PublishType.PUBLIC,
  //   },
  // });

  const product = await prisma.products.create({
    data:{
      "categoryId":"clv14foip0000zi018qpl5n3x",
      "name":"Xe dep 1",
      "price":10000000,
      "description":"Top 10 chiếc xe 'hớp hồn' phái đẹp",
      "img":"https://vnn-imgs-f.vgcloud.vn/2020/10/21/10/huracan-la-mo-t-trong-nhu-ng-ma-u-xe-de-p-nha-t-cu-a-lamborghini-a-nh-autocar.jpg",
      "location":"New York"
  }
  });
  console.log(product);

 
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
