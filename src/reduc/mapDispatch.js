import * as actions from '@/reduc/actions'
import {getSessionStorage} from "@/utils/storage"
import axios from 'axios'
export default {
    getHeaderList(dispatch) {
        const applicationId = !!getSessionStorage('applicationId') ? String(getSessionStorage('applicationId')) : '1'
        return axios.post('security/listUserApps').then(res => {
            const {data} = res
            console.log(data)
            dispatch(actions.setHeaderList(data.body))
            return applicationId
        })
    }
}