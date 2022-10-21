import React ,{useEffect,useState}from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd'
import {useNavigate,useLocation} from 'react-router-dom'


export default function Aside() {
    const [defaultKey,setDefalutKey]=useState('')
    const localtion=useLocation();
    let path=localtion.pathname
    let key=path.split('/')[1]

    
    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }
      const items = [
        getItem('查看文章列表', 'list', <MailOutlined />, ),
        getItem('文章编辑', 'edit', <AppstoreOutlined />, ),
        getItem('修改资料', 'means', <SettingOutlined />, ),
      ];
      useEffect(()=>{
        // other code
        setDefalutKey(key)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[path])
  
      const navigate=useNavigate()
      const onClick = (e) => {
        navigate('/'+e.key)
        setDefalutKey(e.key)
      };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 160,
      }}
      selectedKeys={[defaultKey]}
    //   defaultOpenKeys={['sub1']}
    //   openKeys={[defaultKey]}
      mode="inline"
      items={items}
      theme="dark"
      className='aside'
    />
  )
}
