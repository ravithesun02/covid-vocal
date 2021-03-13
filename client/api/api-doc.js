

let baseURL=`/api/doc`;

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

const getUserDetails=async()=>{
    try{

        let response=await fetch(`${baseURL}/getUsers`,{
            method:'GET',
            headers:{
                'Authorization':'Bearer '+JSON.parse(localStorage.getItem('doc_jwt'))
            }
        });
        console.log(response)
        return response;
        

    }
    catch(err)
    {
        console.log(err);
    }
}

const updateUser=async(data)=>{
    try{
        let response=await fetch(`${baseURL}/updateUser`,{
            method:'PUT',
            headers:{
                'Authorization':'Bearer '+JSON.parse(localStorage.getItem('doc_jwt')),
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)

        });
        console.log(response)
        return response;
    }
    catch(err)
    {
        console.log(err);
    }
}

export {signin,getUserDetails,updateUser};

