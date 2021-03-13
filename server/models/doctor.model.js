import mongoose from 'mongoose';
import crypto from 'crypto';

const DoctorSchema=new mongoose.Schema({
    username:{
        type:String,
        required:'Username is required'
    },
    hashed_password:{
        type:String,
        required:'Password is required'
    },
    salt:String,
    updated:Date,
    created:{
        type:Date,
        default:Date.now
    }

})

DoctorSchema
    .virtual('password')
    .set(function(password){
        this._password=password;
        this.salt=this.makesalt()
        this.hashed_password=this.encryptPassword(password)
    })
    .get(function(){
        return this._password
    })

    DoctorSchema.methods={
        authenticate:function(plainText){
            return this.encryptPassword(plainText)===this.hashed_password
        },
        encryptPassword:function(password){
            if(!password)
            return '';
            try
            {
                return crypto
                        .createHmac('sha1',this.salt)
                        .update(password)
                        .digest('hex')
            }
            catch(err)
            {
                return '';
            }
        },
        makesalt:function()
        {
            return Math.round((new Date().valueOf() * Math.random())) + ''
        }
    }

 export default mongoose.model('Doctor',DoctorSchema);