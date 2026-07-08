javascript: (() => {
  const id = 'price-change-tool';

  if (document.getElementById(id)) return;

  const html = `
    <div id="${id}">
      <div class="box">
        <h3>价格涨跌幅计算</h3>
        <div class="row">
          <label>历史价格</label>
          <input id="oldPrice" type="number" step="0.0001" placeholder="输入历史价格">
        </div>
        <div class="row">
          <label>当前价格</label>
          <input id="newPrice" type="number" step="0.0001" placeholder="输入当前价格">
        </div>
        <button id="calc">计算</button>
        <div class="result" id="result">请输入价格</div>
      </div>
    </div>
  `;

  const style = `
    <style>
      #${id} {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.45);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial;
      }

      #${id} .box {
        width: 360px;
        background: white;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }

      #${id} h3 {
        text-align: center;
        margin-top: 0;
      }

      #${id} .row {
        margin: 15px 0;
      }

      #${id} label {
        display: block;
        margin-bottom: 6px;
        color: #555;
      }

      #${id} input {
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 6px;
      }

      #${id} button {
        width: 100%;
        padding: 10px;
        background: #ff4757;
        color: white;
        border: 0;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
      }

      #${id} button:hover {
        background: #ff6b81;
      }

      #${id} .result {
        margin-top: 20px;
        padding: 15px;
        background: #f7f7f7;
        border-radius: 6px;
        font-size: 16px;
        line-height: 28px;
      }
    </style>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
  document.head.insertAdjacentHTML('beforeend', style);

  const box = document.getElementById(id);
  box.onclick = (event) => {
    if (event.target === box) box.remove();
  };

  document.getElementById('calc').onclick = () => {
    const oldPrice = parseFloat(document.getElementById('oldPrice').value);
    const newPrice = parseFloat(document.getElementById('newPrice').value);

    if (Number.isNaN(oldPrice) || Number.isNaN(newPrice) || oldPrice === 0) {
      document.getElementById('result').innerHTML = '请输入有效价格';
      return;
    }

    const diff = newPrice - oldPrice;
    const percent = (diff / oldPrice) * 100;

    document.getElementById('result').innerHTML = `
      历史价格：${oldPrice}<br>
      当前价格：${newPrice}<br>
      涨跌金额：${diff.toFixed(4)}<br>
      涨跌幅：${percent.toFixed(2)}%
    `;
  };
})();
