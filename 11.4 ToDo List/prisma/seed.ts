import { PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export type UsersWhereUniqueInput = {
  email: string;
  image: string;
  nom: string;
  password: string;
  tasks: {
    singleTask: string;
    time: Date;
  }[];
};

async function main() {
  try {
    // Données de l'utilisateur que vous souhaitez insérer ou mettre à jour
    let userData:UsersWhereUniqueInput = {
      email: 'example@example.com',
      image: 'profile.jpg',
      nom: 'John Doe',
      password: 'motdepasse',
      tasks: [
        {
          singleTask: 'Acheter du pain',
          time: new Date(), // Remplacez par la date et l'heure appropriées
        },
        // Ajoutez d'autres tâches si nécessaire
      ],
    };
    
    // Utilisez l'opération upsert pour insérer ou mettre à jour l'utilisateur
    const upsertedUser = await prisma.users.upsert({
      where: { email: userData.email }, // Clé de recherche
      update: userData, // Mises à jour en cas de correspondance
      create: userData, // Création si aucune correspondance
    });

    console.log('Utilisateur inséré/mis à jour :', upsertedUser);
  } catch (error) {
    console.error('Erreur :', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
