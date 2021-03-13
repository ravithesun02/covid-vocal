import {spawn} from 'child_process';
import fs from 'fs';

async function spawnChild(fileName,file_dir)
{
    const child = spawn('python', [fileName,file_dir]);

    let data = "";
    for await (const chunk of child.stdout) {
        console.log('stdout chunk: '+chunk);
        data += chunk;
    }
    let error = "";
    for await (const chunk of child.stderr) {
        console.error('stderr chunk: '+chunk);
        error += chunk;
    }
    const exitCode = await new Promise( (resolve, reject) => {
        child.on('close', resolve);
    });

    if( exitCode) {
        throw new Error( `subprocess error exit ${exitCode}, ${error}`);
    }
    console.log(data.toString());
    return data.toString();
}

const convertToWav=(sampleJson,filename)=>{

    let arr=[];
    arr=Object.keys(sampleJson);

    arr=arr.filter((item)=>item !== '_id');

    if(!fs.existsSync('audio_samples'))
        fs.mkdirSync('audio_samples')

    if(!fs.existsSync(`audio_samples/${filename}`))
            fs.mkdirSync(`audio_samples/${filename}`);

    arr.forEach((item,index)=>{

        try
        {
        
         fs.writeFileSync(`audio_samples/${filename}/${item}_audio.wav`, Buffer.from(sampleJson[item].replace('data:audio/wav;base64,', ''), 'base64'));
           // console.log(data);
        }
        catch(err)
        {
            console.log(err);
        }
    });



}

export default {spawnChild,convertToWav};