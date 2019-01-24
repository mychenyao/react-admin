import axios from 'axios'
import { message } from 'antd'
import qs from 'qs'
// 测试环境
// axios.defaults.baseURL = 'http://wwww.xx.com'
// 本地开发环境
axios.defaults.baseURL = '/api'
axios.interceptors.request.use(config => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config
})
axios.interceptors.response.use(res => {
    const { data } = res
    if (data.code === '510') {
        window.location.hash = '#/login'
    } else if (data.code - 0 !== 200) {
        message.error(data.message)
    }
    return res
})