//@ts-ignore
import express, { Request, Response} from "express";
import multer from "multer";
import path from "path";
// import "dotenv/config";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
// import api for username 
import {USERS, createRandomUser} from "./api/fakerUser"

// type for my signUp ROOT 
interface signUp{
  email:string;
  password:string;
  rememberMe:boolean;
}

// type for my addTask ROOT
interface addTask{
  singleTask: string;
  time: string; 
  // nombreTask:number;
}

//type for my all task and lenTask 
interface anyTask{
  tasks:addTask[];
  nombreTask:number;
} 

interface idU{
  readonly id:string;
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
app.use('/user/:id/', express.static('public'));
app.use('/user/:id/task', express.static('public'));
app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.render("index.ejs");
});
app.post("/sign-in", (req: Request, res: Response) => {
  //  use this setup for implementing the way to send a fake data for testing 
  const fake_user = createRandomUser()
  res.render("sign-up.ejs", fake_user)
});



// express.Request<{},{},signUp> signature de type gérique -> req, res, next 
app.post("/sign-in/user", upload.single('image'), async (req: express.Request<{},{},signUp> , res: Response) => {
  try{
  console.log(req.body);
  const {email, password} = req.body
  const nom = email.split("@")[0];
  const image = `/images/${req.file?.filename}`; // put the relatif path for the image
  const rememberMe = Boolean(req.body.rememberMe)

  const userData = await prisma.users.create({
      data:{email:email,image:image,nom:nom,password:password , rememberMe:rememberMe},
  })

    // res.render("features.ejs", userData);
    res.redirect(`/user/${userData.id}/tasks`,); // don't send a username directly 

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

app.get("/user/:id/tasks" , async (req:Request, res:Response) =>{
  const idU = req.params.id;
  try {
    const userData:any = await prisma.users.findUnique({
      where:{
        id:idU
      }
    })
    // res.json(userData);
    res.render("features.ejs",userData); //@ts-ignore
  } 
  catch (e) {
    console.log(e)
  }
})

app.post("/user/:id/tasks/add", upload.none(), async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  // console.log(req.body);

    //strore my task
  // let userTask:addTask ;
  // let taskUser: addTask;

  // store for the all task
  let storesTask: anyTask = {
    nombreTask: 0,
    tasks: [],
  };
  const date = new Date();
  // const time = `${date.getHours()}:${date.getMinutes()}`;
  const time = new Date();


  const {singleTask}  = req.body;
  
  // let lenTask = storeTask.push({singleTask,time});

  // storesTask.nombreTask = lenTask;
  // storesTask.tasks = storeTask;

  const storeTask = await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      tasks: {
        push: [{singleTask, time}]
      },
    },
  })




  // res.redirect("/sign-in/connected");
  res.json(storeTask);
});

// app.get("/user/:id/tasks", (req: Request, res: Response) => {
//   res.render("features.ejs", userData);
// });
app.listen(port, () => {
  console.log(`Le serveur fonctionne sur le port ${port}`);
});