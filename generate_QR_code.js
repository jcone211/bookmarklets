javascript: (() => {
    const text = decodeURIComponent(prompt('请输入要转换为二维码的内容：', ''));
    const width = 350;
    const height = 500;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const features = [
        'menubar=no',
        'toolbar=no',
        'location=no',
        'status=no',
        'resizable=no',
        'scrollbars=no',
        `width=${width}`,
        `height=${height}`,
        `left=${left}`,
        `top=${top}`
    ].join(',');

    window.open(
        `https://api.cl2wm.cn/api/qrcode/code?text=${text}`,
        '二维码',
        features
    );
})();