import React, {Component} from 'react';
import './App.css';
import Routers from './router/index'
import {LocaleProvider} from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

class App extends Component {
    render() {
        return (
            <LocaleProvider locale={zh_CN}>
                <Routers/>
            </LocaleProvider>
        )
    }
}

export default App;
