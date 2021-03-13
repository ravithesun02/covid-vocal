import Doctor from '../models/doctor.model';
import errorHandler from '../helpers/dbErrorHandler';
import User from '../models/user.model';


const create=async(req,res)=>{

    const doctor=new Doctor(req.body);
    try
    {
        await doctor.save();
        return res.status('200').json({message:'successfully signed up'});
    }
    catch(err)
    {
        return res.status('500').json({error:errorHandler.getErrorMessage(err)});
    }
}

const getUsers=async(req,res)=>{
    
    try
    {
        let userDetails=await User.find({covid_ai:{$ne:null}});
        return res.status('200').json({userList:userDetails});
    }
    catch(err)
    {
        console.log(err);
        return res.status('500').json({error:errorHandler.getErrorMessage(err)}); 
    }

}
const updateUser=async(req,res)=>{
    try
    {
        let user=await User.findByIdAndUpdate({_id:req.body.id},{covid_doc:req.body.covid_doc});
        let userDetails=await User.find({covid_ai:{$ne:null}});
        return res.status('200').json({message:'updated successfully',userList:userDetails});
    }
    catch(err)
    {
        console.log(err);
        return res.status('500').json({error:errorHandler.getErrorMessage(err)}); 
    }
}

export default {create,getUsers,updateUser};