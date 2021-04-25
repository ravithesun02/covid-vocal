import React , {Component} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button, IconButton } from '@material-ui/core';

import auth from '../api/auth-helper';
import HomeIcon from '@material-ui/icons/Home';
import { Redirect } from 'react-router';

const useStyles =theme=>({
    toolbar:{
        background:'brown'
    }
});



class Header extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            signoutBtn:false,
            detailsBtn:false,
            signBtn:false,
            homeBtn:false,
            redirectToHome:false,
            redirectTo:false
        }
    }
   async componentDidMount()
    {
        if(typeof window !== 'undefined')
        {
            if((localStorage.getItem('jwt') || localStorage.getItem('doc_jwt') || localStorage.getItem('admin_jwt')))
                await this.setState({
                    signoutBtn:true
                });
            if(window.location.pathname==='/' || window.location.pathname==='/details')
                await this.setState({
                    detailsBtn:true
                });
            if(window.location.pathname==='/signIn')
                await this.setState({
                    signBtn:true
                })
            if(window.location.pathname==='/home')
                await this.setState({
                    homeBtn:true
                })
        }
    }

    redirectToHome=async()=>{
        await this.setState({
            redirectToHome:true
        });
    }

    signOut=async()=>{

        

        if(typeof window !== 'undefined')
        {
            let pathname=window.location.pathname;
            auth.clearJWT('jwt',()=>{
                console.log('signed out');
            });
            auth.clearJWT('doc_jwt',()=>{
                console.log('signed out');
            });
            auth.clearJWT('admin_jwt',()=>{
                console.log('signed out');
            });
            // if(pathname==='/home')
            //     auth.clearJWT('jwt',()=>{
            //         console.log('signed out');
            //     })
            // else if(pathname==='/doc_home')
            // auth.clearJWT('doc_jwt',()=>{
            //     console.log('signed out');
            // })
            // else if(pathname==="/admin_home")
            // auth.clearJWT('admin_jwt',()=>{
            //     console.log('signed out');
            // })
            await this.setState({
                redirectTo:true
            })
        }

    }

    render() {
        const {classes}=this.props;
        if(this.state.redirectToHome)
            return(
                <Redirect to="/home"/>
            )
        if(this.state.redirectTo)
            {
               if(this.state.detailsBtn)
                    window.location.reload();
                return(
                    <Redirect to="/"/>
                )
            }
        return(
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <Grid container alignItems="center" justify="center" direction="row">
                           
                            <Grid xs={1} md={3} style={{textAlign:'center'}} item>
                            <Button variant="contained" disabled={this.state.detailsBtn} color="primary" href="/details">About Us</Button>
                            {this.state.detailsBtn && this.state.signoutBtn && 
                                <IconButton disabled={this.state.homeBtn} color="primary" onClick={this.redirectToHome}>
                                    <HomeIcon/>
                                </IconButton>
                            }
                            </Grid>
                            <Grid xs={8} md={6} style={{textAlign:'center'}} item>
                            <Typography variant="h5">PUCHO VOCAL</Typography>
                            </Grid>
                            <Grid xs={3} md={3} style={{textAlign:'center'}} item>
                              { this.state.signoutBtn ? 
                               <IconButton color="primary" onClick={this.signOut}>
                                    <ExitToAppIcon/>
                                </IconButton>
                                :
                                <Button variant="contained" disabled={this.state.signBtn} color="primary" href="/signIn">SignIn / SignUp</Button>
                                }
                            </Grid>
                        </Grid>

                    </Toolbar>
                </AppBar>
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(Header);