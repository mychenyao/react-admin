import dynamic from 'dva/dynamic';
const Order = app => dynamic({
    app,
    models:()=>[import('./models/index')],
    component: () => import('./order')
})
export default Order