import mongoose from 'mongoose';
import Predict from './predict.model';

const UserSchema=mongoose.Schema({
    phone:{
        type:String,
        required:'Phone Number can\'t be empty'
    },
    name:{
        type:String
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
    }
},{
    timestamps:true
});
export default mongoose.model('User',UserSchema);