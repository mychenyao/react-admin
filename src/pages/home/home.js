import React, {Component} from 'react';
import './home.css';
import {Menu, Icon, Tabs} from 'antd';
import {setSessionStorage, getSessionStorage} from '../../utils/storage';
import RouterChild from '../../router/routerChild';
import Headers from '../header';
import { connect } from 'dva';
const {SubMenu} = Menu;
const applicationId = !!getSessionStorage('applicationId') ? String(getSessionStorage('applicationId')) : '1';

class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: '/nav/order',
            pane: [],
            index: 1,
            menuSelectedKeys: [],
            tabsActiveKey: applicationId
        };
    }

    componentDidMount() {
        const {location} = this.props
        const tabsItem = this.props.home.menuList.filter(v => v.url === location.pathname)[0]
        if(tabsItem) {
            this.setPane({key: tabsItem.url, ...tabsItem}, tabsItem.url)
        }
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


    header(id) {
        this.setState({tabsActiveKey: String(id)});
    }

    menuSelected({selectedKeys}) {
        this.setState({menuSelectedKeys: selectedKeys});
    }

    render() {
        const {headerList, menuList} = this.props.home
        return (
            <div className={'app'} id={'app'}>
                <Headers history={this.props.history} header={(id) => this.header(id)}
                         tabsActiveKey={this.state.tabsActiveKey} headerList={headerList}/>
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
                                menuList.map(v => v.children ?
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

                        <RouterChild {...this.props}/>
                    </div>
                </section>
            </div>
        );
    }

    onChange(activeKey) {
        this.setState({activeKey});
        const pane = this.state.pane.filter(v => activeKey === v.key);
        const applicationId = String(pane[0].parentId);
        if (applicationId === String(this.props.home.menuList[0].parentId)) {
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

export default connect(({ home }) => ({
    home
  }))(Router);