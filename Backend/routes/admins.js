let express = require('express');
let mongoose = require('mongoose');
const { object } = require('webidl-conversions');
let Admin = require("../models/Admin");



let router = express.Router();

router.post("/",(req,res)=>{
  let body = req.body;
  new Admin(body).save(body).then((result)=>{
   res.end(JSON.stringify({status:"success", data:result}))
 },(err)=>{
  res.end(JSON.stringify({status:"failed", data:err}))
 })
})

router.put("/:id",(req,res)=>{
  let body = req.body;
  let object = new Admin(body);
  Admin.findByIdAndUpdate(req.params.id, body).then((result)=>{
 object.save(body).then((result)=>{
   res.end(JSON.stringify({status:"success", data:result}))
 },(err)=>{
  res.end(JSON.stringify({status:"failed", data:err}))
 })
}) 
    
})
router.get("/",(req,res)=>{
  Admin.find({}).sort({name:1}).then((result)=>{
    res.end(JSON.stringify({status:"success", data:result}))
  },(err)=>{
   res.end(JSON.stringify({status:"failed", data:err}))
  })
})


router.get("/:id",(req,res)=>{
    let id = req.params.id;
    // console.log(id);
   Admin.findById(id).then((result)=>{
      res.end(JSON.stringify({status:"success", data:result}))
    },(err)=>{
   res.end(JSON.stringify({status:"failed", data:"record not found"}))
   })
 })


router.delete("/:id",(req,res)=>{
    let id = req.params.id;
   Admin.findByIdAndDelete(id).then((result)=>{
    res.end(JSON.stringify({status:"success", data:result}))
  },(err)=>{
   res.end(JSON.stringify({status:"failed", data:err}))
  })  
})




module.exports = router;