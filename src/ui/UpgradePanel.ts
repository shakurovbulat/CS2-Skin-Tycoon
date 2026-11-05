import { gameState } from '../state/gameState.ts';
import { PlayerUpgrade } from '../models/upgrade.ts';
import { soundManager } from '../audio/SoundManager.ts';
import { formatCurrency } from '../config/economyConfig.ts';
import { ICONS } from './icons.ts';

export class UpgradePanel {
  private container: HTMLElement;
  private listEl!: HTMLElement;
  private totalCpsEl!: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.attachEvents();
    gameState.subscribe(() => this.update());
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="cs2-armory-panel">
        <!-- Panel Header (CS2 Buy Menu / Workshop Style) -->
        <div class="armory-header">
          <div class="armory-header-left">
            <div class="armory-subline">
              <span class="cs2-orange">//</span>
              <span>МАСТЕРСКАЯ ВООРУЖЕНИЯ</span>
            </div>
            <h2 class="armory-title">МОДИФИКАЦИИ И БОТЫ</h2>
          </div>
          <div class="armory-counter-badge">
            <span class="dot-amber"></span>
            <span>ARMORY // V2.0</span>
          </div>
        </div>

        <div class="armory-sub-info">
          <span>СНАРЯЖАЙТЕ АВТОМАТИЗАЦИЮ ДЛЯ РОСТА ДОХОДА</span>
        </div>

        <!-- Scrollable Upgrades Grid -->
        <div class="armory-items-list" id="upgrades-list">
          <!-- Rendered dynamically -->
        </div>

        <!-- Panel Footer Stats Summary -->
        <div class="armory-footer-summary">
          <div class="summary-line">
            <span class="summary-bracket">//</span>
            <span class="summary-label">ОБЩАЯ ДОХОДНОСТЬ В СЕКУНДУ:</span>
            <span class="summary-val" id="summary-total-cps">+$0.0/с</span>
          </div>
        </div>
      </div>
    `;

    this.listEl = this.container.querySelector('#upgrades-list')!;
    this.totalCpsEl = this.container.querySelector('#summary-total-cps')!;

    this.renderCards();
    this.update();
  }

  private renderCards(): void {
    this.listEl.innerHTML = gameState.upgrades
      .map((upg, index) => this.createCardHtml(upg, index))
      .join('');
  }

  private createCardHtml(upg: PlayerUpgrade, index: number): string {
    const iconSvg = ICONS[upg.iconType as keyof typeof ICONS] || ICONS.bolt;
    const bonusText =
      upg.category === 'cps'
        ? `+${formatCurrency(upg.bonusValue)} $/СЕК`
        : upg.category === 'click'
        ? `+${formatCurrency(upg.bonusValue)} $/ВЫСТРЕЛ`
        : upg.category === 'workshop'
        ? `+${Math.round(upg.bonusValue * 100)}% ГЛОБАЛ`
        : `+${Math.round(upg.bonusValue * 100)}% КРИТ`;

    const actualCost = Math.floor(upg.cost * (1 - gameState.upgradeDiscount));
    const isLevelLocked = !!(upg.unlockRequirement?.level && gameState.level < upg.unlockRequirement.level);
    const canAfford = gameState.balance >= actualCost && !isLevelLocked;
    const modCode = `MOD-${(index + 1).toString().padStart(2, '0')}`;

    return `
      <div class="cs2-mod-card ${canAfford ? 'affordable' : 'locked'} ${isLevelLocked ? 'level-locked' : ''}" id="card-${upg.id}">
        <!-- Left Rarity Stripe -->
        <div class="mod-rarity-stripe" style="background: ${upg.rarityColor};"></div>

        <div class="mod-card-body">
          <!-- Top Row: Code & Category Tag -->
          <div class="mod-top-meta">
            <span class="mod-code">[${modCode}]</span>
            <span class="mod-category-badge ${upg.category}">
              ${
                upg.category === 'cps'
                  ? 'АВТО-ДОХОД'
                  : upg.category === 'click'
                  ? 'ВЫСТРЕЛ'
                  : upg.category === 'workshop'
                  ? 'МНОЖИТЕЛЬ'
                  : 'КРИТ'
              }
            </span>
            <span class="mod-lvl-tag">УР. <strong class="lvl-val">${upg.level}</strong></span>
          </div>

          <!-- Main Info -->
          <div class="mod-main-info">
            <div class="mod-icon-frame" style="--rarity: ${upg.rarityColor};">
              ${iconSvg}
            </div>
            <div class="mod-titles">
              <div class="mod-title">${upg.name.toUpperCase()}</div>
              <div class="mod-bonus-rate">${bonusText}</div>
            </div>
          </div>

          <div class="mod-desc">${upg.desc}</div>

          <!-- Bottom Action Button: CS2 Buy Button -->
          <button 
            class="cs2-buy-btn ${canAfford ? 'can-buy' : 'cannot-buy'}" 
            data-id="${upg.id}"
            title="${isLevelLocked ? `Требуется уровень ${upg.unlockRequirement?.level}` : canAfford ? 'Приобрести модификацию' : 'Недостаточно средств'}"
          >
            <span class="btn-bracket">[</span>
            ${
              isLevelLocked
                ? `<span class="buy-action-text">ТРЕБУЕТСЯ УР. ${upg.unlockRequirement?.level}</span>`
                : `
                <span class="buy-action-text">КУПИТЬ</span>
                <span class="buy-cost-text">$${formatCurrency(actualCost)}</span>
              `
            }
            <span class="btn-bracket">]</span>
          </button>
        </div>
      </div>
    `;
  }

  private attachEvents(): void {
    this.listEl.addEventListener('click', (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.cs2-buy-btn') as HTMLButtonElement | null;
      if (!target) return;

      const upgradeId = target.dataset.id;
      if (!upgradeId) return;

      const success = gameState.buyUpgrade(upgradeId);
      if (success) {
        const card = document.getElementById(`card-${upgradeId}`);
        if (card) {
          card.classList.add('purchase-flash');
          setTimeout(() => card.classList.remove('purchase-flash'), 300);
        }
      }
    });

    this.listEl.addEventListener('mouseover', (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.cs2-buy-btn');
      if (target && !target.classList.contains('cannot-buy')) {
        soundManager.playHover();
      }
    });
  }

  public update(): void {
    if (!this.listEl) return;

    if (this.totalCpsEl) {
      this.totalCpsEl.textContent = `+$${formatCurrency(gameState.passiveIncome)}/с`;
    }

    gameState.upgrades.forEach(upg => {
      const card = document.getElementById(`card-${upg.id}`);
      if (!card) return;

      const actualCost = Math.floor(upg.cost * (1 - gameState.upgradeDiscount));
      const isLevelLocked = !!(upg.unlockRequirement?.level && gameState.level < upg.unlockRequirement.level);
      const canAfford = gameState.balance >= actualCost && !isLevelLocked;

      card.classList.toggle('affordable', canAfford);
      card.classList.toggle('locked', !canAfford);
      card.classList.toggle('level-locked', isLevelLocked);

      const btn = card.querySelector('.cs2-buy-btn') as HTMLButtonElement;
      if (btn) {
        btn.classList.toggle('can-buy', canAfford);
        btn.classList.toggle('cannot-buy', !canAfford);
        const costEl = btn.querySelector('.buy-cost-text');
        if (costEl && !isLevelLocked) {
          costEl.textContent = `$${formatCurrency(actualCost)}`;
        }
      }

      const lvlVal = card.querySelector('.lvl-val');
      if (lvlVal) lvlVal.textContent = upg.level.toString();
    });
  }
}
