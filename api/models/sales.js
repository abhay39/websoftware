import mongoose from 'mongoose'

const SalesModel=new mongoose.Schema({
    boxType:{
        type:String,
    },
    date:{
        type:String,
        unique:true
    },
    forWho:{
        type:String,
        unique:true
    },
    place:{
        type:String,
    },
    ribbonText1:{
        type:String,
    },
    ribbonText2:{
        type:String,
    },
    roomNumber:{
        type:Number,
    },
    size1:{
        type:String,
    },
    time:{
        type:String,
    },
    wantRibbon:{
        type:Boolean,
    },
    addedBy:{
        type:String,
        required:true,
    }
    
},{timestamps:true});

const Sales=mongoose.model("Sales",SalesModel);

export default Sales