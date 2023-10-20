"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// import "dotenv/config";
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const any_Users = yield prisma.users.findMany();
        console.log(any_Users);
    });
}
;
run()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
run();
// Crée une instance d'Express
// compresser l'image de là en meme temps avec multer
const app = (0, express_1.default)();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
// Crée une instance de Multer avec le stockage défini
const upload = (0, multer_1.default)({ storage: storage });
const port = 3000;
// initialisation des middlewares
app.use(express_1.default.static("public"));
app.use('/sign-in', express_1.default.static('public'));
app.use('/user/:id/', express_1.default.static('public'));
app.use('/user/:id/task', express_1.default.static('public'));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.render("index.ejs");
});
app.post("/sign-in", (req, res) => {
    res.render("sign-up.ejs");
});
// express.Request<{},{},signUp> signature de type gérique -> req, res, next 
app.post("/sign-in/user", upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const nom = email.split("@")[0];
        const image = `/images/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`; // put the relatif path for the image
        const rememberMe = Boolean(req.body.rememberMe);
        const userData = yield prisma.users.create({
            data: { email: email, image: image, nom: nom, password: password, rememberMe: rememberMe },
        });
        // res.render("features.ejs", userData);
        res.redirect(`/user/${userData.id}/tasks`); // don't send a username directly 
        // res.json(userData);
        yield prisma.$disconnect();
    }
    catch (e) {
        console.log(e);
        yield prisma.$disconnect();
    }
}));
// app.get('/user/:id', (req:Request, res:Response) =>{
//   const userName = req.params.id;
//   // res.send(`Bienvenue, ${userName} !`);
//   res.redirect(`/user/${userName}/task`);
// }); 
app.get("/user/:id/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idU = req.params.id;
    try {
        const userData = yield prisma.users.findUnique({
            where: {
                id: idU
            }
        });
        // res.json(userData);
        res.render("features.ejs", userData); //@ts-ignore
    }
    catch (e) {
        console.log(e);
    }
}));
app.post("/user/:id/tasks/add", upload.none(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    //strore my task
    // let userTask:addTask ;
    // let taskUser: addTask;
    // store for the all task
    let storesTask = {
        nombreTask: 0,
        tasks: [],
    };
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    const { singleTask } = req.body;
    // let lenTask = storeTask.push({singleTask,time});
    // storesTask.nombreTask = lenTask;
    // storesTask.tasks = storeTask;
    const storeTask = yield prisma.users.update({
        where: {
            id: req.params.id,
        },
        data: {
            tasks: {
                push: [{ singleTask, time }],
            },
        },
    });
    // res.redirect("/sign-in/connected");
    res.json(storeTask);
}));
// app.get("/user/:id/tasks", (req: Request, res: Response) => {
//   res.render("features.ejs", userData);
// });
app.listen(port, () => {
    console.log(`Le serveur fonctionne sur le port ${port}`);
});
//# sourceMappingURL=index.js.map