import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

  const db = client.db(process.env.MONGODB_NAME);
  switch (req.method) {
    case "POST":
      //console.log(req.body);
      let bodyObject = req.body;
      try {
        //let bodyObject = req.body;
        let myPost = await db
          .collection('user-top-tracks')
          .insertOne(bodyObject);
        //console.log("in posts POST CASE");
        res.json(myPost.ops[0]);
        break;
      } catch (e) {}
    case "GET":
      const allPosts = await db.collection("users-top-tracks").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
  //console.log("error");
};
