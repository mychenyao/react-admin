import React, {Component} from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from '@/pages/home'
import Login from '@/pages/login/login'
// import Test from '@/pages/Test'

class Routers extends Component {

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" render={() => <Redirect push to='/nav/index/index'/>}/>
                    <Route path="/nav" component={Home}/>
                    {/*<Route path="/test" component={Test}/>*/}
                    <Route path="/login" component={Login}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default Routers;
