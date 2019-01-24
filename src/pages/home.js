import React, {Component} from 'react';
import './home.css'
import {Menu, Icon, Button, Avatar, Tabs, Dropdown} from 'antd'
import RouterChild from "../router/routerChild";
// import routerList from '../router/routerList'
// import { setSessionStorage } from '../utils/storage'
import {connect} from 'react-redux'
import jsonp from 'jsonp'
// import { Redirect } from 'react-router-dom';
import ps from 'qs'

const {SubMenu} = Menu

class Router extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            activeKey: '/home/order/order',
            pane: [],
            visible: false,
            index: 1,
            menuList: []
        }
    }

    setPane(tabsItem, activeKey) {
        this.state.pane.push(tabsItem)
        this.setState({activeKey, pane: this.state.pane})
    }

    pushPath(v) {
        const {location} = this.props
        if (v.url === location.pathname) return
        let tabsItem = Object.assign({key: v.url}, v)
        let flag = !this.state.pane.some(e => e.url === v.url)
        flag ? this.setPane(tabsItem, v.url) : this.setState({activeKey: v.url})
        this.props.history.push(v.url)
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    componentDidMount() {
        jsonp('https://m.douban.com/rexxar/api/v2/subject_collection/book_fiction/items', {
            os: 'android',
            callback: 'jsonp1',
            start: 0,
            count: 8,
            loc_id: 0,
            _: 0
        }, (e, t) => {
            console.log(e)
            console.log(t)
        })
        // console.log(jsonp)
        this.$http.post('security/userDirectoryMenu', {applicationId: 1}).then(res => {
            const {data} = res
            if (data.code === 200) {
                this.setState({menuList: data.body}, () => {
                    const {location} = this.props
                    const pushPane = v => {
                        if (v.url === location.pathname) {
                            let tabsItem = Object.assign({key: v.url}, v)
                            this.setPane(tabsItem, v.url)
                            return
                        }
                    }
                    this.state.menuList.forEach(v => {
                        if (v.children) v.children.forEach(e => pushPane(e))
                        pushPane(v)
                    })
                })
            }
        })
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
            <div className={'app'} id={'app'}>
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
                        <Dropdown overlay={menu}
                                  onVisibleChange={this.handleVisibleChange}
                                  visible={this.state.visible}
                        >
                            <Avatar size={64} src="http://blog.gdfengshuo.com/example/work/static/img/img.jpg"/>
                        </Dropdown>
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
                                this.state.menuList.map(v => v.children ?
                                    <SubMenu key={v.menuId} title={<span><Icon type="inbox"/>
                                        <span className="router_list" style={{color: "#fff"}}>{v.label}</span></span>}>
                                        {
                                            v.children.map(e =>
                                                <Menu.Item key={e.menuId} id={e.url} onClick={() => this.pushPath(e)}>
                                                    <Icon type="inbox"/>
                                                    <span className="router_list" style={{color: "#fff"}}>
                                                        {e.label}
                                                    </span>
                                                </Menu.Item>
                                            )
                                        }
                                    </SubMenu> : <Menu.Item key={v.menuId} onClick={() => this.pushPath(v)}>
                                        <Icon type="inbox"/>
                                        <span className="router_list" style={{color: "#fff"}}>
                                            {v.label}
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
                                onChange={e => this.onChange(e)}
                                activeKey={this.state.activeKey}
                                type="editable-card"
                                onEdit={(targetKey, action) => this.onEdit(targetKey, action)}
                            >
                                {
                                    this.state.pane.map(pane =>
                                        <Tabs.TabPane tab={pane.label} key={pane.key}>{pane.content}</Tabs.TabPane>
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
                if (!i && this.state.pane.length) this.onChange(this.state.pane[i + 1].key)
            }
        })
        const pane = this.state.pane.filter(pane => pane.key !== targetKey)
        if (lastIndex >= 0 && activeKey === targetKey && pane.length) {
            activeKey = pane[lastIndex].key
            this.onChange(activeKey)
        }
        this.setState({pane, activeKey})
    }
}

// function logAccessToRroperties( obj, ref ) {
//     return new Proxy(obj, {
//         get(target, key) {
//             // console.log('访问', ref, '的', key, '属性')
//             return Reflect.get(target, key)
//         }
//     })
// }
// let person = {
//     name: 'matthew',
//     age: 28
// }
// const personWithAccessLogging = logAccessToRroperties(person, 'abc')

// function observable( obj, onChange) {
//     return new Proxy( obj, {
//         set(target, key, value) {
//             Reflect.set(target, key, value)
//             onChange({key, value})
//         },
//         delete(target, key) {
//             Reflect.deleteProperty(target, key)
//             onChange( {key, value: undefined})
//         }
//     })
// }

// person = observable(person, ({key, value})=> {
// console.log(`${key}更改为${value}`)
// })
// person.age = 29

export default connect()(Router)