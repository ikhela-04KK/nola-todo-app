import express, { Request, Response} from "express";
import multer from "multer";
import path from "path";
// import "dotenv/config";
import cors from "cors";
import { PrismaClient } from "@prisma/client";


// Une meilleur intégration de typscript dans ce projet tâche
interface Users {
  readonly id :String;      
  email       :String ;
  image       :String  ;
  nom         :String  ;
  password    :String   ;
  tasks       :Object[]  ;
  // heure       :String ;
  // lenTask     :number;
  remenberMe : Boolean;
}

// type for my signUp root 
interface signUp{
  email:string;
  password:string;
  rememberMe:boolean;
}

// type for my addTask root

const prisma= new PrismaClient();
async function run() {
  const any_Users = await prisma.users.findMany();
  console.log(any_Users)
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
// compresser l'image de là en meme temps avec multer
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

// initialisation des middlewares
app.use(express.static("public"));
app.use('/sign-in', express.static('public'));
app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.render("index.ejs");
});
app.post("/sign-in", (req: Request, res: Response) => {
  res.render("sign-up.ejs")
});

// let userData: Users;
// let taskUsers: string[] = [];

// express.Request<{},{},signUp> signature de type gérique -> req, res, next 
app.post("/sign-in/connected", upload.single('userImage'), async (req: express.Request<{},{},signUp> , res: Response) => {
  try{
  console.log(req.body);
  const {email, password,rememberMe } = req.body
  const nom = email.split("@")[0];
  const image = `${req.file?.filename}`;
  const userData = await prisma.users.create({
      data:{email:email,nom:nom,image:image,password:password , rememberMe:rememberMe}
  })
    res.json(userData);
    res.render("features.ejs", userData);
    await prisma.$disconnect()
  }
  catch(e){
    console.log(e);
    await prisma.$disconnect();
  }
})

// app.post("/sign-in/connected/add-task", upload.none(), (req: Request, res: Response) => {
//   console.log(req.body);
//   const date = new Date();
//   const heureDate = `${date.getHours()}:${date.getMinutes()}`;
//   userData.heure = heureDate;
//   const taskUser = req.body.taskUser;
//   console.log(typeof(req.body.taskUser));
//   let lenTask = taskUsers.push(taskUser);
//   userData.tasks= taskUsers;
//   userData.lenTask = lenTask;
//   console.log(userData)
//   res.redirect("/sign-in/connected");
// });
// app.get("/sign-in/connected", (req: Request, res: Response) => {
//   res.render("features.ejs", userData);
// });
app.listen(port, () => {
  console.log(`Le serveur fonctionne sur le port ${port}`);
});