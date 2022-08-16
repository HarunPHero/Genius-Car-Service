const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//mongodb

const uri = `mongodb+srv://Database1:6DJocCE8IbLkAd1B@cluster0.8xr9vla.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db("geniusCar").collection("service");
    //get api document
    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    //find a single document
    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });
    //add service
    app.post("/service", async(req,res)=>{
      const newService = req.body;
      const result = await serviceCollection.insertOne(newService);
      res.send(result)
    });
    //delete service
    app.delete("/service/:id", async(req,res)=>{
      const id = req.params.id;
      const query = {_id:ObjectId(id)};
      const result = await serviceCollection.deleteOne(query);
      res.send(result)
    })
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running Genius car Server");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
