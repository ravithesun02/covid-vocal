import mongoose from 'mongoose';
import Predict from './predict.model';

const UserSchema=mongoose.Schema({
    phone:{
        type:String,
        required:'Phone Number required'
    },
    name:{
        type:String
    },
    emailId:{
        type:String
    },
    token:String,
    isVerified:{
        type:Boolean,
        default:false
    },
    covid_ai:{
        type:String
    },
    predict_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Predict
    },
    covid_doc:{
        type:String
    },
    ip:String
},{
    timestamps:true
});

export default mongoose.model('User',UserSchema);