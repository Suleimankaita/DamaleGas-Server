const mongoose=require('mongoose');

const AdminSchema=new mongoose.Schema({
    Username:String,
    Profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    
    
    
})

module.exports=mongoose.model("GasAdmin",AdminSchema)