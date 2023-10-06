import express, { Request, Response} from "express";
import multer, { Multer } from "multer";
import path from "path";
// import "dotenv/config";
import { PrismaClient } from "@prisma/client";


const prisma= new PrismaClient();
async function run() {
  const User = await prisma.users.findMany();
  console.log(User)
  };
  
  run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  run()

// Crée une instance d'Express
const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Crée une instance de Multer avec le stockage défini
const upload = multer({ storage: storage });
const port: number = 3000;

// Crée un tableau pour les tâches des utilisateurs
const taskUsers: string[] = [];
let userData: any = {}; // Utilisez un type approprié pour userData

app.use(express.static("public"));
app.use('/sign-in', express.static('public'));

app.use(express.urlencoded({ extended: true })); // Middleware pour analyser les données POST

// Initialise le middleware pour récupérer les données POST
app.use(express.json());

// Initialise le middleware pour gérer les cookies
// app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.render("index.ejs");
});

app.post("/sign-in", (req: Request, res: Response) => {
  res.render("sign-up.ejs")
});

// Renvoyer le nom de fichier directement à features.ejs
app.post("/sign-in/connected", upload.single('userImage'), (req: Request, res: Response) => {
  const email: string = req.body.email;
  const nameUser = email.split("@")[0];
  const userImage = req.file?.filename;
  let lenTask = 0;

  userData = {
    userImage: `images/${userImage}`,
    nameUser: nameUser,
    lenTask: lenTask,
  };
  res.render("features.ejs", userData);
});

// Route pour ajouter une tâche à l'utilisateur connecté
app.post("/sign-in/connected/add-task", upload.none(), (req: Request, res: Response) => {
  console.log(req.body);

  // Obtenir l'heure actuelle
  const date = new Date();
  const heureDate = `${date.getHours()}:${date.getMinutes()}`;
  userData.heureDate = heureDate;

  // Ajouter la tâche à la liste des tâches
  const taskUser = req.body.taskUser;
  let lenTask = taskUsers.push(taskUser);
  userData.taskUsers = taskUsers;
  userData.lenTask = lenTask;

  res.redirect("/sign-in/connected");
});

app.get("/sign-in/connected", (req: Request, res: Response) => {
  res.render("features.ejs", userData);
});

app.listen(port, () => {
  console.log(`Le serveur fonctionne sur le port ${port}`);
});

