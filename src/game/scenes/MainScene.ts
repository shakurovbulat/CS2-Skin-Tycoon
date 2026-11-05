import Phaser from 'phaser';
import { 
  COIN_SVG, 
  SPARK_SVG, 
  getSkinSvg, 
  svgToDataUri 
} from '../../assets/assetTextures.ts';
import { INITIAL_SKINS_CATALOG } from '../../models/skin.ts';
import { gameState } from '../../state/gameState.ts';

export class MainScene extends Phaser.Scene {
  private weaponContainer!: Phaser.GameObjects.Container;
  private weaponSprite!: Phaser.GameObjects.Image;
  private pedestalGlow!: Phaser.GameObjects.Arc;
  private pedestalOuterGlow!: Phaser.GameObjects.Arc;
  private statTrakText!: Phaser.GameObjects.Text;
  private levelBadgeText!: Phaser.GameObjects.Text;
  private isPointerOver: boolean = false;
  private targetAngle: number = 0;
  private currentLoadedTexture: string = '';

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // 1. Core particle textures
    this.load.image('coin', svgToDataUri(COIN_SVG));
    this.load.image('spark', svgToDataUri(SPARK_SVG));

    // 2. Load all weapon SVGs into Phaser's texture cache
    INITIAL_SKINS_CATALOG.forEach(skinDef => {
      const svg = getSkinSvg(skinDef.textureKey);
      this.load.image(skinDef.textureKey, svgToDataUri(svg));
    });
  }

  create() {
    const { width, height } = this.scale;

    // Ambient floating dust / micro-sparks in the showcase room
    this.createAmbientDust();

    // Pedestal glow rings under weapon
    this.pedestalOuterGlow = this.add.circle(width / 2, height / 2 + 55, 220, 0x38bdf8, 0.05);
    this.pedestalGlow = this.add.circle(width / 2, height / 2 + 50, 180, 0xea7c1e, 0.08);

    this.tweens.add({
      targets: [this.pedestalGlow, this.pedestalOuterGlow],
      scaleX: { from: 1, to: 1.15 },
      scaleY: { from: 1, to: 0.88 },
      alpha: { from: 0.06, to: 0.16 },
      duration: 2200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Weapon Container
    this.weaponContainer = this.add.container(width / 2, height / 2);

    // Initial weapon texture based on active skin
    const activeSkin = gameState.currentSkin;
    this.currentLoadedTexture = activeSkin.textureKey;
    if (!this.textures.exists(this.currentLoadedTexture)) {
      // Fallback if not loaded
      const svg = getSkinSvg(this.currentLoadedTexture);
      this.textures.addBase64(this.currentLoadedTexture, svgToDataUri(svg));
    }

    this.weaponSprite = this.add.image(0, 0, this.currentLoadedTexture);
    this.weaponSprite.setOrigin(0.5, 0.5);

    this.updateWeaponScale();
    this.weaponContainer.add(this.weaponSprite);

    // StatTrak LED counter on weapon
    const stPos = this.getStatTrakPosition(this.currentLoadedTexture);
    this.statTrakText = this.add.text(stPos.x, stPos.y, this.formatStatTrak(activeSkin.statTrakKills), {
      fontFamily: "'Courier New', Courier, monospace",
      fontSize: '11px',
      color: '#ff9900',
      fontStyle: 'bold',
    });
    this.statTrakText.setOrigin(0.5, 0.5);
    this.weaponContainer.add(this.statTrakText);

    // Weapon Level Badge on weapon container
    this.levelBadgeText = this.add.text(0, 85, `ОРУЖИЕ: УРОВЕНЬ ${gameState.weaponLevel}`, {
      fontFamily: "'Rajdhani', sans-serif",
      fontSize: '13px',
      color: '#f59e0b',
      fontStyle: 'bold',
    });
    this.levelBadgeText.setOrigin(0.5, 0.5);
    this.weaponContainer.add(this.levelBadgeText);

    // Setup Interactivity
    this.setupInteractivity();

    // Set initial pedestal lighting based on current map
    this.updatePedestalTheme(gameState.currentBackground);

    // Listen to background change to update pedestal lighting
    window.addEventListener('bg-change', (e: Event) => {
      const bgId = (e as CustomEvent).detail?.bgId;
      if (bgId) this.updatePedestalTheme(bgId);
    });

    // Idle floating bob tween
    this.tweens.add({
      targets: this.weaponContainer,
      y: height / 2 - 10,
      duration: 2200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Listen to window / viewport resize
    this.scale.on('resize', this.handleResize, this);

    // Listen to weapon level up event for big celebration
    window.addEventListener('weapon-levelup', (e: Event) => {
      const detail = (e as CustomEvent).detail;
      this.playLevelUpEffect(detail?.newLevel || gameState.level);
    });

    // Subscribe to state updates (active skin change, StatTrak counter, level)
    gameState.subscribe(() => {
      const current = gameState.currentSkin;
      if (this.statTrakText) {
        this.statTrakText.setText(this.formatStatTrak(current.statTrakKills));
        const pos = this.getStatTrakPosition(current.textureKey);
        this.statTrakText.setPosition(pos.x, pos.y);
      }
      if (this.levelBadgeText) {
        this.levelBadgeText.setText(`ОРУЖИЕ: УРОВЕНЬ ${gameState.weaponLevel}`);
      }
      if (current.textureKey && current.textureKey !== this.currentLoadedTexture) {
        this.currentLoadedTexture = current.textureKey;
        if (this.textures.exists(current.textureKey)) {
          this.weaponSprite.setTexture(current.textureKey);
          this.updateWeaponScale();
        }
      }
    });
  }

  private updatePedestalTheme(bgId: string) {
    if (!this.pedestalGlow || !this.pedestalOuterGlow) return;
    let colorInner = 0xea7c1e;
    let colorOuter = 0x38bdf8;

    if (bgId === 'dust2') {
      colorInner = 0xf59e0b;
      colorOuter = 0xd97706;
    } else if (bgId === 'mirage') {
      colorInner = 0xf43f5e;
      colorOuter = 0xd946ef;
    } else if (bgId === 'nuke') {
      colorInner = 0x10b981;
      colorOuter = 0x22c55e;
    } else if (bgId === 'inferno') {
      colorInner = 0xf59e0b;
      colorOuter = 0x3b82f6;
    }

    this.pedestalGlow.fillColor = colorInner;
    this.pedestalOuterGlow.fillColor = colorOuter;
  }

  private getStatTrakPosition(textureKey: string): { x: number; y: number } {
    if (textureKey.startsWith('ak47')) return { x: -60, y: 7 };
    if (textureKey.startsWith('m4a4')) return { x: -58, y: 10 };
    if (textureKey.startsWith('m4a1')) return { x: -90, y: 9 };
    if (textureKey.startsWith('awp')) return { x: -23, y: 20 };
    if (textureKey.startsWith('deagle')) return { x: -43, y: -23 };
    if (textureKey.startsWith('usps')) return { x: -170, y: -25 };
    if (textureKey.startsWith('glock')) return { x: -13, y: -19 };
    if (textureKey.startsWith('p250')) return { x: -7, y: -18 };
    if (textureKey.startsWith('mp9')) return { x: 14, y: -5 };
    if (textureKey.startsWith('karambit')) return { x: -45, y: 28 };
    if (textureKey.startsWith('butterfly')) return { x: -20, y: 18 };
    return { x: -60, y: 0 };
  }

  private formatStatTrak(count: number): string {
    return count.toString().padStart(6, '0');
  }

  private playLevelUpEffect(newLevel: number) {
    const { width, height } = this.scale;

    // 1. Expanding shockwave ring
    const ring = this.add.circle(width / 2, height / 2, 40, 0xf59e0b, 0.8);
    this.tweens.add({
      targets: ring,
      radius: 280,
      alpha: 0,
      duration: 800,
      ease: 'Cubic.easeOut',
      onComplete: () => ring.destroy(),
    });

    // 2. Burst of golden spark particles
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const speed = Phaser.Math.Between(120, 240);
      const spark = this.add.image(width / 2, height / 2, 'spark');
      spark.setScale(Phaser.Math.FloatBetween(0.4, 0.9));
      spark.setTint(0xfde047);

      this.tweens.add({
        targets: spark,
        x: width / 2 + Math.cos(angle) * speed,
        y: height / 2 + Math.sin(angle) * speed,
        alpha: 0,
        scale: 0.1,
        duration: Phaser.Math.Between(700, 1100),
        ease: 'Cubic.easeOut',
        onComplete: () => spark.destroy(),
      });
    }

    // 3. Floating "+УРОВЕНЬ ОРУЖИЯ!" text
    const text = this.add.text(width / 2, height / 2 - 50, `★ УРОВЕНЬ ОРУЖИЯ ${newLevel}! ★`, {
      fontFamily: "'Rajdhani', sans-serif",
      fontSize: '28px',
      color: '#ffd700',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 5,
    });
    text.setOrigin(0.5, 0.5);

    this.tweens.add({
      targets: text,
      y: height / 2 - 130,
      scaleX: 1.2,
      scaleY: 1.2,
      alpha: 0,
      duration: 1600,
      ease: 'Back.easeOut',
      onComplete: () => text.destroy(),
    });
  }

  private createAmbientDust() {
    const { width } = this.scale;
    this.add.particles(0, 0, 'spark', {
      x: { min: 20, max: width - 20 },
      y: { min: 40, max: this.scale.height - 40 },
      speed: { min: 5, max: 20 },
      angle: { min: 240, max: 300 },
      scale: { start: 0.15, end: 0 },
      alpha: { start: 0.35, end: 0 },
      lifespan: { min: 3000, max: 6000 },
      frequency: 250,
      quantity: 1,
      blendMode: 'ADD',
    });
  }

  private setupInteractivity() {
    this.weaponSprite.setInteractive({ useHandCursor: true });

    // Subtle 3D inspect tilt towards mouse cursor
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (!this.isPointerOver) return;
      const dx = pointer.x - this.weaponContainer.x;
      const dy = pointer.y - this.weaponContainer.y;
      this.targetAngle = (dx / 300) * 8;
      this.weaponContainer.rotation = Phaser.Math.DegToRad(this.targetAngle);
      this.weaponSprite.y = (dy / 200) * 6;
    });

    this.weaponSprite.on('pointerover', () => {
      this.isPointerOver = true;
      this.tweens.add({
        targets: this.weaponContainer,
        scaleX: this.getWeaponBaseScale() * 1.05,
        scaleY: this.getWeaponBaseScale() * 1.05,
        duration: 180,
        ease: 'Cubic.easeOut',
      });
    });

    this.weaponSprite.on('pointerout', () => {
      this.isPointerOver = false;
      this.targetAngle = 0;
      this.tweens.add({
        targets: this.weaponContainer,
        scaleX: this.getWeaponBaseScale(),
        scaleY: this.getWeaponBaseScale(),
        rotation: 0,
        duration: 250,
        ease: 'Cubic.easeOut',
      });
      this.weaponSprite.y = 0;
    });

    // Weapon Click / Shot trigger
    this.weaponSprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.handleClick(pointer.x, pointer.y);
    });
  }

  private handleClick(x: number, y: number) {
    // 1. Process economy click in gameState
    const result = gameState.clickSkin();

    // 2. Weapon Recoil Kickback animation
    this.tweens.add({
      targets: this.weaponContainer,
      x: this.scale.width / 2 - 14,
      rotation: Phaser.Math.DegToRad(-4),
      duration: 45,
      yoyo: true,
      ease: 'Quad.easeOut',
      onComplete: () => {
        this.weaponContainer.x = this.scale.width / 2;
        this.weaponContainer.rotation = 0;
      },
    });

    // 3. Muzzle Flash & Spark Burst
    this.spawnMuzzleSparks(x, y, result.isCrit);

    // 4. Floating Currency Text
    this.spawnFloatingIncomeText(x, y, result.earned, result.isCrit);
  }

  private spawnMuzzleSparks(x: number, y: number, isCrit: boolean) {
    const sparkCount = isCrit ? 16 : 8;
    const baseColor = isCrit ? 0xef4444 : 0xf59e0b;

    for (let i = 0; i < sparkCount; i++) {
      const spark = this.add.image(x, y, 'spark');
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const speed = isCrit ? Phaser.Math.Between(90, 200) : Phaser.Math.Between(50, 120);

      spark.setScale(isCrit ? 0.6 : 0.35);
      spark.setTint(baseColor);
      spark.setBlendMode('ADD');

      this.tweens.add({
        targets: spark,
        x: x + Math.cos(angle) * speed,
        y: y + Math.sin(angle) * speed,
        alpha: 0,
        scale: 0,
        duration: Phaser.Math.Between(250, 450),
        ease: 'Cubic.easeOut',
        onComplete: () => spark.destroy(),
      });
    }
  }

  private spawnFloatingIncomeText(x: number, y: number, amount: number, isCrit: boolean) {
    const formatted = amount >= 1000 ? amount.toLocaleString('en-US', { maximumFractionDigits: 0 }) : amount.toFixed(1);
    const displayText = isCrit ? `+$${formatted} CRIT!` : `+$${formatted}`;
    const textColor = isCrit ? '#ef4444' : '#ffd700';

    const text = this.add.text(x + Phaser.Math.Between(-20, 20), y - 10, displayText, {
      fontFamily: "'Rajdhani', sans-serif",
      fontSize: isCrit ? '26px' : '20px',
      color: textColor,
      fontStyle: 'bold',
      stroke: '#05070a',
      strokeThickness: 3,
    });
    text.setOrigin(0.5, 0.5);

    this.tweens.add({
      targets: text,
      y: y - 80,
      alpha: 0,
      scaleX: isCrit ? 1.3 : 1.1,
      scaleY: isCrit ? 1.3 : 1.1,
      duration: 850,
      ease: 'Cubic.easeOut',
      onComplete: () => text.destroy(),
    });
  }

  private getWeaponBaseScale(): number {
    const width = this.scale.width;
    if (width < 480) return 0.52;
    if (width < 768) return 0.68;
    if (width < 1200) return 0.85;
    return 1.0;
  }

  private updateWeaponScale() {
    const scale = this.getWeaponBaseScale();
    if (this.weaponContainer) {
      this.weaponContainer.setScale(scale);
    }
  }

  private handleResize(gameSize: Phaser.Structs.Size) {
    const { width, height } = gameSize;
    if (this.weaponContainer) {
      this.weaponContainer.setPosition(width / 2, height / 2);
    }
    if (this.pedestalGlow) {
      this.pedestalGlow.setPosition(width / 2, height / 2 + 50);
    }
    if (this.pedestalOuterGlow) {
      this.pedestalOuterGlow.setPosition(width / 2, height / 2 + 55);
    }
    this.updateWeaponScale();
  }
}
