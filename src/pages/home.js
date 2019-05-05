import React, {Component} from 'react';
import './home.css';
import {Menu, Icon, Tabs} from 'antd';
import {setSessionStorage, getSessionStorage} from '../utils/storage';
import RouterChild from '../router/routerChild';
// import { connect } from 'react-redux'
import {connect} from 'dva';
import Headers from './header';
import mapDispatch from '@/reduc/mapDispatch';
import dynamic from 'dva/dynamic';

const {SubMenu} = Menu;
const applicationId = !!getSessionStorage('applicationId') ? String(getSessionStorage('applicationId')) : '1';

class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: '/home/order/order',
            pane: [],
            index: 1,
            menuSelectedKeys: [],
            tabsActiveKey: applicationId,
            menuList: []
        };
    }

    setPane(tabsItem, activeKey) {
        const {menuId} = tabsItem;
        if (this.state.pane.some(v => menuId === v.menuId)) return;
        this.state.pane.push(tabsItem);
        this.setState({activeKey, pane: this.state.pane, menuSelectedKeys: [String(menuId)]});
    }

    pushPath(v) {
        const {location} = this.props;
        if (v.url === location.pathname) return;
        let tabsItem = Object.assign({key: v.url}, v);
        let flag = !this.state.pane.some(e => e.url === v.url);
        flag ? this.setPane(tabsItem, v.url) : this.setState({activeKey: v.url, menuSelectedKeys: [String(v.menuId)]});
        this.props.history.push(v.url);
    }

    getMenuList(applicationId) {
        this.$http.post('security/userDirectoryMenu', {applicationId}).then(res => {
            const {data} = res;
            if (data.code === 200) {
                const tabsItem = (menuItem, applicationId) => Object.assign({
                    key: menuItem.url,
                    parentId: applicationId
                }, menuItem);
                setSessionStorage('applicationId', applicationId);
                this.setState({menuList: data.body}, () => {
                    const {location} = this.props;
                    const pushPane = v => {
                        if (v.url === location.pathname) {
                            this.setPane(tabsItem(v, applicationId), v.url);
                            return;
                        }
                    };
                    this.state.menuList.forEach(v => {
                        v.parentId = applicationId;
                        if (v.children) v.children.forEach(e => {
                            e.parentId = applicationId;
                            pushPane(e);
                        });
                        pushPane(v);
                    });
                    if (!this.state.pane.length) {
                        const menuList = this.state.menuList[0];
                        if (menuList.children) {
                            const {url} = menuList.children[0];
                            this.props.history.push(url);
                            this.setPane(tabsItem(menuList.children[0], applicationId), url);
                        } else {
                            const {url} = menuList;
                            this.props.history.push(url);
                            this.setPane(tabsItem(menuList, applicationId), url);
                        }
                    }
                });
            }
        });
    }

    componentDidMount() {
        this.props.dispatch({type: 'global/init', payload: {}}).then(id => this.getMenuList(id));
    }

    header(id) {
        this.setState({tabsActiveKey: String(id)});
        this.getMenuList(id);
    }

    menuSelected({selectedKeys}) {
        this.setState({menuSelectedKeys: selectedKeys});
    }

    render() {
        return (
            <div className={'app'} id={'app'}>
                <Headers history={this.props.history} header={(id) => this.header(id)}
                         tabsActiveKey={this.state.tabsActiveKey} headerList={this.props.headerList}/>
                <section style={{display: 'flex', flex: 1}}>
                    <div style={!this.props.collapsed ? {width: '200px', height: '100%'} : {height: '100%'}}>
                        <Menu
                            style={{height: '100%', overflow: 'auto'}}
                            mode="inline"
                            theme="dark"
                            onSelect={e => this.menuSelected(e)}
                            selectedKeys={this.state.menuSelectedKeys}
                            inlineCollapsed={this.props.collapsed}
                        >
                            {
                                this.state.menuList.map(v => v.children ?
                                    <SubMenu key={v.menuId} title={<span><Icon type="inbox"/>
                                        <span className="router_list">{v.label}</span></span>}>
                                        {
                                            v.children.map(e =>
                                                <Menu.Item key={e.menuId} id={e.url} onClick={() => this.pushPath(e)}>
                                                    <Icon type="inbox"/>
                                                    <span className="router_list">
                                                        {e.label}
                                                    </span>
                                                </Menu.Item>
                                            )
                                        }
                                    </SubMenu> : <Menu.Item key={v.menuId} onClick={() => this.pushPath(v)}>
                                        <Icon type="inbox"/>
                                        <span className="router_list">
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
                                onChange={(e, v) => this.onChange(e, v)}
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

                        {/* <Route path='/nav/test' component={signingRecord}>
                        </Route>    */}
                        <RouterChild/>
                    </div>
                </section>
            </div>
        );
    }

    onChange(activeKey) {
        this.setState({activeKey});
        const pane = this.state.pane.filter(v => activeKey === v.key);
        const applicationId = String(pane[0].parentId);
        if (applicationId === String(this.state.menuList[0].parentId)) {
            this.setState({tabsActiveKey: applicationId});
        } else {
            this.header(applicationId);
        }
        this.pushPath(pane[0]);
    }

    onEdit(targetKey) {
        let {activeKey} = this.state;
        let lastIndex = 0;
        if (this.state.pane.length <= 1) return;
        this.state.pane.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
                if (!i && this.state.pane.length) this.onChange(this.state.pane[i + 1].key);
            }
        });
        const pane = this.state.pane.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey && pane.length) {
            activeKey = pane[lastIndex].key;
            this.onChange(activeKey);
        }
        this.setState({pane, activeKey});
    }
}

const mapStateToProps = ({global}) => global;
export default connect(mapStateToProps)(Router);
// dynamic({
//     app,
//     models: () => [import('@/pages/dvaTest/model')],
//     component: () => import('@/pages/dvaTest')
// })
