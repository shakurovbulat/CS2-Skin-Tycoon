import { gameState } from '../state/gameState.ts';
import { formatCurrency } from '../config/economyConfig.ts';

export class CenterHud {
  private container: HTMLElement;
  private statTrakEl!: HTMLElement;
  private clickPowerEl!: HTMLElement;
  private critChanceEl!: HTMLElement;
  private rarityAccentBar!: HTMLElement;
  private rarityTitleEl!: HTMLElement;
  private mainNameEl!: HTMLElement;
  private wearLabelEl!: HTMLElement;
  private floatValEl!: HTMLElement;
  private floatPointerEl!: HTMLElement;
  private weaponLvlEl!: HTMLElement;
  private weaponXpFillEl!: HTMLElement;
  private weaponXpTextEl!: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    gameState.subscribe(() => this.update());
  }

  private render(): void {
    const skin = gameState.currentSkin;
    const xpPercent = Math.min(100, Math.floor((gameState.xp / gameState.maxXp) * 100));

    this.container.innerHTML = `
      <div class="cs2-inspect-hud">
        <!-- Top Item Inspection Card (Steam & CS2 Inspect Style) -->
        <div class="inspect-card">
          <!-- Rarity Edge Accent Stripe -->
          <div class="rarity-accent-bar" id="inspect-rarity-bar" style="background: ${skin.rarityColor};"></div>

          <div class="inspect-card-inner">
            <!-- Rarity Category & Weapon Level Badge -->
            <div class="inspect-rarity-row">
              <span class="rarity-dot" id="inspect-rarity-dot" style="background: ${skin.rarityColor};"></span>
              <span class="rarity-title" id="inspect-rarity-title" style="color: ${skin.rarityColor};">${skin.rarityName.toUpperCase()}</span>
              
              <!-- Prominent Weapon Level Tag -->
              <span class="weapon-level-badge" id="hud-weapon-level">
                <span class="w-star">★</span> УРОВЕНЬ ОРУЖИЯ: <strong class="w-lvl-num">${gameState.weaponLevel}</strong>
              </span>
            </div>

            <!-- Weapon Name -->
            <div class="inspect-weapon-name">
              <span class="st-prefix">StatTrak™</span>
              <span class="main-name" id="inspect-main-name">${skin.name.toUpperCase()}</span>
            </div>

            <!-- Weapon Level XP Bar -->
            <div class="weapon-level-track-row">
              <div class="weapon-xp-bar">
                <div class="weapon-xp-fill" id="hud-weapon-xp-fill" style="width: ${xpPercent}%;"></div>
              </div>
              <span class="weapon-xp-label" id="hud-weapon-xp-text">${gameState.xp} / ${gameState.maxXp} XP</span>
            </div>

            <!-- Condition & Exact Wear Float -->
            <div class="inspect-wear-row">
              <span class="wear-label" id="inspect-wear-label">${skin.wear}</span>
              <span class="wear-divider">|</span>
              <span class="float-label">Float: <strong id="hud-float-val">${skin.floatValue.toFixed(4)}</strong></span>
            </div>

            <!-- Authentic CS2 Float Spectrum Bar -->
            <div class="cs2-float-spectrum">
              <div class="spectrum-bar">
                <span class="zone zone-fn" title="Factory New (0.00 - 0.07)">FN</span>
                <span class="zone zone-mw" title="Minimal Wear (0.07 - 0.15)">MW</span>
                <span class="zone zone-ft" title="Field-Tested (0.15 - 0.38)">FT</span>
                <span class="zone zone-ww" title="Well-Worn (0.38 - 0.45)">WW</span>
                <span class="zone zone-bs" title="Battle-Scarred (0.45 - 1.00)">BS</span>
                <!-- Pointer indicator at exact float position -->
                <div class="float-pointer" id="inspect-float-pointer" style="left: ${Math.min(99, Math.max(1, skin.floatValue * 100))}%;">
                  <span class="pointer-arrow">▲</span>
                </div>
              </div>
            </div>

            <!-- StatTrak Module Counter -->
            <div class="inspect-stattrak-box">
              <div class="st-box-header">
                <span class="st-dot"></span>
                <span>STATTRAK™ CONFIRMED KILLS</span>
              </div>
              <div class="st-display-digits" id="hud-stattrak-val">${this.formatStatTrak(skin.statTrakKills)}</div>
            </div>
          </div>
        </div>

        <!-- Bottom CS2 Inspect Action Ribbon -->
        <div class="cs2-bottom-inspect-bar">
          <div class="inspect-action-tag">
            <span class="key-badge">ЛКМ</span>
            <span class="action-desc">КЛИКАЙТЕ ПО ОРУЖИЮ ДЛЯ ВЫСТРЕЛА И ПОВЫШЕНИЯ УРОВНЯ</span>
          </div>

          <div class="tactical-hud-specs">
            <div class="hud-spec-item">
              <span class="spec-dim">УРОН ЗА ВЫСТРЕЛ:</span>
              <span class="spec-val highlight-gold" id="center-click-power">+$${formatCurrency(gameState.clickPower)}</span>
              <span class="spec-mult">(ур. ${gameState.weaponLevel})</span>
            </div>
            <div class="spec-pipe">|</div>
            <div class="hud-spec-item">
              <span class="spec-dim">КРИТ ШАНС:</span>
              <span class="spec-val highlight-crimson" id="center-crit-chance">${Math.round(gameState.critChance * 100)}% (x${gameState.critMultiplier})</span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.statTrakEl = this.container.querySelector('#hud-stattrak-val')!;
    this.clickPowerEl = this.container.querySelector('#center-click-power')!;
    this.critChanceEl = this.container.querySelector('#center-crit-chance')!;
    this.rarityAccentBar = this.container.querySelector('#inspect-rarity-bar')!;
    this.rarityTitleEl = this.container.querySelector('#inspect-rarity-title')!;
    this.mainNameEl = this.container.querySelector('#inspect-main-name')!;
    this.wearLabelEl = this.container.querySelector('#inspect-wear-label')!;
    this.floatValEl = this.container.querySelector('#hud-float-val')!;
    this.floatPointerEl = this.container.querySelector('#inspect-float-pointer')!;
    this.weaponLvlEl = this.container.querySelector('#hud-weapon-level')!;
    this.weaponXpFillEl = this.container.querySelector('#hud-weapon-xp-fill')!;
    this.weaponXpTextEl = this.container.querySelector('#hud-weapon-xp-text')!;
  }

  private formatStatTrak(num: number): string {
    return num.toString().padStart(6, '0');
  }

  public update(): void {
    const skin = gameState.currentSkin;

    if (this.statTrakEl) this.statTrakEl.textContent = this.formatStatTrak(skin.statTrakKills);
    if (this.clickPowerEl) this.clickPowerEl.textContent = `+$${formatCurrency(gameState.clickPower)}`;
    if (this.critChanceEl) this.critChanceEl.textContent = `${Math.round(gameState.critChance * 100)}% (x${gameState.critMultiplier})`;
    if (this.rarityAccentBar) this.rarityAccentBar.style.background = skin.rarityColor;
    if (this.rarityTitleEl) {
      this.rarityTitleEl.textContent = skin.rarityName.toUpperCase();
      this.rarityTitleEl.style.color = skin.rarityColor;
    }
    if (this.mainNameEl) this.mainNameEl.textContent = skin.name.toUpperCase();
    if (this.wearLabelEl) this.wearLabelEl.textContent = skin.wear;
    if (this.floatValEl) this.floatValEl.textContent = skin.floatValue.toFixed(4);
    if (this.floatPointerEl) {
      this.floatPointerEl.style.left = `${Math.min(99, Math.max(1, skin.floatValue * 100))}%`;
    }
    if (this.weaponLvlEl) {
      this.weaponLvlEl.innerHTML = `<span class="w-star">★</span> УРОВЕНЬ ОРУЖИЯ: <strong class="w-lvl-num">${gameState.weaponLevel}</strong>`;
    }
    if (this.weaponXpFillEl) {
      const xpPercent = Math.min(100, Math.floor((gameState.xp / gameState.maxXp) * 100));
      this.weaponXpFillEl.style.width = `${xpPercent}%`;
    }
    if (this.weaponXpTextEl) {
      this.weaponXpTextEl.textContent = `${gameState.xp} / ${gameState.maxXp} XP`;
    }
  }
}
