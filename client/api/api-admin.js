let baseURL="/api/admin";

const signin=async(data)=>{
    try{

        let rsponse=await fetch(`${baseURL}/signin`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });

        return rsponse;

    }
    catch(err)
    {
        console.log(err);
    }
}

const getAllUsers=async()=>{

    try
    {
        let res=await fetch(`${baseURL}/getAllUsers`,{
            method:'GET',
            headers:{
                'Authorization':'Bearer '+JSON.parse(localStorage.getItem('admin_jwt'))
            }
        });

        return res;
    }
    catch(err)
    {
        console.log(err);
    }

}

const sendEmail=async(data)=>{
    
   console.log(data);

    try {
        let res=await fetch(`${baseURL}/sendMail`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+JSON.parse(localStorage.getItem('admin_jwt'))
            },
            body:JSON.stringify(data)
        });

        console.log(res)

        return res;
    } catch (error) {
        console.log(error);
    }
}

export {signin,getAllUsers,sendEmail};