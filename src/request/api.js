import request from './request'

//注册
export const RegisterApi=(params)=>(request.post('/register',params))
//登录
export const LoginApi=(params)=>(request.post('/login',params))
//显示文章列表
export const ArticleListApi=params=>request.get('/article',{params})
//添加文章
export const ArticleAddApi=params=>(request.post('/article/add',params))
//查看文章
export const ArticleSeachApi=params=>request.get(`/article/${params.id}`)
//更新文章
export const ArticleUpdataApi=params=>(request.put('/article/update',params))
//删除文章
export const ArticleRemoveApi=params=>(request.post('/article/remove',params))
//获取用户资料
export const GetinfoDataApi=params=>request.get('/info',params)
//修改用户资料
export const SetUpdataApi=params=>(request.put('/info',params))
