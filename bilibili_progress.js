javascript: (() => {
    const listContainer = document.querySelector(".video-pod__body > .video-pod__list.multip.list");
    if (!listContainer) {
        const unsupportedList = document.querySelector(".video-pod__body > .video-pod__list.section");
        if (unsupportedList) {
            return showError("当前视频列表样式不支持\n(无法获取视频时长)", 5000);
        }
        return showError("未找到支持的视频列表容器", 3000);
    }

    const videoItems = listContainer.querySelectorAll(".simple-base-item.video-pod__item");
    if (videoItems.length === 0) {
        return showError("未找到视频项", 3000);
    }

    const parseTime = (str) => {
        if (!str) return 0;
        const [m, s] = str.trim().split(":").map(Number);
        return m * 60 + (s || 0);
    };

    const formatTime = (sec) => {
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };

    let total = 0, watched = 0, activeFound = false;
    let hasInvalidItems = false;

    videoItems.forEach(item => {
        const dur = item.querySelector(".duration");

        if (!dur) {
            hasInvalidItems = true;
            return;
        }

        const sec = parseTime(dur.textContent);
        if (isNaN(sec)) {
            hasInvalidItems = true;
            return;
        }

        total += sec;

        if (!activeFound) {
            if (item.classList.contains("active")) {
                activeFound = true;
            } else {
                watched += sec;
            }
        }
    });

    if (hasInvalidItems) {
        return showError("部分视频缺少时长信息", 5000);
    }

    if (total === 0) {
        return showError("所有视频都缺少时长信息", 5000);
    }

    const percent = (watched / total * 100).toFixed(2);

    const style = `
    .bk_bili-progress {
      position: fixed; 
      top: 14%; 
      right: 40px; 
      width: 380px; 
      padding: 14px 16px;
      background: #fff; 
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
      z-index: 99999; 
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      border: 1px solid #f0f0f0;
    }
    .bk_bili-header {
      color: #FB7299; 
      font-weight: 600;
      margin-bottom: 16px; 
      font-size: 18px;
      position: relative;
      padding-right: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .bk_bili-row { 
      margin: 12px 0; 
      font-size: 14px;
      color: #666;
    }
    .bk_bili-bar {
      height: 6px; 
      background: #f0f0f0;
      border-radius: 3px; 
      margin: 16px 0;
      overflow: hidden;
    }
    .bk_bili-progress-bar {
      height: 100%; 
      background: linear-gradient(90deg, #FB7299, #ff85ad);
      width: ${percent}%; 
      transition: width 0.3s ease;
    }
    .bk_bili-close-btn {
      color: #FB7299;
      font-size: 22px;
      font-weight: 400;
      cursor: pointer;
      line-height: 1;
      transition: color 0.2s;
    }
    .bk_bili-close-btn:hover {
      color: #ff85ad;
    }
    .bk_bili-percent {
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      color: #FB7299;
      margin-top: 8px;
    }
  `;

    const html = `
    <div class="bk_bili-progress">
      <div class="bk_bili-header">
        <span>合集观看进度</span>
        <span class="bk_bili-close-btn" onclick="this.closest('.bk_bili-progress').remove()">×</span>
      </div>
      <div class="bk_bili-row">总时长: ${formatTime(total)}</div>
      <div class="bk_bili-row">已观看: ${formatTime(watched)}</div>
      <div class="bk_bili-bar">
        <div class="bk_bili-progress-bar"></div>
      </div>
      <div class="bk_bili-percent">${percent}%</div>
    </div>
  `;

    const div = document.createElement('div');
    div.innerHTML = `<style>${style}</style>${html}`;
    document.body.appendChild(div);

    function showError(msg, duration = 3000) {
        const existingError = document.querySelector('.bili-error-message');
        if (existingError) existingError.remove();

        const err = document.createElement('div');
        err.className = 'bili-error-message';
        err.style = `
      position: fixed; 
      top: 14%; 
      right: 40px; 
      padding: 12px 16px; 
      background: #FF4D4F;
      color: white; 
      border-radius: 6px; 
      z-index: 99999;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      line-height: 1.4;
      white-space: pre-line;
      max-width: 260px;
      animation: fadeIn 0.3s ease-out;
    `;

        const style = document.createElement('style');
        style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
        document.head.appendChild(style);

        err.textContent = msg;
        document.body.appendChild(err);

        setTimeout(() => {
            err.style.animation = 'fadeOut 0.3s ease-in';
            setTimeout(() => err.remove(), 300);
        }, duration);
    }
})();