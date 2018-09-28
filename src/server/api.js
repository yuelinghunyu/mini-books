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

export {
    getIntroMd
}