
$(function () {
    // 密码校验
    let form = layui.form;
    form.verify({
        pwd: [/[\S]{6,12}/, '密码长度必须在6-12位，且不能包含空格'],
        samePwd: function (value) {
            if (value === $('[name = oldPwd]').val()) {
                return '新旧密码不能相同';
            }
        },
        repwd: function (value) {
            if (value !== $('[name = newPwd]').val()) {
                return '两次密码不相同';
            }
        }
    })

    // 重置密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg('修改密码失败');
                layui.layer.msg(res.message);
            }
        });
        // 重置表单
        $('.layui-form')[0].reset(); // reset 可以把表单中的值重置为默认值
    })

})