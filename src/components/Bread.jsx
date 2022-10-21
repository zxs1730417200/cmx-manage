import React ,{useState,useEffect}from 'react'
import { HomeOutlined} from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import {useLocation} from 'react-router-dom'


export default function Bread() {
    const [Breadname,setBreadName]=useState('')
    const {pathname}=useLocation()
    // const {Params}=useParams()
    useEffect(()=>{
        switch(pathname){
            case '/list':
            setBreadName('查看文章列表');
            break;
            case '/edit':
            setBreadName('文章编辑');
            break;
            case '/means':
            setBreadName('修改资料');
            break;
            default:
                setBreadName(pathname.includes('edit')?'文章编辑':'');
                break;
        }
    },[pathname])
  return (
    <Breadcrumb style={{height:'30px',lineHeight:'30px'}}>
        <Breadcrumb.Item href='/' >
        <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item >{Breadname}</Breadcrumb.Item>
  </Breadcrumb>
  )
}
