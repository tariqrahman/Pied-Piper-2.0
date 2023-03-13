import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

  const db = client.db("nextjs-mongodb-demo");
  switch (req.method) {
    case "POST":
      //console.log(req.body);
      let bodyObject = req.body;
      try {
        //let bodyObject = req.body;
        let myPost = await db
          .collection("nextjs-mongodb-demo-2")
          .insertOne(bodyObject);
        //console.log("in posts POST CASE");
        res.json(myPost.ops[0]);
        break;
      } catch (e) {}
    case "GET":
      const allPosts = await db.collection("users").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
  console.log("error");
};
