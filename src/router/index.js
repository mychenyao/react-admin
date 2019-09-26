import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import home from '@/pages/home/index'
import Login from '@/pages/login/login'
// import Test from '@/pages/Test'
class Routers extends Component {
    render() {
        const Home = home(this.props.app)
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <Redirect push to='/nav/order' />} />
                    <Route path="/nav" render={(props) => <Home {...props} app={this.props.app} /> } />
                    <Route path="/login" component={Login} />
                    {/* <Route path="/test" component={Test} /> */}
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routers
