import React ,{Component}from 'react'
import headerImg from '../asstes/logo.png'
import {useNavigate} from 'react-router-dom'
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space ,message} from 'antd';
import avatar from '../asstes/avatar.png'

export default function Header() {
    const navigate=useNavigate();
    const backapp=()=>{
        localStorage.clear()
        message.success('退出成功，即将返回登录页')
        setTimeout(()=>{
            navigate('/login')
        },1500)
    }
    const menu = (
        <Menu
          items={[
            {
              key: '1',
              label: '修改资料'
            },
            {
                type: 'divider',
            },
            {
              key: '2',
              danger: true,
              label: '退出登录',
              onClick:backapp
            },
          ]}
        />
      );
      
      
  return (
    
    <header>
        <img src={headerImg} alt="图片"/>
        <div className='right'>
            <Dropdown overlay={menu}>
                <a onClick={(e) => e.preventDefault()} href="www.baidu.com" className='ant-dropdown-link'>
                <Space>
                    <Img />
                    <CaretDownOutlined />
                </Space>
                </a>
            </Dropdown>
        </div>
      </header>
  )
}
 class Img extends Component {
    state={avatar:avatar,username:"游客"}
    componentDidMount(){
        let avatar1=localStorage.getItem("avatar")
        let username1=localStorage.getItem("username")
        if(avatar1){
            this.setState({avatar:"http://47.93.114.103:6688/"+avatar1})
        }
        if(username1){
            this.setState({username:username1})
        }
    }
  render() {
    return (
        <>
        <img src={this.state.avatar} alt="用户图片" className='avatar'/>
        <span className='headerspan'>{this.state.username}</span>
        </>
    )
  }
}





