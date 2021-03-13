import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";
import { Backdrop, FormControlLabel, FormGroup, Paper } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import {uploadSamples,getPredicted} from '../../api/api-user';
import AudioDisplay from './AudioComponent';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles=theme=>({
    gridContainer:{
        padding:'1%',
        spacing:0
    },
    paper:{
        padding:'1%',
        textAlign:'center'
    },
    questionGrid:{
        width:'100%'
    },
    backdrop: {
        zIndex:  100,
        color: '#fff',
      }
});



class Name extends React.Component {
    constructor(props) {
        super(props);

        this.child=React.createRef();

        this.state={
            formdata:{
                name:"",
                cough:false,
                fever:false,
                sneezing:false,
                smoke:false,
                chest_pain:false,
            },
            nameError:false,
            questionGrid:true,
            covid:null,
            isLoading:false,
            isVerified:false,
            isSubmitDisabled:true
        };

    }

  handleChange=name=>event=>{
      console.log(event.target.value);
      this.setState({
          formdata:{
              ...this.state.formdata,
              [name]:event.target.value.trim()
          }
      });
  };

  handleChecked=name=>event=>{
    console.log(event.target.checked);
    this.setState({
        formdata:{
            ...this.state.formdata,
            [name]:event.target.checked
        }
    });
  }

  handleDataSubmit=async ()=>{

  

    let audio_samples={};
    let senduserData={};
   audio_samples=await this.child.current.submitAudioSample();
//console.log(audio_samples.aaa_sample)

await this.setState({
    isLoading:true
})

   senduserData=this.state.formdata;
   senduserData['audio_sample']=audio_samples;

   console.log(senduserData);

  let response=await uploadSamples(senduserData);

  if(response.ok)
  {
      let data=await response.json();

      let msg=data.message;

      if(typeof msg === 'string')
      {
          let arr=[];
          this.child.current.handleErrorMsg(arr);
        alert(msg);
        await this.setState({
            isVerified:true
        });
      }
      else
      {
          console.log(msg);
          this.child.current.handleErrorMsg(msg);
      }

     await this.setState({
          isLoading:false
      });
  }
  else
  {
      console.log(response);
  }

   //console.log(senduserData.audio_sample.aaa_sample);



  

  }

  handlePredictData=async()=>{

    await this.setState({
        isLoading:true
    })

    let response=await getPredicted();

    if(response.ok)
    {
        let data=await response.json();

        await this.setState({
            covid:data.covid,
            isLoading:false
        });
    }

  }

  enableVerifyBtn=async()=>{
     await this.setState({
          isSubmitDisabled:false
      })
  }

  startLoading=async()=>{
      await this.setState({
          isLoading:true
      });
  }

  stopLoading=async()=>{
      await this.setState({
          isLoading:false
      });
  }


    render() {

        const {classes}=this.props;



       

       

        return(

            <Paper className={classes.paper}>
         
           { this.state.questionGrid ? 
            <div>
                <Grid direction="row" container>
                <Grid item xs={2} md={3}></Grid>
                    <Grid item xs={8} md={6}>
                        <TextField label="Name" value={this.state.formdata.name} required onChange={this.handleChange('name')} fullWidth variant="outlined"/>
                    </Grid>
                </Grid>
                <Grid direction="row" container>
                <Grid item xs={2} md={3}></Grid>
                    <Grid item xs={8} md={6}>
                        <FormGroup >
                            <FormControlLabel control={<Checkbox checked={this.state.formdata.cough} onChange={this.handleChecked('cough')}/>} label="Do you have cough ?"/>
                            <FormControlLabel control={<Checkbox checked={this.state.formdata.fever} onChange={this.handleChecked('fever')}/>} label="Do you have fever ?"/>
                            <FormControlLabel control={<Checkbox checked={this.state.formdata.chest_pain} onChange={this.handleChecked('chest_pain')}/>} label="Do you have chest pain ?"/>
                            <FormControlLabel control={<Checkbox checked={this.state.formdata.sneezing} onChange={this.handleChecked('sneezing')}/>} label="Do you have sneezing ?"/>
                            <FormControlLabel control={<Checkbox checked={this.state.formdata.smoke} onChange={this.handleChecked('smoke')}/>} label="Do you smoke ?"/>
                        </FormGroup>
                    </Grid>
                </Grid>
                <Grid justify="flex-end" container>
                    <Button variant="contained" color="primary" onClick={()=>this.setState({questionGrid:false})} disabled={this.state.formdata.name!=""?false : true}>next</Button>
                </Grid>
                </div>
            :
                <div>
                <Grid container direction="column">
                    <Grid item>
                       {this.state.covid ? <h2>Your covid probability is : {this.state.covid}</h2> : <AudioDisplay startLoading={this.startLoading} stopLoading={this.stopLoading} enableBtn={this.enableVerifyBtn} ref={this.child}/>}

                    </Grid>
                  {!this.state.covid &&  
                  <Grid item justify="space-between" container>
                    <Button variant="contained" color="primary" onClick={()=>this.setState({questionGrid:true})}>back</Button>
                    <Button variant="contained" color="primary" disabled={this.state.isSubmitDisabled} onClick={this.state.isVerified ? this.handlePredictData  :this.handleDataSubmit}>{this.state.isVerified?'submit':'verify'}</Button>
                    </Grid>
                    }
                </Grid>

                    <Backdrop className={classes.backdrop} open={this.state.isLoading}>
                        <CircularProgress/>
                    </Backdrop>

                </div>
            }
            
            
           </Paper>
                  
        
           

        )
    }

}

export default withStyles(useStyles)(Name);