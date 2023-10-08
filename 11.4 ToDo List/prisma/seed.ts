import { PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // try {
    // Données de l'utilisateur que vous souhaitez insérer ou mettre à jour
    await prisma.users.create({
      data:{
        email:"seniorDeveloper@gmail.com", // j'avais oublié d'implementer dans la boîte 
        image:"78452295744.png",
        nom:"makerty",
        password:"478Pocaso",
        tasks:[
          {singleTask:"norman est mort je dois aller à son enterement", time:new Date()},{singleTask:"j'i perdu le reste je vais les chercehr", time:new Date()}
        ]
    }
    })
    const allCustomers = await prisma.users.findMany();
    console.log(allCustomers);
    console.log('Utilisateur inséré/mis à jour :');
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
  
