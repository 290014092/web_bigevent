$(function () {
    initUserInfo();

    var form = layui.form;
    // 校验表单数据
    form.verify({
        nickname: function (value) {
            //value：表单的值
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！';
            }
        }
    });
    // 点击重置按钮
    $('#btnReset').click(function (e) {
        e.preventDefault();
        // 阻止默认表单事件，并重新渲染页面
        initUserInfo();
    });

    // 表单提交修改
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败');
                }
                layer.msg(res.message);
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo();    
            }
        });
    })

    
})