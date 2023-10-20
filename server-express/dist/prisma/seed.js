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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
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
        const addTask = yield prisma.users.updateMany({
            where: { id: "65317ef0cf7995434a5f0396" },
            data: {
                tasks: {
                    push: [{ singleTask: "paginer le coup du soir  ", time: new Date() }]
                }
            }
        });
        // console.log(addTask);
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
main();
//# sourceMappingURL=seed.js.map