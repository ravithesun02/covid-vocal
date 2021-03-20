import React , {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles , Backdrop } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {uploadUserData} from '../../api/api-authuser';
import CircularProgress from '@material-ui/core/CircularProgress';
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
            isLoading:false
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
            phone:localStorage.getItem('phone')
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