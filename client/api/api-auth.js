
//let baseURL="http://104.198.142.189:3000/api/auth/login";

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

const verifyOTP=async(phone,otp)=>{
    try{


        let response=await fetch(`${baseURL}/${phone}/${otp}`)

        return await response;

    }
    catch(err)
    {
        console.log(err);
    }
}

export {generateOTP,verifyOTP};