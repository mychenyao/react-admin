import React, {Component} from 'react';
import './home.css'
import {Menu, Icon, Button, Avatar, Tabs} from 'antd'
import RouterChild from "../router/routerChild";
import routerList from '../router/routerList'
import {getSessionStorage} from '../utils/storage'
import {Redirect} from 'react-router-dom';
import qs from 'qs'
const SubMenu = Menu.SubMenu
const params = qs.parse(window.location.hash.split('?')[1])
const arr = ['kk', 'fd', 43]
console.log(arr[5])

class Router extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            activeKey: '/home/order/order',
            pane: [],
            index: 1
        }
    }
    componentDidUpdate() {
        console.log(params)
    }

    setPane(tabsItem, activeKey) {
        this.state.pane.push(tabsItem)
        this.setState({activeKey, pane: this.state.pane})
    }

    pushPath(v) {
        const {location} = this.props
        if (v.path === location.pathname) return
        let tabsItem = Object.assign({key: v.path}, v)
        let flag = !this.state.pane.some(e => e.path === v.path)
        if (flag) {
            this.setPane(tabsItem, v.path)
        } else {
            this.setState({activeKey: v.path})
        }
        this.props.history.push(v.path)
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    componentDidMount() {
        const {location} = this.props
        const pushPane = v => {
            if (v.path === location.pathname) {
                let tabsItem = Object.assign({key: v.path}, v)
                this.setPane(tabsItem, v.path)
                return
            }
        }
        routerList.menu.forEach(v => {
            if (v.children) {
                v.children.forEach(e => pushPane(e))
            }
            pushPane(v)
        })
    }

    render() {
        return (
            <div className={'app'} id={'app'}>
                {
                    !getSessionStorage('token') && <Redirect push to='/login'></Redirect>
                }
                <div className={'nav_container'}>
                    <div>
                        <Button onClick={this.toggleCollapsed}
                                style={{marginBottom: 10, backgroundColor: '#242f42', border: 'none'}}>
                            <Icon style={{fontSize: 20, color: '#fff'}}
                                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                        </Button>
                        <h1>后台管理系统</h1>
                    </div>
                    <div className={'message_info'}>
                        <Avatar size={64} src="http://blog.gdfengshuo.com/example/work/static/img/img.jpg"/>
                    </div>
                </div>
                <section style={{display: 'flex', flex: 1}}>
                    <div style={!this.state.collapsed ? {width: '200px', height: '100%'} : {height: '100%'}}>
                        <Menu
                            style={{height: '100%'}}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={this.state.collapsed}
                        >
                            {
                                routerList.menu.map(v => v.children ?
                                    <SubMenu key={v.path} title={<span><Icon type="inbox"/>
                                        <span className="router_list" style={{color: "#fff"}}>{v.name}</span></span>}>
                                        {
                                            v.children.map(e =>
                                                <Menu.Item key={e.path} id={e.path}>
                                                    <Icon type="inbox"/>
                                                    <span className="router_list" style={{color: "#fff"}}
                                                          onClick={() => this.pushPath(e)}>
                                                            {e.name}
                                                        </span>
                                                </Menu.Item>
                                            )
                                        }
                                    </SubMenu> : <Menu.Item key={v.path}>
                                        <Icon type="inbox"/>
                                        <span className="router_list" style={{color: "#fff"}}
                                              onClick={() => this.pushPath(v)}>
                                            {v.name}
                                        </span>
                                    </Menu.Item>
                                )
                            }
                        </Menu>
                    </div>
                    <div className='menu_right'>
                        <section className={'nav_tabs_container'}>
                            <Tabs
                                hideAdd
                                onChange={(e) => this.onChange(e)}
                                activeKey={this.state.activeKey}
                                type="editable-card"
                                onEdit={(targetKey, action) => this.onEdit(targetKey, action)}
                            >
                                {
                                    this.state.pane.map(pane =>
                                        <Tabs.TabPane tab={pane.name} key={pane.key}>{pane.content}</Tabs.TabPane>
                                    )
                                }
                            </Tabs>
                        </section>
                        <RouterChild/>
                    </div>
                </section>
            </div>
        );
    }

    onChange(activeKey) {
        this.setState({activeKey})
        const pane = this.state.pane.filter(v => activeKey === v.key)
        this.pushPath(pane[0])
    }

    onEdit(targetKey) {
        let activeKey = this.state.activeKey
        let lastIndex = 0
        this.state.pane.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1
                if (!i && this.state.pane.length) {
                    this.onChange(this.state.pane[i + 1].key)
                }
            }
        })
        const pane = this.state.pane.filter(pane => pane.key !== targetKey)
        if (lastIndex >= 0 && activeKey === targetKey && pane.length) {
            activeKey = pane[lastIndex].key
            this.onChange(activeKey)
        }
        this.setState({pane, activeKey: activeKey})
    }
}

export default Router;
