import { gameState } from '../../state/gameState.ts';
import { soundManager } from '../../audio/SoundManager.ts';
import { SaveManager } from '../../state/saveManager.ts';
import { yandexGames } from '../../state/yandexSdk.ts';
import { formatCurrency } from '../../config/economyConfig.ts';

export class SettingsView {
  private container: HTMLElement;

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
    const isMuted = soundManager.getMuted();
    const yandexStatus = yandexGames.isAvailable() ? 'ПОДКЛЮЧЕНО (YANDEX GAMES)' : 'ЛОКАЛЬНЫЙ РЕЖИМ (STANDALONE)';

    this.container.classList.add('view-open');
    this.container.innerHTML = `
      <div class="cs2-modal-backdrop">
        <div class="cs2-modal-window settings-modal">
          <!-- Header -->
          <div class="modal-header">
            <div class="modal-header-left">
              <span class="cs2-orange">// ПАРАМЕТРЫ</span>
              <h2 class="modal-title">НАСТРОЙКИ ИГРЫ И СОХРАНЕНИЯ</h2>
            </div>
            <button class="modal-close-btn" id="sett-close" title="Закрыть">✕</button>
          </div>

          <div class="settings-body-grid">
            <!-- Audio & Feedback -->
            <div class="settings-group">
              <div class="group-title">АУДИО И ЗВУКИ</div>
              <div class="settings-row">
                <span class="s-label">Игровые звуковые эффекты (SFX):</span>
                <button class="cs2-secondary-btn" id="btn-toggle-sound">
                  ${isMuted ? '[ ЗВУК: ВЫКЛ ]' : '[ ЗВУК: ВКЛ ]'}
                </button>
              </div>
            </div>

            <!-- Stats Overview -->
            <div class="settings-group">
              <div class="group-title">СТАТИСТИКА ПРОФИЛЯ</div>
              <div class="stats-compact-grid">
                <div class="sc-item"><span>Всего монет заработано:</span> <strong>$${formatCurrency(gameState.allTimeCoins)}</strong></div>
                <div class="sc-item"><span>Всего выстрелов:</span> <strong>${gameState.totalClicks.toLocaleString()}</strong></div>
                <div class="sc-item"><span>Текущий ранг:</span> <strong>${gameState.rankName} (Ур. ${gameState.level})</strong></div>
                <div class="sc-item"><span>Престиж (Медали):</span> <strong>${gameState.prestigeCount} (⭐ ${gameState.stars})</strong></div>
                <div class="sc-item"><span>Скинов в коллекции:</span> <strong>${gameState.skins.filter(s => s.isUnlocked).length} / ${gameState.skins.length}</strong></div>
              </div>
            </div>

            <!-- Cloud & Saves -->
            <div class="settings-group">
              <div class="group-title">СОХРАНЕНИЕ И ОБЛАКО</div>
              <div class="settings-row">
                <span class="s-label">Статус облака:</span>
                <span class="s-status">${yandexStatus}</span>
              </div>

              <div class="save-actions-row">
                <button class="cs2-secondary-btn" id="btn-export-save">[ ЭКСПОРТ СОХРАНЕНИЯ ]</button>
                <button class="cs2-secondary-btn" id="btn-import-save">[ ИМПОРТ СОХРАНЕНИЯ ]</button>
              </div>

              <div id="save-code-box" style="display: none; margin-top: 8px;">
                <textarea id="save-code-area" class="save-code-textarea" placeholder="Вставьте код сохранения сюда..."></textarea>
                <button class="cs2-primary-btn" id="btn-apply-import" style="margin-top: 4px;">[ ПРИМЕНИТЬ КОД ]</button>
              </div>
            </div>

            <!-- Danger Zone -->
            <div class="settings-group danger-zone">
              <div class="group-title">ОПАСНАЯ ЗОНА</div>
              <div class="settings-row">
                <span class="s-label">Полный сброс всех данных и сохранений:</span>
                <button class="cs2-danger-btn" id="btn-reset-game">[ СБРОСИТЬ ВЕСЬ ПРОГРЕСС ]</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents(): void {
    this.container.querySelector('#sett-close')?.addEventListener('click', () => {
      this.close();
    });

    this.container.querySelector('#btn-toggle-sound')?.addEventListener('click', () => {
      soundManager.toggleMute();
      this.render();
    });

    this.container.querySelector('#btn-export-save')?.addEventListener('click', () => {
      const code = SaveManager.exportSave();
      const area = this.container.querySelector('#save-code-area') as HTMLTextAreaElement;
      const box = this.container.querySelector('#save-code-box') as HTMLElement;
      if (box && area) {
        box.style.display = 'block';
        area.value = code;
        area.select();
        alert('Код сохранения скопирован в поле ниже!');
      }
    });

    this.container.querySelector('#btn-import-save')?.addEventListener('click', () => {
      const box = this.container.querySelector('#save-code-box') as HTMLElement;
      const area = this.container.querySelector('#save-code-area') as HTMLTextAreaElement;
      if (box && area) {
        box.style.display = 'block';
        area.value = '';
        area.placeholder = 'Вставьте ваш код сохранения и нажмите [ ПРИМЕНИТЬ КОД ]';
      }
    });

    this.container.querySelector('#btn-apply-import')?.addEventListener('click', () => {
      const area = this.container.querySelector('#save-code-area') as HTMLTextAreaElement;
      if (area && area.value.trim()) {
        const ok = SaveManager.importSave(area.value.trim());
        if (ok) {
          alert('Сохранение успешно загружено! Игра будет перезагружена.');
          window.location.reload();
        } else {
          alert('Ошибка импорта: неверный код сохранения!');
        }
      }
    });

    this.container.querySelector('#btn-reset-game')?.addEventListener('click', () => {
      if (confirm('ВНИМАНИЕ! Это действие необратимо. Сбросить абсолютно весь прогресс, скины и баланс?')) {
        gameState.resetAllProgress();
        alert('Прогресс сброшен!');
        window.location.reload();
      }
    });
  }
}
