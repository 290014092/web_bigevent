$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);
    // 点击按钮弹出文件域
    $('#uploadButton').click(function () {
        $('#file').click();
    })
    $('#file').on('change', function (e) {
        // 用户选择了文件就会触发这个事件，通过 e.target.files 获取用户选择文件列表
        let fileList = e.target.files;
        if (fileList.length < 1) {
            return layer.msg('请选择照片');
        }
        // - 通过索引0拿到用户选择的文件
        let file = e.target.files[0];
        let imgUrl = URL.createObjectURL(file); // - 将文件转化为路径
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 点击确定
    $('#determined').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar:dataURL
            },
            success: function (res) {
                console.log(res);
                if(res.status !== 0){
                    return layui.layer.msg('上传头像失败');
                }
                layui.layer.msg(res.message);
                // 上传头像成功 调用初始化方法重新渲染头像
                window.parent.getUserInfo();
            }
        });
    })
})