import React, {Component} from 'react';
// import './style.css
import {Modal,Input, Form} from 'antd'
const FormItem = Form.Item
const tailFormItemLayout = {
    labelCol: {
        sm: {
            span: 4,
            offset: 0,
        },
    },
}

export default class RouterChild extends Component {
    render() {
        // const { getFieldDecorator } = this.props.form
        // console.log(getFieldDecorator)
        return (
            <section>
                <Modal
                    title="详情"
                    visible={this.props.isShow}
                    onOk={() => this.props.handleOk('open')}
                    onCancel={this.props.handleOk}
                >
                    <Form>
                        <FormItem
                            label="姓名"
                            {...tailFormItemLayout}
                        >
                            <div className={'form_item'}>
                                <Input style={{width: '200px'}} placeholder="Basic usage" />
                            </div>

                        </FormItem>
                   </Form>
                </Modal>
            </section>
        );
    }
}