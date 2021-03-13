import React , {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../reusable/PrivateRoute';
import HomeComponent from './HomeComponent';
import Login from './LoginComponent';
import DocLogin from './doctors/DocLoginComponent';
import DocHome from './doctors/DocHomeComponent';
import DocPrivateRoute from '../reusable/DocPrivateROute';


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
            </Switch>
            </div>
        )
    }

}

export default MainRouter;