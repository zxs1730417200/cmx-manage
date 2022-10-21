import React, { useState, useEffect } from 'react'
import { Button,  PageHeader ,Modal,Form, Input, message } from 'antd';
import moment from 'moment'
import  {ArticleAddApi,ArticleSeachApi,ArticleUpdataApi} from '../request/api'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import {useParams,useNavigate} from 'react-router-dom'


export default function Edit() {
  const Params=useParams()
  const navigate=useNavigate()
  // editor 实例
  const [editor, setEditor] = useState(null)                   // JS 语法
  // 编辑器内容
  const [html, setHtml] = useState('')
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    // other code
    if(Params.id){
      ArticleSeachApi({id:Params.id}).then((res)=>{
      setHtml(res.data.content)
      setTitle(res.data.title)
      setSubTitle(res.data.subTitle)
    })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 工具栏配置
  const toolbarConfig = { }                       
  // 编辑器配置
  const editorConfig = {                      
      placeholder: '请输入内容...',
  }
  // 及时销毁 editor ，重要！
  useEffect(() => {
      return () => {
          if (editor == null) return
          editor.destroy()
          setEditor(null)
      }
  }, [editor])
  //提交文章
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    form
          .validateFields()     //validate校验   field字段
          .then((values) => {
            // form.resetFields();       //reset重置输入框
            let {title,subTitle}=values
            if(Params.id){
              ArticleUpdataApi({
                title,
                subTitle,
                content:html,
                id:Params.id
              }).then((res)=>{
                if(res.errCode===0){message.success(res.message);navigate('/list')}else{message.error(res.message)}
              })
            }else{
              ArticleAddApi({title,subTitle, content:html}).then((res)=>{
              if(res.errCode===0){message.success(res.message);navigate('/list')}else{message.error(res.message)}
            })
            }
            setIsModalOpen(false);
          })
          .catch(() => {
            return;
          });
  };
  return (
    <div >
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          onBack={Params.id?() => window.history.back():null}
          title="文章编辑"
          subTitle={"当前日期:"+moment(new Date()).format("YYYY-MM-DD")}
          extra={<Button key="1" type="primary" onClick={()=>{setIsModalOpen(true);}}>提交文章</Button>}>
          <Modal title="填写文章标题" open={isModalOpen} onOk={handleOk} onCancel={()=>{setIsModalOpen(false);}} cancelText={"取消"} okText={'确定'}>
          <Form
              name="basic"
              initialValues={{title,subTitle}}
              form={form}
              labelCol={{span: 3}}
              wrapperCol={{span: 21}}
            >
              <Form.Item
                label="标题"
                name="title"
                rules={[
                  {
                    required: true,
                    message: '请填写标题!',
                  },
                ]}
              >
                <Input  />
              </Form.Item>

              <Form.Item
                label="副标题"
                name="subTitle"
                rules={[
                  {
                    required: true,
                    message: '请填写副标题!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Form>
          </Modal>
        </PageHeader>
      </div>
      <div id='div1' contentEditable={false}>
              <div style={{ zIndex: 100,padding:'0 24px'}}>
                  <Toolbar
                      editor={editor}
                      defaultConfig={toolbarConfig}
                      mode="default"
                      style={{ borderBottom: '1px solid #ccc',border: '1px solid #ccc' }}
                  />
                  <Editor
                      defaultConfig={editorConfig}
                      value={html}
                      onCreated={setEditor}
                      onChange={editor => setHtml(editor.getHtml())}
                      mode="default"
                      style={{ height: '399px', overflowY: 'hidden',border: '1px solid #ccc' }}
                  />
              </div>
              {/* <div style={{ marginTop: '15px' }}>
                  {html}
              </div> */}
      </div>
      
    </div>
  )
}
