let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema(
    {
        adminid:{type:String},
        cropid:{type:String, require:true},
        rdate:{type:Date, require:true},
        dose:{type:String, require:true},
        space:{type:String, require:true},
        drip:{type:String, require:true},
        spare:{type:String, require:true}
    
    }
)

let Recommendation = mongoose.model("recommendation", schema);

module.exports = Recommendation;