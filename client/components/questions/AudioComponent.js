import React ,{Component} from 'react';
import AudioReactRecorder ,{RecordState} from 'audio-react-recorder';
import { Button, Grid,Typography,withStyles } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';

const arr=['cough','aaa','ooo','eee','breath','count'];
const errConst=[false,false,false,false,false,false];

const useStyles=theme=>({
    trueErr:{
        backgroundColor:'green',
        borderRadius:'1%'
    },
    falseErr:{
        backgroundColor:'red',
        borderRadius:'1%'
    }
});

class AudioDisplay extends Component{

    constructor(props)
    {
        super(props);
        this.state={

            finalArr:['cough'],
            recordState:{
                cough:null,
                aaa:null,
                ooo:null,
                eee:null,
                breath:null,
                count:null
            },
            disableRecord:false,
            url_sample:{
                cough:null,
                aaa:null,
                ooo:null,
                eee:null,
                breath:null,
                count:null
            },
            audio_sample:{
                cough_sample:"",
                aaa_sample:"",
                ooo_sample:"",
                eee_sample:"",
                count_sample:"",
                breath_sample:""
            },
            isBlocked:true,
            disableAll:false,
            failedToGetUserMedia:false,
            errorMsg:[false,false,false,false,false,false],
            isVerifcationSubmitted:false
        }
    }

    componentDidMount()
    {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio:true},()=>{
                console.log('Permission Granted');
                this.setState({ isBlocked: false });
            },()=>{
                console.log('Permission Denied');
                this.setState({ isBlocked: true });
            })
        }
        else if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({audio:true},()=>{
                console.log('Permission Granted');
                this.setState({ isBlocked: false });
            },()=>{
                console.log('Permission Denied');
                this.setState({ isBlocked: true });
            })
        }
    }

    handleErrorMsg=async(errArr)=>{
        let err=[false,false,false,false,false,false];
        errArr.forEach((item,index)=>{
            this.state.finalArr.forEach((ele,i)=>{
                if(item.includes(ele))
                {
                    console.log(ele)
                    err[i]=true;
                }
            });
        });

       await this.setState({
           disableAll:false,
            errorMsg:err,
            isVerifcationSubmitted:true
        });

        console.log(errArr)
        console.log(err)
        console.log(this.state.errorMsg)
    }

    submitAudioSample=async()=>{
       await this.setState({
            disableAll:true
        });
        return this.state.audio_sample;
    }


    fetchAsBlob = url => fetch(url)
    .then(response => response.blob());

  convertBlobToBase64 = blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
          resolve(reader.result);
      };
     return reader.readAsDataURL(blob);
  });

async storeBase64(audioSample){
      let base64=await this.fetchAsBlob(audioSample).then(this.convertBlobToBase64)
      
     return base64;
  }



    start=async(name)=>{
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio:true},()=>{
                console.log('Permission Granted');
                this.setState({ isBlocked: false });
            },()=>{
                console.log('Permission Denied');
                this.setState({ isBlocked: true });
            })
        }
        else if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({audio:true},()=>{
               console.log('Permission Granted');
               this.setState({ isBlocked: false });
            },()=>{
               console.log('Permission Denied');
               this.setState({ isBlocked: true });
            })
        }

        
        this.props.startLoading();

        setTimeout(async()=>{
            this.props.stopLoading();
            await this.setState({
                recordState:{
                    ...this.state.recordState,
                    [name]:RecordState.START
                },
                disableRecord:true
            });
    
            console.log(this.state);
        },300);

    //    await this.setState({
    //         recordState:{
    //             ...this.state.recordState,
    //             [name]:RecordState.START
    //         },
    //         disableRecord:true
    //     });

    //     console.log(this.state);
    }

    stop=async(name,index)=>{
       await this.setState({
            recordState:{
                ...this.state.recordState,
                [name]:RecordState.STOP
            },
            disableRecord:false
        });
        console.log(this.state);

        if(index===arr.length-1)
            this.props.enableBtn();
    }

    onStop=async(name,audioData)=>{

        console.log(name)
        console.log(audioData)

        let Arr=this.state.finalArr;
        console.log(Arr);
        if(Arr.length<arr.length && Arr.length-Arr.indexOf(name)===1)
        Arr.push(arr[Arr.length])

       await this.setState({
            finalArr:Arr,
            url_sample:{
                ...this.state.url_sample,
                [name]:audioData.url
            }
        });

        let base64=await this.storeBase64(audioData.url);

       await this.setState({
            audio_sample:{
               ...this.state.audio_sample,
                [`${name}_sample`]:base64
            }
        });

    }

    render()
    {
        const {classes}=this.props;
        const renderAudio=this.state.finalArr.map((item,index)=>{

            // return(

            //     <Grid key={index}>
            //         {
            //             this.state.isVerifcationSubmitted && 
            //             <div style={{backgroundColor:this.state.errorMsg[index]? 'red':'green'}}>
            //                 {
            //                     this.state.errorMsg[index] ? <p> Please reupload {item} recording </p> : <p> Successfully verified </p>
            //                 }
            //             </div>
            //         }
            //         <AudioReactRecorder backgroundColor="black" foregroundColor="red" state={this.state.recordState[item]} onStop={(audioData)=>this.onStop(item,audioData)}/>
            //         { this.state.url_sample[item] && <audio src={this.state.url_sample[item]} controls="controls" type="audio/wav" />}
            //         {
            //             (this.state.recordState[item] !== RecordState.START || this.state.recordState[item]==null) 
            //             ?
            //         <Button
            //             variant="contained"
            //             color="secondary"
            //             startIcon={<MicIcon/>}
            //             onClick={()=>this.start(item)}
            //             disabled={(((this.state.disableRecord  
            //                 && (this.state.recordState[item]===null||this.state.recordState[item]===RecordState.STOP))
            //                 ||this.state.disableAll))
            //                 ||(this.state.isVerifcationSubmitted && !this.state.errorMsg[index])
            //             }
            //         >
            //             Start {item} recording
            //         </Button>
            //         :
            //         <Button
            //             variant="contained"
            //             color="secondary"
            //             startIcon={<MicIcon/>}
            //             onClick={()=>this.stop(item,index)}
            //         >
            //             Stop {item} recording
            //         </Button>
            //         }


            //     </Grid>

            // )

            return (
                <Grid style={{paddingTop:'1%'}} key={index} direction="column" container spacing={2}>

                    {
                        this.state.isVerifcationSubmitted && 
                        <Grid className={!this.state.errorMsg[index]? classes.trueErr : classes.falseErr} item>
                           {
                                this.state.errorMsg[index] ? <Typography style={{color:'white'}} variant="h5"> Please reupload {item} recording </Typography> : <Typography style={{color:'white'}} variant="h5"> Successfully verified </Typography>
                            } 
                        </Grid>

                    }

                    <Grid item>
                     <AudioReactRecorder backgroundColor="black" foregroundColor="red" state={this.state.recordState[item]} onStop={(audioData)=>this.onStop(item,audioData)}/>
                    </Grid>
                    <Grid item>
                     { this.state.url_sample[item] && <audio src={this.state.url_sample[item]} controls="controls" type="audio/wav" />}
                     </Grid>
                     <Grid item>
                     {
                         (this.state.recordState[item] !== RecordState.START || this.state.recordState[item]==null) 
                         ?
                     <Button
                         variant="contained"
                         color="secondary"
                         startIcon={<MicIcon/>}
                         onClick={()=>this.start(item)}
                         disabled={(((this.state.disableRecord  
                             && (this.state.recordState[item]===null||this.state.recordState[item]===RecordState.STOP))
                             ||this.state.disableAll))
                             ||(this.state.isVerifcationSubmitted && !this.state.errorMsg[index])
                         }
                     >
                         Start {item} recording
                     </Button>
                     :
                     <Button
                         variant="contained"
                         color="secondary"
                         startIcon={<MicIcon/>}
                         onClick={()=>this.stop(item,index)}
                     >
                         Stop {item} recording
                     </Button>
                     }

                    </Grid>

                </Grid>
            )

        })


        return(
            <>
            {renderAudio}
            </>
        )


    }

}

export default withStyles(useStyles)(AudioDisplay);