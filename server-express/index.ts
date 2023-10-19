import express, { Request, Response} from "express";
import multer from "multer";
import path from "path";
// import "dotenv/config";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

// type for my signUp ROOT 
interface signUp{
  email:string;
  password:string;
  rememberMe:boolean;
}

// type for my addTask ROOT
interface addTask{
  heure : string; 
  task: string;
  // nombreTask:number;
}

//type for my all task and lenTask 
interface anyTask{
  tasks:addTask[];
  nombreTask:number;
} 

// Une meilleur intégration de typscript dans ce projet tâche
interface Users {
  readonly id :String;      
  email       :String ;
  image       :String  ;
  nom         :String  ;
  password    :String   ;
  tasks       :addTask[]  ;
  // heure       :String ;
  // lenTask     :number;
  remenberMe : boolean;
}

//strore my task
// let userTask:addTask ;
let taskUser: addTask;
let storeTask:addTask[];

// store for the all task
let storesTask:anyTask;


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



// express.Request<{},{},signUp> signature de type gérique -> req, res, next 
app.post("/sign-in/user", upload.single('image'), async (req: express.Request<{},{},signUp> , res: Response) => {
  try{
  console.log(req.body);
  const {email, password} = req.body
  const nom = email.split("@")[0];
  const image = `/images/${req.file?.filename}`; // put the relatif path for the image
  const rememberMe = Boolean(req.body.rememberMe)

  const userData = await prisma.users.upsert({
      where :{email:email},
      update:{},
      create:{email:email,image:image,nom:nom,password:password , rememberMe:rememberMe},
  })

    // res.render("features.ejs", userData);
    res.redirect(`/user/${userData.id}/task`,); // don't send a username directly 

    // res.json(userData);
    await prisma.$disconnect()
  }
  catch(e){
    console.log(e);
    await prisma.$disconnect();
  }
})

// app.get('/user/:id', (req:Request, res:Response) =>{
//   const userName = req.params.id;
//   // res.send(`Bienvenue, ${userName} !`);
//   res.redirect(`/user/${userName}/task`);
// }); 

app.get("/user/:id/task" , (req:Request, res:Response) =>{
  const idU =  req.params.id;
  res.send(`Bienvenue, ${idU} !`);

  try {
    const userData = prisma.users.findFirst({
      where:{
        id:idU
      }
    })
    res.json(userData);
  } catch (e) {
    console.log(e)
  }
  // const userData = prisma.users.findUnique({
  //   where:{
  //     id:idU
  //   }
  // })
  // res.render("features.ejs", userData);
})

// app.post("/user/:id/tasks/add", upload.none(), (req: Request<{},{}, addTask>, res: Response) => {
//   console.log(req.body);

//   const date = new Date();
//   const heureDate = `${date.getHours()}:${date.getMinutes()}`;

//   const {task}  = req.body; 

//   taskUser.heure = heureDate;
//   taskUser.task = task;


//   // verification 
//   console.log(typeof(task));

//   // array of task for store all the user task
//   let lenTask = storeTask.push(taskUser);

//   // userTask.tasks= taskUsers;
//   // userTask.lenTask = lenTask;
//   storesTask.nombreTask =lenTask;
//   storesTask.tasks = storeTask;

//   console.log(storesTask);
//   // res.redirect("/sign-in/connected");
//   res.send(storesTask);
// });
// // app.get("/sign-in/connected", (req: Request, res: Response) => {
// //   res.render("features.ejs", userData);
// // });
app.listen(port, () => {
  console.log(`Le serveur fonctionne sur le port ${port}`);
});