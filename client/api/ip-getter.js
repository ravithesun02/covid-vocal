import publicIp from 'public-ip';

const getIP=async()=>{
   return await publicIp.v4();
}

export {getIP};