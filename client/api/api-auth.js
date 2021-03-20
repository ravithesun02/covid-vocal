
//let baseURL="http://104.198.142.189:3000/api/auth/login";

import { json } from "body-parser";

let baseURL=`/api/auth/login`;

const generateOTP=async(phone)=>{

    try
    {

        let response=await fetch(`${baseURL}/${phone}`);

        console.log(response);

       return await response;

    }
    catch(err)
    {
        console.log(err);
    }
}

const verifyOTP=async(data)=>{
    try{


        let response=await fetch(`${baseURL}/verify`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })

        return await response;

    }
    catch(err)
    {
        console.log(err);
    }
}

const checkIP =async (data)=>{
    try {
        let res= await fetch(`${baseURL}\checkIP`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+JSON.parse(localStorage.getItem('jwt'))
            },
            body: JSON.stringify(data)
        });
        return res
    } catch (error) {
        console.log(error)
    }
}

export {generateOTP,verifyOTP,checkIP};