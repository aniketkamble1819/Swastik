let express = require('express');
let mongoose = require('mongoose');
const { object } = require('webidl-conversions');
let Crops = require("../models/Crops");



let router = express.Router();

router.post("/",(req,res)=>{
  let body = req.body;
  new Crops(body).save(body).then((result)=>{
   res.end(JSON.stringify({status:"success", data:result}))
 },(err)=>{
  res.end(JSON.stringify({status:"failed", data:err}))
 })
})
router.put("/:id",(req,res)=>{
  let body = req.body;
  let object = new Crops(body);
  Crops.findByIdAndUpdate(req.params.id, body).then((result)=>{
 object.save(body).then((result)=>{
   res.end(JSON.stringify({status:"success", data:result}))
 },(err)=>{
  res.end(JSON.stringify({status:"failed", data:err}))
 })
})
    

    
})
router.get("/",(req,res)=>{
  Crops.find().then((result)=>{
    res.end(JSON.stringify({status:"success", data:result}))
  },(err)=>{
   res.end(JSON.stringify({status:"failed", data:err}))
  })
})


router.get("/:id",(req,res)=>{
    let id = req.params.id;
    // console.log(id);
   Crops.findById(id).then((result)=>{
      res.end(JSON.stringify({status:"success", data:result}))
    },(err)=>{
   res.end(JSON.stringify({status:"failed", data:"record not found"}))
   })
 })


router.delete("/:id",(req,res)=>{
    let id = req.params.id;
   Crops.findByIdAndDelete(id).then((result)=>{
    res.end(JSON.stringify({status:"success", data:result}))
  },(err)=>{
   res.end(JSON.stringify({status:"failed", data:err}))
  })  
})




module.exports = router;