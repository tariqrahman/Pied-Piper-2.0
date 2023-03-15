import clientPromise from "@/lib/mongodb";

//updates id1 starts following id2
export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_NAME);
  switch (req.method) {
    case "POST":
      let [id1,id2] = [req.body];
      //console.log(id1.userId)
      try {
        let myPost = await db
          .collection('user-followed-users')
          .updateOne({id:id1.curUserId},
            {$pull: {following: id1.userId}});
        console.log(myPost)
        res.status(200).json({ success: true });
        break;
      } catch (e) {
        res.json();
      }
  }
};
