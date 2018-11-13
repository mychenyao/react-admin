import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import routerList from './routerList'
class RouterChild extends Component {
    render() {
        const router = v=> <Route key={v.path} path={v.path} component={v.component}></Route>
        const childrenRouter = v => v.map(e => router(e))
        return (
            <div className="menu_right_content">
                {
                    routerList.menu.map(v => v.children? childrenRouter(v.children) :router(v))
                }
            </div>
        )
    }
}

export default RouterChild;
