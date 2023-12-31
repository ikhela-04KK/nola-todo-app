import { PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // try {
    // Données de l'utilisateur que vous souhaitez insérer ou mettre à jour
  //   await prisma.users.create({
  //     data:{
  //       email:"seniorDeveloper@gmail.com", // j'avais oublié d'implementer dans la boîte 
  //       image:"78452295744.png",
  //       nom:"makerty",
  //       password:"478Pocaso",
  //       tasks:[
  //          {
  //           singleTask:"norman est mort je dois aller à son enterement", 
  //           time:new Date()
  //         },
  //         {
  //           singleTask:"j'i perdu le reste je vais les chercher", 
  //           time:new Date()
  //         }
  //       ],
  //       rememberMe: true
  //   }
  // })
    // const allCustomers = await prisma.users.findUnique({
    //   where:{id:"652fecbfd4ae2a1a173ec5cb"}}
    // );
    // console.log(allCustomers);
    // console.log('Utilisateur inséré/mis à jour :');

    const addTask = await prisma.users.update({
      where:{id:"65317ef0cf7995434a5f0396"}, 
      data:{
        tasks:{
          push: [{singleTask:"paginer le coup du soir  ", time:new Date()}]
        }
      }
    })
    // console.log(addTask);
  } 
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
  main()
  
