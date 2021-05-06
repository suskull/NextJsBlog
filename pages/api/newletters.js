import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.enteredEmail;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invaled email" });
    }

    const client = await MongoClient.connect(
      "mongodb+srv://suskull:Ildiavolo4@cluster0.fplaw.mongodb.net/events?retryWrites=true&w=majority"
    );

    const db = client.db();

    await db.collection("newletter").insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: "Sign up success" });
  }
};

export default handler;
