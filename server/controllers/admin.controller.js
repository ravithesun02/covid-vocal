import Admin from '../models/admin.model';
import errorHandler from '../helpers/dbErrorHandler';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import mailer from '../helpers/sendMailHandler';

const signup=async(req,res)=>{
    try
    {
        const admin=new Admin(req.body);
        await admin.save();

        return res.status('200').json({message:"Admin created"});
    }
    catch(err){
        return res.status('500').json({error:errorHandler.getErrorMessage(err)});
    }
}

const getAllUsers=async(req,res)=>{

    try
    {
        const users=await User.find();

        return res.status('200').json({users:users,message:'Successfully sent'});
    }
    catch(err)
    {
        return res.status('500').json({error:errorHandler.getErrorMessage(err)});
    }
}

const sendEmail=async(req,res)=>{

    try
    {
        let id=req.body._id;

        let user=await User.findOne({_id:id});

        let emailTo=user.emailId;
        const token=jwt.sign({_id:id},config.jwtSecret);

        let sent=await mailer.sendEmail(emailTo,token);

        console.log(sent);

        if(sent.messageId)
        {
            await User.findByIdAndUpdate({_id:id},{isVerified:true});

            return res.status('200').json({message:'Mail sent'});
        }
        else
            return res.status('400').json({message:'Unable to send email'});

    }
    catch(err)
    {
        return res.status('500').json({error:errorHandler.getErrorMessage(err)});
    }

}



export default {signup,getAllUsers,sendEmail};