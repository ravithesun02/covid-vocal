import React , {Component} from 'react';
import Header from "./HeaderComponent";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Name from "./questions/FormComponent";
import { Switch } from '@material-ui/core';
import { Redirect } from 'react-router-dom';




const useStyles =theme=>({
    root:{
        flexGrow:1,
        background: 'light-grey'
    },
    paper:{
        padding:'1%',
        textAlign:'center'
    },
    mainGrid:{
        
        spacing: 0,
        justify: 'space-around'
    },
    midGrid:{
        padding:'2%',
        justify:'space-evenly'
    },
    accordion:{
        marginTop:'1%'
    }
    
});


class Home extends Component {

    constructor(props) {
        super(props);
        this.state={
            questionGrid:true,
            isLoggedIn:true
        }
    }

    componentDidMount()
    {
        if(typeof window !== 'undefined')
        {
            window.addEventListener('storage',this.checkSignIn);
        }
    }

    componentWillUnmount()
    {
        window.removeEventListener('storage',this.checkSignIn);
    }

    checkSignIn=()=>{
        if(!localStorage.getItem('jwt'))
            this.setState({
                isLoggedIn:false
            })
    }  
    
    logout=()=>{
        this.setState({
            isLoggedIn:false
        });
    }



    render() {
        const {classes}=this.props;
        if(!this.state.isLoggedIn)
            return(
                <Redirect to="/"/>
            )
        return(
            <div className={classes.root}>
                <Grid direction="column" className={classes.mainGrid} container>
                    <Grid item>
                        <Header logout={this.logout}/>
                    </Grid>
                    <Grid direction="column"  item container className={classes.midGrid}>

                       <Grid item>
                           <Paper className={classes.paper} elevation={3}>
                               <h2>Record your voice to help AI beat Covid!</h2>
                               <p>Carnegie Mellon University is collaborating with researchers around the world to develop an automated AI system that can detect signatures of Covid-19 infection in the human voice.

                                   In order to build the system we require a large number of voice samples -- from Covid patients, from healthy people, and from people affected by other ailments.

                                   Please sign in and record your voice, to contribute to this effort</p>
                           </Paper>
                       </Grid>
                      
                       <Grid item style={{marginTop:'1%'}}>
                        <Paper className={classes.paper}>
                            Upload your details <Switch checked={this.state.questionGrid} onChange={()=>this.setState({questionGrid:!this.state.questionGrid})}/> Get your details
                        </Paper>
                       </Grid>

                       <Grid item style={{paddingTop:'1%'}}>
                            {
                               !this.state.questionGrid? <Name/> : <h2>sgdfhgfhfghfg</h2>
                            }
                       </Grid>

                    </Grid>


                </Grid>
            </div>
        )
    }
}

export default withStyles(useStyles)(Home);