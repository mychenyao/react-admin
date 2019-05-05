import React, {Component} from 'react';
import {Row, Select, Col, Table, Pagination, Button, Input} from 'antd'
import './style.css'
import Details from './components/details'
import filter from '../../static/filters'

const time = new Date() - 0

class Tables extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [{
                title: '交易编号',
                dataIndex: 'id',
                key: 'id'
            }, {
                title: '用户ID',
                dataIndex: 'userId',
                key: 'age',
            }, {
                title: '姓名',
                dataIndex: 'name',
                key: 'address',
            }, {
                title: '手机号',
                key: 'tel',
                dataIndex: 'tel'
            }, {
                title: '借款编号',
                key: 'number',
                dataIndex: 'number'
            }, {
                title: '日期',
                key: 'time',
                dataIndex: 'time',
                render(v, e) {
                    return filter.moment(e.time)
                }
            }, {
                title: '减免金额',
                key: 'f',
                dataIndex: 'price'
            }, {
                title: '操作',
                key: 'operation',
                dataIndex: 'operation',
                fixed: 'right',
                width: 200,
                render: () => {
                    return (<div className={'operation_list'}>
                            <span onClick={() => this.openDetails()}>详情</span>
                        <span>详情</span>
                        <span>详情</span>
                    </div>)
                }
            },
            ],
            data: [
                {
                    key: '1',
                    price: 22.25,
                    number: '1242KD55145',
                    tel: 15972840395,
                    name: '陈尧',
                    userId: '121212KK474784',
                    id: '12455255',
                    time
                }, {
                    key: '2',
                    price: 22.255,
                    number: '1242KD55145',
                    tel: 15973840395,
                    name: '陈尧',
                    userId: '121212KK474784',
                    id: '32455255',
                    time: time - 200
                }, {
                    key: '4',
                    price: 22.25,
                    number: '1242KD55145',
                    tel: 13972840395,
                    name: '陈尧',
                    userId: '121212K474784',
                    id: '1245255',
                }
            ],
            details: {
                isShow: false
            }
        }
    }

    openDetails() {
        this.setState({details: !this.state.details.isShow})
    }

    onShowSizeChange(e, v) {

    }

    handleOk(e) {
        if (e === 'open') {

        }
        this.openDetails()
    }

    handleChange() {

    }

    componentDidMount() {

    }

    render() {
        const {LabelContainer} = this
        return (
            <div>
                <Row gutter={20}>
                    <Col md={12} lg={8} xl={6}>
                        <LabelContainer label={'姓名:'}>
                            <Input placeholder="请输入姓名"/>
                        </LabelContainer>
                    </Col>
                    <Col md={12} lg={8} xl={6}>
                        <LabelContainer label={'交易编号:'}>
                            <Input placeholder="请输入姓名"/>
                        </LabelContainer>
                    </Col>
                    <Col md={12} lg={8} xl={6}>
                        <LabelContainer label={'支付单号:'}>
                            <Input placeholder="请输入姓名"/>
                        </LabelContainer>
                    </Col>
                    <Col md={12} lg={8} xl={6}>
                        <LabelContainer label={'支付单号:'}>
                            <Input placeholder="请输入姓名"/>
                        </LabelContainer>
                    </Col>
                    <Col md={12} lg={8} xl={6}>
                        <LabelContainer label={'支付单号:'}>
                            <Input placeholder="请输入姓名"/>
                        </LabelContainer>
                    </Col>
                    <Col md={12} lg={8} xl={6}>
                        <LabelContainer label={'支付单号:'}>
                            <Select defaultValue="lucy" style={{width: '100%'}} onChange={this.handleChange}>
                                <Select.Option value="jack">Jack</Select.Option>
                                <Select.Option value="lucy">Lucy</Select.Option>
                                <Select.Option value="Yiminghe">yiminghe</Select.Option>
                            </Select>
                        </LabelContainer>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{textAlign: 'right'}}>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Col>
                </Row>
                <Row className={'table_container'}>
                    <Col span={24}>
                        <Table
                            scroll={{x: 1200}}
                            size="middle"
                            bordered
                            columns={this.state.columns}
                            pagination={false}
                            dataSource={this.state.data}/>
                        <div className='pagination'>
                            <Pagination showSizeChanger onShowSizeChange={this.onShowSizeChange} defaultCurrent={3}
                                        total={500}/>
                        </div>

                    </Col>
                </Row>
                <Details handleOk={(e) => this.handleOk(e)} isShow={this.state.details.isShow}/>
            </div>
        );
    }
}

export default Tables;
