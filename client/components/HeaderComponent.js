import React , {Component} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton } from '@material-ui/core';

import auth from '../api/auth-helper';

const useStyles =theme=>({
    toolbar:{
        background:'brown'
    }
});



class Header extends Component {

    constructor(props)
    {
        super(props);
    }

    signOut=()=>{

        

        if(typeof window !== 'undefined')
        {
            let pathname=window.location.pathname;

            if(pathname==='/home')
                auth.clearJWT('jwt',()=>{
                    console.log('signed out');
                })
            else if(pathname==='/doc_home')
            auth.clearJWT('doc_jwt',()=>{
                console.log('signed out');
            })

            this.props.logout();
        }

    }

    render() {
        const {classes}=this.props;
        return(
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <Grid container alignItems="center" justify="center" direction="row">
                           
                            <Grid xs={1} md={3} item>

                            </Grid>
                            <Grid xs={10} md={3} item>
                            <Typography variant="h5">Covid Voice Detector</Typography>
                            </Grid>
                            <Grid xs={1} md={3} item>
                              { (localStorage.getItem('jwt') || localStorage.getItem('doc_jwt')) &&  <IconButton color="primary" onClick={this.signOut}>
                                    <ExitToAppIcon/>
                                </IconButton>}
                            </Grid>
                        </Grid>

                    </Toolbar>
                </AppBar>
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(Header);