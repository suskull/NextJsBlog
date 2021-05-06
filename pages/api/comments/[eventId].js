import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://suskull:Ildiavolo4@cluster0.fplaw.mongodb.net/events?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    const userEmail = req.body.email;
    const username = req.body.name;
    const userComment = req.body.text;

    if (!userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid Email" });
    }
    if (!username || username.trim() === "") {
      res.status(422).json({ message: "Please input your Name" });
    }
    if (!userComment || userComment.trim() === "") {
      res.status(422).json({ message: "Please input your Comment" });
    }

    const newComment = {
      email: userEmail,
      name: username,
      text: userComment,
      eventId,
    };

    const db = client.db();

    const result = await db.collection("comments").insertOne(newComment);

    newComment.id = result.insertedId;

    res.status(201).json({ message: "Comment success", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();
    const comments = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments });
  }

  client.close();
};

export default handler;
