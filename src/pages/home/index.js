import dynamic from 'dva/dynamic';
const Home = app => dynamic({
    app,
    models:()=>[import('./models/index')],
    component: () => import('./home')
})
export default Home