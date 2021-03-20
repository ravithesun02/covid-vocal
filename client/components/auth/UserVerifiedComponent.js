import React , {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles,Backdrop } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {checkJwt} from '../../api/api-authuser';
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

class UserVerified extends Component{
    constructor(props)
    {
        super(props);

        this.state={
            token:null,
            redirectTo:null,
            isLoading:false
        }
    }

    async componentDidMount()
    {
      if(localStorage.getItem('route')!=='login')
          await this.setState({
            redirectTo:''
          });

    }

    handleSubmit=name=>event=>{
        this.setState({
            [name]:event.target.value
        });
    }

    handleClick=async()=>{
      event.preventDefault();
      await this.setState({
        isLoading:true
      })
      
      let response=await checkJwt(this.state.token);

      if(response.ok)
      {
        let data=await response.json();
        await localStorage.setItem('jwt',JSON.stringify(this.state.token));
        await this.setState({
          isLoading:false,
          redirectTo:data.redirect
        });


      }
      else
      console.log(response);

    }

    render(){

      const {classes}=this.props;

      if(this.state.redirectTo)
        return(
          <Redirect to={`/${this.state.redirectTo}`} />
        )

        return (
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
            id="token"
            label="Enter Your Token"
            name="token"
            autoFocus
            onChange={this.handleSubmit('token')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
           onClick={this.handleClick}
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

export default withStyles(useStyles)(UserVerified);