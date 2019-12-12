'use static';

const express = require('express');
const config = require("./config")
const port = 8080;
const app = express();
const db = require("./json-db");
const router = express.Router();
const bodyParser = require('body-parser');

app.use('/', (req, res, next) => { console.log(new Date(), req.method, req.url); next(); });
app.use(bodyParser.json());
app.use('/', router);

//api

app.post("/api/page", uploadDocument);
app.get("/api/page", getDoc);



//static files
app.use('/', express.static(config.web, { extensions: ['html'] }));

//start the server
app.listen(port, (err) => {
  if (err) console.error("Error starting server", err);
  else console.log("server started on port", port);
});

//server functions
async function uploadDocument(req, res){
  try{
    await db.uploadDocument(req.body);
    res.ok;
  } catch (e){
    error(res, "upload failed" + e);
  }
}

async function getDoc(req, res){
  let urlSearch = req.query;
  pageName = urlSearch.pageName;
  try{
    const retVal = await db.getDoc(pageName);
    res.json(retVal).ok;
  }catch(e){
    error(res, "GET failed " + e);
  }

}



function error(res, msg){
  res.sendStatus(404).end();
  console.error(msg);
}
