import React, { Component } from 'react';
import './style.css'
import { Button } from 'antd'
import { connect } from 'react-redux'
import * as actions from '@/reduc/actions'
import axios from 'axios'

class Router extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
     
    }

    render() {
        return (
            <div >
            </div>
        );
    }

}
const mapStateToProps = state => state
const mapDispatchToProps = dispatch => {
    return {
      
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Router);
