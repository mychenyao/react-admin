import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
import LabelContainer from './component/labelContainer'
import axios from 'axios'
// import store from './reduc/state'
// import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import 'echarts/lib/chart/bar'
import  './utils/httpConfig'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import dva from 'dva'
import createHistory from 'history/createBrowserHistory';
let app = dva({
    history: createHistory()
})
Component.prototype.LabelContainer = LabelContainer
Component.prototype.$http = axios


// app.model(require('@/models/global.js').default)
app.router(({app}) => {
return <App app={app} />
})
app.start('#root')
// ReactDOM.render(
//      <Provider store={store}>
//          <App/> 
//       </Provider>
//   , document.getElementById('root'));
serviceWorker.unregister()
