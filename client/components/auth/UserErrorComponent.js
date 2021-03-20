import { Container, CssBaseline, Typography } from '@material-ui/core';
import React from 'react';

class UserError extends React.Component{
    render()
    {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Typography variant="h4">
                    You are not authorized to access this website.OR 
                    <span style={{color:'red'}}> Connect to the same network You used for genrating the request. </span>
                </Typography>

            </Container>
        )
    }
}

export default UserError;