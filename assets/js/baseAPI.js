
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
    option.complete = function (res) {
        console.log(res.responseJSON.status);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 请求失败 强制清除口令
            localStorage.removeItem('token');
            // 强制跳转到登录页面
            location.href = '/login.html';
            
        }
        
    }


})

/**
 * 初始化用户的基本信息
 * @initUserInfo
 */
function initUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败');
            }
            let form = layui.form;
            // console.log(res);
            // 调用form.val()快速为表单赋值
            form.val('formUserInfo',res.data)
        }
    });
}


