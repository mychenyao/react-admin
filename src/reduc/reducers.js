// 定义redux规则
import * as actionTypes from './actionTypes'

export default (state, action) => {
    switch (action.type) {
        case actionTypes.CHANNEL_DETAIL:
        return {
            ...state,
            channelDetailShow: action.val
        }
        case actionTypes.SET_COLLAPSED:
            return {
                ...state,
                collapsed: action.val
            }
            case actionTypes.SET_HEADER_LIST:
            return {
                ...state,
                headerList: action.val
            }
        default:
        return state
    }
}
