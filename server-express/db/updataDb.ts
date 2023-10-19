import { MongoClient, ServerApiVersion } from "mongodb";
const uri = "mongodb+srv://ikhela-04KK:ikhela-04KK@test0.s9iyuh2.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
 
// Modify listing 
async function search(client:MongoClient) {
    try {
      const cursor = client
        .db("prisma-client")
        .collection("Users")
        .find(); 

      const results = await cursor.toArray();
      console.log(results.forEach(objects => console.log(objects)));  

    } catch (error) {
      console.error("Une erreur s'est produite lors de la recherche :", error);
    }
  }
  search(client);

async function updateClient (client:MongoClient){
    try {
        const cursor = await client 
            .db("prisma-client")
            .collection("Users")
            .updateMany({rememberMe:{$exists:true}} ,{$set:{rememberMe:'true'}})
        // console.log(cursor.matchedCount);
        console.log(cursor.modifiedCount);
    } catch (error) {
        
    }
}
updateClient(client);