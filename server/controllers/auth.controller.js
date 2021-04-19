import errorHandler from '../helpers/dbErrorHandler';
import User from '../models/user.model';
import config from '../../config/config';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import Doctor from '../models/doctor.model';
import Admin from '../models/admin.model';





const generateOTP=async(req,res)=>{
    let phone=req.params.phone;
    client
        .verify
        .services(config.serviceID)
        .verifications
        .create({
            to:phone,
            channel:"sms"
        })
        .then((data)=>{
           return res.status('200').json({message:'OTP sent.'})
        })
        .catch((err)=>{
            console.log(err);
           return res.status('400').json({message:'Invalid Phone Number'});
        })
      

};

// const verifyOTP=(req,res,next)=>{
//     let phone=req.body.phone;
//     client.verify.services(config.serviceID).verificationChecks.create({
//         to:phone,
//         code:req.body.code
//     })
//     .then((data)=>{
//         console.log(data);
//        next();
//     })
//     .catch((err)=>{
//         console.log(err);
//         return res.status('404').json({message:'Wrong OTP.Please Retry.'});
//     })

// }

const sigin=async(req,res)=>{
    try{

        let user=await User.findOne({phone:req.params.phone});

        if(!user)
        {
            let data=new User({phone:req.params.phone});
            user=await data.save();
        }

        const token=jwt.sign({_id:user._id},config.jwtSecret);
        res.cookie('t',token,{expire:new Date()+9999});

        return res.status('200').json({
            token,
            user:{
                _id:user._id,
                phone:user.phone
            }
        });
    }
    catch(err)
    {
        return res.status('500').json({error:errorHandler.getErrorMessage(err)});
    }
}

const requireSignin=expressJwt({
    secret:config.jwtSecret,
    userProperty:'auth',
    algorithms: ['HS256'],
    
})

const hasAuthrization=(req,res,next)=>{

  //  console.log(req)

    if(!req.auth)
    {
        return res.status('404').json({message:'Unauthorized access'});

    }
    next();
    
}

const siginDoctor=async(req,res)=>{

    try
    {
        let doctor=await Doctor.findOne({"username":req.body.username});
        if(!doctor)
            return res.status('401').json({error:'Your entry not found ! Please contact Admin'});
        if(!doctor.authenticate(req.body.password))
            return res.status('401').json({error:'Incorrect Password'});
        
        const token=jwt.sign({_id:doctor._id},config.jwtSecret);
        res.cookie('t',token,{expire:new Date()+9999});

        return res.status('200').json({
            id:doctor._id,
            token:token
        });
    }
    catch(err)
    {
        console.log(err);

        return res.status('401').json({error:'Couldn\'t sign in'});

    }

}

const signinAdmin=async(req,res)=>{
    try{
        let admin=await Admin.findOne({username:req.body.username});
        if(!admin)
            return res.status('401').json({error:'Your entry not found ! Please contact Admin'});
        if(!admin.authenticate(req.body.password))
        return res.status('401').json({error:'Incorrect Password'});

        const token=jwt.sign({_id:admin._id},config.jwtSecret);
        res.cookie('t',token,{expire:new Date()+9999});

        return res.status('200').json({
            id:admin._id,
            token:token
        });
        
    }
    catch(err)
    {

    }
}

const checkIP = async(req,res)=>{
    try {
        let Ip= req.body.ip;
        let id=req.auth._id;
        let user= await User.findById({_id:id});
        console.log(user)
        if(user.ip===Ip){
            return res.status("200").json({message:"correct",isVerified:true})
        }
        else{
            return res.status("200").json({message:"unauthorised",isVerified:false})
        }
    } catch (error) {
        return res.status('500').json({error:errorHandler.getErrorMessage(err)});
    }
}

export default {generateOTP,sigin,requireSignin,hasAuthrization,siginDoctor,signinAdmin,checkIP};