import React, { Component } from 'react';
import { Modal} from 'antd'
import { connect } from 'react-redux'
import * as actions from '@/reduc/actions'
// import axios from 'axios'

class ChannelDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
     
    }

    render() {
        return (
            <div>
                  <Modal
                    title="渠道详情"
                    visible={this.props.channelDetailShow}
                    onOk={() => this.props.close()}
                    onCancel={() => this.props.close()}
                >
                    <p>你好</p>
                </Modal>
            </div>
        );
    }

}
const mapStateToProps = state => state
const mapDispatchToProps = dispatch => {
    return {
        close(isUpdateList) {
            dispatch(actions.channelDetail(false))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetail);
