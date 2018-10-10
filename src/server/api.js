import axios from "axios";
// 获取微信用户;
const getUser = ()=>{

    // const userId = Math.random()<0?"98f69e89-3885-480c-9852-46c77e5fecc3":"5f52683f-eae5-45a1-920c-786505fb2328";
    const user = {
        "wxId":"98f69e89-3885-480c-9852-46c77e5fecc3",
        "wxName":"三叶草",
        "logo":"../../../static/img/b.jpg"
    }
    return user;
}

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
//小典列表;
const getBookList = (params)=>{
    const type = params.bookType;
    let url = null;
    switch(type){
        case 0:url = "../src/mock/bookList/bookList-0.json";break;
        case 1:url = "../src/mock/bookList/bookList-1.json";break;
        case 2:url = "../src/mock/bookList/bookList-2.json";break;
        case 3:url = "../src/mock/bookList/bookList-3.json";break;
        case 4:url = "../src/mock/bookList/bookList-4.json";break;
        case 5:url = "../src/mock/bookList/bookList-5.json";break;
        case 6:url = "../src/mock/bookList/bookList-6.json";break;
    }
    return axios.get(url).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}
const getUserInfo = (params)=>{
    const wxId = params.wxId;
    let url = "../src/mock/users/"+wxId+".json";
    return axios.get(url).then((res)=>{
        return Promise.resolve(res)
    }).catch((error)=>{
        return Promise.reject(error);
    })
}
//单独小典;
const getBook = (params)=>{
    const id = params.id;
    let url = "../src/mock/bookList/"+id+".json";
    return axios.get(url).then((res)=>{
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
    getBook
}