import { MongoClient } from "mongodb";
import clientPromise from "../../lib/mongodb";

//for generating the follow table for a user
export default async (req, res) => {
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("nextjs-mongodb-demo");
  switch (req.method) {
    case "POST":
        try {
      let bodyObject = req.body;
        let myPost = await db
          .collection("user-follow-users")
          .insertOne(bodyObject);
          res.status(200).json({ success: true });
          console.log(res)
        break;
      } catch (e) {
        res.status(500).json({ success: false});

      }
  }
  client.close();
};
