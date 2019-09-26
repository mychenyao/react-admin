import dynamic from 'dva/dynamic';
const Pay = app => dynamic({
    app,
    models:()=>[import('./models/index')],
    component: () => import('./pay')
})
export default Pay