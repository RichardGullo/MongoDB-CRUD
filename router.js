const express = require('express');
const db = require('./db');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', (req,res)=>{
    db.collection('items').find().toArray(function(err,items){
      res.render('index',{items:items});
    })
  })

  router.get('/populate-item', function(req,res){
    db.collection('items').find().toArray(function(err,items){
      res.send(items);
    })
})
  
router.post('/create-item', function (req, res) {
  db.collection('items').insertOne({ text: req.body.text }, function (err, info) {
      console.log(info.insertedId);
      res.json({ text: req.body.text, _id: info.insertedId });
  })
})
  
  router.post('/update-item', function(req, res) {
    console.log(req.body);
    db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectId(req.body.id)}, {$set: {text: req.body.text}}, function() {
      res.send("Success")
    })
  })
  
  router.post('/delete-item', (req,res)=>{
    db.collection('items').deleteOne({_id: new mongodb.ObjectId(req.body.id)},function(){
        res.send("Success");
    });
  })

  module.exports = router;