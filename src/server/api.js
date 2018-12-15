import axios from "axios";
const headers = {
    'web-flag':"wexin"
}
const baseUrl = "/mso"
// 获取微信用户;

// 获取介绍页面md文件；
const getIntroMd = (param)=>{
    const url = baseUrl + '/file/getChapters';
    return axios.get(url,{
        headers:headers,
        params:param
    }).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}

// blog列表;
const getBannerList = (param)=>{
    const url = baseUrl + '/banner/list';
    return axios.get(url,{
        headers:headers,
        params:param
    }).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}
//booktype 总数列表
const getBookTypeTotal = ()=>{
    const url = baseUrl + '/bookType/getTotal';
    return axios.get(url,{
        headers:headers
    }).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}
// 小册类型列表
const getBookTypeList = (param)=>{
    const url = baseUrl + '/bookType/list';
    return axios.get(url,{
        headers:headers,
        params:param
    }).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}
//博客列表
const getBlogList = (param)=>{
    let url = baseUrl + '/blog/list';
    return axios.get(url,{
        headers:headers,
        params:param
    }).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}
//小典列表;
const getBookList = (params)=>{
    let url = baseUrl + '/books/list';
    return axios.get(url,{
        headers:headers,
        params:params
    }).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}
//获取打赏的列表
const getPayersInfo = (params)=>{
    let url = baseUrl + '/payers/list';
    return axios.get(url,{
        headers:headers,
        params:params
    }).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}
//打赏
const setPayPrice = (params) => {
    let url = baseUrl + '/payers/doPayer';
    let formData = new FormData()
    for(let key in params){
        formData.append(key,params[key])
    }
    return axios.post(url,formData,{
        headers:headers
    }).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}
//获取用户信息
const getUserInfo = (params) => {
    let url = baseUrl + '/users/list';
    return axios.get(url,{
        headers:headers,
        params:params
    }).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}
//接入公众号用户信息
const getUser = ()=>{//微信公众号
    return {
        wechatId:"6a8db3a6097d4687bf3e29fb2c24cfaf",
        wechatName:"三叶草",
        wechatLogo:"https://pic.qqtn.com/up/2016-11/2016113014090291434.jpg"
    }
}
//关注插入数据库
const setAttention = (params)=>{
    let url = baseUrl + '/users/attention';
    let formData = new FormData()
    for(let key in params){
        formData.append(key,params[key])
    }
    return axios.post(url,formData,{
        headers:headers
    }).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}
//意见反馈
const setFeedBack = (params)=>{
    let url = baseUrl + "/feed-back/set-feed-back";
    let formData = new FormData()
    for(let key in params){
        formData.append(key,params[key])
    }
    return axios.post(url,formData,{
        headers:headers
    }).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}
export {
    getIntroMd,
    getBannerList,
    getBookTypeList,
    getBlogList,
    getBookList,
    getPayersInfo,
    getBookTypeTotal,
    getUser,
    getUserInfo,
    setFeedBack,
    setAttention,
    setPayPrice
}