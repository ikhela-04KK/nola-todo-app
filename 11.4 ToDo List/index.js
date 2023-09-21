import express from "express";
import multer from "multer";
import path from "path";

// const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, 'public/images');
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});
const port = 3000;
const taskUsers= [];




// const newTasks = [];
// TreeWalker("C:/Users/Administrateur/Documents/nodeJS-modules-test/4.5 BootstrapProject");
// app.use(bodyParser.urlencoded({extended : true})); 
// app.use(express.static(__dirname +'/dist'), {index:false}); 
app.use(express.static("public"));
app.use('/sign-in', express.static('public'));

// j'initialise le middleware afin de recuperer les 
app.get("/", (req,res) =>{
    res.render("index.ejs");
})

app.post("/sign-in", (req, res) =>{
    res.render("sign-up.ejs")
});

let userData = {};
let allTaskUser = [];

// Renvoyer le nom de fichier directement à features.ejs
app.post("/sign-in/connected", upload.single('userImage'), (req, res) => {
    // console.log(storage.getFilename);
    // console.log(storage.filename)
    // console.log(upload);
    const email = req.body.email;
    const nameUser = email.split("@")[0];
    const userImage = req.file.filename;
    let lenTask = 0;

    userData = {
        userImage: `images/${userImage}`,
        nameUser: nameUser,
        lenTask: lenTask,
    };
    res.render("features.ejs", userData);
});


// renvoie la tâche que l'utilisateur à ajouter
// Route pour ajouter une tâche à l'utilisateur connecté
app.post("/sign-in/connected/add-task",upload.none(), (req,res,next) => {
    console.log(req.body);

    // display hour 
    const date = new Date(); 
    const heureDate = `${date.getHours()}:${date.getMinutes()}`
    userData.heureDate = heureDate;

    // for stask 
    
    const taskUser = req.body.taskUser;
    let lenTask = taskUsers.push(taskUser);
    userData.taskUsers = taskUsers;
    userData.lenTask = lenTask;

    // the task 
//     const taskHtml = ` <label class="list-group-item d-flex gap-3">
//     <input class="form-check-input flex-shrink-0" type="checkbox" value="" style="font-size: 1.375em;">
//     <span class="pt-1 form-checked-content">
//       <strong> ${taskUser} </strong>
//       <small class="d-block text-body-secondary">
//         <svg class="bi me-1" width="1em" height="1em"><use xlink:href="#alarm"></use></svg>
//         ${heureDate}pm
//       </small>
//     </span>
//   </label>`;
//   userData.taskHtml = taskHtml;

    // oldTaskUser = 
    userData.taskUsers = allTaskUser;

    //  est ce que je peux faire userData.taskUser = 
    res.redirect("/sign-in/connected");

});
app.get("/sign-in/connected", (req, res) => {
    res.render("features.ejs", userData);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});