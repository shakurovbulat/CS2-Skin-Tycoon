import { gameState } from '../../state/gameState.ts';
import { SteamInventoryItem, INITIAL_SKINS_CATALOG, SkinDefinition } from '../../models/skin.ts';
import { getSkinSvg, svgToDataUri } from '../../assets/assetTextures.ts';
import { soundManager } from '../../audio/SoundManager.ts';
import { formatCurrency } from '../../config/economyConfig.ts';

export class UpgraderView {
  private container: HTMLElement;
  private selectedSourceInstanceId: string | null = null;
  private selectedTargetSkinId: string | null = null;
  private isSpinning: boolean = false;
  private wheelCtx!: CanvasRenderingContext2D;
  private currentPointerAngle: number = 0; // In degrees
  private currentWinChance: number = 50;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public open(preselectedSourceId?: string): void {
    if (preselectedSourceId && gameState.inventory.some(i => i.instanceId === preselectedSourceId)) {
      this.selectedSourceInstanceId = preselectedSourceId;
    } else {
      this.selectedSourceInstanceId = gameState.inventory[0]?.instanceId || null;
    }

    // Default target skin (pick a skin roughly 2x - 3x higher value)
    const sourceItem = this.selectedSourceItem;
    if (sourceItem) {
      const higherSkins = INITIAL_SKINS_CATALOG.filter(s => s.baseCost > sourceItem.marketPrice);
      this.selectedTargetSkinId = higherSkins[0]?.id || INITIAL_SKINS_CATALOG[INITIAL_SKINS_CATALOG.length - 1].id;
    } else {
      this.selectedTargetSkinId = INITIAL_SKINS_CATALOG[2].id;
    }

    this.render();
    soundManager.playClick();
  }

  public close(): void {
    if (this.isSpinning) return;
    this.container.innerHTML = '';
    this.container.classList.remove('view-open');
  }

  private get selectedSourceItem(): SteamInventoryItem | null {
    return gameState.inventory.find(i => i.instanceId === this.selectedSourceInstanceId) || null;
  }

  private get selectedTargetDef(): SkinDefinition | null {
    return INITIAL_SKINS_CATALOG.find(s => s.id === this.selectedTargetSkinId) || null;
  }

  private render(): void {
    this.container.classList.add('view-open');

    this.container.innerHTML = `
      <div class="cs2-modal-backdrop">
        <div class="cs2-modal-window upgrader-modal">
          <!-- Header -->
          <div class="modal-header">
            <div class="modal-header-left">
              <span class="cs2-orange">// АПГРЕЙДЕР CS2</span>
              <h2 class="modal-title">КОНТРАКТ УЛУЧШЕНИЯ И РУЛЕТКА ОРУЖИЯ</h2>
            </div>
            <button class="modal-close-btn" id="upg-close" title="Закрыть">✕</button>
          </div>

          <div class="modal-subline">
            <span>ВЫБЕРИТЕ СВОЙ ПРЕДМЕТ И ЦЕЛЬ. ВРАЩАЙТЕ КОЛЕСО: ПОБЕЖДАЙТЕ ИЛИ ТЕРЯЙТЕ СКИН!</span>
          </div>

          <!-- Main Upgrader Arena: 3 Columns (Source Item, Center Wheel, Target Item) -->
          <div class="upgrader-arena">
            <!-- Left: Source Item Selection Card -->
            <div class="upg-card source-card" id="upg-source-deck">
              ${this.renderSourceCard()}
            </div>

            <!-- Center: CS2 Wheel of Fortune -->
            <div class="upg-center-wheel-box">
              <div class="wheel-specs-top" id="wheel-specs">
                ${this.renderWheelSpecs()}
              </div>

              <!-- Canvas Wheel Container -->
              <div class="wheel-canvas-wrapper">
                <canvas id="upgrader-wheel-canvas" width="280" height="280"></canvas>
                <!-- Center Needle / Pointer Arrow -->
                <div class="wheel-top-pointer">▼</div>
              </div>

              <!-- Action Upgrade Button -->
              <button class="cs2-primary-btn launch-upgrade-btn" id="btn-start-upgrade">
                [ ЗАПУСТИТЬ АПГРЕЙД ⚡ ]
              </button>
            </div>

            <!-- Right: Target Item Selection Card -->
            <div class="upg-card target-card" id="upg-target-deck">
              ${this.renderTargetCard()}
            </div>
          </div>

          <!-- Bottom Selection Drawers -->
          <div class="upgrader-selectors-row">
            <!-- Source Selector Strip -->
            <div class="selector-box">
              <div class="selector-title">ВЫБРАТЬ ВАШ ПРЕДМЕТ ИЗ ИНВЕНТАРЯ STEAM:</div>
              <div class="selector-scroll-strip" id="strip-sources">
                ${this.renderSourceStrip()}
              </div>
            </div>

            <!-- Target Selector Strip -->
            <div class="selector-box">
              <div class="selector-title">ВЫБРАТЬ ЖЕЛАЕМЫЙ СКИН (ЦЕЛЬ):</div>
              <div class="selector-scroll-strip" id="strip-targets">
                ${this.renderTargetStrip()}
              </div>
            </div>
          </div>

          <!-- Outcome Result Overlay Modal Container -->
          <div id="upgrade-outcome-modal"></div>
        </div>
      </div>
    `;

    this.initWheelCanvas();
    this.attachEvents();
  }

  private renderWheelSpecs(): string {
    const source = this.selectedSourceItem;
    const target = this.selectedTargetDef;
    if (!source || !target) {
      return `<div class="spec-chance">0%</div>`;
    }

    const { winChance, multiplier } = gameState.calculateUpgradeChance(source.marketPrice, target.baseCost);

    return `
      <div class="wheel-metric">
        <span class="m-lbl">ШАНС ПОБЕДЫ:</span>
        <span class="m-val highlight-green">${winChance.toFixed(1)}%</span>
      </div>
      <div class="wheel-metric-sep">|</div>
      <div class="wheel-metric">
        <span class="m-lbl">МНОЖИТЕЛЬ:</span>
        <span class="m-val highlight-gold">${multiplier.toFixed(2)}x</span>
      </div>
    `;
  }

  private renderSourceCard(): string {
    const item = this.selectedSourceItem;
    if (!item) {
      return `
        <div class="empty-upg-slot">
          <div class="slot-instruction">ВЫБЕРИТЕ ПРЕДМЕТ ДЛЯ СТАВКИ</div>
        </div>
      `;
    }

    const svgUri = svgToDataUri(getSkinSvg(item.textureKey));

    return `
      <div class="upg-card-header" style="border-left: 4px solid ${item.rarityColor};">
        <span class="upg-card-tag">ВАШ ПРЕДМЕТ (СТАВКА)</span>
        <h4 class="upg-item-title">${item.name}</h4>
      </div>

      <div class="upg-img-holder">
        <img class="upg-showcase-img" src="${svgUri}" alt="${item.name}"/>
      </div>

      <div class="upg-card-footer">
        <div class="upg-footer-line">
          <span>ИЗНОС:</span>
          <span class="highlight-cyan">${item.wear}</span>
        </div>
        <div class="upg-footer-line">
          <span>ЦЕНА ПРЕДМЕТА:</span>
          <span class="highlight-gold font-bold">$${formatCurrency(item.marketPrice)}</span>
        </div>
      </div>
    `;
  }

  private renderTargetCard(): string {
    const def = this.selectedTargetDef;
    if (!def) {
      return `
        <div class="empty-upg-slot">
          <div class="slot-instruction">ВЫБЕРИТЕ ЖЕЛАЕМЫЙ СКИН</div>
        </div>
      `;
    }

    const svgUri = svgToDataUri(getSkinSvg(def.textureKey));

    return `
      <div class="upg-card-header" style="border-left: 4px solid ${def.rarityColor};">
        <span class="upg-card-tag highlight-gold">ЖЕЛАЕМЫЙ СКИН (ВЫИГРЫШ)</span>
        <h4 class="upg-item-title">${def.name}</h4>
      </div>

      <div class="upg-img-holder">
        <img class="upg-showcase-img" src="${svgUri}" alt="${def.name}"/>
      </div>

      <div class="upg-card-footer">
        <div class="upg-footer-line">
          <span>РЕДКОСТЬ:</span>
          <span style="color: ${def.rarityColor}; font-weight: bold;">${def.rarityName.toUpperCase()}</span>
        </div>
        <div class="upg-footer-line">
          <span>СТОИМОСТЬ:</span>
          <span class="highlight-gold font-bold">$${formatCurrency(def.baseCost)}</span>
        </div>
      </div>
    `;
  }

  private renderSourceStrip(): string {
    if (gameState.inventory.length === 0) {
      return `<div class="empty-strip-hint">Инвентарь пуст. Откройте кейсы для получения оружия!</div>`;
    }

    return gameState.inventory.map(item => {
      const isSelected = item.instanceId === this.selectedSourceInstanceId;
      const svgUri = svgToDataUri(getSkinSvg(item.textureKey));

      return `
        <div 
          class="strip-item-card ${isSelected ? 'selected' : ''}" 
          data-source-id="${item.instanceId}"
          style="--rarity-col: ${item.rarityColor};"
        >
          <img class="strip-item-img" src="${svgUri}" alt="${item.name}"/>
          <div class="strip-item-name">${item.name}</div>
          <div class="strip-item-price">$${formatCurrency(item.marketPrice)}</div>
        </div>
      `;
    }).join('');
  }

  private renderTargetStrip(): string {
    return INITIAL_SKINS_CATALOG.map(skinDef => {
      const isSelected = skinDef.id === this.selectedTargetSkinId;
      const svgUri = svgToDataUri(getSkinSvg(skinDef.textureKey));

      return `
        <div 
          class="strip-item-card ${isSelected ? 'selected' : ''}" 
          data-target-id="${skinDef.id}"
          style="--rarity-col: ${skinDef.rarityColor};"
        >
          <img class="strip-item-img" src="${svgUri}" alt="${skinDef.name}"/>
          <div class="strip-item-name">${skinDef.name}</div>
          <div class="strip-item-price">$${formatCurrency(skinDef.baseCost)}</div>
        </div>
      `;
    }).join('');
  }

  private initWheelCanvas(): void {
    const canvas = this.container.querySelector('#upgrader-wheel-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    this.wheelCtx = canvas.getContext('2d')!;
    this.updateCurrentChance();
    this.drawWheel(0);
  }

  private updateCurrentChance(): void {
    const source = this.selectedSourceItem;
    const target = this.selectedTargetDef;
    if (source && target) {
      const { winChance } = gameState.calculateUpgradeChance(source.marketPrice, target.baseCost);
      this.currentWinChance = winChance;
    } else {
      this.currentWinChance = 50;
    }
  }

  private drawWheel(pointerDeg: number, forcedWinChance?: number): void {
    if (!this.wheelCtx) return;
    const ctx = this.wheelCtx;
    const size = 280;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 125;

    ctx.clearRect(0, 0, size, size);

    const winChance = forcedWinChance !== undefined ? forcedWinChance : this.currentWinChance;
    const winAngleRad = (winChance / 100) * (Math.PI * 2);

    // Save and rotate wheel relative to current pointer/rotation
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((pointerDeg * Math.PI) / 180);

    // 1. Losing Arc (Dark charcoal/crimson full circle)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#1e1111';
    ctx.fill();

    // 2. Winning Arc (starts at 12 o'clock / -Math.PI / 2 and spans clockwise)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, -Math.PI / 2, -Math.PI / 2 + winAngleRad);
    ctx.closePath();
    ctx.fillStyle = '#10b981';
    ctx.fill();

    // Winning arc outline
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#34d399';
    ctx.stroke();

    // Decorative inner tick marks
    for (let i = 0; i < 36; i++) {
      const a = (i / 36) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * (radius - 12), Math.sin(a) * (radius - 12));
      ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
      ctx.strokeStyle = i % 3 === 0 ? '#cbd5e1' : '#475569';
      ctx.lineWidth = i % 3 === 0 ? 2 : 1;
      ctx.stroke();
    }

    // Outer wheel border
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#334155';
    ctx.stroke();

    // Center Hub
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.fillStyle = '#090d14';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#f59e0b';
    ctx.stroke();

    ctx.restore();

    // Draw static center text
    ctx.fillStyle = '#f8fafc';
    ctx.font = "bold 20px 'Rajdhani', sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${winChance.toFixed(1)}%`, cx, cy - 6);

    ctx.fillStyle = '#94a3b8';
    ctx.font = "bold 10px 'Courier New', monospace";
    ctx.fillText('ШАНС', cx, cy + 14);
  }

  private attachEvents(): void {
    // Close button
    this.container.querySelector('#upg-close')?.addEventListener('click', () => {
      this.close();
    });

    // Source selection from strip
    this.container.querySelector('#strip-sources')?.addEventListener('click', (e) => {
      if (this.isSpinning) return;
      const card = (e.target as HTMLElement).closest('.strip-item-card') as HTMLElement | null;
      if (!card) return;
      const srcId = card.dataset.sourceId;
      if (!srcId) return;

      soundManager.playHover();
      this.selectedSourceInstanceId = srcId;
      this.updateSelectionViews();
    });

    // Target selection from strip
    this.container.querySelector('#strip-targets')?.addEventListener('click', (e) => {
      if (this.isSpinning) return;
      const card = (e.target as HTMLElement).closest('.strip-item-card') as HTMLElement | null;
      if (!card) return;
      const tgtId = card.dataset.targetId;
      if (!tgtId) return;

      soundManager.playHover();
      this.selectedTargetSkinId = tgtId;
      this.updateSelectionViews();
    });

    // Launch Upgrade Button
    this.container.querySelector('#btn-start-upgrade')?.addEventListener('click', () => {
      this.launchUpgrade();
    });
  }

  private updateSelectionViews(): void {
    this.updateCurrentChance();

    const srcDeck = this.container.querySelector('#upg-source-deck');
    const tgtDeck = this.container.querySelector('#upg-target-deck');
    const specsEl = this.container.querySelector('#wheel-specs');
    const srcStrip = this.container.querySelector('#strip-sources');
    const tgtStrip = this.container.querySelector('#strip-targets');

    if (srcDeck) srcDeck.innerHTML = this.renderSourceCard();
    if (tgtDeck) tgtDeck.innerHTML = this.renderTargetCard();
    if (specsEl) specsEl.innerHTML = this.renderWheelSpecs();
    if (srcStrip) srcStrip.innerHTML = this.renderSourceStrip();
    if (tgtStrip) tgtStrip.innerHTML = this.renderTargetStrip();

    this.drawWheel(this.currentPointerAngle);
  }

  private launchUpgrade(): void {
    if (this.isSpinning) return;
    if (!this.selectedSourceInstanceId || !this.selectedTargetSkinId) return;

    const source = this.selectedSourceItem;
    const target = this.selectedTargetDef;
    if (!source || !target) return;

    this.isSpinning = true;
    const launchBtn = this.container.querySelector('#btn-start-upgrade') as HTMLButtonElement;
    if (launchBtn) {
      launchBtn.disabled = true;
      launchBtn.classList.add('disabled');
    }

    // Execute logic in GameState
    const result = gameState.executeUpgrade(this.selectedSourceInstanceId, this.selectedTargetSkinId);
    const winChance = result.winChance;
    this.currentWinChance = winChance;

    // Calculate exact target angle for the wheel
    // At rotation R, the angle at 12 o'clock is (360 - R % 360) % 360.
    // The winning arc is [0 .. (winChance / 100) * 360].
    // Roll is in [0 .. 100].
    // Map roll 0..100 to angle in degrees [0..360]:
    const rollAngle = (result.roll / 100) * 360;

    const totalSpins = 5;
    const startAngle = this.currentPointerAngle;
    const targetRemainder = (360 - rollAngle) % 360;
    const currentRemainder = startAngle % 360;
    let delta = targetRemainder - currentRemainder;
    if (delta <= 0) delta += 360;

    const targetEndAngle = startAngle + totalSpins * 360 + delta;

    const duration = 3600; // ms
    const startTime = performance.now();

    let tickerInterval = setInterval(() => {
      soundManager.playHover();
    }, 110);

    const animateWheel = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Quintic ease out deceleration
      const ease = 1 - Math.pow(1 - progress, 5);

      const currentAngle = startAngle + (targetEndAngle - startAngle) * ease;
      this.currentPointerAngle = currentAngle % 360;
      this.drawWheel(currentAngle, winChance);

      if (progress < 1) {
        requestAnimationFrame(animateWheel);
      } else {
        clearInterval(tickerInterval);
        this.isSpinning = false;
        if (launchBtn) {
          launchBtn.disabled = false;
          launchBtn.classList.remove('disabled');
        }

        // Show result modal
        this.showOutcomeModal(result);
      }
    };

    requestAnimationFrame(animateWheel);
  }

  private showOutcomeModal(res: {
    won: boolean;
    roll: number;
    winChance: number;
    targetItem?: SteamInventoryItem;
    lostItemName: string;
  }): void {
    const modalEl = this.container.querySelector('#upgrade-outcome-modal');
    if (!modalEl) return;

    if (res.won && res.targetItem) {
      soundManager.playBuy();
      const item = res.targetItem;
      const svgUri = svgToDataUri(getSkinSvg(item.textureKey));

      modalEl.innerHTML = `
        <div class="unboxed-overlay">
          <div class="unboxed-card upgrade-win-card" style="border-top: 6px solid #10b981;">
            <div class="unboxed-tag highlight-green">★ АПГРЕЙД УСПЕШЕН! ★</div>
            <div class="upg-roll-badge">РОЛЛ: ${res.roll.toFixed(1)}% (ШАНС БЫЛ ${res.winChance.toFixed(1)}%)</div>

            <div class="upg-win-img-wrap">
              <img class="upg-win-img" src="${svgUri}" alt="${item.name}"/>
            </div>

            <div class="unboxed-title" style="color: #fff;">${item.name.toUpperCase()}</div>
            <div class="unboxed-rarity" style="color: ${item.rarityColor};">${item.rarityName.toUpperCase()}</div>
            <div class="unboxed-wear">${item.wear}</div>
            <div class="upg-win-value">Оценка: +$${formatCurrency(item.marketPrice)}</div>

            <div class="unboxed-btns">
              <button class="cs2-primary-btn" id="btn-next-upg-win">[ СЛЕДУЮЩИЙ АПГРЕЙД ⚡ ]</button>
              <button class="cs2-secondary-btn" id="btn-close-upg-win">[ В ИНВЕНТАРЬ STEAM ]</button>
            </div>
          </div>
        </div>
      `;

      modalEl.querySelector('#btn-next-upg-win')?.addEventListener('click', () => {
        modalEl.innerHTML = '';
        this.selectedSourceInstanceId = item.instanceId;
        this.updateSelectionViews();
      });

      modalEl.querySelector('#btn-close-upg-win')?.addEventListener('click', () => {
        modalEl.innerHTML = '';
        this.selectedSourceInstanceId = gameState.inventory[0]?.instanceId || null;
        this.updateSelectionViews();
      });
    } else {
      soundManager.playPrestige(); // Low pitch thud

      modalEl.innerHTML = `
        <div class="unboxed-overlay">
          <div class="unboxed-card upgrade-loss-card" style="border-top: 6px solid #ef4444;">
            <div class="unboxed-tag highlight-crimson">✖ АПГРЕЙД ПРОВАЛЕН</div>
            <div class="upg-roll-badge">РОЛЛ: ${res.roll.toFixed(1)}% (ШАНС БЫЛ ${res.winChance.toFixed(1)}%)</div>

            <div class="loss-icon">💥</div>
            <div class="unboxed-title" style="color: #f87171;">ПРЕДМЕТ СГОРЕЛ</div>
            <div class="unboxed-desc">Скин «${res.lostItemName}» был утерян в неудачной попытке контракта.</div>

            <div class="unboxed-btns">
              <button class="cs2-secondary-btn" id="btn-close-upg-loss">[ ПОПРОБОВАТЬ СНОВА ]</button>
            </div>
          </div>
        </div>
      `;

      modalEl.querySelector('#btn-close-upg-loss')?.addEventListener('click', () => {
        modalEl.innerHTML = '';
        this.selectedSourceInstanceId = gameState.inventory[0]?.instanceId || null;
        this.updateSelectionViews();
      });
    }
  }
}
