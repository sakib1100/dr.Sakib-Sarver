const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { query } = require('express');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.4euscjg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){

try{

client.connect();

const InsertData = client.db('new-doctor').collection('insertData');


app.post('/insertData', async(req,res) => {
  const docs = req.body;
  const insertOne = await InsertData.insertOne(docs);
  res.send(insertOne);

})

app.get('/insertData', async(req,res) => {
  const find = await InsertData.find({}).toArray();
  res.send(find);
})

app.delete('/DeleteData/:id', async(req,res) => {
  const id = req.params.id;
  const query = {_id: ObjectId(id)};
  const result = await InsertData.deleteOne(query);
  res.send(result)
    
  })


}

finally{

}
}

run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log('Example app listening on port', port)
})