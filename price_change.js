javascript: (() => {
  const id = 'price-change-tool';

  if (document.getElementById(id)) return;

  const html = `
    <div id="${id}">
      <div class="box">
        <div class="tabs">
          <button class="tab active" data-panel="pricePanel">价格计算</button>
          <button class="tab" data-panel="profitPanel">止盈止损</button>
        </div>

        <div class="panel active" id="pricePanel">
          <h3>价格计算</h3>
          <div class="subtabs">
            <button class="subtab active" data-price-mode="percentMode">算涨跌幅</button>
            <button class="subtab" data-price-mode="targetMode">算目标价</button>
          </div>

          <div class="price-mode active" id="percentMode">
            <div class="row">
              <label>历史价格</label>
              <input id="oldPrice" type="number" step="0.0001" placeholder="输入历史价格">
            </div>
            <div class="row">
              <label>当前价格</label>
              <input id="newPrice" type="number" step="0.0001" placeholder="输入当前价格">
            </div>
            <button class="action" id="calc">计算涨跌幅</button>
          </div>

          <div class="price-mode" id="targetMode">
            <div class="row">
              <label>当前价</label>
              <input id="basePrice" type="number" step="0.0001" placeholder="输入当前价">
            </div>
            <div class="row">
              <label>涨跌幅 (%)</label>
              <input id="changePercent" type="number" step="0.01" placeholder="上涨填正数，下跌填负数">
            </div>
            <button class="action" id="calcTargetPrice">计算价格</button>
          </div>

          <div class="result" id="result">请输入价格</div>
        </div>

        <div class="panel" id="profitPanel">
          <h3>止盈止损计算</h3>
          <div class="row">
            <label>当前价</label>
            <input id="riskPrice" type="number" step="0.0001" placeholder="输入当前价格">
          </div>
          <div class="radio-row">
            <label><input type="radio" name="tradeType" value="short" checked> 短线</label>
            <label><input type="radio" name="tradeType" value="middle"> 中线</label>
            <label><input type="radio" name="tradeType" value="long"> 长线</label>
          </div>
          <button class="action" id="calcRisk">生成止盈止损</button>
          <div class="result" id="riskResult">请输入当前价</div>
        </div>
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

      #${id} .tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 18px;
      }

      #${id} .tab {
        flex: 1;
        padding: 9px;
        background: #f1f2f6;
        color: #555;
        border: 0;
        border-radius: 6px;
        font-size: 15px;
        cursor: pointer;
      }

      #${id} .tab.active {
        background: #ff4757;
        color: white;
      }

      #${id} .panel {
        display: none;
      }

      #${id} .panel.active,
      #${id} .price-mode.active {
        display: block;
      }

      #${id} .subtabs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 4px;
        margin-bottom: 16px;
        background: #f7f7f7;
        border-radius: 8px;
      }

      #${id} .subtab {
        padding: 8px;
        background: transparent;
        color: #555;
        border: 0;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
      }

      #${id} .subtab.active {
        background: white;
        color: #ff4757;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
      }

      #${id} .price-mode {
        display: none;
      }

      #${id} .row {
        margin: 15px 0;
      }

      #${id} label {
        display: block;
        margin-bottom: 6px;
        color: #555;
      }

      #${id} input[type="number"] {
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 6px;
      }

      #${id} .radio-row {
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
      }

      #${id} .radio-row label {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-bottom: 0;
        cursor: pointer;
      }

      #${id} .action {
        width: 100%;
        padding: 10px;
        background: #ff4757;
        color: white;
        border: 0;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
      }

      #${id} .action:hover {
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

  document.querySelectorAll(`#${id} .tab`).forEach((tab) => {
    tab.onclick = () => {
      document.querySelectorAll(`#${id} .tab`).forEach((item) => item.classList.remove('active'));
      document.querySelectorAll(`#${id} .panel`).forEach((panel) => panel.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.panel).classList.add('active');
    };
  });

  document.querySelectorAll(`#${id} .subtab`).forEach((tab) => {
    tab.onclick = () => {
      document.querySelectorAll(`#${id} .subtab`).forEach((item) => item.classList.remove('active'));
      document.querySelectorAll(`#${id} .price-mode`).forEach((panel) => panel.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.priceMode).classList.add('active');
    };
  });

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

  document.getElementById('calcTargetPrice').onclick = () => {
    const basePrice = parseFloat(document.getElementById('basePrice').value);
    const changePercent = parseFloat(document.getElementById('changePercent').value);

    if (Number.isNaN(basePrice) || Number.isNaN(changePercent)) {
      document.getElementById('result').innerHTML = '请输入有效当前价和涨跌幅';
      return;
    }

    const targetPrice = basePrice * (1 + changePercent / 100);
    const diff = targetPrice - basePrice;

    document.getElementById('result').innerHTML = `
      当前价：${basePrice}<br>
      涨跌幅：${changePercent.toFixed(2)}%<br>
      涨跌金额：${diff.toFixed(4)}<br>
      计算价格：${targetPrice.toFixed(4)}
    `;
  };

  document.getElementById('calcRisk').onclick = () => {
    const currentPrice = parseFloat(document.getElementById('riskPrice').value);
    const tradeType = document.querySelector(`#${id} input[name="tradeType"]:checked`).value;
    const plans = {
      short: { label: '短线', takeProfit: 5, stopLoss: 3 },
      middle: { label: '中线', takeProfit: 10, stopLoss: 5 },
      long: { label: '长线', takeProfit: 20, stopLoss: 8 }
    };
    const plan = plans[tradeType];

    if (Number.isNaN(currentPrice)) {
      document.getElementById('riskResult').innerHTML = '请输入有效当前价';
      return;
    }

    const takeProfitPrice = currentPrice * (1 + plan.takeProfit / 100);
    const stopLossPrice = currentPrice * (1 - plan.stopLoss / 100);

    document.getElementById('riskResult').innerHTML = `
      类型：${plan.label}<br>
      当前价：${currentPrice}<br>
      止盈价：${takeProfitPrice.toFixed(4)}（+${plan.takeProfit}%）<br>
      止损价：${stopLossPrice.toFixed(4)}（-${plan.stopLoss}%）
    `;
  };
})();
