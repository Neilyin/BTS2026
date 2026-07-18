/**
 * BTS 方案對比
 *
 * 將目前計算機結果，與使用者提供的 Straight A 開學季海報做同基準比較。
 * 海報沒有提供完整售價、回饋上限與活動期間，因此：
 * 1. 通路售價暫以相同 Apple 教育價為基準。
 * 2. 贈品採海報標示價值；只有指定卡開關打開時才計入最高回饋。
 * 3. 「宣傳最高省」只展示、不直接扣除，以免重複計入教育價價差。
 */
(function () {
  'use strict';

  const CAMPAIGNS = {
    ipad: {
      headline: '海報開學禮 A–D 擇一',
      defaultOption: 'b',
      giftOptions: [
        { id: 'a', label: 'A｜PQI 翻譯耳機', topUp: 0, value: 1490, items: ['PQI 翻譯耳機'] },
        { id: 'b', label: 'B｜副廠觸控筆＋保護貼', topUp: 0, value: 2170, items: ['副廠觸控筆', '螢幕保護貼'] },
        { id: 'c', label: 'C｜加 NT$890：觸控筆＋保護貼＋品牌保護殼', topUp: 890, value: 2860, items: ['副廠觸控筆', '螢幕保護貼', '品牌保護殼'] },
        { id: 'd', label: 'D｜加 NT$1,690：鍵盤保護殼組合', topUp: 1690, value: 6299, items: ['副廠觸控筆', '螢幕保護貼', 'eiP 鍵盤保護殼', '替換蓋板', '筆尖組'] }
      ]
    },
    mac: {
      headline: 'MacBook 開學禮（Air 2 選 1／Pro 3 選 1）',
      cardName: '中信 LINE Pay 卡',
      maxCardRate: 2,
      defaultOption: 'a',
      giftOptions: [
        {
          id: 'a',
          label: 'A｜每滿萬現折 NT$500＋多功能轉接器',
          topUp: 0,
          cashDiscountPer: 500,
          cashDiscountThreshold: 10000,
          value: 0,
          maxAdvertisedValue: { air: 3990, pro: 8490 },
          displayOnly: true,
          items: ['多功能轉接器（贈品實際型號依購買機型而異）']
        },
        {
          id: 'b',
          label: 'B｜品牌配件禮包',
          topUp: 0,
          cashDiscount: 0,
          value: 5088,
          displayOnly: true,
          items: [
            '螢幕保護貼',
            '鍵盤膜',
            '螢幕清潔組',
            '電腦包',
            '多功能轉接器',
            '筆電支架'
          ]
        },
        { id: 'c', label: 'C1｜AirPods 4 ANC 加 NT$1（Pro 限定）', topUp: 1, cashDiscount: 0, value: 5990, products: ['pro'] },
        { id: 'd', label: 'C2｜AirPods Pro 3 加 NT$1,500（Pro 限定）', topUp: 1500, cashDiscount: 0, value: 7490, products: ['pro'] }
      ]
    }
  };

  let currentInput = null;

  const money = value => `NT$${Math.round(Number(value) || 0).toLocaleString('zh-TW')}`;
  const safe = value => String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  function isEligible(input) {
    if (input.productLine === 'ipad') return true;
    return input.productLine === 'mac' && (input.productType === 'air' || input.productType === 'pro');
  }

  function availableGiftOptions(input, campaign) {
    return campaign.giftOptions.filter(option =>
      !Array.isArray(option.products) || option.products.includes(input.productType)
    );
  }

  function currentPlan(input) {
    const gift = input.currentGift || {};
    const giftCost = Number(gift.cost) || 0;
    const giftValue = gift.useResale
      ? (Number(gift.resaleValue) || 0)
      : (Number(gift.advertisedValue) || 0);
    const checkout = Number(input.subtotal) + giftCost;
    const equivalent = Number(input.currentFinal) + giftCost - giftValue;
    return {
      checkout,
      equivalent,
      giftCost,
      giftValue,
      benefit: Number(input.subtotal) - equivalent
    };
  }

  function externalPlan(input, root) {
    const campaign = CAMPAIGNS[input.productLine];
    const availableOptions = availableGiftOptions(input, campaign);
    const giftId = root.querySelector('[data-plan-gift]')?.value || campaign.defaultOption;
    const gift = availableOptions.find(item => item.id === giftId) || availableOptions[0];
    const protectionId = root.querySelector('[data-plan-protection]')?.value;
    const protection = campaign.protectionOptions?.find(item => item.id === protectionId);
    const useMaxCard = !!root.querySelector('[data-plan-max-card]')?.checked;
    const fixedCashDiscount = Number(gift.cashDiscount) || 0;
    const discountThreshold = Number(gift.cashDiscountThreshold) || 0;
    const discountPer = Number(gift.cashDiscountPer) || 0;
    const tieredCashDiscount = discountThreshold > 0
      ? Math.floor(Number(input.subtotal) / discountThreshold) * discountPer
      : 0;
    const cashDiscount = fixedCashDiscount + tieredCashDiscount;
    const topUp = Number(gift.topUp) || 0;
    const checkout = Number(input.subtotal) + topUp - cashDiscount;
    const cardRate = useMaxCard ? campaign.maxCardRate : 0;
    const cardCashback = Math.round(checkout * cardRate / 100);
    const giftValue = Number(gift.value) || 0;
    const maxAdvertisedValue = Number(gift.maxAdvertisedValue?.[input.productType]) || 0;
    const protectionValue = Number(protection?.value) || 0;
    const countedGiftValue = gift.displayOnly ? 0 : giftValue;
    const equivalent = checkout - cardCashback - countedGiftValue - protectionValue;
    return {
      checkout,
      equivalent,
      benefit: Number(input.subtotal) - equivalent,
      cashDiscount,
      topUp,
      cardRate,
      cardCashback,
      gift,
      giftValue,
      maxAdvertisedValue,
      countedGiftValue,
      protection,
      protectionValue,
      useMaxCard
    };
  }

  function benefitRows(input) {
    const rows = (input.currentBenefits || []).filter(row => Number(row.value) > 0);
    if (!rows.length) return '<li><span>未套用現金／點數回饋</span><strong>—</strong></li>';
    return rows.map(row => `<li><span>${safe(row.label)}</span><strong>-${money(row.value)}</strong></li>`).join('');
  }

  function controls(input) {
    const campaign = CAMPAIGNS[input.productLine];
    const giftOptions = availableGiftOptions(input, campaign).map(option =>
      `<option value="${option.id}"${option.id === campaign.defaultOption ? ' selected' : ''}>${safe(option.label)}</option>`
    ).join('');
    const protectionControl = campaign.protectionOptions ? `
      <label class="plan-field" for="plan-protection">
        <span>保護禮（二選一）</span>
        <select id="plan-protection" data-plan-protection onchange="BTSPlanComparison.update('protection')">
          ${campaign.protectionOptions.map((option, index) => `<option value="${option.id}"${index === 0 ? ' selected' : ''}>${safe(option.label)}</option>`).join('')}
        </select>
      </label>` : '';
    const cardControl = campaign.maxCardRate ? `
      <label class="plan-card-toggle">
        <input type="checkbox" data-plan-max-card onchange="BTSPlanComparison.update('max_card')">
        <span>
          <b>套用${safe(campaign.cardName)}海報最高 ${campaign.maxCardRate}%</b>
          <small>未勾選時不計；實際門檻與回饋上限需向通路確認</small>
        </span>
      </label>` : '';

    return `
      <div class="plan-controls" aria-label="Straight A 優惠條件">
        <label class="plan-field" for="plan-gift">
          <span>開學禮方案</span>
          <select id="plan-gift" data-plan-gift onchange="BTSPlanComparison.update('gift')">${giftOptions}</select>
        </label>
        ${protectionControl}
        ${cardControl}
      </div>`;
  }

  function eligibleMarkup(input) {
    const campaign = CAMPAIGNS[input.productLine];
    const cardRow = campaign.maxCardRate
      ? '<div class="plan-mini-row"><span>卡片回饋</span><b data-external-card>未計</b></div>'
      : '';
    const giftValueLabel = campaign.protectionOptions
      ? '贈品／保護禮標示價值'
      : '贈品標示價值';
    return `
      <div class="plan-compare-grid">
        <article class="plan-card current-plan">
          <div class="plan-card-head">
            <span class="plan-kicker">目前計算機</span>
            <span class="plan-status">精確試算</span>
          </div>
          <h3>Apple 教育商店方案</h3>
          <p class="plan-model">${safe(input.model)}</p>
          <div class="plan-amount" data-current-equivalent>—</div>
          <p class="plan-amount-label">優惠等價入手</p>
          <ul class="plan-benefit-list">${benefitRows(input)}</ul>
          <div class="plan-mini-row"><span>估計結帳支出</span><b data-current-checkout>—</b></div>
          <div class="plan-mini-row"><span>所選贈品等價</span><b data-current-gift>—</b></div>
        </article>

        <article class="plan-card external-plan">
          <div class="plan-card-head">
            <span class="plan-kicker">Straight A 開學季</span>
            <span class="plan-status conditional">海報估算</span>
          </div>
          <h3>教育價＋通路贈禮</h3>
          <p class="plan-model">${safe(campaign.headline)}（不直接扣除）</p>
          <div class="plan-amount" data-external-equivalent>—</div>
          <p class="plan-amount-label">宣傳等價入手</p>
          ${controls(input)}
          <div class="plan-mini-row"><span>估計結帳支出</span><b data-external-checkout>—</b></div>
          <div class="plan-mini-row"><span>現折優惠</span><b data-external-cash-discount>—</b></div>
          ${cardRow}
          <div class="plan-mini-row"><span data-external-gifts-label>${giftValueLabel}</span><b data-external-gifts>—</b></div>
          <div class="plan-gift-details" data-external-gift-details></div>
        </article>
      </div>
      <div class="plan-verdict" role="status" aria-live="polite" data-plan-verdict></div>`;
  }

  function unavailableMarkup(input) {
    const product = safe(input.model);
    return `
      <div class="plan-unavailable">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/></svg>
        <div><b>${product} 暫無可直接比較的海報方案</b><p>使用者提供的 Mac 海報小字標示適用 MacBook Air／MacBook Pro；MacBook Neo、iMac 與 Mac mini 不納入推估。</p></div>
      </div>`;
  }

  function shell(input) {
    const macSpecNotice = input.productLine === 'mac'
      ? '<p><b>Mac 規格提醒：</b>Straight A 一般販售已搭配完成的現貨規格；若需要選購或客製規格，建議直接洽詢 Straight A 確認可供應的型號與報價。</p>'
      : '';
    return `
      <section class="bts-plan-comparison" aria-labelledby="plan-comparison-title">
        <div class="plan-section-head">
          <div>
            <span class="plan-section-eyebrow">PLAN CHECK</span>
            <h2 id="plan-comparison-title">方案對比</h2>
          </div>
        </div>
        <p class="plan-intro">以同一台裝置的教育價 <b>${money(input.subtotal)}</b> 為基準，比較回饋與贈品的可量化價值。</p>
        <aside class="plan-disclaimer" aria-label="Straight A 試算提醒">
          <p><b>本區僅提供試算參考。</b>Straight A 的實際優惠內容、售價、適用條件與供貨狀況，請以 Straight A 最新公告及現場說明為準。</p>
          ${macSpecNotice}
        </aside>
        ${isEligible(input) ? eligibleMarkup(input) : unavailableMarkup(input)}
        <details class="plan-method">
          <summary>怎麼算？先看這些限制</summary>
          <ol>
            <li>Straight A 未提供本次所選規格的完整報價，暫以相同教育價估算；現場售價不同時，結果也會改變。</li>
            <li>方案 A 依售價每滿 NT$10,000 現折 NT$500，會直接從估計結帳支出扣除；HUB 與品牌配件禮包只展示附贈內容及海報約略價值，不當作現金折扣。</li>
            <li>海報「最高省」可能包含原價與教育價價差，本比較已從教育價出發，因此不再次整筆扣除。</li>
            <li>AirPods 加購只適用 MacBook Pro：AirPods 4 ANC 加 NT$1，或 AirPods Pro 3 加 NT$1,500；MacBook Air 不會顯示這兩個選項。</li>
            <li>若方案提供指定卡最高回饋，預設不計、勾選後才試算；分期零利率、舊機換新與保護貼加購不當作額外折扣。</li>
            <li>活動門檻、名額、回饋上限、適用門市、售價與庫存仍以 Straight A 最新公告及現場說明為準。</li>
          </ol>
        </details>
      </section>`;
  }

  function update(source) {
    const root = document.querySelector('.bts-plan-comparison');
    if (!root || !currentInput || !isEligible(currentInput)) return;

    const current = currentPlan(currentInput);
    const external = externalPlan(currentInput, root);
    if (source && window.btsTrack) {
      btsTrack('plan_comparison_adjust', {
        control: source,
        product_line: currentInput.productLine,
        product_type: currentInput.productType,
        straight_a_option: external.gift.id,
        max_card_enabled: external.useMaxCard,
        straight_a_equivalent: Math.round(external.equivalent)
      });
    }
    root.querySelector('[data-current-equivalent]').textContent = money(current.equivalent);
    root.querySelector('[data-current-checkout]').textContent = money(current.checkout);
    root.querySelector('[data-current-gift]').textContent = current.giftValue ? money(current.giftValue) : '未計／無';
    root.querySelector('[data-external-equivalent]').textContent = money(external.equivalent);
    root.querySelector('[data-external-checkout]').textContent = money(external.checkout);
    root.querySelector('[data-external-cash-discount]').textContent = external.cashDiscount
      ? `-${money(external.cashDiscount)}`
      : '無';
    const externalCardEl = root.querySelector('[data-external-card]');
    if (externalCardEl) {
      externalCardEl.textContent = external.cardCashback
        ? `-${money(external.cardCashback)}（${external.cardRate}%）`
        : '未計';
    }
    const giftTotal = external.giftValue + external.protectionValue;
    const giftLabel = root.querySelector('[data-external-gifts-label]');
    if (giftLabel) giftLabel.textContent = external.maxAdvertisedValue ? '海報方案最高價值' : giftLabel.textContent;
    root.querySelector('[data-external-gifts]').textContent = external.maxAdvertisedValue
      ? `${money(external.maxAdvertisedValue)}（含現折）`
      : external.gift.displayOnly
        ? `約 ${money(giftTotal)}（不折抵）`
      : money(giftTotal);
    const giftDetails = root.querySelector('[data-external-gift-details]');
    if (giftDetails) {
      const items = Array.isArray(external.gift.items) && external.gift.items.length
        ? external.gift.items
        : [external.gift.label.replace(/^[A-Z]｜/, '')];
      giftDetails.innerHTML = `
        <span>另外會拿到</span>
        <ul>${items.map(item => `<li>${safe(item)}</li>`).join('')}</ul>
        <small>${external.maxAdvertisedValue
          ? `海報標示此方案最高價值 ${money(external.maxAdvertisedValue)}（含現折），實際依購買型號而異；轉接器不另折現。`
          : `合計標示價值約 ${money(giftTotal)}${external.gift.displayOnly ? '，未從入手價扣除' : ''}`}</small>`;
    }

    const verdict = root.querySelector('[data-plan-verdict]');
    const difference = Math.abs(current.equivalent - external.equivalent);
    if (difference < 1) {
      verdict.className = 'plan-verdict tie';
      verdict.innerHTML = '<b>兩個方案的可量化價值相近</b><span>再依贈品需求、保固與購買便利性選擇。</span>';
    } else if (current.equivalent < external.equivalent) {
      verdict.className = 'plan-verdict current-wins';
      verdict.innerHTML = `<b>目前計算方案等價省 ${money(difference)}</b><span>這是把所選贈品與回饋都換算後的結果。</span>`;
    } else {
      const campaign = CAMPAIGNS[currentInput.productLine];
      const externalNote = external.useMaxCard
        ? '已套用指定卡海報最高回饋，請先確認資格與上限。'
        : campaign.maxCardRate
          ? '尚未套用指定卡最高回饋。品牌禮包僅展示附贈價值，不當作現金折扣。'
          : '贈品只有在你需要時才值標示金額。';
      verdict.className = 'plan-verdict external-wins';
      verdict.innerHTML = `<b>Straight A 宣傳等價低 ${money(difference)}</b><span>${externalNote}</span>`;
    }
  }

  function getReceiptData() {
    const root = document.querySelector('.bts-plan-comparison');
    if (!root || !currentInput || !isEligible(currentInput)) return null;
    const external = externalPlan(currentInput, root);
    const current = currentPlan(currentInput);
    const items = Array.isArray(external.gift.items) && external.gift.items.length
      ? external.gift.items
      : [external.gift.label.replace(/^[A-Z][0-9]?｜/, '')];
    const rows = [
      { label: '估計教育售價', value: money(currentInput.subtotal) }
    ];
    if (external.cashDiscount) rows.push({ label: '現折優惠', value: `-${money(external.cashDiscount)}`, kind: 'deduct' });
    if (external.topUp) rows.push({ label: '方案加購', value: `+${money(external.topUp)}` });
    rows.push({
      label: external.cardCashback ? `指定卡回饋 ${external.cardRate}%` : '指定卡回饋',
      value: external.cardCashback ? `-${money(external.cardCashback)}` : '未計',
      kind: external.cardCashback ? 'deduct' : 'muted'
    });
    return {
      title: 'Straight A 活動試算',
      option: external.gift.label,
      rows,
      details: items,
      finalLabel: '可量化等價入手',
      finalValue: money(external.equivalent),
      giftValue: external.maxAdvertisedValue
        ? `海報方案最高價值 ${money(external.maxAdvertisedValue)}（含現折）`
        : `附贈／加購品標示價值約 ${money(external.giftValue + external.protectionValue)}`,
      summary: Math.abs(current.equivalent - external.equivalent) < 1
        ? '兩方案的可量化等價相近'
        : current.equivalent < external.equivalent
          ? `Apple 官網方案等價低 ${money(external.equivalent - current.equivalent)}`
          : `Straight A 方案等價低 ${money(current.equivalent - external.equivalent)}`,
      note: '僅供比較；實際售價、活動資格、贈品與庫存以 Straight A 公告及現場為準。'
    };
  }

  function getAnalyticsData() {
    const root = document.querySelector('.bts-plan-comparison');
    if (!root || !currentInput || !isEligible(currentInput)) return null;
    const external = externalPlan(currentInput, root);
    return {
      product_line: currentInput.productLine,
      product_type: currentInput.productType,
      straight_a_option: external.gift.id,
      straight_a_equivalent: Math.round(external.equivalent),
      max_card_enabled: external.useMaxCard
    };
  }

  function mount(target, input) {
    if (!target || !input) return;
    currentInput = input;
    target.innerHTML = shell(input);
    target.closest('.modal-sheet')?.classList.add('has-plan-comparison');
    update();
    if (window.btsTrack && isEligible(input)) {
      btsTrack('plan_comparison_view', {
        product_line: input.productLine,
        product_type: input.productType,
        model: input.model,
        apple_equivalent: Math.round(input.currentFinal)
      });
    }
  }

  window.BTSPlanComparison = { mount, update, getReceiptData, getAnalyticsData };
})();
