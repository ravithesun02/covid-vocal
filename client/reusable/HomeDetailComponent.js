import { AppBar, Typography, withStyles, Button, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Card, CardMedia, CardContent } from '@material-ui/core';
import React , {Component} from 'react';
import Header from '../components/HeaderComponent';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import auth from '../api/auth-helper';
import { Redirect } from 'react-router';
import first from './../assests/images/1.png'
import second from './../assests/images/2.png'
import third from './../assests/images/3.png'
import fourth from './../assests/images/4.png'
import fifth from './../assests/images/5.png'
import sixth from './../assests/images/6.png'
import seventh from './../assests/images/7.jpg'
import eighth from './../assests/images/8.jpg'
import ninth from './../assests/images/9.jpg'
import tenth from './../assests/images/10.jpg'
import eleventh from './../assests/images/11.jpg'
const useStyles=theme=>({
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
    media:{
        minHeight:'100vh'
    },
    card:{
        maxWidth:'100%',
        margin:'auto',
        marginTop:'1%',
        minHeight:'20vh',
        textAlign:'center',
        backgroundColor:'#C9EDC9'
    }
})

class HomeDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            loggedIn:false,
            pressed:false
        }
    }

    componentDidMount()
    {
        if(auth.isAuthenticated())
            this.setState({
                loggedIn:true
            });
    }
    logout=()=>{
        this.setState({
            isLoggedIn:false,
            pressed:true
        });
    }

    render(){
        const {classes}=this.props;
            
        return(
            <div className={classes.root}>
                <Grid container direction="column" className={classes.mainGrid}>
                    <Grid item>
                        <Header logout={this.logout}/>
                    </Grid>
                    <Grid direction="column"  item container className={classes.midGrid}>
                        <Grid item>
                            {/* <Paper className={classes.paper} elevation={3}>
                               <Typography variant="h6">
                               Pucho Inc. is an AI-based HealthTech/Digital health start-up.
                               <br/>
                                Our team consists of people having relevant deep expertise in Diagnostic , AI , and strategic partnerships.
                                <br/>
                                Pucho Inc. has developed Vocal Biomarkers for rapid covid-19 screening to ensure real-time screening of covid-19 patients , primarily asymptomatic.
                               </Typography>

                            </Paper>
                            <Paper className={classes.paper} style={{marginTop:'1%'}} elevation={3}>
                                <h2>About Pucho Vocal</h2>
                               <Typography variant="h6">
                                It is a rapid Covid-19 screening platform to screen Covid patients anywhere and anytime.
                                <br/>
                                We have achieved 80 % accuracy in the internal development. Now we are pushing to validation and clinical trials in India and other countries.
                                <br/>
                                Our platform ensures : Highest standard of Data privacy (GDPR compliant ) & noise resistance.
                               </Typography>

                            </Paper>
                            <Paper className={classes.paper} style={{marginTop:'1%'}} elevation={3}>
                                <h2>Challenges in current diagnostic</h2>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <ArrowForwardIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="RT-PCR results usually take 48-72 hours to be arrive"/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <ArrowForwardIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="New Covid cases may not be detected by routine RT-PCR Tests"/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <ArrowForwardIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Sizable cost involved"/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <ArrowForwardIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Sometimes results arrive after the death of the patients"/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <ArrowForwardIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Patients need to visit certain centers/hospitals to get diagosed/tested. It gets complicated during the time of the pandemic."/>
                                    </ListItem>
                                </List>

                            </Paper>
                            <Paper className={classes.paper} style={{marginTop:'1%'}} elevation={3}>
                                <h2>Pucho Vocal - Assistance to Healthcare Facility</h2>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <ArrowForwardIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="AI-powered platform that screens for the risk of COVID-19 by analyzing a person's voice"/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <ArrowForwardIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="It does not need any additional information or prior knowledge about the individual user."/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <ArrowForwardIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="It provides real-time results and will enable healthcare systems to create a funnel through which testing resources can be dedicated to those with a higher probability of being infected with COVID-19."/>
                                    </ListItem>
                                </List>

                            </Paper>
                            <Paper className={classes.paper} style={{marginTop:'1%'}} elevation={3}>
                                <h2>USES AND BENEFITS OF PUCHO VOCAL</h2>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <ArrowForwardIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Daily Screening"/>
                                        <List>
                                            <ListItem>
                                            <ListItemIcon>
                                            <ArrowForwardIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="Givernment Office"/>
                                            </ListItem>
                                            <ListItem>
                                            <ListItemIcon>
                                            <ArrowForwardIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="Healthcare Organizations"/>
                                            </ListItem>
                                            <ListItem>
                                            <ListItemIcon>
                                            <ArrowForwardIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="Big employees"/>
                                            </ListItem>
                                            <ListItem>
                                            <ListItemIcon>
                                            <ArrowForwardIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="Student as schools reopens"/>
                                            </ListItem>
                                            <ListItem>
                                            <ListItemIcon>
                                            <ArrowForwardIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="Worker , & the public jobs and transport repoen."/>
                                            </ListItem>
                                        </List>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <ArrowForwardIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Channelize testing kit and healthcare facility"/>
                                        <List>
                                            <ListItem>
                                            <ListItemIcon>
                                            <ArrowForwardIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="Helps to decide whether to go for PCR or to stay in quarantine or do something else like Rapid test ."/>
                                            </ListItem>
                                            <ListItem>
                                            <ListItemIcon>
                                            <ArrowForwardIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="Will help plan for healthcare requirements better"/>
                                            </ListItem>
                                            <ListItem>
                                            <ListItemIcon>
                                            <ArrowForwardIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="0% risk to health workers"/>
                                            </ListItem>
                                        </List>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <ArrowForwardIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="To general public"/>
                                        <List>
                                            <ListItem>
                                            <ListItemIcon>
                                            <ArrowForwardIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="Pool testing to quickly alert outbreaks in groups ."/>
                                            </ListItem>
                                            <ListItem>
                                            <ListItemIcon>
                                            <ArrowForwardIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="Lesser time to give results"/>
                                            </ListItem>
                                            <ListItem>
                                            <ListItemIcon>
                                            <ArrowForwardIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="Use it as many times as they want"/>
                                            </ListItem>
                                            <ListItem>
                                            <ListItemIcon>
                                            <ArrowForwardIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="Can screen everyone with a software only solution at home at their own convenience."/>
                                            </ListItem>
                                        </List>
                                    </ListItem>
                                </List>

                            </Paper> */}

                            <Card className={classes.card}>
                                <CardContent>
                                    <img src={first} width='100%' height='50%' />
                                </CardContent>
                            </Card>
                            <Card className={classes.card}>
                            <CardContent>
                                    <img src={second} width='100%' height='50%' />
                                </CardContent>
                            </Card>
                            <Card className={classes.card}>
                            <CardContent>
                                    <img src={third} width='100%' height='50%' />
                                </CardContent>
                            </Card>
                            <Card className={classes.card}>
                            <CardContent>
                                    <img src={fourth} width='100%' height='50%' />
                                </CardContent>
                            </Card>
                            <Card className={classes.card}>
                            <CardContent>
                                    <img src={fifth} width='100%' height='50%' />
                                </CardContent>
                            </Card>
                            <Card className={classes.card}>
                            <CardContent>
                                    <img src={sixth} width='100%' height='50%' />
                                </CardContent>
                            </Card>
                            <Card className={classes.card}>
                            <CardContent>
                                    <img src={seventh} width='100%' height='50%' />
                                </CardContent>
                            </Card>
                            <Card className={classes.card}>
                            <CardContent>
                                    <img src={eighth} width='100%' height='50%' />
                                </CardContent>
                            </Card>
                            <Card className={classes.card}>
                            <CardContent>
                                    <img src={ninth} width='100%' height='50%' />
                                </CardContent>
                            </Card>
                            <Card className={classes.card}>
                            <CardContent>
                                    <img src={tenth} width='100%' height='50%' />
                                </CardContent>
                            </Card>
                            <Card className={classes.card}>
                            <CardContent>
                                    <img src={eleventh} width='100%' height='50%' />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(useStyles)(HomeDetail);