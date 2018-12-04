import * as actions from '@/reduc/actions'
export default {
    channelDetail(val, dispatch) {
        setTimeout(() => {
            dispatch(actions.channelDetail(val))
        }, 2000)
    }
}