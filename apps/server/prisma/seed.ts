import { PrismaClient, PublishType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

 const category = await prisma.category.create({
   data: {
     id:"test",
     name: "Đáng mà mua",
     icon: "https:www.facebook.com/images/fb_icon_325x325.png",
     subCategories:{
       createMany:{
         data:[
           {
             id:"nike real",
             name: "Đáng mà mua 1111",
             icon: "https:www.facebook.com/images/fb_icon_325x325.png",
            
           },
           {
             id:"nike fake",
             name: "Đáng mà mua 2222",
             icon: "https:www.facebook.com/images/fb_icon_325x325.png",
           }
         ]
       }

     }}})

   console.log(category)
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
