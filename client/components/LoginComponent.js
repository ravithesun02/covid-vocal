import React from 'react';
import {
    Paper,
    TextField,
    MenuItem,
    Button,
    IconButton
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Otp from './Otp';

import {generateOTP,verifyOTP} from '../api/api-auth';
import auth from '../api/auth-helper';
import { Link, Redirect } from 'react-router-dom';
import {getIP} from '../api/ip-getter';


function isNumeric(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
}

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            code: '+',
            pno: '',
            otpShow: false,
            otp: '',
            loggedIn:false,
            redirectTo:null
        };
    }

    async componentDidMount()
    {
        

        if(auth.isAuthenticated())
            this.setState({
                loggedIn:true
            });
    }

    
    _getCode = async() => {
        const e = this.state.code+this.state.pno;
        let response=await generateOTP(e);
        if(response.ok)
        {
            console.log(response);//show alert
        }
        else
        {
            console.log(response);//show alerrt
        }
    };

    _verifyCode = async () => {
        const e = this.state.code+this.state.pno;
        const otp=this.state.otp;
        localStorage.setItem('route','login');
        localStorage.setItem('phone',e);
        let ip=await getIP();
        let response=await verifyOTP({phone:e,code:otp,ip:ip});
        if(response.ok)
        {
            console.log(response);//show alert
            let res=await response.json();

           await this.setState({
               redirectTo:res.redirect
           })

        }
        else
        {
            console.log(response);//show alerrt
        }
        
    }
  
    render(){
        const height = this.state.height-65;
        if(this.state.loggedIn)
            return(
                <Redirect to="/home"/>
            );
        if(this.state.redirectTo)
        {
            return(
                <Redirect to={`/${this.state.redirectTo}`}/>
            )
        }


        return(
            <div style={{
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: 'rgba(160, 160, 160, 0.2)',
                height: '100vh'
            }}>
                <Paper elevation={4} style={{ padding: 20, width: 300, marginBottom: 60}}>
                    {!this.state.otpShow ? <h3 style={{marginLeft: 10, color: '#9f9f9f'}}>αlpha</h3> : <IconButton onClick={() => {
                        this.setState({otpShow: false, otp: ''});
                    }} size="small"><ArrowBackIcon /></IconButton>}
                    {!this.state.otpShow ? <h3>Enter your Phone Number</h3> : <h3>Enter the OTP</h3> }
                    {this.state.otpShow ? <p>A One Time Password has been sent to your phone number for verification puposes.</p> : null}
                    <div>
                        {!this.state.otpShow ? <div style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto', justifyContent: 'space-around'}}>
                            <div style={{alignItems: 'flex-end', justifyContent: 'center', display: 'flex', marginRight: 10, width: 60}}>
                                <TextField id="code" label="Code" color="secondary" value={this.state.code} onChange={e => {
                                    this.setState({code: e.target.value});
                                }}/>
                            </div>
                            <div>
                                <TextField id="phone" label="Phone" color="secondary" value={this.state.pno} 
                                onChange={e => {
                                    if((e.target.value[e.target.value.length-1]>='0' && e.target.value[e.target.value.length-1]<='9') || !e.target.value) {
                                        this.setState({pno: e.target.value});
                                    }
                                }}/>
                            </div>
                        </div> : <Otp otp={this.state.otp} setOtp={val => this.setState({otp: val})} />}
                        {this.state.otpShow ? <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 5}}>
                            Didn't receive an OTP? <Button onClick={() => this.setState({otpShow:false})} color="primary" style={{textTransform: 'none', fontSize: 15}}>Resend OTP</Button>
                        </div> : null }
                        <div style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
                            <Button 
                                variant="contained" 
                                disabled={(this.state.pno.length!==10) || (this.state.code===null) || !isNumeric(this.state.pno) || (this.state.otpShow && this.state.otp.length!==6)} 
                                color="secondary" 
                                style={{ 
                                    color: 'white', 
                                    marginLeft: 'auto', 
                                    textTransform: 'none'
                                }}
                                onClick={() => {
                                    if(this.state.otpShow) {
                                        this._verifyCode();
                                        
                                        
                                    } else {
                                        this._getCode();
                                        this.setState({otpShow: true});
                                    }
                                }}>
                                Verify
                            </Button>
                        </div>
                        {!this.state.otpShow ? <p>By tapping Verify an SMS may be sent. Message & data rates may apply.</p> : null}
                        {!this.state.otpShow ? <Link to="/doc">Sign In as Doctor</Link> : null}
                    </div>
                </Paper>
            </div>
        );
    }
}