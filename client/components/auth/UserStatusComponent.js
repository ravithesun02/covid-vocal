import { Container, CssBaseline, Typography } from '@material-ui/core';
import React from 'react';
import { Redirect } from 'react-router';

class UserStatus extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            isVerified:true
        }
    }

   async componentDidMount()
    {
        if(localStorage.getItem('route')==='request' || localStorage.getItem('route')==='login')
        {

        }
        else
        {
            await this.setState({
                isVerified:false
            });
        }
    }

    render()
    {

        if(!this.state.isVerified)
            {
                return(
                    <Redirect  to="/"/>
                )
            }

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Typography variant="h4">
                    Your Data is submitted . You will receive a mail as soon as You are verified from our end.
                </Typography>

            </Container>
        )
    }
}

export default UserStatus;