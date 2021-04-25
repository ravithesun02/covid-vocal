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
import AdminLoginComponent from './admin/AdminLoginComponent';
import AdminPrivateRoute from '../reusable/AdminPrivateRoute';
import AdminHome from './admin/AdminHomePage';
import HomeDetail from '../reusable/HomeDetailComponent';

class MainRouter extends Component{

    render()
    {
        return(
            <div>
            <Switch>
                <Route exact path="/" component={HomeDetail}/>
                <Route exact path="/signIn" component={Login}/>
                <Route exact path="/details" component={HomeDetail}/>
                <PrivateRoute path="/home" component={HomeComponent}/>
                <Route path="/doc" component={DocLogin}/>
                <DocPrivateRoute path="/doc_home" component={DocHome}/>
                <Route exact path="/request" component={UserInputComponent}/>
                <Route exact path="/status" component={UserStatus}/>
                <Route exact path="/error" component={UserError}/>
                <Route exact path="/verified" component={UserVerifiedComponent}/>
                <Route exact path="/admin" component={AdminLoginComponent}/>
                <AdminPrivateRoute exact path="/admin_home" component={AdminHome}/>
            </Switch>
            </div>
        )
    }

}

export default MainRouter;