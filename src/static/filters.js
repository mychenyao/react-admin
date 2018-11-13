import moment from 'moment'
export default {
    moment(val, format = 'YYYY-MM-DD HH:mm:ss') {
       return moment(val).format(format)
    }
}