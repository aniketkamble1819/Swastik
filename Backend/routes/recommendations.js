let express = require('express');
let mongoose = require('mongoose');
const { object } = require('webidl-conversions');
let Recommendation = require("../models/Recommendation");



let router = express.Router();

router.post("/",(req,res)=>{
    let body = req.body;
    new Recommendation(body).save(body).then((result)=>{
     res.end(JSON.stringify({status:"success", data:result}))
   },(err)=>{
    res.end(JSON.stringify({status:"failed", data:err}))
   })
})

router.put("/:id",(req,res)=>{
    let body = req.body;
    let object = new Recommendation(body);
    Recommendation.findByIdAndUpdate(req.params.id, body).then((result)=>{
   object.save().then((result)=>{
     res.end(JSON.stringify({status:"success", data:result}))
   },(err)=>{
    res.end(JSON.stringify({status:"failed", data:err}))
   })
  })
    

    
})
router.get("/",(req,res)=>{
  Recommendation.find().then((result)=>{
    res.end(JSON.stringify({status:"success", data:result}))
  },(err)=>{
   res.end(JSON.stringify({status:"failed", data:err}))
  })
})


router.get("/:id",(req,res)=>{
    let id = req.params.id;
    // console.log(id);
   Recommendation.findById(id).then((result)=>{
      res.end(JSON.stringify({status:"success", data:result}))
    },(err)=>{
   res.end(JSON.stringify({status:"failed", data:"record not found"}))
   })
 })


router.delete("/:id",(req,res)=>{
    let id = req.params.id;
   Recommendation.findByIdAndDelete(id).then((result)=>{
    res.end(JSON.stringify({status:"success", data:result}))
  },(err)=>{
   res.end(JSON.stringify({status:"failed", data:err}))
  })  
})




module.exports = router;