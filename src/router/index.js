import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '@/pages/home'
import Login from '@/pages/login/login'
// import DvaTest from '@/pages/dvaTest/model'
import Test from '@/pages/Test'
import dynamic from 'dva/dynamic'
class Routers extends Component {
    render() {
        const { app } = this.props
        const DvaTest = dynamic({
            app,
            models: () => [import('@/pages/dvaTest/model')],
            component: () => import('@/pages/dvaTest')
        })
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" render={() => <Redirect push to='/nav/index/index' />} />
                    <Route path="/nav" component={Home} />
                    <Route path="/dvaTest" component={DvaTest} />
                    <Route path="/login" component={Login} />
                    <Route path="/test" component={Test} />
                </Switch>
            </HashRouter>
        )
    }
}

export default Routers
