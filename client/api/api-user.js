//let baseUrl="http://104.198.142.189:3000/api/v1/predict";

let baseURL=`/api/v1/predict`;

const uploadSamples=async (data)=>{

    try
    {

        let res=await fetch(`${baseURL}/verify`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+JSON.parse(localStorage.getItem('jwt'))
            },
            body:JSON.stringify(data)
        });

       // console.log(await res.json());

        return res;

    }
    catch(err)
    {
        console.log(err);
    }

}

const getPredicted=async(data)=>{

    try {
        let res=await fetch(`${baseURL}/ai`,{
            method:'GET',
            headers:{
                'Authorization':'Bearer '+JSON.parse(localStorage.getItem('jwt'))
            }
        });

        console.log(res);
        return res;
    } catch (error) {

        console.log(error);
        
    }

}

export {uploadSamples,getPredicted};