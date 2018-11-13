export const setSessionStorage = (key, val = '') => {
    window.sessionStorage.setItem(key , JSON.stringify(val))
}
export const setLocalStorage = (key, val = '') => {
    window.localStorage.setItem(key , JSON.stringify(val))
}
export const getSessionStorage = (key = null) => {
    if(!key) return
    const val = window.sessionStorage.getItem(key)
    return JSON.parse(val)
}
export const getLocalStorage = (key = null) => {
    if(!key) return
    const val = window.localStorage.getItem(key)
    return JSON.parse(val)
}