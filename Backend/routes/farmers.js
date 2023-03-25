let express = require('express');
let mongoose = require('mongoose');
const { object } = require('webidl-conversions');
let Farmer = require("../models/Farmer");



let router = express.Router();

router.post("/",(req,res)=>{
  let body = req.body;
  new Farmer(body).save(body).then((result)=>{
   res.end(JSON.stringify({status:"success", data:result}))
 },(err)=>{
  res.end(JSON.stringify({status:"failed", data:err}))
 })
})
router.put("/:id",(req,res)=>{
  let body = req.body;
  let object = new Farmer(body);
  Farmer.findByIdAndUpdate(req.params.id, body).then((result)=>{
 object.save(body).then((result)=>{
   res.end(JSON.stringify({status:"success", data:result}))
 },(err)=>{
  res.end(JSON.stringify({status:"failed", data:err}))
 })
})
    

    
})
router.get("/",(req,res)=>{
  Farmer.find().then((result)=>{
    res.end(JSON.stringify({status:"success", data:result}))
  },(err)=>{
   res.end(JSON.stringify({status:"failed", data:err}))
  })
})


router.get("/:id",(req,res)=>{
    let id = req.params.id;
    // console.log(id);
   Farmer.findById(id).then((result)=>{
      res.end(JSON.stringify({status:"success", data:result}))
    },(err)=>{
   res.end(JSON.stringify({status:"failed", data:"record not found"}))
   })
 })


router.delete("/:id",(req,res)=>{
    let id = req.params.id;
   Farmer.findByIdAndDelete(id).then((result)=>{
    res.end(JSON.stringify({status:"success", data:result}))
  },(err)=>{
   res.end(JSON.stringify({status:"failed", data:err}))
  })  
})

router.post("/recommendation", (req, res)=>{
  let recommendation = new Recommendation(req.body);
  recommendation.save().then((result)=>{
      res.end(JSON.stringify({status:"success", data:result}))
  },(err)=>{
      res.end(JSON.stringify({status:"failed", data:err}))
  })
});

router.get("/recommendation/:farmerid", (req, res)=>{
  Recommendation.find({farmerid:req.params.farmerid}).populate({path:"cropid", select:["name"]}).sort({rdate:1}).then((result)=>{
      res.end(JSON.stringify({status:"success", data:result}));
  },(err)=>{
      res.end(JSON.stringify({status:"failed", data:err}));
  })
});

router.delete("/recommendation/:id", (req, res)=>{
  Recommendation.findByIdAndDelete(req.params.id).then((result)=>{
      res.end(JSON.stringify({status:"success", data:result}));
  },(err)=>{
      res.end(JSON.stringify({status:"failed", data:err}));
  })
});




module.exports = router;