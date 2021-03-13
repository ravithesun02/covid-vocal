import Predict from '../models/predict.model';
import errorHandler from '../helpers/dbErrorHandler';
import User from '../models/user.model';
import pyHandler from '../helpers/pythonHandler';
import fs from 'fs-extra';



const verifyAudio=async (req,res,next)=>{
    try
    {
        let id=req.auth._id;
        let jsonData=req.body.audio_sample;
        pyHandler.convertToWav(jsonData,id);
        let response=await pyHandler.spawnChild('verify.py',id);

        console.log(response);
        let msgArr=response.split(";");
       
        msgArr.length=msgArr.length-1;
        console.log(msgArr);
        if(msgArr.length===0)
        {
           next();
        }
        else
        {
            fs.removeSync(`audio_samples/${id}`);
            return res.status('200').json({message:msgArr});
        }
    }
    catch(err)
    {
        console.log(err);
        return res.status('500').json({error:errorHandler.getErrorMessage(err)});
    }
}

const uploadToDb=async(req,res)=>{

    try{

        let user=await User.findOne({_id:req.auth._id});
       const predictData=new Predict(req.body);
        let data;
      if(user.predict_id)
      {
           data=await Predict.findByIdAndUpdate({_id:user.predict_id},req.body);
          console.log('updated db');
      }
      else
      {
         data= await predictData.save();

        user.predict_id=data._id;
        user.name=data.name;
        user.updated=Date.now();
        await user.save();
      }

      return res.status('200').json({message:'verified successfully'});

    }
    catch(err)
    {
        console.log(err);
        return res.status('500').json({error:errorHandler.getErrorMessage(err)});
    }

}

const predictCovid=async(req,res)=>{

    try{
        let id=req.auth._id;
        let user=await User.findOne({_id:req.auth._id});
      let response=await pyHandler.spawnChild('predict.py',id);//5-10s

      console.log("predicted awv");

       if(!parseFloat(response))
       return res.status('400').json({message:'Could not process your data'});
   else
       {
           fs.removeSync(`audio_samples/${id}`);
           user.covid_ai=response;
           user.updated=Date.now();
           await user.save();
           return res.status('200').json({covid:parseFloat(response)});
        }

    }
    catch(err)
    {
        console.log(err);
        return res.status('500').json({error:errorHandler.getErrorMessage(err)});
    }
}


const predictById=async(req,res)=>{

    try
    {
        console.log(req.auth);
        let user=await User.findOne({_id:req.auth._id});
        let data=await Predict.findById({_id:user.predict_id});
        if(!data)
            return res.status('400').json({message:'Not found'});
 
       return res.status('200').json(data);
    }
    catch(err)
    {
        return res.status('400').json({message:'Could not retrive Data'});
    }
}

export default {predictCovid,predictById,verifyAudio,uploadToDb};