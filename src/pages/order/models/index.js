export default {
    namespace: 'order',
    state: [],
    reducers: {
      'delete'(state, { payload: id }) {
        return state.filter(item => item.id !== id);
      },
    }
  };