//import { MongoClient } from "mongodb";
import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
    // const client = await MongoClient.connect(process.env.MONGODB_URI, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   });
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);
  switch (req.method) {
    case "POST":
      console.log(req.body);
      let [id1, id2] = [req.body];
      console.log(id1.userId)
      console.log(id1.curUserId)
      try {
        //let bodyObject = req.body;
        let myPost = await db
          .collection('user-followed-users')
          .updateOne({id:id1.userId},
            {$addToSet: {follower: id1.curUserId}});
        console.log(myPost)
        //console.log("in posts POST CASE");
        res.status(200).json({ success: true });
        break;
      } catch (e) {
        res.json();
      }
  }
  //console.log("error");
//   client.close();
};
