$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //表单验证
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        rePwd: function (sum) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== sum) {
                return '两次密码不一致！'
            }
        }
    })
    // 注册
    // 监听表单提交事件
    var layer = layui.layer;
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        // 阻止表单默认提交事件
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            },
            // dataType: "dataType",
            success: function (res) {
                console.log(res);
                if(res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                $('#link_login').click();
                // 模拟点击
            }
        });
    });

    // 登录
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        // 阻止表单默认提交事件
        $.ajax({
            type: "POST",
            url: "/api/login",
            data:{
                username: $('#form-login [name=username]').val(),
                password: $('#form-login [name=password]').val()
            },
            // 快速获取表单数据
            // dataType: "dataType",
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg('登录成功！');
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '/index.html';
            }
        });
    });
})