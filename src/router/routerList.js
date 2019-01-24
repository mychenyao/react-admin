import LoadableComponent from '../utils/LoadableComponent'
// const order = LoadableComponent(() => import('../pages/order/order'))
// const tables = LoadableComponent(() => import('../pages/tables/tables'))
const user = LoadableComponent(() => import('../pages/user/user'))
// const channel = LoadableComponent(() => import('../pages/channel/channel'))
// const pay = LoadableComponent(() => import('../pages/pay/pay'))
const accountList = LoadableComponent(() => import('@/pages/user/accountList/accountList'))
const signingRecord = LoadableComponent(() => import('@/pages/user/signingRecord/signingRecord'))
const Home = LoadableComponent(() => import('@/pages/home/index'))
export default {
    menu: [
        {
            path: '/nav',
            children: [
                {
                    name: '首页',
                    component: Home,
                    path: '/nav/index/index'   
                },
                {
                    name: '用户',
                    component: user,
                    path: '/nav/index/userList'
                }, {
                    name: ' 开户',
                    component: accountList,
                    path: '/nav/index/accountList'
                }, {
                    name: ' 签约',
                    component: signingRecord,
                    path: '/nav/index/signingRecord'
                }, {
                    name: ' 银行卡',
                    component: user,
                    path: '/nav/index/stickList'
                }, {
                    name: ' 黑名单',
                    component: user,
                    path: '/nav/index/blackList'
                }
            ]
        }
    ]
}