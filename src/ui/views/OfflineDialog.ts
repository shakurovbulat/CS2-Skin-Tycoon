import { gameState } from '../../state/gameState.ts';
import { soundManager } from '../../audio/SoundManager.ts';
import { formatCurrency, formatTime } from '../../config/economyConfig.ts';

export class OfflineDialog {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public checkAndShow(): boolean {
    if (gameState.offlineCoinsEarned <= 0) return false;
    this.render();
    return true;
  }

  private render(): void {
    this.container.classList.add('view-open');
    this.container.innerHTML = `
      <div class="cs2-modal-backdrop">
        <div class="cs2-modal-window offline-modal">
          <div class="offline-badge-icon">⏳</div>

          <div class="offline-tag-line">
            <span class="cs2-orange">// ОПЕРАТИВНАЯ СВОДКА</span>
          </div>

          <h2 class="offline-headline">ДОБРО ПОЖАЛОВАТЬ ОБРАТНО, БОЕЦ!</h2>

          <div class="offline-time-away">
            ВЫ ОТСУТСТВОВАЛИ: <strong>${formatTime(gameState.offlineSecondsAway)}</strong>
          </div>

          <div class="offline-earnings-box">
            <span class="oe-label">БОТЫ И АВТОМАТИЗАЦИЯ НАФАРМИЛИ:</span>
            <span class="oe-value">+$${formatCurrency(gameState.offlineCoinsEarned)} COINS</span>
          </div>

          <button class="cs2-primary-btn offline-claim-btn" id="btn-claim-offline">
            [ ЗАБРАТЬ ОФЛАЙН-ПРИБЫЛЬ ]
          </button>
        </div>
      </div>
    `;

    this.container.querySelector('#btn-claim-offline')?.addEventListener('click', () => {
      gameState.claimOfflineReward();
      this.close();
      soundManager.playBuy();
    });
  }

  public close(): void {
    this.container.innerHTML = '';
    this.container.classList.remove('view-open');
  }
}
