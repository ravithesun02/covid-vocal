import React , {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles , Backdrop, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {uploadUserData} from '../../api/api-authuser';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CheckBox } from '@material-ui/icons';
const useStyles =theme=>({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      backdrop: {
          zIndex:  100,
          color: '#fff',
        }
    
});

class UserInput extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            name:null,
            emailId:null,
            redirectTo:null,
            isLoading:false,
            formdata:{
              cough:false,
              fever:false,
              sneezing:false,
              smoke:false,
              chest_pain:false,
              dry_mouth:false,
              rtpcr:false,
              chest_report:false
          },
          fileName:" Upload the RTPCR report ",
          fileNameMU:"Upload Chest Report",
          imageBase64:null,
          imageBase64MU:null
        }
    }

   async componentDidMount()
    {
        if(localStorage.getItem('route')==='login')
          {
            
          }
          else
          await this.setState({
            redirectTo:''
          });
    }

    handleSubmit=name=>event=>{

        this.setState({
            [name]:event.target.value
        });
    }

    uploadData=async(event)=>{
        event.preventDefault();
        localStorage.setItem('route','request');
        await this.setState({
            isLoading:true
        });

        let data={
            name:this.state.name,
            emailId:this.state.emailId,
            phone:localStorage.getItem('phone'),
            cough:this.state.formdata.cough,
            fever:this.state.formdata.fever,
            sneezing:this.state.formdata.sneezing,
            smoke:this.state.formdata.smoke,
            chest_pain:this.state.formdata.chest_pain,
            dry_mouth:this.state.formdata.dry_mouth,
            rtpcr:this.state.imageBase64,
            chest_report:this.state.imageBase64MU
        };

        let response=await uploadUserData(data);

        if(response.ok)
        {
            let resData=await response.json();

            this.setState({
                isLoading:false,
                redirectTo:resData.redirect
            });
        }
        else
            console.log(await response.json());
      localStorage.removeItem('phone');
    }

    handleChecked=name=>event=>{
      console.log(event.target.checked);
      this.setState({
          formdata:{
              ...this.state.formdata,
              [name]:event.target.checked
          }
      });
    }

    onImageChange=async event => {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        this.setState({
          fileName:img.name
        });
        await this.setState({
          imageBase64:await this.toBase64(img)
        })
      }
    }

    onImageChangeForMU=async event => {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        this.setState({
          fileNameMU:img.name
        });
        await this.setState({
          imageBase64MU:await this.toBase64(img)
        })
      }
    }

     toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });

    render()
    {
        const {classes}=this.props;

        if(this.state.redirectTo)
            return(
                <Redirect to={`/${this.state.redirectTo}`}/>
            )

        return(
            <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Access Request
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Enter Your Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={this.handleSubmit('name')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="emailId"
            label="Enter your Email"
            id="emailId"
            autoComplete="emailId"
            onChange={this.handleSubmit('emailId')}
          />
          <FormGroup>
          <FormControlLabel control={<Checkbox checked={this.state.formdata.rtpcr} onChange={this.handleChecked('rtpcr')} />} label="Do you have RTPCR Report ?" />
        {this.state.formdata.rtpcr && 
          <FormControlLabel control={<div>
                  <input
              accept="image/*,application/pdf"
              className={classes.input}
              id="contained-button-file"
              type="file"
              style={{display:'none'}}
              onChange={this.onImageChange}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
          </div>} label={this.state.fileName} />}
         
          <FormControlLabel control={<Checkbox checked={this.state.formdata.cough} onChange={this.handleChecked('cough')}/>} label="Do you have cough ?"/>
          <FormControlLabel control={<Checkbox checked={this.state.formdata.fever} onChange={this.handleChecked('fever')}/>} label="Do you have fever ?"/>
          <FormControlLabel control={<Checkbox checked={this.state.formdata.chest_pain} onChange={this.handleChecked('chest_pain')}/>} label="Do you have chest pain ?"/>
          <FormControlLabel control={<Checkbox checked={this.state.formdata.sneezing} onChange={this.handleChecked('sneezing')}/>} label="Do you have sneezing ?"/>
          <FormControlLabel control={<Checkbox checked={this.state.formdata.smoke} onChange={this.handleChecked('smoke')}/>} label="Do you smoke ?"/>
          <FormControlLabel control={<Checkbox checked={this.state.formdata.dry_mouth} onChange={this.handleChecked('dry_mouth')}/>} label="Do you have dry mouth / non-salivation / pink eye / reduced hearing / ear pain?"/>
          {this.state.formdata.dry_mouth && 
          <FormControlLabel control={<div>
                  <input
              accept="image/*,application/pdf"
              className={classes.input}
              id="contained-button-fileMU"
              type="file"
              style={{display:'none'}}
              onChange={this.onImageChangeForMU}
            />
            <label htmlFor="contained-button-fileMU">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
          </div>} label={this.state.fileNameMU} />}
          </FormGroup>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
           onClick={this.uploadData}
            className={classes.submit}
          >
           Send Request
          </Button>
        </form>
      </div>
      <Backdrop className={classes.backdrop} open={this.state.isLoading}>
                        <CircularProgress/>
                    </Backdrop>
    </Container>
        )
    }
}

export default withStyles(useStyles)(UserInput);