import axios from "axios";

// 获取介绍页面md文件；

const getIntroMd = (param)=>{
    const url = "../src/mock/markdown/demo.md";
    return axios.get(url,{params:param}).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}

// blog列表;
const getBannerList = ()=>{
    const url = "../src/mock/common/banner.json"
    return axios.get(url).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}
const getBookTypeList = ()=>{
    const url = "../src/mock/common/bookType.json"
    return axios.get(url).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}
const getBlogList = (params)=>{
    const type = params.bookType;
    let url = null;
    switch(type){
        case 0:url = "../src/mock/blogList/blogList-0.json";break;
        case 1:url = "../src/mock/blogList/blogList-1.json";break;
        case 2:url = "../src/mock/blogList/blogList-2.json";break;
        case 3:url = "../src/mock/blogList/blogList-3.json";break;
        case 4:url = "../src/mock/blogList/blogList-4.json";break;
        case 5:url = "../src/mock/blogList/blogList-5.json";break;
        case 6:url = "../src/mock/blogList/blogList-6.json";break;
    }
    return axios.get(url).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}

export {
    getIntroMd,
    getBannerList,
    getBookTypeList,
    getBlogList
}