javascript: (() => {
    const paragraphArray = [];

    document.body.querySelectorAll('div, p, h1, h2, h3, h4, h5, h6, li, dl, dt, dd, tb').forEach(e => {
        if (e.classList.contains('check-this-paragraph')) {
            paragraphArray.push(e.innerText);
        }
    });

    const copyFunc = async () => {
        try {
            await navigator.clipboard.writeText(paragraphArray.join('\n'));
            return true;
        } catch {
            const copyInput = document.createElement('textarea');
            copyInput.id = 'selection-text-ready-for-copy';
            copyInput.value = paragraphArray.join('\n');
            document.body.appendChild(copyInput);
            copyInput.select();
            const result = document.execCommand('copy');
            document.body.removeChild(copyInput);
            return result;
        }
    };

    try {
        copyFunc().then(() => {
            if (confirm('已复制到剪切板，确定取消所有标记？')) {
                document.body.querySelectorAll('div, p, h1, h2, h3, h4, h5, h6, li, dl, dt, dd, tb').forEach(e => {
                    e.classList.remove('check-this-paragraph');
                    if (e.style.backgroundColor === 'rgba(255, 255, 0, 0.3)') {
                        e.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                    }
                });
            }
        });
    } catch (err) {
        alert('复制成功失败');
    }
})();