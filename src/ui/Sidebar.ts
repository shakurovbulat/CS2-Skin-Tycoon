import { gameState } from '../state/gameState.ts';
import { formatCurrency } from '../config/economyConfig.ts';

import { CS2_BACKGROUNDS } from '../assets/assetTextures.ts';

export class Sidebar {
  private container: HTMLElement;
  private totalClicksEl!: HTMLElement;
  private invCountEl!: HTMLElement;
  private invValEl!: HTMLElement;
  private questsListEl!: HTMLElement;
  private bgGridEl!: HTMLElement;
  private lastQuestsHtml: string = '';

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.attachEvents();
    gameState.subscribe(() => this.update());
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="cs2-intel-drawer">
        <!-- Tactical Header -->
        <div class="intel-header">
          <div class="intel-tag-row">
            <span class="intel-bracket">//</span>
            <span class="intel-tag">ОПЕРАТИВНЫЙ ШТАБ</span>
            <span class="status-live-dot"></span>
          </div>
          <div class="intel-mode-name">СТАТИСТИКА И ЗАДАНИЯ</div>
        </div>

        <!-- Inventory Stats Sheet -->
        <div class="intel-block">
          <div class="intel-block-title">ИНВЕНТАРЬ STEAM</div>

          <div class="intel-stat-card">
            <div class="stat-meta">
              <span class="stat-lbl">ПРЕДМЕТОВ В STEAM</span>
              <span class="stat-num stat-cyan" id="side-inv-count">${gameState.inventory.length}</span>
            </div>
          </div>

          <div class="intel-stat-card">
            <div class="stat-meta">
              <span class="stat-lbl">ОЦЕНКА ИНВЕНТАРЯ</span>
              <span class="stat-num stat-gold" id="side-inv-val">$${formatCurrency(gameState.totalInventoryValue)}</span>
            </div>
          </div>

          <div class="intel-stat-card">
            <div class="stat-meta">
              <span class="stat-lbl">ВСЕГО ВЫСТРЕЛОВ</span>
              <span class="stat-num" id="side-total-clicks">${gameState.totalClicks.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <!-- Map / Background Location Switcher -->
        <div class="intel-block">
          <div class="intel-block-title">ФОН ЛОКАЦИИ // CS2 МАРПАКЕТ</div>
          <div class="intel-maps-grid" id="side-maps-grid">
            ${this.renderMapsHtml()}
          </div>
        </div>

        <!-- Tactical Daily Quests (Contracts) -->
        <div class="intel-block quests-block">
          <div class="intel-block-title">ТАКТИЧЕСКИЕ КОНТРАКТЫ ДНЯ</div>
          <div class="quests-list" id="side-quests-list">
            ${this.renderQuestsHtml()}
          </div>
        </div>

        <!-- Footer Stencil -->
        <div class="intel-footer-stencil">
          <span>VALVE CS2 SECURE // CLIENT ACTIVE</span>
        </div>
      </div>
    `;

    this.totalClicksEl = this.container.querySelector('#side-total-clicks')!;
    this.invCountEl = this.container.querySelector('#side-inv-count')!;
    this.invValEl = this.container.querySelector('#side-inv-val')!;
    this.questsListEl = this.container.querySelector('#side-quests-list')!;
    this.bgGridEl = this.container.querySelector('#side-maps-grid')!;
  }

  private renderMapsHtml(): string {
    return Object.values(CS2_BACKGROUNDS).map(bg => {
      const isActive = gameState.currentBackground === bg.id;
      return `
        <button class="side-map-chip ${isActive ? 'active' : ''}" data-bg="${bg.id}">
          <span class="map-chip-name">${bg.name}</span>
          ${isActive ? `<span class="map-chip-dot"></span>` : ''}
        </button>
      `;
    }).join('');
  }

  private renderQuestsHtml(): string {
    return gameState.contracts.map(c => {
      const pct = Math.min(100, Math.floor((c.current / c.target) * 100));
      return `
        <div class="side-quest-card ${c.isCompleted ? 'completed' : ''} ${c.isClaimed ? 'claimed' : ''}">
          <div class="quest-top">
            <span class="quest-name">${c.title} <strong class="quest-lvl-tag">Ур. ${c.level || 1}</strong></span>
            <span class="quest-reward">+${c.rewardCoins}$ ${c.rewardKeys ? '+1🔑' : ''}</span>
          </div>
          <div class="quest-desc">${c.desc}</div>
          <div class="quest-progress-track">
            <div class="quest-progress-fill" style="width: ${pct}%;"></div>
          </div>
          <div class="quest-footer">
            <span class="quest-nums">${c.current.toLocaleString()} / ${c.target.toLocaleString()}</span>
            ${
              c.isCompleted
                ? `<button class="quest-claim-btn" data-claim="${c.id}">ЗАБРАТЬ (+${c.rewardCoins}$)</button>`
                : `<span class="quest-progress-label">${pct}%</span>`
            }
          </div>
        </div>
      `;
    }).join('');
  }

  private updateQuestsIfChanged(): void {
    const newHtml = this.renderQuestsHtml();
    if (newHtml !== this.lastQuestsHtml) {
      this.lastQuestsHtml = newHtml;
      if (this.questsListEl) {
        this.questsListEl.innerHTML = newHtml;
      }
    }
  }

  private updateActiveMapChip(): void {
    if (!this.bgGridEl) return;
    const chips = this.bgGridEl.querySelectorAll<HTMLButtonElement>('.side-map-chip');
    chips.forEach(chip => {
      const isMatch = chip.dataset.bg === gameState.currentBackground;
      if (isMatch) {
        chip.classList.add('active');
        if (!chip.querySelector('.map-chip-dot')) {
          const dot = document.createElement('span');
          dot.className = 'map-chip-dot';
          chip.appendChild(dot);
        }
      } else {
        chip.classList.remove('active');
        const dot = chip.querySelector('.map-chip-dot');
        if (dot) dot.remove();
      }
    });
  }

  private attachEvents(): void {
    // Map / Background Switcher (pointerdown for immediate and 100% reliable trigger)
    this.container.addEventListener('pointerdown', (e) => {
      const mapBtn = (e.target as HTMLElement).closest('.side-map-chip') as HTMLElement | null;
      if (!mapBtn) return;
      const bgId = mapBtn.dataset.bg;
      if (!bgId) return;

      e.preventDefault();
      e.stopPropagation();
      gameState.setBackground(bgId);
      this.updateActiveMapChip();
    });

    // Claim Quest (using pointerdown so it responds immediately without click cancellation)
    this.container.addEventListener('pointerdown', (e) => {
      const claimBtn = (e.target as HTMLElement).closest('.quest-claim-btn') as HTMLElement | null;
      if (!claimBtn) return;
      const questId = claimBtn.dataset.claim;
      if (!questId) return;

      e.preventDefault();
      e.stopPropagation();
      gameState.claimContract(questId);
      this.lastQuestsHtml = '';
      this.update();
    });
  }

  public update(): void {
    if (this.totalClicksEl) this.totalClicksEl.textContent = gameState.totalClicks.toLocaleString();
    if (this.invCountEl) this.invCountEl.textContent = gameState.inventory.length.toString();
    if (this.invValEl) this.invValEl.textContent = `$${formatCurrency(gameState.totalInventoryValue)}`;
    this.updateQuestsIfChanged();
    this.updateActiveMapChip();
  }
}
