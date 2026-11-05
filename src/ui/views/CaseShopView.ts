import { gameState } from '../../state/gameState.ts';
import { CASES_CATALOG } from '../../models/case.ts';
import { INITIAL_SKINS_CATALOG, SteamInventoryItem } from '../../models/skin.ts';
import { CASE_SVG_MAP } from '../../assets/caseTextures.ts';
import { getSkinSvg, svgToDataUri } from '../../assets/assetTextures.ts';
import { soundManager } from '../../audio/SoundManager.ts';
import { formatCurrency } from '../../config/economyConfig.ts';

export class CaseShopView {
  private container: HTMLElement;
  private isSpinning: boolean = false;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public open(): void {
    this.render();
    soundManager.playClick();
  }

  public close(): void {
    if (this.isSpinning) return;
    this.container.innerHTML = '';
    this.container.classList.remove('view-open');
  }

  private render(): void {
    this.container.classList.add('view-open');
    this.container.innerHTML = `
      <div class="cs2-modal-backdrop">
        <div class="cs2-modal-window case-shop-modal">
          <!-- Header -->
          <div class="modal-header">
            <div class="modal-header-left">
              <span class="cs2-orange">// ОРУЖЕЙНЫЙ МАГАЗИН</span>
              <h2 class="modal-title">КЕЙСЫ И СУВЕНИРНЫЕ НАБОРЫ CS2</h2>
            </div>
            <div class="modal-header-right">
              <div class="keys-display">
                <span class="key-ico">🔑</span>
                <span>КЛЮЧИ: <strong id="modal-keys-val">${gameState.keys}</strong></span>
              </div>
              <button class="modal-close-btn" id="case-close" title="Закрыть">✕</button>
            </div>
          </div>

          <div class="modal-subline">
            <span>ОТКРЫВАЙТЕ ОФИЦИАЛЬНЫЕ КЕЙСЫ CS2 И ВЫБИВАЙТЕ РЕДКИЕ СКИНЫ В СВОЙ STEAM ИНВЕНТАРЬ</span>
          </div>

          <!-- Unboxing Stage: Spinner Carousel + Possible Drops Grid below it -->
          <div class="case-spinner-stage" id="spinner-stage" style="display: none;">
            <div class="spinner-carousel-viewport" id="spinner-viewport">
              <div class="spinner-pointer-line"></div>
              <div class="spinner-carousel" id="spinner-carousel"></div>
            </div>

            <!-- Possible Drops Showcase Section directly under the roulette -->
            <div class="spinner-case-drops-section" id="spinner-drops-section"></div>
          </div>

          <!-- Cases Cards Grid -->
          <div class="cases-grid-layout" id="cases-grid">
            ${this.renderCasesList()}
          </div>

          <!-- Unboxed Item Victory Modal Container -->
          <div id="unboxed-result-modal"></div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private renderCasesList(): string {
    return CASES_CATALOG.map(cDef => {
      const canAffordCoins = gameState.balance >= cDef.costCoins;
      const canAffordKey = !cDef.requiresKey || gameState.keys > 0;
      const canOpen = canAffordCoins && canAffordKey && !this.isSpinning;

      const caseSvg = CASE_SVG_MAP[cDef.id] || CASE_SVG_MAP['case_milspec'];
      const caseSvgUri = svgToDataUri(caseSvg);

      // Pool skins
      const poolSkins = INITIAL_SKINS_CATALOG.filter(s => cDef.skinsPool.includes(s.id));

      return `
        <div class="cs2-case-card" style="--case-theme: ${cDef.themeColor};">
          <!-- Top Case Header -->
          <div class="case-card-header">
            <span class="case-rarity-stripe" style="background: ${cDef.themeColor};"></span>
            <div class="case-header-text">
              <span class="case-code">// WEAPON CONTAINER</span>
              <h3 class="case-title">${cDef.name.toUpperCase()}</h3>
            </div>
          </div>

          <!-- Authentic 3D CS2 Weapon Case Artwork -->
          <div class="case-icon-holder">
            <img class="case-box-img" src="${caseSvgUri}" alt="${cDef.name}"/>
          </div>

          <div class="case-desc">${cDef.desc}</div>

          <!-- Weapons in Case Preview Strip -->
          <div class="case-contents-preview">
            <span class="contents-lbl">СОДЕРЖИМОЕ КЕЙСА:</span>
            <div class="contents-preview-strip">
              ${poolSkins.map(s => {
                const sSvg = svgToDataUri(getSkinSvg(s.textureKey));
                return `
                  <div class="pool-item-thumb" title="${s.name}" style="border-bottom: 2px solid ${s.rarityColor};">
                    <img src="${sSvg}" alt="${s.name}"/>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Open Action Button -->
          <button 
            class="cs2-primary-btn open-case-btn ${canOpen ? '' : 'disabled'}" 
            data-case="${cDef.id}"
            ${canOpen ? '' : 'disabled'}
          >
            ${
              cDef.requiresKey
                ? `[ ОТКРЫТЬ $${formatCurrency(cDef.costCoins)} + 1 🔑 ]`
                : `[ ОТКРЫТЬ $${formatCurrency(cDef.costCoins)} ]`
            }
          </button>
        </div>
      `;
    }).join('');
  }

  private attachEvents(): void {
    this.container.querySelector('#case-close')?.addEventListener('click', () => {
      this.close();
    });

    const grid = this.container.querySelector('#cases-grid');
    grid?.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('.open-case-btn') as HTMLElement | null;
      if (!btn || this.isSpinning) return;
      const caseId = btn.dataset.case;
      if (!caseId) return;

      this.executeCaseOpen(caseId);
    });
  }

  private executeCaseOpen(caseId: string): void {
    const caseDef = CASES_CATALOG.find(c => c.id === caseId);
    if (!caseDef) return;

    const res = gameState.openCase(caseId);
    if (!res.success || !res.item) return;

    this.isSpinning = true;
    const stage = this.container.querySelector('#spinner-stage') as HTMLElement;
    const carousel = this.container.querySelector('#spinner-carousel') as HTMLElement;
    const viewport = this.container.querySelector('#spinner-viewport') as HTMLElement;
    const dropsSection = this.container.querySelector('#spinner-drops-section') as HTMLElement;
    const grid = this.container.querySelector('#cases-grid') as HTMLElement;

    if (!stage || !carousel || !viewport) return;

    stage.style.display = 'flex';
    if (grid) grid.style.display = 'none';

    const winningItem = res.item;
    // Pool of skins belonging to THIS case
    const poolSkins = INITIAL_SKINS_CATALOG.filter(s => caseDef.skinsPool.includes(s.id));

    // Render the drops showcase section right under the roulette!
    if (dropsSection) {
      dropsSection.innerHTML = `
        <div class="drops-header">
          <div class="drops-title-row">
            <span class="cs2-orange">// СОДЕРЖИМОЕ «${caseDef.name.toUpperCase()}»</span>
            <span class="drops-status-tag">ИДЁТ ОТКРЫТИЕ...</span>
          </div>
          <div class="drops-sub">ПРЕДМЕТЫ, КОТОРЫЕ МОГУТ ВЫПАСТЬ ИЗ ЭТОГО КЕЙСА:</div>
        </div>
        <div class="drops-cards-grid">
          ${poolSkins.map(s => {
            const isWinner = s.id === winningItem.skinId;
            const sUri = svgToDataUri(getSkinSvg(s.textureKey));
            return `
              <div class="drop-preview-card ${isWinner ? 'winner-card' : ''}" style="--drop-rarity: ${s.rarityColor};">
                <div class="drop-card-img-wrap">
                  <img src="${sUri}" alt="${s.name}"/>
                </div>
                <div class="drop-card-meta">
                  <span class="drop-rarity-pill" style="color: ${s.rarityColor};">${s.rarityName.toUpperCase()}</span>
                  <span class="drop-name" title="${s.name}">${s.name}</span>
                  <span class="drop-val">~$${formatCurrency(s.baseCost)}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    // Build roulette items (32 items, strictly using items from THIS case!)
    const winIndex = 25;
    const rouletteItems: Array<{ name: string; categoryName: string; rarityColor: string; textureKey: string }> = [];

    for (let i = 0; i < 32; i++) {
      if (i === winIndex) {
        rouletteItems.push({
          name: winningItem.name,
          categoryName: winningItem.categoryName,
          rarityColor: winningItem.rarityColor,
          textureKey: winningItem.textureKey,
        });
      } else {
        const randDef = poolSkins[Math.floor(Math.random() * poolSkins.length)];
        rouletteItems.push({
          name: randDef.name,
          categoryName: randDef.categoryName,
          rarityColor: randDef.rarityColor,
          textureKey: randDef.textureKey,
        });
      }
    }

    const itemWidth = 160;

    carousel.innerHTML = rouletteItems.map(item => {
      const svgUri = svgToDataUri(getSkinSvg(item.textureKey));
      return `
        <div class="spinner-item" style="border-bottom: 4px solid ${item.rarityColor}; width: ${itemWidth}px;">
          <img class="sp-thumb" src="${svgUri}" alt="${item.name}"/>
          <span class="sp-name">${item.name}</span>
          <span class="sp-cat">${item.categoryName}</span>
        </div>
      `;
    }).join('');

    carousel.style.transition = 'none';
    carousel.style.transform = 'translateX(0px)';

    let rollTicker = setInterval(() => {
      soundManager.playHover();
    }, 110);

    setTimeout(() => {
      // Physically exact measurement of winning card center relative to carousel viewport
      const items = carousel.querySelectorAll<HTMLElement>('.spinner-item');
      const winningItemEl = items[winIndex];
      const viewportWidth = viewport.clientWidth || 800;
      const viewportCenter = viewportWidth / 2;

      let itemCenter = winIndex * 170 + 80;
      if (winningItemEl) {
        itemCenter = winningItemEl.offsetLeft + winningItemEl.offsetWidth / 2;
      }

      // Small natural jitter of +-10px (stays perfectly centered inside the 160px card!)
      const jitter = Math.floor(Math.random() * 20 - 10);
      const targetOffset = -(itemCenter - viewportCenter + jitter);

      carousel.style.transition = 'transform 3.8s cubic-bezier(0.12, 0.8, 0.16, 1)';
      carousel.style.transform = `translateX(${targetOffset}px)`;
    }, 50);

    setTimeout(() => {
      clearInterval(rollTicker);
      soundManager.playBuy();
      this.isSpinning = false;

      // Highlight winning card in the drops grid below
      const winnerEl = dropsSection.querySelector('.winner-card');
      if (winnerEl) {
        winnerEl.classList.add('winner-revealed');
      }

      this.showUnboxedVictory(winningItem);
    }, 4000);
  }

  private showUnboxedVictory(item: SteamInventoryItem): void {
    const modalTarget = this.container.querySelector('#unboxed-result-modal');
    if (!modalTarget) return;

    const svgUri = svgToDataUri(getSkinSvg(item.textureKey));

    modalTarget.innerHTML = `
      <div class="unboxed-overlay">
        <div class="unboxed-card" style="border-top: 6px solid ${item.rarityColor};">
          <div class="unboxed-shine"></div>
          <div class="unboxed-tag">★ НОВЫЙ ПРЕДМЕТ В ИНВЕНТАРЕ STEAM!</div>

          <div class="unboxed-weapon-showcase">
            <img class="unboxed-img" src="${svgUri}" alt="${item.name}"/>
          </div>

          <div class="unboxed-title" style="color: #fff;">${item.name.toUpperCase()}</div>
          <div class="unboxed-rarity" style="color: ${item.rarityColor};">${item.rarityName.toUpperCase()} ${item.categoryName.toUpperCase()}</div>
          <div class="unboxed-wear">${item.wear} • Float: ${item.floatValue.toFixed(4)}</div>
          <div class="unboxed-comp">Оценка на ТП Steam: <strong class="val-gold">$${formatCurrency(item.marketPrice)}</strong></div>

          <div class="unboxed-btns">
            <button class="cs2-primary-btn" id="btn-goto-upg-unboxed">[ В АПГРЕЙДЕР ОРУЖИЯ ⚡ ]</button>
            <button class="cs2-secondary-btn" id="btn-close-unboxed">[ В ИНВЕНТАРЬ STEAM ]</button>
          </div>
        </div>
      </div>
    `;

    modalTarget.querySelector('#btn-goto-upg-unboxed')?.addEventListener('click', () => {
      this.finishUnboxing();
      this.close();
      window.dispatchEvent(new CustomEvent('nav-change', {
        detail: { tab: 'upgrader', preselectedInstanceId: item.instanceId }
      }));
    });

    modalTarget.querySelector('#btn-close-unboxed')?.addEventListener('click', () => {
      this.finishUnboxing();
    });
  }

  private finishUnboxing(): void {
    const modalTarget = this.container.querySelector('#unboxed-result-modal');
    if (modalTarget) modalTarget.innerHTML = '';
    const stage = this.container.querySelector('#spinner-stage') as HTMLElement;
    const grid = this.container.querySelector('#cases-grid') as HTMLElement;
    if (stage) stage.style.display = 'none';
    if (grid) {
      grid.style.display = 'grid';
      grid.innerHTML = this.renderCasesList();
    }
    const keysVal = this.container.querySelector('#modal-keys-val');
    if (keysVal) keysVal.textContent = gameState.keys.toString();
  }
}
