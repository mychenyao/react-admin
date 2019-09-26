export default {
    namespace: 'home',
    state: {
      menuList: [
        {
            label: '订单',
            url: '/nav/order',
            menuId: 1
        },
        {
            label: '案件',
            url: '/nav/pay',
            menuId: 2
        }
      ],
      headerList: [
        {
          name: '催收',
          id: 1
       },
       {
          name: '风控',
          id: 2
       },
       {
          name: '客服',
          id: 3
        }
      ]
    },
    reducers: {
      'delete'(state, { payload: id }) {
        return state.filter(item => item.id !== id);
      },
    },
  };