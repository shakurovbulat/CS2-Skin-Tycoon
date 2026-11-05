import { gameState } from '../../state/gameState.ts';
import { soundManager } from '../../audio/SoundManager.ts';
import { ECONOMY_CONFIG, formatCurrency } from '../../config/economyConfig.ts';
import { WEAPON_MILESTONES } from '../../models/skin.ts';
import { getSkinSvg, svgToDataUri } from '../../assets/assetTextures.ts';

export class PrestigeView {
  private container: HTMLElement;
  private activeTab: 'progression' | 'prestige' = 'progression';

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public open(): void {
    this.render();
    soundManager.playClick();
  }

  public close(): void {
    this.container.innerHTML = '';
    this.container.classList.remove('view-open');
  }

  private render(): void {
    this.container.classList.add('view-open');
    this.container.innerHTML = `
      <div class="cs2-modal-backdrop">
        <div class="cs2-modal-window profile-modal">
          <!-- Header -->
          <div class="modal-header">
            <div class="modal-header-left">
              <span class="cs2-orange">// ДОСЬЕ ОПЕРАТОРА</span>
              <h2 class="modal-title">ПРОФИЛЬ, ПРОГРЕСС ОРУЖИЯ И МЕДАЛИ</h2>
            </div>
            <div class="modal-header-right">
              <div class="stars-badge">
                <span>⭐ ЗВЁЗДЫ: <strong id="modal-stars-val">${gameState.stars}</strong></span>
              </div>
              <button class="modal-close-btn" id="prest-close" title="Закрыть">✕</button>
            </div>
          </div>

          <!-- Profile Subtabs -->
          <div class="profile-tabs-bar">
            <button class="profile-subtab ${this.activeTab === 'progression' ? 'active' : ''}" data-tab="progression">
              <span>🎯 ПРОГРЕСС И СЛЕДУЮЩЕЕ ОРУЖИЕ</span>
            </button>
            <button class="profile-subtab ${this.activeTab === 'prestige' ? 'active' : ''}" data-tab="prestige">
              <span>🎖️ СЛУЖБА И МЕДАЛИ (ПРЕСТИЖ)</span>
            </button>
          </div>

          <!-- Tab Content Body -->
          <div class="profile-modal-body" id="profile-content">
            ${this.activeTab === 'progression' ? this.renderProgressionTab() : this.renderPrestigeTab()}
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private renderProgressionTab(): string {
    const curSkin = gameState.currentSkin;
    const curSvg = svgToDataUri(getSkinSvg(curSkin.textureKey));
    const nextData = gameState.nextWeaponMilestone;
    const xpPercent = Math.min(100, Math.floor((gameState.xp / gameState.maxXp) * 100));

    return `
      <div class="progression-view-layout">
        <!-- Top Stats Row -->
        <div class="operator-summary-card">
          <div class="op-avatar-col">
            <div class="op-avatar-frame">
              <img src="${curSvg}" alt="${curSkin.name}" style="max-width: 90%; max-height: 48px; object-fit: contain; aspect-ratio: 3/1;"/>
              <span class="op-lvl-tag">LVL ${gameState.level}</span>
            </div>
          </div>

          <div class="op-data-col">
            <div class="op-name-rank">
              <span class="op-callsign">ОПЕРАТОР // CT</span>
              <span class="op-rank-badge">${gameState.rankName.toUpperCase()}</span>
            </div>

            <div class="op-stats-mini-grid">
              <div class="op-stat-item">
                <span class="os-lbl">ВСЕГО ВЫСТРЕЛОВ:</span>
                <span class="os-val">${gameState.totalClicks.toLocaleString()}</span>
              </div>
              <div class="op-stat-item">
                <span class="os-lbl">УРОН ЗА ВЫСТРЕЛ:</span>
                <span class="os-val highlight-gold">+$${formatCurrency(gameState.clickPower)}</span>
              </div>
              <div class="op-stat-item">
                <span class="os-lbl">ВСЕГО ЗАРАБОТАНО:</span>
                <span class="os-val highlight-green">$${formatCurrency(gameState.allTimeCoins)}</span>
              </div>
              <div class="op-stat-item">
                <span class="os-lbl">STATTRAK ФРАГОВ:</span>
                <span class="os-val highlight-orange">${curSkin.statTrakKills.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Weapon Evolution Card (PROMINENT HIGHLIGHT) -->
        <div class="next-evolution-spotlight">
          <div class="evolution-header">
            <span class="evo-tag">// СЛЕДУЮЩЕЕ УЛУЧШЕНИЕ ОРУЖИЯ ДЛЯ КЛИКЕРА</span>
            ${
              nextData
                ? `<span class="evo-req-badge">ТРЕБУЕТСЯ УРОВЕНЬ ${nextData.milestone.minLevel}</span>`
                : `<span class="evo-req-badge max">МАКСИМАЛЬНЫЙ РАНГ</span>`
            }
          </div>

          ${
            nextData
              ? `
            <div class="evolution-card-body">
              <div class="evo-weapon-preview">
                <img class="evo-img" src="${svgToDataUri(getSkinSvg(nextData.milestone.textureKey))}" alt="${nextData.milestone.name}"/>
                <span class="evo-rarity-pill" style="color: ${nextData.milestone.rarityColor};">${nextData.milestone.rarityName.toUpperCase()}</span>
              </div>

              <div class="evo-info-side">
                <div class="evo-weapon-title" style="color: #fff;">${nextData.milestone.name.toUpperCase()}</div>
                <div class="evo-perk-line">${nextData.milestone.bonusDesc}</div>

                <div class="evo-progress-box">
                  <div class="evo-prog-labels">
                    <span>ДО ПОВЫШЕНИЯ УРОВНЯ ОРУЖИЯ:</span>
                    <strong class="highlight-gold">${gameState.xp} / ${gameState.maxXp} XP (${xpPercent}%)</strong>
                  </div>
                  <div class="evo-prog-bar">
                    <div class="evo-prog-fill" style="width: ${xpPercent}%;"></div>
                  </div>
                  <div class="evo-prog-sub">
                    <span>Осталось до открытия: <strong>${nextData.levelsNeeded} ур.</strong> (${nextData.xpNeeded.toLocaleString()} XP)</span>
                    <span>~${Math.ceil(nextData.xpNeeded / ECONOMY_CONFIG.BASE_XP_PER_CLICK)} выстрелов</span>
                  </div>
                </div>
              </div>
            </div>
          `
              : `
            <div class="max-evolution-card">
              <div class="max-trophy">🏆</div>
              <div class="max-title">ДОСТИГНУТ ВЕНЕЦ АРСЕНАЛА CS2!</div>
              <div class="max-desc">Вы открыли легендарный ${curSkin.name}. Каждое последующее повышение уровня продолжает усиливать урон!</div>
            </div>
          `
          }
        </div>

        <!-- Weapon Roadmap Timeline (All 12 CS2 Milestones) -->
        <div class="weapon-roadmap-section">
          <div class="roadmap-title">ЛИНИЯ ЭВОЛЮЦИИ ТАПАЕМОГО ОРУЖИЯ (CS2 MILESTONES):</div>
          <div class="roadmap-strip-scroll">
            ${WEAPON_MILESTONES.map(m => {
              const isUnlocked = gameState.level >= m.minLevel;
              const isCurrent = curSkin.textureKey === m.textureKey;
              const mSvg = svgToDataUri(getSkinSvg(m.textureKey));

              return `
                <div class="roadmap-tile ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}" style="--tile-rarity: ${m.rarityColor};">
                  <div class="tile-header">
                    <span class="tile-lvl">УР. ${m.minLevel}</span>
                    ${isCurrent ? `<span class="tile-curr-badge">АКТИВНО</span>` : isUnlocked ? `<span class="tile-check">✓</span>` : `<span>🔒</span>`}
                  </div>
                  <div class="tile-img-wrap">
                    <img src="${mSvg}" alt="${m.name}"/>
                  </div>
                  <div class="tile-name" title="${m.name}">${m.name}</div>
                  <div class="tile-bonus">${m.bonusDesc}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  private renderPrestigeTab(): string {
    const canPrestige = gameState.canPrestige();
    const starsReward = gameState.getPrestigeStarsReward();

    return `
      <div class="prestige-body-layout">
        <!-- Left: Reset Action Card -->
        <div class="prestige-reset-card">
          <div class="medal-emblem-box">
            <div class="medal-icon">🎖️</div>
            <div class="medal-rank-title">СЛУЖБА CS2 • ПРЕСТИЖ ${gameState.prestigeCount}</div>
          </div>

          <div class="prestige-rules-grid">
            <div class="rule-box rule-red">
              <div class="r-title">ЧТО СБРАСЫВАЕТСЯ:</div>
              <ul>
                <li>Баланс текущих монет</li>
                <li>Обычные улучшения в мастерской</li>
              </ul>
            </div>
            <div class="rule-box rule-green">
              <div class="r-title">ЧТО СОХРАНЯЕТСЯ:</div>
              <ul>
                <li>Весь Steam инвентарь выбитых скинов</li>
                <li>Все ключи от кейсов</li>
                <li>Достижения и контракты</li>
                <li>Все постоянные перки престижа</li>
              </ul>
            </div>
          </div>

          <div class="prestige-reward-preview">
            <span class="p-reward-label">НАГРАДА ЗА ТЕКУЩИЙ СБРОС:</span>
            <span class="p-reward-stars">+${starsReward} ЗВЕЗД СЛУЖБЫ ⭐</span>
          </div>

          <button 
            class="cs2-primary-btn prestige-action-btn ${canPrestige ? '' : 'disabled'}" 
            id="btn-do-prestige"
            ${canPrestige ? '' : 'disabled'}
          >
            ${
              canPrestige
                ? `[ ПОЛУЧИТЬ МЕДАЛЬ ЗА СЛУЖБУ (+${starsReward} ⭐) ]`
                : `[ ТРЕБУЕТСЯ $${formatCurrency(ECONOMY_CONFIG.PRESTIGE_MIN_ALLTIME_COINS)} ВСЕГО (У ВАС $${formatCurrency(gameState.allTimeCoins)}) ]`
            }
          </button>
        </div>

        <!-- Right: Permanent Perks Shop -->
        <div class="prestige-perks-panel">
          <div class="perks-panel-header">
            <span>ПОСТОЯННЫЕ СЛУЖЕБНЫЕ ПЕРКИ (НЕ СБРАСЫВАЮТСЯ)</span>
          </div>

          <div class="perks-list" id="perks-list">
            ${this.renderPerksList()}
          </div>
        </div>
      </div>
    `;
  }

  private renderPerksList(): string {
    return gameState.prestigePerks.map(perk => {
      const isMax = perk.level >= perk.maxLevel;
      const canAfford = gameState.stars >= perk.costInStars && !isMax;

      return `
        <div class="perk-card ${isMax ? 'maxed' : ''}">
          <div class="perk-top">
            <span class="perk-name">${perk.name.toUpperCase()}</span>
            <span class="perk-lvl">УР. ${perk.level} / ${perk.maxLevel}</span>
          </div>
          <div class="perk-desc">${perk.desc}</div>
          <div class="perk-footer">
            <span class="perk-cost">${isMax ? 'МАКСИМУМ' : `${perk.costInStars} ⭐`}</span>
            <button 
              class="cs2-primary-btn perk-buy-btn ${canAfford ? '' : 'disabled'}" 
              data-perk="${perk.id}"
              ${canAfford ? '' : 'disabled'}
            >
              ${isMax ? '[ ИЗУЧЕНО ]' : '[ УЛУЧШИТЬ ]'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  private attachEvents(): void {
    this.container.querySelector('#prest-close')?.addEventListener('click', () => {
      this.close();
    });

    // Subtabs switcher
    const tabs = this.container.querySelectorAll<HTMLButtonElement>('.profile-subtab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        soundManager.playClick();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeTab = (tab.dataset.tab as 'progression' | 'prestige') || 'progression';
        const body = this.container.querySelector('#profile-content');
        if (body) {
          body.innerHTML = this.activeTab === 'progression' ? this.renderProgressionTab() : this.renderPrestigeTab();
          this.bindBodyActions();
        }
      });
    });

    this.bindBodyActions();
  }

  private bindBodyActions(): void {
    // Prestige Action Button
    this.container.querySelector('#btn-do-prestige')?.addEventListener('click', () => {
      if (gameState.canPrestige()) {
        gameState.doPrestige();
        this.render();
      }
    });

    // Buy Perk Button
    this.container.querySelectorAll<HTMLButtonElement>('.perk-buy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const perkId = btn.dataset.perk;
        if (!perkId) return;
        if (gameState.buyPrestigePerk(perkId)) {
          this.render();
        }
      });
    });
  }
}
