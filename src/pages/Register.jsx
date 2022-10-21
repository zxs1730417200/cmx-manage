import React from 'react'
import { Button,  Form, Input ,message} from 'antd';
import { UserOutlined ,LockOutlined} from '@ant-design/icons';
import "./login.css"
import loginimg from '../asstes/logo.png'
import {Link,useNavigate} from 'react-router-dom'
import {RegisterApi} from '../request/api'

export default function Register() {
    const navigate=useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
        RegisterApi({
            username:values.username,
            password:values.password
        }).then(res=>{
            console.log(res)
            if(res.errCode===0){
                message.success(res.message);
                setTimeout(()=>{
                    navigate('/login')
                },1500)
            }else{
                message.error(res.message);
            }
        })
      };
      
  return (
    <div className='login'>
        <div className='logincenter'>
            <div className='loginimg'>
                <img src={loginimg} alt="图片"/>
            </div>
            <Form
                name="basic"
                
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
            >
            <Form.Item
                
                name="username"
                
                rules={[
                {
                    required: true,
                    message: '请输入用户名!',
                },
                ]}
            >
                <Input placeholder="请输入用户名" prefix={<UserOutlined />} size='large' />
            </Form.Item>

            <Form.Item
                
                name="password"
                rules={[
                {
                    required: true,
                    message: '请输入密码!',
                },
                ]}
            >
                <Input.Password  placeholder="请输入密码" prefix={<LockOutlined  />} size='large'/>
            </Form.Item>
            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: '请输入确认密码!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('您输入的密码与前一次有误!'));
                    },
                }),
                ]}
            >
                <Input.Password  placeholder="请输入确认密码" prefix={<LockOutlined  />} size='large'/>
            </Form.Item>
                <Form.Item >
                    <span className='logina'>已有账号？<Link to='/login'>前往登录</Link></span>
                </Form.Item>
            

            <Form.Item>
                <Button type="primary" htmlType="submit" block size='large'>
                    立即注册
                </Button>
            </Form.Item>
            </Form>
    </div>
    </div>
  )
}
