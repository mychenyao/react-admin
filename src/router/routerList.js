import LoadableComponent from '../utils/LoadableComponent'
const order = LoadableComponent(() => import('../pages/order/order'))
const tables = LoadableComponent(() => import('../pages/tables/tables'))
const user = LoadableComponent(() => import('../pages/user/user'))
const channel = LoadableComponent(() => import('../pages/channel/channel'))
const pay = LoadableComponent(() => import('../pages/pay/pay'))
const unusualUser = LoadableComponent(() => import('../pages/user/unusualUser'))
export default {
    menu: [
        {
            path: '/home/order/order',
            name: '工单管理',
            component: order
        }, {
            path: '/home/tables/tables',
            name: '表格',
            component: tables
        }, {
            path: '/home/channel/channel',
            name: '渠道管理',
            component: channel
        }, {
            path: '/',
            name: '用户管理',
            children: [

                {
                    name: ' 异常用户',
                    component: unusualUser,
                    path: '/home/user/unusualUser'
                }, {
                    name: ' 正常用户',
                    component: user,
                    path: '/home/user/user'
                }
            ]
        }, {
            path: '/home/pay/pay',
            name: '财务管理',
            component: pay
        }
    ]
}