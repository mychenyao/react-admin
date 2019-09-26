import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Button, Icon, Tabs, Dropdown, Avatar, Menu} from 'antd'
import {toggleCollapsed} from '@/reduc/actions'
const {TabPane} = Tabs

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }
    handleMenuClick = e => {
        if (e.key === '2') {
            this.$http.post('/security/signOut').then((res) => {
                if (res.data.code === 200) this.props.history.push('/login')
            })
        }
    }
    handleVisibleChange = visible => this.setState({visible})
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">修改密码</Menu.Item>
                <Menu.Item key="2">退出</Menu.Item>
            </Menu>
        )
        return (
            <div className={'nav_container'}>
                <div>
                    <Button onClick={() => this.props.dispatch(toggleCollapsed(!this.props.collapsed))}
                            style={{marginBottom: 10, backgroundColor: '#242f42', border: 'none'}}>
                        <Icon style={{fontSize: 20, color: '#fff'}}
                              type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                    </Button>
                    <h1>后台管理系统</h1>
                    <Tabs
                        activeKey={this.props.tabsActiveKey}
                        tabBarStyle={{
                            marginLeft: '15px',
                            color: '#fff',
                            fontWeight: 'bold'
                        }}
                        onChange={this.props.header}>
                        {
                            this.props.headerList && this.props.headerList.map((v, i) => <TabPane tab={v.name}
                                                                                                  key={v.id}/>)
                        }
                    </Tabs>
                </div>
                <div className={'message_info'}>
                    <Dropdown overlay={menu}
                              onVisibleChange={this.handleVisibleChange}
                              visible={this.state.visible}
                    >
                        <Avatar size={64} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569496064359&di=2a1922bf9285f9114e664b4f2872830e&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F9c660b2f59caf8055c9da29c877b7a176f3850011cdb-WH9o7X_fw658"/>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(Index)