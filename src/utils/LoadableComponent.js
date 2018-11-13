import Loadable from 'react-loadable'
import React, { Component } from 'react'
class Loading extends Component{
    render() {
        return (
            <div/>
        )
    }
}
const loadableComponent = component => {
    return Loadable({
        loader: component,
        loading: Loading
    })
}

export default loadableComponent