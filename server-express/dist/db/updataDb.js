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
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://ikhela-04KK:ikhela-04KK@test0.s9iyuh2.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
// Modify listing 
function search(client) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cursor = client
                .db("prisma-client")
                .collection("Users")
                .find();
            const results = yield cursor.toArray();
            console.log(results.forEach(objects => console.log(objects)));
        }
        catch (error) {
            console.error("Une erreur s'est produite lors de la recherche :", error);
        }
    });
}
search(client);
function updateClient(client) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cursor = yield client
                .db("prisma-client")
                .collection("Users")
                .updateMany({ rememberMe: { $exists: false } }, { $set: { rememberMe: true } });
            // console.log(cursor.matchedCount);
            console.log(cursor.modifiedCount);
        }
        catch (error) {
        }
    });
}
updateClient(client);
//# sourceMappingURL=updataDb.js.map