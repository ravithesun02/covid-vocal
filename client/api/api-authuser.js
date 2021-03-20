let baseURL=`/api/v1`;

const uploadUserData = async(data)=>{
    try {
        let res=await fetch(`${baseURL}/register`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        
        return res;

    } catch (error) {
        console.log(error)
    }
}

const checkJwt=async(data)=>{
    try {
        let res=await fetch(`${baseURL}/checkJwt`,{
            method:'GET',
            headers:{
                'Authorization':'Bearer '+data
            }
        });

        return res;
    } catch (error) {
        console.log(error);
    }
}

export {uploadUserData,checkJwt};