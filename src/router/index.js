import React, {Component} from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from '@/pages/home'
import Login from '@/pages/login/login'

class Routers extends Component {

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" render={() => <Redirect push to='/home/order/order'></Redirect>}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default Routers;
