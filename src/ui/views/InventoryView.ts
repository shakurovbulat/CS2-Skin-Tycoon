import { gameState } from '../../state/gameState.ts';
import { getShortWear } from '../../models/skin.ts';
import { getSkinSvg, svgToDataUri } from '../../assets/assetTextures.ts';
import { soundManager } from '../../audio/SoundManager.ts';
import { formatCurrency } from '../../config/economyConfig.ts';

export class InventoryView {
  private container: HTMLElement;
  private selectedCategoryFilter: string = 'all';
  private selectedInstanceId: string | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public open(preselectedInstanceId?: string): void {
    this.selectedInstanceId = preselectedInstanceId || (gameState.inventory[0]?.instanceId || null);
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
        <div class="cs2-modal-window steam-inventory-modal">
          <!-- Steam Inventory Top Header -->
          <div class="steam-inv-header">
            <div class="steam-brand-left">
              <div class="steam-icon-badge">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#38bdf8">
                  <path d="M12 2a10 10 0 0 0-10 10c0 4.6 3.1 8.4 7.4 9.6l3.3-4.7a3.5 3.5 0 0 1-1.2-2.9 3.5 3.5 0 0 1 3.5-3.5 3.5 3.5 0 0 1 3.5 3.5c0 1.2-.6 2.3-1.5 2.9l3.4 4.8A10 10 0 0 0 22 12 10 10 0 0 0 12 2z"/>
                </svg>
              </div>
              <div class="steam-title-wrap">
                <h2 class="steam-main-title">ИНВЕНТАРЬ STEAM // ВЫБИТЫЕ ПРЕДМЕТЫ</h2>
                <div class="steam-stats-sub">
                  <span>ПРЕДМЕТОВ: <strong>${gameState.inventory.length}</strong></span>
                  <span class="dot-sep">•</span>
                  <span>ОЦЕНКА ИНВЕНТАРЯ: <strong class="val-gold">$${formatCurrency(gameState.totalInventoryValue)}</strong></span>
                </div>
              </div>
            </div>

            <button class="modal-close-btn" id="inv-close" title="Закрыть инвентарь">✕</button>
          </div>

          <!-- Category Filter Bar (Steam CS2 Subtabs) -->
          <div class="steam-category-bar">
            <button class="steam-cat-btn ${this.selectedCategoryFilter === 'all' ? 'active' : ''}" data-cat="all">
              ВСЕ ПРЕДМЕТЫ (${gameState.inventory.length})
            </button>
            <button class="steam-cat-btn ${this.selectedCategoryFilter === 'rifle' ? 'active' : ''}" data-cat="rifle">
              ВИНТОВКИ
            </button>
            <button class="steam-cat-btn ${this.selectedCategoryFilter === 'pistol' ? 'active' : ''}" data-cat="pistol">
              ПИСТОЛЕТЫ
            </button>
            <button class="steam-cat-btn ${this.selectedCategoryFilter === 'sniper' ? 'active' : ''}" data-cat="sniper">
              СНАЙПЕРСКИЕ
            </button>
            <button class="steam-cat-btn ${this.selectedCategoryFilter === 'knife' ? 'active' : ''}" data-cat="knife">
              ★ НОЖИ
            </button>
          </div>

          <!-- Main Inventory Two-Column Body -->
          <div class="steam-inv-body">
            <!-- Left: Grid of Items -->
            <div class="steam-grid-scroll" id="steam-inv-grid">
              ${this.renderItemsGrid()}
            </div>

            <!-- Right: Steam Item Inspect Deck -->
            <div class="steam-item-inspect-panel" id="steam-item-deck">
              ${this.renderItemInspectDeck()}
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private renderItemsGrid(): string {
    const filtered = gameState.inventory.filter(item => {
      if (this.selectedCategoryFilter === 'all') return true;
      return item.category === this.selectedCategoryFilter;
    });

    if (filtered.length === 0) {
      return `
        <div class="empty-inv-message">
          <div class="empty-icon">📦</div>
          <div class="empty-title">В ИНВЕНТАРЕ ПОКА НЕТ ПРЕДМЕТОВ</div>
          <div class="empty-sub">Открывайте кейсы или крутите рулетку в Апгрейдере!</div>
        </div>
      `;
    }

    return filtered.map(item => {
      const isSelected = item.instanceId === this.selectedInstanceId;
      const shortWear = getShortWear(item.floatValue);
      const svgUri = svgToDataUri(getSkinSvg(item.textureKey));

      return `
        <div 
          class="steam-slot-card ${isSelected ? 'selected' : ''}" 
          data-instance="${item.instanceId}"
          style="--rarity-col: ${item.rarityColor};"
        >
          <!-- Item Thumbnail Image -->
          <div class="slot-img-wrap">
            <img class="slot-weapon-img" src="${svgUri}" alt="${item.name}" loading="lazy"/>
          </div>

          <!-- Top Meta: StatTrak Badge -->
          <div class="slot-top-row">
            ${item.statTrak ? `<span class="st-badge">ST</span>` : `<span></span>`}
            <span class="slot-price-tag">$${formatCurrency(item.marketPrice)}</span>
          </div>

          <!-- Bottom Meta: Wear condition + Name -->
          <div class="slot-info-box">
            <div class="slot-wear-tag">${shortWear}</div>
            <div class="slot-item-name" title="${item.name}">${item.name}</div>
          </div>

          <!-- Rarity Colored Bottom Accent Border -->
          <div class="slot-rarity-bar" style="background: ${item.rarityColor};"></div>
        </div>
      `;
    }).join('');
  }

  private renderItemInspectDeck(): string {
    const item = gameState.inventory.find(i => i.instanceId === this.selectedInstanceId);

    if (!item) {
      return `
        <div class="inspect-placeholder">
          <div class="ph-ico">🔍</div>
          <div>ВЫБЕРИТЕ ПРЕДМЕТ ДЛЯ ДЕТАЛЬНОГО ОСМОТРА</div>
        </div>
      `;
    }

    const svgUri = svgToDataUri(getSkinSvg(item.textureKey));
    const sourceLabel =
      item.source === 'case'
        ? 'Выбито из оружейного кейса'
        : item.source === 'contract'
        ? 'Создано в контракте апгрейда'
        : 'Получено';

    return `
      <div class="inspect-deck-inner">
        <!-- Big Preview Showcase -->
        <div class="inspect-deck-preview">
          <img class="deck-main-img" src="${svgUri}" alt="${item.name}"/>
        </div>

        <!-- Weapon Title & Steam Badges -->
        <div class="deck-title-card" style="border-left: 4px solid ${item.rarityColor};">
          <div class="deck-rarity-tag" style="color: ${item.rarityColor};">
            ${item.rarityName.toUpperCase()} ${item.categoryName.toUpperCase()}
          </div>
          <div class="deck-item-title">${item.statTrak ? 'StatTrak™ ' : ''}${item.name}</div>
          <div class="deck-source-tag">// ${sourceLabel.toUpperCase()}</div>
        </div>

        <!-- Condition & Exact Float -->
        <div class="deck-spec-box">
          <div class="deck-spec-line">
            <span class="spec-k">ИЗНОС:</span>
            <span class="spec-v">${item.wear}</span>
          </div>
          <div class="deck-spec-line">
            <span class="spec-k">FLOAT:</span>
            <span class="spec-v highlight-cyan">${item.floatValue.toFixed(4)}</span>
          </div>
          <div class="deck-spec-line">
            <span class="spec-k">STATTRAK™ ФРАГИ:</span>
            <span class="spec-v highlight-orange">${item.statTrakKills.toLocaleString()}</span>
          </div>
          <div class="deck-spec-line">
            <span class="spec-k">ЦЕНА НА ТП STEAM:</span>
            <span class="spec-v highlight-gold font-bold">$${formatCurrency(item.marketPrice)}</span>
          </div>
        </div>

        <!-- Steam Action Buttons -->
        <div class="deck-action-buttons">
          <button class="cs2-primary-btn" id="btn-goto-upgrade">
            [ В КОНТРАКТ АПГРЕЙДА ⚡ ]
          </button>

          <button class="cs2-danger-btn" id="btn-sell-inv">
            [ ПРОДАТЬ НА ТП ЗА $${formatCurrency(item.marketPrice)} ]
          </button>
        </div>
      </div>
    `;
  }

  private attachEvents(): void {
    this.container.querySelector('#inv-close')?.addEventListener('click', () => {
      this.close();
    });

    const catButtons = this.container.querySelectorAll<HTMLButtonElement>('.steam-cat-btn');
    catButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        soundManager.playClick();
        catButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedCategoryFilter = btn.dataset.cat || 'all';
        this.refreshGrid();
      });
    });

    this.container.querySelector('#steam-inv-grid')?.addEventListener('click', (e) => {
      const slot = (e.target as HTMLElement).closest('.steam-slot-card') as HTMLElement | null;
      if (!slot) return;
      const instId = slot.dataset.instance;
      if (!instId) return;

      soundManager.playHover();
      this.selectedInstanceId = instId;
      this.refreshGrid();
      this.refreshDeck();
    });

    this.bindDeckActions();
  }

  private bindDeckActions(): void {
    // Sell
    this.container.querySelector('#btn-sell-inv')?.addEventListener('click', () => {
      if (!this.selectedInstanceId) return;
      const res = gameState.sellInventoryItem(this.selectedInstanceId);
      if (res.success) {
        soundManager.playBuy();
        this.selectedInstanceId = gameState.inventory[0]?.instanceId || null;
        this.refreshGrid();
        this.refreshDeck();
      }
    });

    // Go to Upgrade
    this.container.querySelector('#btn-goto-upgrade')?.addEventListener('click', () => {
      if (!this.selectedInstanceId) return;
      const chosenInstance = this.selectedInstanceId;
      this.close();
      window.dispatchEvent(new CustomEvent('nav-change', {
        detail: { tab: 'upgrader', preselectedInstanceId: chosenInstance }
      }));
    });
  }

  private refreshGrid(): void {
    const gridEl = this.container.querySelector('#steam-inv-grid');
    if (gridEl) {
      gridEl.innerHTML = this.renderItemsGrid();
    }
  }

  private refreshDeck(): void {
    const deckEl = this.container.querySelector('#steam-item-deck');
    if (deckEl) {
      deckEl.innerHTML = this.renderItemInspectDeck();
      this.bindDeckActions();
    }
  }
}
