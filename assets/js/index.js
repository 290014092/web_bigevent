/**
 * @getUserInfo
 * 获取用户基本信息
 */
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        // 无论请求成功与否都会调用complate
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data);
        }
    });
}
getUserInfo();
/**
 * @renderAvatar
 * 渲染用户头像
 */
function renderAvatar(userMsg) {
    console.log(userMsg);
    // 获取用户昵称
    let name = userMsg.nickname || userMsg.username;
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需渲染用户的头像
    if (userMsg.user_pic !== null) {
        $('#leftHead').attr('src',userMsg.user_pic).show();
        $('#rightHead').attr('src',userMsg.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase(); // 首字母转大写
        $('.text-avatar')
            .html(first)
            .show()
    }
}
$(function () {
    // 退出
    $('#Exited').on('click', function (e) {
        // 阻止a连接默认的跳转事件
        e.preventDefault();
        // layui的弹出层
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token');
            // 重新跳转到登录页面
            location.href = '/login.html';
            // 关闭询问框
            layer.close(index);
        });

    })
})
