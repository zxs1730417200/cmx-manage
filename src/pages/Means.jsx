import React , { useState ,useEffect}from 'react'
import { Button,  Form, Input ,Upload,message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {GetinfoDataApi,SetUpdataApi} from '../request/api'
import {useNavigate} from 'react-router-dom'

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG 类型的图片!');
  }
  const isLt2M = file.size / 1024/ 1024/ 1024  < 2;
  if (!isLt2M) {
    message.error('请上传小于 200kB!');
  }
  return isJpgOrPng && isLt2M;
};

export default function Means() {
  const navigate=useNavigate()
  useEffect(()=>{
    GetinfoDataApi().then((res)=>{
      if(res.errCode===0){
        message.success(res.message)
        sessionStorage.setItem('username',res.data.username)
        console.log(res)
      }
    })
  },[])
  const onFinish = (values) => {
    if(values.username&&values.username!==sessionStorage.getItem('username')&&values.password.trim()!==''){
      SetUpdataApi({
        // username:values.username,
        password:values.password
      }).then((res)=>{
        if(res.errCode===0){navigate('/login');message.success(res.message)}else{
          message.error(res.message)
        }
      })
    } 
  };
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        console.log('getBase64',info.file.response)
        setLoading(false);
        setImageUrl(url);
        //存储图片名称
        localStorage.setItem('avatar',info.file.response.data.filePath)
        window.location.reload()
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div className='means'>
      <Form name="basic" labelCol={{span: 2,}} wrapperCol={{ span: 8,}}
        // initialValues={{
        //   username:username1,password:password1
        // }}
        onFinish={onFinish}
        // autoComplete="off"
      >
        <Form.Item label="修改用户名" name="username">
          <Input placeholder='请输入新用户名'/>
        </Form.Item>

        <Form.Item label="修 改 密 码" name="password"
        >
          <Input.Password placeholder='请输入新密码'/>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8,span: 16,}}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>

      <p>点击下方修改头像</p>
      <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="/api/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      headers={{'cms-token':localStorage.getItem("cms-token")}}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
    </div>
  )
}
