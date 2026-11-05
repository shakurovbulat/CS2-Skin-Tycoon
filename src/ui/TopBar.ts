import { gameState } from '../state/gameState.ts';
import { soundManager } from '../audio/SoundManager.ts';
import { formatCurrency } from '../config/economyConfig.ts';
import { ICONS } from './icons.ts';

export class TopBar {
  private container: HTMLElement;
  private balanceEl!: HTMLElement;
  private cpsEl!: HTMLElement;
  private keysEl!: HTMLElement;
  private rankEl!: HTMLElement;
  private levelEl!: HTMLElement;
  private xpFillEl!: HTMLElement;
  private xpTextEl!: HTMLElement;
  private soundBtn!: HTMLButtonElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.attachEvents();
    gameState.subscribe(() => this.update());
  }

  private render() {
    this.container.innerHTML = `
      <div class="cs2-topbar">
        <!-- Left CS2 Brand + Main Navigation Tabs -->
        <div class="cs2-nav-section">
          <div class="cs2-main-logo clickable-logo" id="btn-logo-home" title="Вернуться к оружию">
            <span class="cs2-logo-letters">CS<span class="cs2-orange">2</span></span>
            <span class="cs2-sub-title">TYCOON</span>
          </div>

          <div class="cs2-nav-divider"></div>

          <nav class="cs2-main-tabs">
            <button class="cs2-tab" data-nav="inventory">
              <span class="tab-text">ИНВЕНТАРЬ STEAM</span>
              <span class="tab-indicator"></span>
            </button>
            <button class="cs2-tab" data-nav="upgrader">
              <span class="tab-text">АПГРЕЙДЕР ⚡</span>
              <span class="tab-badge">CS2</span>
              <span class="tab-indicator"></span>
            </button>
            <button class="cs2-tab" data-nav="cases">
              <span class="tab-text">КЕЙСЫ</span>
              <span class="tab-indicator"></span>
            </button>
            <button class="cs2-tab" data-nav="achievements">
              <span class="tab-text">ДОСТИЖЕНИЯ</span>
              <span class="tab-indicator"></span>
            </button>
          </nav>
        </div>

        <!-- Right: Resources + Profile + Sound -->
        <div class="cs2-meta-section">
          <!-- Economy Resources -->
          <div class="cs2-resources-cluster">
            <!-- Balance -->
            <div class="cs2-res-badge res-cash">
              <span class="res-sym">$</span>
              <div class="res-data">
                <span class="res-tag">БАЛАНС</span>
                <span class="res-val" id="hud-balance">$0.00</span>
              </div>
            </div>

            <!-- Passive Income -->
            <div class="cs2-res-badge res-income">
              <span class="res-sym-cyan">${ICONS.bolt}</span>
              <div class="res-data">
                <span class="res-tag">ДОХОД / СЕК</span>
                <span class="res-val val-cyan" id="hud-cps">+$0.0/с</span>
              </div>
            </div>

            <!-- Keys -->
            <div class="cs2-res-badge res-key">
              <span class="res-sym-gold">🔑</span>
              <div class="res-data">
                <span class="res-tag">КЛЮЧИ</span>
                <span class="res-val val-gold" id="hud-keys">0</span>
              </div>
            </div>
          </div>

          <div class="cs2-nav-divider"></div>

          <!-- Operator Profile Card -->
          <div class="cs2-profile-card clickable-profile" id="btn-profile-prestige" title="Медали за службу (Престиж)">
            <div class="profile-avatar-frame">
              ${ICONS.avatar}
              <span class="profile-lvl-badge" id="hud-level">1</span>
            </div>
            <div class="profile-info">
              <div class="profile-top">
                <span class="profile-name">ОПЕРАТОР // CT</span>
                <span class="profile-rank" id="hud-rank">Silver I</span>
              </div>
              <div class="cs2-xp-track">
                <div class="cs2-xp-fill" id="hud-xp-fill"></div>
              </div>
              <div class="profile-xp-text" id="hud-xp-text">0 / 100 XP</div>
            </div>
          </div>

          <!-- Sound Utility Button -->
          <div class="cs2-utility-actions">
            <button class="cs2-util-btn" id="btn-sound" title="Звук Вкл/Выкл">
              <span id="sound-icon">${ICONS.volumeOn}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.balanceEl = this.container.querySelector('#hud-balance')!;
    this.cpsEl = this.container.querySelector('#hud-cps')!;
    this.keysEl = this.container.querySelector('#hud-keys')!;
    this.rankEl = this.container.querySelector('#hud-rank')!;
    this.levelEl = this.container.querySelector('#hud-level')!;
    this.xpFillEl = this.container.querySelector('#hud-xp-fill')!;
    this.xpTextEl = this.container.querySelector('#hud-xp-text')!;
    this.soundBtn = this.container.querySelector('#btn-sound')!;

    this.update();
  }

  private attachEvents() {
    // Navigation Tabs
    const tabs = this.container.querySelectorAll<HTMLButtonElement>('.cs2-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        soundManager.playClick();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const navTarget = tab.dataset.nav;
        window.dispatchEvent(new CustomEvent('nav-change', { detail: { tab: navTarget } }));
      });
    });

    // Logo Click -> Close modals / home view
    this.container.querySelector('#btn-logo-home')?.addEventListener('click', () => {
      soundManager.playClick();
      tabs.forEach(t => t.classList.remove('active'));
      window.dispatchEvent(new CustomEvent('nav-change', { detail: { tab: 'clicker' } }));
    });

    // Profile Click -> Prestige View
    this.container.querySelector('#btn-profile-prestige')?.addEventListener('click', () => {
      soundManager.playClick();
      window.dispatchEvent(new CustomEvent('nav-change', { detail: { tab: 'prestige' } }));
    });

    // Sound Toggle
    this.soundBtn?.addEventListener('click', () => {
      const enabled = soundManager.toggleSound();
      const soundIcon = this.container.querySelector('#sound-icon');
      if (soundIcon) {
        soundIcon.innerHTML = enabled ? ICONS.volumeOn : ICONS.volumeOff;
      }
    });

    // Listen to tab switch events from external callers
    window.addEventListener('nav-change', (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.tab) {
        tabs.forEach(t => {
          if (t.dataset.nav === detail.tab) {
            t.classList.add('active');
          } else {
            t.classList.remove('active');
          }
        });
      }
    });
  }

  public update() {
    if (this.balanceEl) this.balanceEl.textContent = `$${formatCurrency(gameState.balance)}`;
    if (this.cpsEl) this.cpsEl.textContent = `+$${formatCurrency(gameState.passiveIncome)}/с`;
    if (this.keysEl) this.keysEl.textContent = gameState.keys.toString();
    if (this.rankEl) this.rankEl.textContent = gameState.rankName;
    if (this.levelEl) this.levelEl.textContent = gameState.level.toString();

    if (this.xpFillEl) {
      const pct = Math.min(100, Math.floor((gameState.xp / gameState.maxXp) * 100));
      this.xpFillEl.style.width = `${pct}%`;
    }
    if (this.xpTextEl) {
      this.xpTextEl.textContent = `${gameState.xp} / ${gameState.maxXp} XP`;
    }
  }
}
