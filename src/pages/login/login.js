import React, {Component} from 'react'
import {setSessionStorage, getSessionStorage} from '../../utils/storage'
import { Form, Icon, message, Button } from 'antd';
import './style.less'
const FormItem = Form.Item;
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: ''
        }
    }
    setUserName = e => {
        const userName = e.target.value
        this.setState({userName})
    }
    setPassword = e => {
        const password = e.target.value
        this.setState({password})
    }

    render() {
        return (
            <section id = {'login'}>
                <Form className="login-form">
                    <FormItem>
                        <h3>管理员登陆</h3>
                    </FormItem>
                    <FormItem>
                        <div className='login_form_item'>
                            <Icon type="user" style={{ color: '#fff', fontSize: 18 }} />
                            <input type="text" onChange={this.setUserName} value={this.state.userName} className={'login_input'}/>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div className='login_form_item'>
                            <Icon type="lock" style={{ color: '#fff', fontSize: 18 }} />
                            <input type="password" onChange={this.setPassword} value={this.state.password} className={'login_input'}/>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div className={'login_form_item'}>
                            <Button type="primary" onClick={() => this.login()} className="login-form-button">
                                登陆
                            </Button>
                            <Button type="primary" className="login-form-button login-form-register">
                                注册
                            </Button>
                        </div>
                    </FormItem>
                    <FormItem>
                        <p className={'login_text'}>欢迎登陆后台管理系统</p>
                    </FormItem>
                </Form>
            </section>
        );
    }
    login() {
        const {userName, password} = this.state
        if(!userName.trim()) {
            return message.error('请输入用户名')
        } else if(!password.trim()) {
            return message.error('请输入密码')
        }
        setSessionStorage('token', userName.trim())
        if(getSessionStorage('token')) this.props.history.push('/')
    }
}
