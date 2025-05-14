javascript: (() => {
    document.body.querySelectorAll('div, p, h1, h2, h3, h4, h5, h6, li, dl, dt, dd, tb').forEach(e => {
        e.onclick = (event) => {
            event.stopPropagation();
            e.classList.toggle('check-this-paragraph');
            e.style.backgroundColor = e.classList.contains('check-this-paragraph')
                ? 'rgba(255, 255, 0, .3)'
                : 'rgba(0, 0, 0, 0)';
        };
    });

    function showToast(message, duration = 2000) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(123, 121, 121, 0.7);
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      z-index: 9999;
      animation: fadeInOut ${duration}ms ease-out;
    `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), duration);
    }
    const style = document.createElement('style');
    style.textContent = `
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
      10% { opacity: 1; transform: translateX(-50%) translateY(0); }
      90% { opacity: 1; transform: translateX(-50%) translateY(0); }
      100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    }
  `;
    document.head.appendChild(style);
    showToast('段落选择功能已启用，如果某些元素无法被选择，可能它不是段落哦~');
})();