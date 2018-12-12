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
const getUser = ()=>{
    return {
        wechatId:"6a8db3a6097d4687bf3e29fb2c24cfaf",
        wechatName:"四叶草"
    }
}
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
    setFeedBack
}