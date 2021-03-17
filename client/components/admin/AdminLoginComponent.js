import React , {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core';
import auth from '../../api/auth-helper';
import {signin} from '../../api/api-admin';
import { Redirect } from 'react-router-dom';
const styles = theme => ({
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
      }
});
function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
class AdminLogin extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            username:"",
            password:"",
            isLoggedIn:false
        }
    }

    componentDidMount()
    {
        if(auth.isAdminAuthenticated())
        {
            this.setState({
                isLoggedIn:true
            })
        }
    }

    handleSubmit=name=>event=>{

        console.log(name)
        console.log(event.target.value)

        this.setState({
            [name]:event.target.value
        });
    }

    userSignin=async(event)=>{
        event.preventDefault();

        let res=await signin({username:this.state.username,password:this.state.password});

        if(res.ok)
        {
            let tokenData=await res.json();

            auth.authenticate(tokenData.token,'admin_jwt',()=>{
                this.setState({
                    isLoggedIn:true
                });
            })
        }
        else
        console.log(res);
    }

    render()
    {
        const { classes } = this.props;
        if(this.state.isLoggedIn)
          return(
            <Redirect to="/admin_home" />
          )
        return (
            <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={this.handleSubmit('username')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.handleSubmit('password')}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.userSignin}
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
        )
    }
}

export default withStyles(styles)(AdminLogin);