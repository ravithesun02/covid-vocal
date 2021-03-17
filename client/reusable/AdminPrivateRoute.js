import { rest } from 'lodash';
import React , {Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import auth from '../api/auth-helper';

const AdminPrivateRoute=({component:Component,...rest})=>{

    return (
        <Route {...rest} render={props=>(
            auth.isAdminAuthenticated()?(
                <Component {...props}/>
            ):(
                <Redirect to={{
                    pathname:'/admin',
                    state:{from:props.location}
                }}/>
            )
        )

        }/>
    )
}

export default AdminPrivateRoute;