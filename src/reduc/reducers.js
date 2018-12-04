// 定义redux规则
import * as actionTypes from './actionTypes'

export default (state, action) => {
    switch (action.type) {
        case actionTypes.CHANNEL_DETAIL:
        return {
            ...state,
            channelDetailShow: action.val
        }
        default:
        return state
    }
}
