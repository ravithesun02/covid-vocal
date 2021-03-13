import mongoose from 'mongoose';
var AudioSample=mongoose.Schema({
    cough_sample:{
        type:String,
        required:'Cough sample is required'
    },
    count_sample:{
        type:String,
        required:'Count 1 to 10 sample is required'
    },
    breath_sample:{
        type:String,
        required:'Breathing sample is required'
    },
    aaa_sample:{
        type:String,
        required:'AAAA sample is required'
    },
    eee_sample:{
        type:String,
        required:'EEEE sample is missing'
    },
    ooo_sample:{
        type:String,
        required:'OOOO sample is missing'
    }
});

var PredictSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:'Name is required'
    },
    cough:{
        type:Boolean
    },
    chest_pain:{
        type:Boolean
    },
    sneezing:{
        type:Boolean
    },
    fever:{
        type:Boolean
    },
    smoke:{
        type:Boolean
    },
    audio_sample:AudioSample
},{
    timestamps:true
});

export default mongoose.model('predictdata',PredictSchema);