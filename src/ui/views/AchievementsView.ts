import { gameState } from '../../state/gameState.ts';
import { soundManager } from '../../audio/SoundManager.ts';
import { formatCurrency } from '../../config/economyConfig.ts';

export class AchievementsView {
  private container: HTMLElement;
  private currentTab: 'achievements' | 'contracts' = 'achievements';

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
        <div class="cs2-modal-window achievements-modal">
          <!-- Header -->
          <div class="modal-header">
            <div class="modal-header-left">
              <span class="cs2-orange">// ДОСТИЖЕНИЯ И ЗАДАНИЯ</span>
              <h2 class="modal-title">БОЕВЫЕ КОНТРАКТЫ И НАГРАДЫ</h2>
            </div>
            <button class="modal-close-btn" id="ach-close" title="Закрыть">✕</button>
          </div>

          <!-- Section Switcher Tabs -->
          <div class="ach-nav-tabs">
            <button class="ach-tab ${this.currentTab === 'achievements' ? 'active' : ''}" data-tab="achievements">
              <span>ДОСТИЖЕНИЯ (${this.getCompletedAchievementsCount()} / ${gameState.achievements.length})</span>
            </button>
            <button class="ach-tab ${this.currentTab === 'contracts' ? 'active' : ''}" data-tab="contracts">
              <span>ТАКТИЧЕСКИЕ КОНТРАКТЫ (${this.getCompletedContractsCount()} / ${gameState.contracts.length})</span>
            </button>
          </div>

          <!-- Main Content List -->
          <div class="ach-scroll-list" id="ach-content-list">
            ${this.currentTab === 'achievements' ? this.renderAchievementsList() : this.renderContractsList()}
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private getCompletedAchievementsCount(): number {
    return gameState.achievements.filter(a => a.isUnlocked).length;
  }

  private getCompletedContractsCount(): number {
    return gameState.contracts.filter(c => c.isCompleted).length;
  }

  private renderAchievementsList(): string {
    return gameState.achievements.map(ach => {
      const pct = Math.min(100, Math.floor((ach.currentProgress / ach.target) * 100));
      const canClaim = ach.isUnlocked && !ach.isClaimed;

      return `
        <div class="ach-card ${ach.isClaimed ? 'claimed' : ach.isUnlocked ? 'unlocked' : 'in-progress'}">
          <div class="ach-badge-box">
            <span class="ach-star">${ach.isUnlocked ? '★' : '☆'}</span>
          </div>

          <div class="ach-info">
            <div class="ach-title-row">
              <span class="ach-name">${ach.title}</span>
              <span class="ach-reward-tag">
                +${formatCurrency(ach.rewardCoins)} $
                ${ach.rewardKeys ? ` + ${ach.rewardKeys} 🔑` : ''}
                ${ach.rewardStars ? ` + ${ach.rewardStars} ⭐` : ''}
              </span>
            </div>
            <div class="ach-desc">${ach.desc}</div>

            <div class="ach-prog-track">
              <div class="ach-prog-fill" style="width: ${pct}%;"></div>
            </div>
            <div class="ach-prog-numbers">${formatCurrency(ach.currentProgress)} / ${formatCurrency(ach.target)} (${pct}%)</div>
          </div>

          <div class="ach-action">
            ${
              ach.isClaimed
                ? `<span class="claimed-badge">ВЫПОЛНЕНО</span>`
                : canClaim
                ? `<button class="cs2-primary-btn ach-claim-btn" data-ach="${ach.id}">[ ЗАБРАТЬ ]</button>`
                : `<span class="locked-badge">В ПРОЦЕССЕ</span>`
            }
          </div>
        </div>
      `;
    }).join('');
  }

  private renderContractsList(): string {
    return gameState.contracts.map(c => {
      const pct = Math.min(100, Math.floor((c.current / c.target) * 100));
      const canClaim = c.isCompleted;

      return `
        <div class="ach-card ${c.isCompleted ? 'unlocked' : 'in-progress'}">
          <div class="ach-badge-box contract-badge">
            <span>📋</span>
          </div>

          <div class="ach-info">
            <div class="ach-title-row">
              <span class="ach-name">${c.title} (Ур. ${c.level || 1})</span>
              <span class="ach-reward-tag">
                +${formatCurrency(c.rewardCoins)} $
                ${c.rewardKeys ? ` + ${c.rewardKeys} 🔑` : ''}
              </span>
            </div>
            <div class="ach-desc">${c.desc}</div>

            <div class="ach-prog-track">
              <div class="ach-prog-fill" style="width: ${pct}%;"></div>
            </div>
            <div class="ach-prog-numbers">${c.current.toLocaleString()} / ${c.target.toLocaleString()} (${pct}%)</div>
          </div>

          <div class="ach-action">
            ${
              canClaim
                ? `<button class="cs2-primary-btn contract-claim-btn" data-contract="${c.id}">[ ЗАБРАТЬ (УР. ${c.level || 1}) ]</button>`
                : `<span class="locked-badge">В ПРОЦЕССЕ (${pct}%)</span>`
            }
          </div>
        </div>
      `;
    }).join('');
  }

  private attachEvents(): void {
    this.container.querySelector('#ach-close')?.addEventListener('click', () => {
      this.close();
    });

    const tabs = this.container.querySelectorAll<HTMLButtonElement>('.ach-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        soundManager.playClick();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentTab = (tab.dataset.tab as 'achievements' | 'contracts') || 'achievements';
        this.refreshList();
      });
    });

    this.container.querySelector('#ach-content-list')?.addEventListener('click', (e) => {
      const achBtn = (e.target as HTMLElement).closest('.ach-claim-btn') as HTMLElement | null;
      if (achBtn) {
        const id = achBtn.dataset.ach;
        if (id) {
          gameState.claimAchievement(id);
          this.refreshList();
        }
        return;
      }

      const cBtn = (e.target as HTMLElement).closest('.contract-claim-btn') as HTMLElement | null;
      if (cBtn) {
        const id = cBtn.dataset.contract;
        if (id) {
          gameState.claimContract(id);
          this.refreshList();
        }
        return;
      }
    });
  }

  private refreshList(): void {
    const list = this.container.querySelector('#ach-content-list');
    if (list) {
      list.innerHTML = this.currentTab === 'achievements' ? this.renderAchievementsList() : this.renderContractsList();
    }
  }
}
