import axios from "axios";
const headers = {
    'web-flag':"wexin"
}
const baseUrl = "/mso"
// 获取微信用户;
const getUser = (param)=>{
    const url = baseUrl + '/users/list';
    return axios.get(url,{
        headers:headers,
        params:param
    }).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}

// 获取介绍页面md文件；
const getIntroMd = (param)=>{
    const url = param.url;
    return axios.get(url,{params:param}).then((res)=>{
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
const getUserInfo = (params)=>{
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
export {
    getUser,
    getIntroMd,
    getBannerList,
    getBookTypeList,
    getBlogList,
    getBookList,
    getUserInfo,
    getBookTypeTotal
}