javascript: (() => {
  const padNumber = (num, length = 2) => num.toString().padStart(length, '0');

  const formatDateTime = (time) => {
    return `${time.getFullYear()}-${padNumber(time.getMonth() + 1)}-${padNumber(time.getDate())} ` +
      `${padNumber(time.getHours())}:${padNumber(time.getMinutes())}:${padNumber(time.getSeconds())}.` +
      `${padNumber(time.getMilliseconds(), 3)}`;
  };
  function createPopup() {
    const now = new Date();
    const dateStr = formatDateTime(now);
    const timestamp = now.getTime();

    if (document.getElementById('time-tool-overlay')) return;

    const getCurrentTime = () => {
      const time = new Date();
      return `${padNumber(time.getHours())}:${padNumber(time.getMinutes())}:${padNumber(time.getSeconds())}`;
    };

    const html = `
      <div id="time-tool-overlay" class="overlay">
        <div class="popup">
          <div class="content">
            <div class="panel left-panel">
              <div class="real-time">${getCurrentTime()}</div>
              <textarea class="text-area" readonly>${timestamp}\n\n${dateStr}</textarea>
            </div>
            <div class="divider"></div>
            <div class="panel right-panel">
              <textarea class="text-area">${timestamp}</textarea>
              <div class="arrow-button">↓↓</div>
              <textarea class="text-area">${dateStr}</textarea>
            </div>
          </div>
          <button class="convert-button">转换</button>
        </div>
      </div>
    `;

    const style = `
      <style>
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          backdrop-filter: blur(2px);
        }
        
        .popup {
          position: relative;
          background-color: #fff;
          padding: 24px;
          border-radius: 12px;
          width: 600px;
          max-width: 90%;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .content {
          display: flex;
          height: 240px;
          margin-bottom: 16px;
        }
        
        .panel {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 50%;
          padding: 8px;
        }
        
        .left-panel {
          align-items: center;
        }
        
        .right-panel {
          border-left: 1px solid rgba(0, 0, 0, 0.1);
          padding-left: 16px;
        }
        
        .divider {
          width: 1px;
          background-color: rgba(0, 0, 0, 0.1);
          margin: 0 16px;
        }
        
        .real-time {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin-bottom: 16px;
        }
        
        .text-area {
          width: 100%;
          height: 60%;
          font-size: 16px;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          resize: none;
          font-family: 'Courier New', monospace;
          background-color: #f9f9f9;
        }
        
        .arrow-button {
          font-size: 20px;
          color: #ff4757;
          cursor: pointer;
          text-align: center;
          margin: 8px 0;
          user-select: none;
          transition: transform 0.2s;
        }
        
        .arrow-button:hover {
          transform: scale(1.1);
        }
        
        .convert-button {
          float: right;
          padding: 8px 16px;
          background-color: #ff4757;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .convert-button:hover {
          background-color: #ff6b81;
        }
      </style>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
    document.head.insertAdjacentHTML('beforeend', style);

    const overlay = document.getElementById('time-tool-overlay');
    const realTimeDisplay = overlay.querySelector('.real-time');
    const arrowButton = overlay.querySelector('.arrow-button');
    const convertButton = overlay.querySelector('.convert-button');
    const textArea2 = overlay.querySelectorAll('.text-area')[1];
    const textArea3 = overlay.querySelectorAll('.text-area')[2];

    setInterval(() => {
      realTimeDisplay.textContent = getCurrentTime();
    }, 1000);

    overlay.onclick = (e) => {
      if (e.target === overlay) overlay.remove();
    };

    arrowButton.onclick = () => {
      arrowButton.textContent = arrowButton.textContent === '↓↓' ? '↑↑' : '↓↓';
    };

    convertButton.onclick = () => {
      if (arrowButton.textContent === '↑↑') {
        textArea2.value = new Date(textArea3.value).getTime().toString();
      } else {
        const date = new Date(parseInt(textArea2.value));
        textArea3.value = formatDateTime(date);
      }
    };
  }

  createPopup();
})();