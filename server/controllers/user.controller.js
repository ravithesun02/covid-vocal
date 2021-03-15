import User from '../models/user.model';
import errorHandler from '../helpers/dbErrorHandler';
const checkUser=async(req,res)=>{
    try
    {
        let user=await User.findOne({phone:req.body.phone});

        if(!user)
        {

           user=new User({phone:req.body.phone,ip:req.body.ip});
           await user.save();
           return res.status('200').json({redirect:"request"}); 
        }

        if(user.isVerified)
        {
            if(req.body.ip !== user.ip)
            return res.status('200').json({redirect:"error"});
            
            return res.status('200').json({redirect:"verified"}); 
        }

        if(user.emailId)
        {
            return res.status('200').json({redirect:"status"});
        }


        return res.status('200').json({redirect:"request"}); 

    }
    catch(err)
    {
        return res.status('500').json({error:errorHandler.getErrorMessage(err)});
    }

}

const addUserDetails=async(req,res)=>{

    try
    {
        let user = await User.findOne({phone:req.body.phone});

        user=await User.findByIdAndUpdate({_id:user._id},req.body);

        return res.status('200').json({message:'Requested successfully',redirect:'status'});


    }
    catch(err)
    {
        return res.status('500').json({error:errorHandler.getErrorMessage(err)}); 
    }
}

const checkAuth=(req,res)=>{

    return res.status('200').json({message:'Verified Successfully',redirect:'home'});

}

export default {checkUser,addUserDetails,checkAuth};