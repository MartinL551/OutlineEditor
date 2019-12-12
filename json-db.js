const fs = require('fs');
const util = require('util');
const config = require('./config');
let data = [];
let test = true;


function uploadDocument(req){
  let existingIndex = -1;
      if(data.length > 0){
      for(i = 0; i <= data.length; i++){
        if(data[i].pageName == req.pageName){
          existingIndex = i;
          break;
        }else{
          break;
        }
      }
    }
    if(existingIndex >= 0){
      data[existingIndex] = req;
    }else{
      data.push(req);
    }
    console.log(data);
}



function getDoc(req){
  console.log(req);
  let existingIndex = -1;
    if(data.length > 0){
    for(i = 0; i <= data.length; i++){
      if(data[i].pageName == req){
        existingIndex = i;
        break;
      }else{
        return null;
        break;
      }
    }
    let pageData = data[existingIndex];
    console.log(pageData);
    return data[existingIndex];

}

}

module.exports.getDoc = getDoc
module.exports.uploadDocument = uploadDocument;
