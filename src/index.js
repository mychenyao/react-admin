import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
import LabelContainer from './component/labelContainer'
import axios from 'axios'
import store from './reduc/state'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import 'echarts/lib/chart/bar'
import  './utils/httpConfig'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import './utils/httpConfig'
Component.prototype.LabelContainer = LabelContainer
Component.prototype.$http = axios
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
