import React , {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../reusable/PrivateRoute';
import HomeComponent from './HomeComponent';
import Login from './LoginComponent';
import DocLogin from './doctors/DocLoginComponent';
import DocHome from './doctors/DocHomeComponent';
import DocPrivateRoute from '../reusable/DocPrivateROute';
import UserInputComponent from './auth/UserInputComponent';
import UserStatus from './auth/UserStatusComponent';
import UserError from './auth/UserErrorComponent';
import UserVerifiedComponent from './auth/UserVerifiedComponent';


class MainRouter extends Component{

    render()
    {
        return(
            <div>
            <Switch>
                <Route exact path="/" component={Login}/>
                <PrivateRoute path="/home" component={HomeComponent}/>
                <Route path="/doc" component={DocLogin}/>
                <DocPrivateRoute path="/doc_home" component={DocHome}/>
                <Route exact path="/request" component={UserInputComponent}/>
                <Route exact path="/status" component={UserStatus}/>
                <Route exact path="/error" component={UserError}/>
                <Route exact path="/verified" component={UserVerifiedComponent}/>
            </Switch>
            </div>
        )
    }

}

export default MainRouter;