import React,{useState,useEffect} from 'react'
import { Space,Table,Button, message} from 'antd';
import {ArticleListApi,ArticleRemoveApi} from '../request/api'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'

  
 function Listtitle(props) {
  return (
            <div>
              <a href={'http://codesohigh.com:8765/article/'+props.id} target="_blank" rel='noreferrer'><h4>{props.title}</h4></a>
              <h5 style={{color:'#999'}}>{props.subTitle}</h5>
            </div>
  )
}


export default function List() {
  const navigate=useNavigate()
  const [updatapage,setUpdatapage]=useState(1)
  const [arr,setArr]=useState(
    [
      {
        key: '1',
        name: 'John Brown',
        address: '2022/10/16 16:29星期日'
      }
    ]
  )
  const [pagination,setPagination]=useState({current:1,pageSize:10,total:0})
  const getArticleListApi=(current,pageSize)=>{
    ArticleListApi({
      num:current,
      count:pageSize
    }).then((res)=>{
      if(res.errCode===0){
        let newArr=JSON.parse(JSON.stringify(res.data.arr))
        let myarr=[]
        let {num,count,total}=res.data
        setPagination({
          current:num,
          coupageSizent:count,
          total
        })
        newArr.forEach((item) => {
          let obj={
            key:item.id,
            date:moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
            mytitle:<Listtitle title={item.title} subTitle={item.subTitle} id={item.id}/>
          }
          myarr.push(obj)
        });
        setArr(myarr)
      }
    })
  }
  const pageChange=(arg)=>{
    getArticleListApi(arg.current,arg.pageSize)
  }
  useEffect(()=>{
    getArticleListApi(pagination.current,pagination.pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(()=>{
    setUpdatapage(updatapage+1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[updatapage])
  const removedata=(id)=>{
    ArticleRemoveApi({id}).then((res)=>{if(res.errCode===0){
      getArticleListApi(pagination.current,pagination.pageSize)
      setTimeout(()=>{
        message.success(res.message)
      },500)
    }else{message.error(res.message)}})
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'mytitle',
      width:'60%',
      key: 'mytitle',
      className:"table_title",
      render:text =><div>{text}</div>
    },
    {
      title: 'Address',
      dataIndex: 'date',
      key: 'date',
      render:text =><p>{text}</p>
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        
        <Space size="middle">
          <Button type='primary' onClick={()=>{navigate('/edit/'+record.key)}}>编辑</Button>
          <Button type='danger' onClick={()=>{removedata(record.key)}}>删除</Button>
        </Space>
      ),
    },
  ];
  
  return (
    <div className='list_table'>
      <Table columns={columns} dataSource={arr} showHeader={false} onChange={pageChange} pagination={pagination}/>
    </div>
  )
}
