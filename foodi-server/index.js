const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middleware
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: "https://ksc-mern-foodi2.web.app",
    method: ["POST", "GET", "PATCH", "PUT", "DELETE"],
    credential: true,
  })
);

// mongodb config

const uri =
  "mongodb+srv://mdbaizedhasans:vQlIwu0tFkX5lsoz@mern-foodi-cluster.dqjd8rp.mongodb.net/?retryWrites=true&w=majority&appName=mern-foodi-cluster";
// const uri =
//   "mongodb+srv://baized:baized07@cluster0.aevqb0q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const uri =
//   "mongodb+srv://mdbaizedhasans:zJhC9vsNpIb5i81u@mern-foodi-cluster.dqjd8rp.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect()

    //database & collections
    const menuCollections = client.db("mern-foodi-client").collection("menus");
    const cartCollections = client
      .db("mern-foodi-client")
      .collection("cartItems");

    //   all menu items operations
    app.get("/menu", async (req, res) => {
      const result = await menuCollections.find().toArray();
      res.send(result);
    });

    // all carts operation

    // posting cart to db
    app.post("/carts", async (req, res) => {
      const cartItems = req.body;
      const result = await cartCollections.insertOne(cartItems);
      res.send(result);
    });

    // get carts using email
    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const filter = { email: email };
      const result = await cartCollections.find(filter).toArray();
      res.send(result);
    });

    // get specific carts
    app.get("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await cartCollections.findOne(filter);
      res.send(result);
    });

    // delete items from cart
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await cartCollections.deleteOne(filter);
      res.send(result);
    });

    // update carts quantity
    app.put("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const { quantity } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updatedDoc = {
        $set: {
          quantity: parseInt(quantity, 10),
        },
      };
      const result = await cartCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// ...........
app.get("/", (req, res) => {
  res.send("Hey Sinameka!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// mdbaizedhasans
// zJhC9vsNpIb5i81u
// baized07
