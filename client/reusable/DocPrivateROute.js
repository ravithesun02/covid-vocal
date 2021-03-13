import { rest } from 'lodash';
import React , {Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import auth from '../api/auth-helper';

const DocPrivateRoute=({component:Component,...rest})=>{

    return (
        <Route {...rest} render={props=>(
            auth.isDocAuthenticated()?(
                <Component {...props}/>
            ):(
                <Redirect to={{
                    pathname:'/',
                    state:{from:props.location}
                }}/>
            )
        )

        }/>
    )
}

export default DocPrivateRoute;