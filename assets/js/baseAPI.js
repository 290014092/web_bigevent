$.ajaxPrefilter(function (option) {
    
    // 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
    // 会先调用 ajaxPrefilter 这个函数
    // 在这个函数中，可以拿到我们给Ajax提供的配置对象
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
    // 如果请求中携带my ，设置请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    option.complete = function(res){
        // console.log('complete');
        // console.log(res);
        if(res.responseJSON.status === 1 && res.responseJSON.message ===  '身份认证失败！'){
            // 请求失败 强制清除口令
            localStorage.removeItem('token');
            // 强制跳转到登录页面
            location.href = '/login.html';
        } 
    }
    
    
})