import { Container, CssBaseline, Typography } from '@material-ui/core';
import React from 'react';

class UserError extends React.Component{
    render()
    {
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

export default UserError;