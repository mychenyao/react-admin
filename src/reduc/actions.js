// 定义action创建函数生成action对象
import * as actionTypes from './actionTypes'
export const channelDetail = val =>  {
    return {
        type: actionTypes.CHANNEL_DETAIL,
        val
    }
}
export const toggleCollapsed = val =>  {
    return {
        type: actionTypes.SET_COLLAPSED,
        val
    }
}

export const setHeaderList = val =>  {
    return {
        type: actionTypes.SET_HEADER_LIST,
        val
    }
}