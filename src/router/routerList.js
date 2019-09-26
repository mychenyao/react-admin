
import Pay from '../pages/pay'
import Order from '../pages/order'
export default {
    menu: [
        {
            path: '/nav',
            children: [
                {
                    name: '财务',
                    component: Pay,
                    path: '/nav/pay'
                },
                {
                    name: '订单',
                    component: Order,
                    path: '/nav/order'
                }
            ]
        }
    ]
}