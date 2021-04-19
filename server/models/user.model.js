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
    ip:String,
    cough:Boolean,
    fever:Boolean,
    sneezing:Boolean,
    smoke:Boolean,
    chest_pain:Boolean,
    dry_mouth:Boolean,
    rtpcr:String,
    chest_report:String
},{
    timestamps:true
});

export default mongoose.model('User',UserSchema);