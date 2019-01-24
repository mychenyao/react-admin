import React, { Component } from 'react';
import './style.less'
import { Button } from 'antd'
import { connect } from 'react-redux'
// import * as actions from '@/reduc/actions'
import ChannelDetail from './components/channelDetail'
import mapDispatch from '@/reduc/mapDispatch'
// import axios from 'axios'
class Channel extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
     
    }

    channelDetail() {
        this.props.channelDetail(true)
    }

    render() {
        return (
            <div >
                <Button onClick = {() => this.channelDetail()}> 
                    详情
                </Button>
                <ChannelDetail/>
            </div>
        );
    }
}
const mapStateToProps = state => state
const mapDispatchToProps = dispatch => {
    return {
        channelDetail: val => mapDispatch.channelDetail(val, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Channel);

