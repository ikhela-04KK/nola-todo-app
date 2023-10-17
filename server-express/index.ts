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
}
const prisma= new PrismaClient();
async function run() {
  const Users = await prisma.users.findMany();
  console.log(Users)
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

let userData: Users;
let taskUsers: string[] = [];

app.post("/sign-in/connected", upload.single('userImage'), (req: Request, res: Response) => {
  
  const email: string = req.body.email;
  const nom = email.split("@")[0];
  const image = `${req.file?.filename}`;
  const password:string = `${req.body.password}`;
  const RememberMe:boolean = JSON.parse(req.body.rememberMe)
  // const lenTask = 10;
  // dataUser 
  const user01 = {email:email,nom:nom,image:image,password:password , RememberMe:RememberMe}
  async function main(){
    await prisma.users.create({
      data:user01
    })
  }
  main()
  .then(async () => {
    await prisma.$disconnect()
    res.status(200).sendStatus(200)
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  const userData = user01
  console.log(userData);
  res.render("features.ejs", userData);
  
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