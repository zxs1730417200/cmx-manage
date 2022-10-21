import React from 'react'
import { Button,  Form, Input ,message} from 'antd';
import { UserOutlined ,LockOutlined} from '@ant-design/icons';
import "./login.css"
import loginimg from '../asstes/logo.png'
import {Link,useNavigate} from 'react-router-dom'
import {LoginApi} from "../request/api"


export default function Login() {
    const navigate=useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
        LoginApi({
            username:values.username,
            password:values.password
        }).then((res)=>{
            console.log(res)
            if(res.errCode===0){
                localStorage.setItem('avatar',res.data.avatar)
                localStorage.setItem('cms-token',res.data["cms-token"])
                localStorage.setItem('editable',res.data.editable)
                localStorage.setItem('player',res.data.player)
                localStorage.setItem('username',res.data.username)
                setTimeout(()=>{
                    navigate('/')
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
                <Form.Item >
                    <span className='logina'>还没账号？<Link to='/register'>申请注册</Link></span>
                </Form.Item>
            

            <Form.Item>
                <Button type="primary" htmlType="submit" block size='large'>
                    登录
                </Button>
            </Form.Item>
            </Form>
    </div>
    </div>
  )
}
