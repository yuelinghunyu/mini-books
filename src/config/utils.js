const guid =()=> {    
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {        
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);        
        return v.toString(16);    
    });
}
const ERROR_OK = 0;

const indexOf = (array,item)=>{
    if(array.length === 0) return -1;
    for(var i=0;i<array.length;i++){
        if(array[i].id === item) return i;
    }
    return -1;
}

const remove = (array,item)=>{
    const index = indexOf(array,item);
    if(index > -1){
        array.splice(index,1);
    }
    return array;
}
const add = (array,item)=>{
    const index = indexOf(array,item);
    let newArray = [];
    if(index > -1){
        newArray.push(array[index]);
    }
    return newArray;
}

const throttle = (fn, delay)=>{
    let args     = arguments,
        context  = this,
        timer    = null,
        remaining   = 0,
        previous = new Date();

    return function () {
        let now = new Date();
        remaining = now - previous;

        if (remaining >= delay) {
            if (timer) {
                clearTimeout(timer);
            }

            fn.apply(context, args);
            previous = now;
        } else {
            if (!timer) {
                timer = setTimeout(function () {
                    fn.apply(context, args);
                    previous = new Date();
                }, delay - remaining);
            }
        }
    };
}

const getQueryString = (name)=>{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
const formatDate = (date,type) => {
    if (date != undefined) {
        //兼容ios
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || navigator.userAgent.indexOf("Safari") > -1) {
            date = String(date).replace(/\-/g, "/")
        }
        var time = '';
        if (date.indexOf('-') != -1 || date.indexOf('/') != -1) {
            time = new Date(date)
        } else {
            time = new Date(JSON.parse(date))
        }
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        var isTime = '';

        function add0(m) { return m < 10 ? '0' + m : m }
        switch (type) {
            case 'Y-M-D hh:mm:ss':
                isTime = year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
                break;
            case 'M-D hh:mm:ss':
                isTime = add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
                break;
            case 'M-D hh:mm':
                isTime = add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes);
                break;
            case 'hh:mm:ss':
                isTime = add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
                break;
            case 'hh:mm':
                isTime = add0(hours) + ':' + add0(minutes);
                break;
        }
        return isTime;
    }
  }
export {
    guid,
    ERROR_OK,
    remove,
    add,
    throttle,
    indexOf,
    getQueryString,
    formatDate
}