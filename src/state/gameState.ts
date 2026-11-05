import { soundManager } from '../audio/SoundManager.ts';
import { ECONOMY_CONFIG, formatCurrency } from '../config/economyConfig.ts';
import { 
  PlayerSkin, 
  SteamInventoryItem,
  INITIAL_SKINS_CATALOG, 
  WEAPON_MILESTONES,
  WeaponMilestone,
  getSkinMultiplier, 
  getSkinCondition,
  createInventoryItem
} from '../models/skin.ts';
import { applyMapBackground } from '../assets/assetTextures.ts';
import { 
  PlayerUpgrade, 
  INITIAL_UPGRADES_CATALOG, 
  calcUpgradeCost 
} from '../models/upgrade.ts';
import { 
  PlayerPrestigePerk, 
  PRESTIGE_PERKS_CATALOG 
} from '../models/prestige.ts';
import { 
  PlayerAchievement, 
  TacticalContract, 
  ACHIEVEMENTS_CATALOG 
} from '../models/achievement.ts';
import { 
  CASES_CATALOG 
} from '../models/case.ts';
import { 
  SaveManager, 
  SaveDataV2 
} from './saveManager.ts';
import { yandexGames } from './yandexSdk.ts';

class GameState {
  // Currency & Core Stats
  public balance: number = ECONOMY_CONFIG.STARTING_COINS;
  public allTimeCoins: number = ECONOMY_CONFIG.STARTING_COINS;
  public totalClicks: number = 0;
  public keys: number = ECONOMY_CONFIG.STARTING_KEYS;
  public stars: number = 0; // Prestige currency
  public prestigeCount: number = 0;

  // Level & XP (The clicker weapon levels up directly with player level!)
  public level: number = ECONOMY_CONFIG.STARTING_LEVEL;
  public xp: number = 0;
  public maxXp: number = ECONOMY_CONFIG.BASE_LEVEL_XP;
  public rankName: string = 'Silver I';

  // Primary Tap Weapon (Standalone weapon, not in inventory, levels up as you tap & progress)
  public activeSkinId: string = 'p250_sand_dune';
  public currentBackground: string = 'firing_range';
  public skins: PlayerSkin[] = [];

  // Steam Inventory (Holds ONLY unboxed and upgraded skins)
  public inventory: SteamInventoryItem[] = [];

  // Upgrades (5 Streamlined Core Workshop Mods & Bots)
  public upgrades: PlayerUpgrade[] = [];

  // Prestige Perks
  public prestigePerks: PlayerPrestigePerk[] = [];

  // Achievements & Quests
  public achievements: PlayerAchievement[] = [];
  public contracts: TacticalContract[] = [];

  // Offline Progress
  public offlineSecondsAway: number = 0;
  public offlineCoinsEarned: number = 0;

  // Listeners
  private listeners: Array<() => void> = [];
  private passiveTickerInterval: number | null = null;

  constructor() {
    this.initDefaultData();
    this.loadSavedState();
    this.checkOfflineProgress();
    this.startPassiveTicker();
    SaveManager.startAutoSave(() => this.save());
  }

  private initDefaultData(): void {
    // Skins Catalog for tap weapon
    this.skins = INITIAL_SKINS_CATALOG.map((def, idx) => {
      const isStarter = idx === 0;
      return {
        ...def,
        isUnlocked: isStarter,
        level: isStarter ? this.level : 0,
        floatValue: isStarter ? 0.0142 : 0.045,
        wear: getSkinCondition(isStarter ? 0.0142 : 0.045),
        statTrakKills: isStarter ? 1337 : 0,
      };
    });

    // Steam inventory starts purely empty for dropped/upgraded skins (tap gun is NOT in inventory)
    this.inventory = [];

    // 5 Streamlined Upgrades
    this.upgrades = INITIAL_UPGRADES_CATALOG.map(def => ({
      ...def,
      level: 0,
      cost: def.baseCost,
    }));

    // Prestige Perks Catalog
    this.prestigePerks = PRESTIGE_PERKS_CATALOG.map(def => ({
      ...def,
      level: 0,
    }));

    // Achievements Catalog
    this.achievements = ACHIEVEMENTS_CATALOG.map(def => ({
      ...def,
      currentProgress: 0,
      isUnlocked: false,
      isClaimed: false,
    }));

    this.initDailyContracts();
  }

  private initDailyContracts(): void {
    this.contracts = [
      {
        id: 'daily_clicks',
        title: 'Огневая подготовка',
        desc: 'Сделайте 50 выстрелов по скину (Ур. 1)',
        level: 1,
        current: 0,
        target: 50,
        rewardCoins: 250,
        isCompleted: false,
        isClaimed: false,
      },
      {
        id: 'daily_upgrades',
        title: 'Модернизация цеха',
        desc: 'Приобретите 3 улучшения в Мастерской (Ур. 1)',
        level: 1,
        current: 0,
        target: 3,
        rewardCoins: 500,
        rewardKeys: 1,
        isCompleted: false,
        isClaimed: false,
      },
      {
        id: 'daily_coins',
        title: 'Финансовый план',
        desc: 'Заработайте 5,000 монет за все время (Ур. 1)',
        level: 1,
        current: 0,
        target: 5000,
        rewardCoins: 1200,
        isCompleted: false,
        isClaimed: false,
      },
    ];
  }

  public subscribe(fn: () => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  public notify(): void {
    this.updateRankName();
    for (const listener of this.listeners) {
      try {
        listener();
      } catch (e) {
        console.error('[GameState] Error in state listener:', e);
      }
    }
  }

  // --- Dynamic Tap Weapon & Economy Calculations ---

  public get currentMilestone(): WeaponMilestone {
    let current = WEAPON_MILESTONES[0];
    for (const m of WEAPON_MILESTONES) {
      if (this.level >= m.minLevel) {
        current = m;
      } else {
        break;
      }
    }
    return current;
  }

  public get currentSkin(): PlayerSkin {
    const milestone = this.currentMilestone;
    this.activeSkinId = milestone.skinId;

    const skin = this.skins.find(s => s.id === this.activeSkinId) || this.skins[0];
    skin.level = Math.max(1, this.level);
    return skin;
  }

  public get nextWeaponMilestone(): { milestone: WeaponMilestone; xpNeeded: number; levelsNeeded: number } | null {
    for (const m of WEAPON_MILESTONES) {
      if (this.level < m.minLevel) {
        const levelsNeeded = m.minLevel - this.level;
        let totalXp = this.maxXp - this.xp;
        let tempLvl = this.level + 1;
        while (tempLvl < m.minLevel) {
          totalXp += Math.floor(ECONOMY_CONFIG.BASE_LEVEL_XP * Math.pow(ECONOMY_CONFIG.LEVEL_XP_GROWTH, tempLvl - 1));
          tempLvl++;
        }
        return { milestone: m, xpNeeded: totalXp, levelsNeeded };
      }
    }
    return null;
  }

  public get weaponLevel(): number {
    return Math.max(1, this.level);
  }

  public get weaponLevelMultiplier(): number {
    return 1.0 + (this.weaponLevel - 1) * 0.35;
  }

  public get globalMultiplier(): number {
    let mult = 1.0;
    this.upgrades
      .filter(u => u.category === 'workshop')
      .forEach(u => {
        mult += u.level * u.bonusValue;
      });

    const veteranPerk = this.prestigePerks.find(p => p.id === 'veteran_boost');
    if (veteranPerk && veteranPerk.level > 0) {
      mult += veteranPerk.level * veteranPerk.bonusValue;
    }

    return Math.max(1.0, mult);
  }

  public get clickPower(): number {
    const skin = this.currentSkin;
    const skinMultiplier = getSkinMultiplier(skin) * this.weaponLevelMultiplier;
    const skinClick = skin.baseClickBonus * skinMultiplier;

    let upgradesClick = 0;
    this.upgrades
      .filter(u => u.category === 'click')
      .forEach(u => {
        upgradesClick += u.level * u.bonusValue;
      });

    const baseTotal = ECONOMY_CONFIG.BASE_CLICK_POWER + skinClick + upgradesClick;
    return Math.max(1, baseTotal * this.globalMultiplier);
  }

  public get passiveIncome(): number {
    const skin = this.currentSkin;
    const skinMultiplier = getSkinMultiplier(skin);
    const skinCps = skin.baseCpsBonus * skinMultiplier;

    let upgradesCps = 0;
    this.upgrades
      .filter(u => u.category === 'cps')
      .forEach(u => {
        upgradesCps += u.level * u.bonusValue;
      });

    const baseTotal = skinCps + upgradesCps;
    return baseTotal * this.globalMultiplier;
  }

  public get critChance(): number {
    let chance = ECONOMY_CONFIG.BASE_CRIT_CHANCE;
    this.upgrades
      .filter(u => u.category === 'crit')
      .forEach(u => {
        chance += u.level * u.bonusValue;
      });

    const eyePerk = this.prestigePerks.find(p => p.id === 'tactical_eye');
    if (eyePerk && eyePerk.level > 0) {
      chance += eyePerk.level * eyePerk.bonusValue;
    }

    return Math.min(ECONOMY_CONFIG.MAX_CRIT_CHANCE, chance);
  }

  public get critMultiplier(): number {
    return ECONOMY_CONFIG.BASE_CRIT_MULTIPLIER;
  }

  public get upgradeDiscount(): number {
    const discountPerk = this.prestigePerks.find(p => p.id === 'military_discount');
    if (discountPerk && discountPerk.level > 0) {
      return Math.min(0.40, discountPerk.level * discountPerk.bonusValue);
    }
    return 0;
  }

  public get totalInventoryValue(): number {
    return this.inventory.reduce((sum, item) => sum + item.marketPrice, 0);
  }

  // --- Core Gameplay Actions ---

  public clickSkin(): { earned: number; isCrit: boolean } {
    this.totalClicks++;

    // Increment StatTrak kills on tap weapon
    const skin = this.currentSkin;
    skin.statTrakKills++;

    const isCrit = Math.random() < this.critChance;
    const earned = isCrit ? this.clickPower * this.critMultiplier : this.clickPower;

    this.addCoins(earned);
    this.addXp(isCrit ? ECONOMY_CONFIG.CRIT_XP_BONUS : ECONOMY_CONFIG.BASE_XP_PER_CLICK);

    this.syncContractsProgress();
    this.checkAchievements();
    soundManager.playClick(isCrit);
    this.notify();

    return { earned, isCrit };
  }

  public addCoins(amount: number): void {
    if (amount <= 0) return;
    this.balance += amount;
    this.allTimeCoins += amount;
    this.syncContractsProgress();
    this.checkAchievements();
  }

  public addXp(amount: number): void {
    this.xp += amount;
    let leveledUp = false;

    while (this.xp >= this.maxXp) {
      this.level++;
      this.xp -= this.maxXp;
      this.maxXp = Math.floor(ECONOMY_CONFIG.BASE_LEVEL_XP * Math.pow(ECONOMY_CONFIG.LEVEL_XP_GROWTH, this.level - 1));
      this.keys++;
      leveledUp = true;
    }

    if (leveledUp) {
      const skin = this.currentSkin;
      skin.level = this.level;
      skin.floatValue = Math.max(0.001, skin.floatValue * 0.95);
      skin.wear = getSkinCondition(skin.floatValue);

      soundManager.playBuy();

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('weapon-levelup', {
          detail: { newLevel: this.level, weaponName: skin.name }
        }));
      }
    }
  }

  private updateRankName(): void {
    if (this.level >= 40) this.rankName = 'The Global Elite';
    else if (this.level >= 35) this.rankName = 'Supreme First Class';
    else if (this.level >= 30) this.rankName = 'Legendary Eagle Master';
    else if (this.level >= 25) this.rankName = 'Distinguished Master';
    else if (this.level >= 20) this.rankName = 'Master Guardian Elite';
    else if (this.level >= 15) this.rankName = 'Master Guardian II';
    else if (this.level >= 10) this.rankName = 'Gold Nova Master';
    else if (this.level >= 6) this.rankName = 'Gold Nova II';
    else if (this.level >= 3) this.rankName = 'Silver Elite Master';
    else this.rankName = 'Silver IV';
  }

  public setBackground(bgId: string): void {
    this.currentBackground = bgId;
    applyMapBackground(bgId);
    soundManager.playClick();
    this.save();
  }

  // --- Upgrades Management ---

  public buyUpgrade(upgradeId: string): boolean {
    const upg = this.upgrades.find(u => u.id === upgradeId);
    if (!upg) return false;

    const actualCost = Math.floor(upg.cost * (1 - this.upgradeDiscount));
    if (this.balance < actualCost) return false;

    this.balance -= actualCost;
    upg.level++;
    upg.cost = calcUpgradeCost(upg, upg.level);

    this.syncContractsProgress();
    this.checkAchievements();

    soundManager.playBuy();
    this.notify();
    this.save();
    return true;
  }

  // --- Steam Inventory Management (Unboxed & Upgraded skins only) ---

  public sellInventoryItem(instanceId: string): { success: boolean; earned: number } {
    const index = this.inventory.findIndex(i => i.instanceId === instanceId);
    if (index === -1) return { success: false, earned: 0 };

    const item = this.inventory[index];
    const earned = item.marketPrice;

    this.inventory.splice(index, 1);
    this.addCoins(earned);

    soundManager.playBuy();
    this.notify();
    this.save();
    return { success: true, earned };
  }

  // --- CS2 Upgrader / Trade Up Wheel System ---

  public calculateUpgradeChance(sourceItemPrice: number, targetSkinCost: number): { winChance: number; multiplier: number } {
    if (targetSkinCost <= 0) return { winChance: 95, multiplier: 1 };

    const rawChance = (sourceItemPrice / targetSkinCost) * 100 * 0.95;
    const winChance = Math.min(85, Math.max(1, Math.round(rawChance * 10) / 10));
    const multiplier = Math.max(1.05, Math.round((targetSkinCost / Math.max(1, sourceItemPrice)) * 100) / 100);

    return { winChance, multiplier };
  }

  public executeUpgrade(
    sourceInstanceId: string, 
    targetSkinId: string
  ): { 
    success: boolean; 
    won: boolean; 
    roll: number; 
    winChance: number; 
    targetItem?: SteamInventoryItem; 
    lostItemName: string;
  } {
    const sourceIndex = this.inventory.findIndex(i => i.instanceId === sourceInstanceId);
    if (sourceIndex === -1) {
      return { success: false, won: false, roll: 0, winChance: 0, lostItemName: '' };
    }

    const sourceItem = this.inventory[sourceIndex];
    const targetDef = INITIAL_SKINS_CATALOG.find(s => s.id === targetSkinId);
    if (!targetDef) {
      return { success: false, won: false, roll: 0, winChance: 0, lostItemName: '' };
    }

    const { winChance } = this.calculateUpgradeChance(sourceItem.marketPrice, targetDef.baseCost);
    const roll = +(Math.random() * 100).toFixed(1);
    const won = roll <= winChance;
    const lostItemName = sourceItem.name;

    // Burn source item from inventory
    this.inventory.splice(sourceIndex, 1);

    let targetItem: SteamInventoryItem | undefined;

    if (won) {
      targetItem = createInventoryItem(targetDef, 'contract');
      this.inventory.unshift(targetItem);
    }

    this.checkAchievements();
    this.notify();
    this.save();

    return {
      success: true,
      won,
      roll,
      winChance,
      targetItem,
      lostItemName,
    };
  }

  // --- Virtual Cases Unboxing ---

  public openCase(caseId: string): { success: boolean; skin?: PlayerSkin; item?: SteamInventoryItem } {
    const caseDef = CASES_CATALOG.find(c => c.id === caseId);
    if (!caseDef) return { success: false };

    if (this.balance < caseDef.costCoins) return { success: false };
    if (caseDef.requiresKey && this.keys <= 0) return { success: false };

    this.balance -= caseDef.costCoins;
    if (caseDef.requiresKey) {
      this.keys--;
    }

    const pool = INITIAL_SKINS_CATALOG.filter(s => caseDef.skinsPool.includes(s.id));
    if (pool.length === 0) return { success: false };

    // Group skins by rarity tier present in this case
    const rarityRank: Record<string, number> = {
      consumer: 1,
      industrial: 2,
      milSpec: 3,
      restricted: 4,
      classified: 5,
      covert: 6,
      special: 7,
    };

    const tiersMap = new Map<string, typeof pool>();
    pool.forEach(s => {
      if (!tiersMap.has(s.rarity)) tiersMap.set(s.rarity, []);
      tiersMap.get(s.rarity)!.push(s);
    });

    // Sort distinct tiers from lowest to highest
    const sortedTiers = Array.from(tiersMap.keys()).sort(
      (a, b) => (rarityRank[a] || 0) - (rarityRank[b] || 0)
    );

    // Authentic CS2 probability distribution for tiers (yielding ~40% return to player)
    let tierProbabilities: number[] = [];
    if (sortedTiers.length >= 5) {
      tierProbabilities = [0.7992, 0.1598, 0.0320, 0.0064, 0.0026];
    } else if (sortedTiers.length === 4) {
      tierProbabilities = [0.7992, 0.1598, 0.0346, 0.0064];
    } else if (sortedTiers.length === 3) {
      tierProbabilities = [0.8000, 0.1650, 0.0350];
    } else if (sortedTiers.length === 2) {
      tierProbabilities = [0.8400, 0.1600];
    } else {
      tierProbabilities = [1.0];
    }

    const rnd = Math.random();
    let cumulative = 0;
    let selectedTier = sortedTiers[0];

    for (let i = 0; i < sortedTiers.length; i++) {
      cumulative += tierProbabilities[i] || 0;
      if (rnd <= cumulative) {
        selectedTier = sortedTiers[i];
        break;
      }
    }

    const candidateSkins = tiersMap.get(selectedTier) || pool;
    const chosenDef = candidateSkins[Math.floor(Math.random() * candidateSkins.length)];

    // Create item with 10% StatTrak chance and float-based valuation
    const newItem = createInventoryItem(chosenDef, 'case');
    this.inventory.unshift(newItem);

    soundManager.playBuy();
    this.checkAchievements();
    this.notify();
    this.save();

    return {
      success: true,
      item: newItem,
    };
  }

  // --- Prestige (Service Medal) ---

  public canPrestige(): boolean {
    return this.allTimeCoins >= ECONOMY_CONFIG.PRESTIGE_MIN_ALLTIME_COINS;
  }

  public getPrestigeStarsReward(): number {
    return ECONOMY_CONFIG.calcPrestigeStars(this.allTimeCoins);
  }

  public doPrestige(): boolean {
    if (!this.canPrestige()) return false;

    const starsAwarded = this.getPrestigeStarsReward();
    this.stars += starsAwarded;
    this.prestigeCount++;

    let startingCoins = ECONOMY_CONFIG.STARTING_COINS;
    const stashPerk = this.prestigePerks.find(p => p.id === 'starter_stash');
    if (stashPerk && stashPerk.level > 0) {
      startingCoins += stashPerk.level * stashPerk.bonusValue;
    }

    this.balance = startingCoins;
    this.allTimeCoins = startingCoins;

    this.upgrades.forEach(u => {
      u.level = 0;
      u.cost = u.baseCost;
    });

    soundManager.playPrestige();
    this.notify();
    this.save();
    return true;
  }

  public buyPrestigePerk(perkId: string): boolean {
    const perk = this.prestigePerks.find(p => p.id === perkId);
    if (!perk || perk.level >= perk.maxLevel || this.stars < perk.costInStars) return false;

    this.stars -= perk.costInStars;
    perk.level++;

    soundManager.playBuy();
    this.notify();
    this.save();
    return true;
  }

  // --- Achievements & Contracts ---

  public checkAchievements(): void {
    const invCount = this.inventory.length;
    const hasCovert = this.inventory.some(s => s.rarity === 'covert');
    const hasKnife = this.inventory.some(s => s.rarity === 'special');

    this.achievements.forEach(ach => {
      if (ach.isUnlocked) return;

      let current = 0;
      switch (ach.id) {
        case 'first_shot':
        case 'gunner_100':
        case 'machinegun_1000':
        case 'rambo_10000':
          current = this.totalClicks;
          break;
        case 'first_thousand':
        case 'first_hundred_thousand':
        case 'millionaire':
          current = this.allTimeCoins;
          break;
        case 'passive_100':
        case 'passive_5000':
          current = this.passiveIncome;
          break;
        case 'arsenal_3':
        case 'arsenal_7':
          current = invCount;
          break;
        case 'own_covert':
          current = hasCovert ? 1 : 0;
          break;
        case 'own_knife':
          current = hasKnife ? 1 : 0;
          break;
        case 'first_prestige':
          current = this.prestigeCount;
          break;
      }

      ach.currentProgress = current;
      if (current >= ach.target) {
        ach.isUnlocked = true;
      }
    });
  }

  public claimAchievement(achId: string): boolean {
    const ach = this.achievements.find(a => a.id === achId);
    if (!ach || !ach.isUnlocked || ach.isClaimed) return false;

    ach.isClaimed = true;
    if (ach.rewardCoins) this.addCoins(ach.rewardCoins);
    if (ach.rewardKeys) this.keys += ach.rewardKeys;
    if (ach.rewardStars) this.stars += ach.rewardStars;

    soundManager.playBuy();
    this.notify();
    this.save();
    return true;
  }

  public syncContractsProgress(): void {
    const clickContract = this.contracts.find(c => c.id === 'daily_clicks');
    if (clickContract) {
      clickContract.current = this.totalClicks;
      clickContract.isCompleted = clickContract.current >= clickContract.target;
    }

    const coinContract = this.contracts.find(c => c.id === 'daily_coins');
    if (coinContract) {
      coinContract.current = Math.floor(this.allTimeCoins);
      coinContract.isCompleted = coinContract.current >= coinContract.target;
    }

    const upgContract = this.contracts.find(c => c.id === 'daily_upgrades');
    if (upgContract) {
      const totalUpgLevels = this.upgrades.reduce((sum, u) => sum + u.level, 0);
      upgContract.current = totalUpgLevels;
      upgContract.isCompleted = upgContract.current >= upgContract.target;
    }
  }

  private advanceContractToNextLevel(c: TacticalContract): void {
    const lvl = c.level;
    c.isClaimed = false;

    if (c.id === 'daily_clicks') {
      if (lvl === 2) {
        c.target = 150;
        c.rewardCoins = 750;
        c.rewardKeys = 1;
      } else if (lvl === 3) {
        c.target = 400;
        c.rewardCoins = 2000;
        c.rewardKeys = 1;
      } else if (lvl === 4) {
        c.target = 1000;
        c.rewardCoins = 6000;
        c.rewardKeys = 2;
      } else if (lvl === 5) {
        c.target = 2500;
        c.rewardCoins = 18000;
        c.rewardKeys = 2;
      } else {
        c.target = Math.floor(2500 * Math.pow(2.2, lvl - 5));
        c.rewardCoins = Math.floor(18000 * Math.pow(2.4, lvl - 5));
        c.rewardKeys = 3;
      }
      c.desc = `Сделайте ${c.target.toLocaleString()} выстрелов по скину (Ур. ${lvl})`;
    } else if (c.id === 'daily_upgrades') {
      if (lvl === 2) {
        c.target = 8;
        c.rewardCoins = 2000;
        c.rewardKeys = 1;
      } else if (lvl === 3) {
        c.target = 18;
        c.rewardCoins = 8000;
        c.rewardKeys = 2;
      } else if (lvl === 4) {
        c.target = 35;
        c.rewardCoins = 25000;
        c.rewardKeys = 2;
      } else {
        c.target = Math.floor(35 * Math.pow(1.8, lvl - 4));
        c.rewardCoins = Math.floor(25000 * Math.pow(2.2, lvl - 4));
        c.rewardKeys = 3;
      }
      c.desc = `Приобретите ${c.target} улучшений в Мастерской (Ур. ${lvl})`;
    } else if (c.id === 'daily_coins') {
      if (lvl === 2) {
        c.target = 25000;
        c.rewardCoins = 6000;
        c.rewardKeys = 1;
      } else if (lvl === 3) {
        c.target = 150000;
        c.rewardCoins = 35000;
        c.rewardKeys = 2;
      } else if (lvl === 4) {
        c.target = 800000;
        c.rewardCoins = 180000;
        c.rewardKeys = 2;
      } else if (lvl === 5) {
        c.target = 5000000;
        c.rewardCoins = 1000000;
        c.rewardKeys = 3;
      } else {
        c.target = Math.floor(5000000 * Math.pow(5, lvl - 5));
        c.rewardCoins = Math.floor(1000000 * Math.pow(5, lvl - 5));
        c.rewardKeys = 4;
      }
      c.desc = `Заработайте $${formatCurrency(c.target)} за все время (Ур. ${lvl})`;
    }

    // Immediately re-sync: if player already passed this new target, it is immediately completed!
    this.syncContractsProgress();
  }

  public claimContract(contractId: string): boolean {
    const c = this.contracts.find(item => item.id === contractId);
    if (!c || !c.isCompleted) return false;

    // Grant rewards
    if (c.rewardCoins) this.addCoins(c.rewardCoins);
    if (c.rewardKeys) this.keys += c.rewardKeys;

    soundManager.playBuy();

    // Advance to next level!
    c.level = (c.level || 1) + 1;
    this.advanceContractToNextLevel(c);

    this.notify();
    this.save();
    return true;
  }

  public resetAllProgress(): void {
    SaveManager.clearSave();
    this.balance = ECONOMY_CONFIG.STARTING_COINS;
    this.allTimeCoins = ECONOMY_CONFIG.STARTING_COINS;
    this.totalClicks = 0;
    this.keys = ECONOMY_CONFIG.STARTING_KEYS;
    this.stars = 0;
    this.prestigeCount = 0;
    this.level = ECONOMY_CONFIG.STARTING_LEVEL;
    this.xp = 0;
    this.maxXp = ECONOMY_CONFIG.BASE_LEVEL_XP;
    this.inventory = [];
    this.initDefaultData();
    this.notify();
    this.save();
  }

  // --- Offline Progress Calculation ---

  private checkOfflineProgress(): void {
    const saved = SaveManager.loadFromLocal();
    if (!saved || !saved.savedAt) return;

    const now = Date.now();
    const elapsedSeconds = Math.floor((now - saved.savedAt) / 1000);

    if (elapsedSeconds >= ECONOMY_CONFIG.MIN_OFFLINE_SECONDS_FOR_CLAIM && this.passiveIncome > 0) {
      const cappedSeconds = Math.min(ECONOMY_CONFIG.MAX_OFFLINE_SECONDS, elapsedSeconds);
      const earned = Math.floor(cappedSeconds * this.passiveIncome * ECONOMY_CONFIG.OFFLINE_EFFICIENCY);

      if (earned > 0) {
        this.offlineSecondsAway = cappedSeconds;
        this.offlineCoinsEarned = earned;
      }
    }
  }

  public claimOfflineReward(): number {
    const reward = this.offlineCoinsEarned;
    if (reward > 0) {
      this.addCoins(reward);
      this.offlineCoinsEarned = 0;
      this.offlineSecondsAway = 0;
      soundManager.playBuy();
      this.notify();
      this.save();
    }
    return reward;
  }

  // --- Passive Income Ticker ---

  private startPassiveTicker(): void {
    if (this.passiveTickerInterval) return;
    const tickRateMs = 100;
    this.passiveTickerInterval = window.setInterval(() => {
      const cps = this.passiveIncome;
      if (cps > 0) {
        const increment = (cps * tickRateMs) / 1000;
        this.addCoins(increment);
        this.notify();
      }
    }, tickRateMs);
  }

  // --- Persistence & State Loading ---

  public save(): void {
    const data: SaveDataV2 = {
      version: '2.1.0',
      savedAt: Date.now(),
      balance: this.balance,
      allTimeCoins: this.allTimeCoins,
      totalClicks: this.totalClicks,
      keys: this.keys,
      stars: this.stars,
      prestigeCount: this.prestigeCount,
      level: this.level,
      xp: this.xp,
      maxXp: this.maxXp,
      activeSkinId: this.activeSkinId,
      currentBackground: this.currentBackground,
      inventory: this.inventory,
      skins: {},
      upgrades: {},
      prestigePerks: {},
      achievements: {},
      contracts: this.contracts.map(c => ({
        id: c.id,
        level: c.level || 1,
        current: c.current,
        isCompleted: c.isCompleted,
        isClaimed: c.isClaimed,
      })),
    };

    this.skins.forEach(s => {
      data.skins[s.id] = {
        isUnlocked: s.isUnlocked,
        level: s.level,
        floatValue: s.floatValue,
        statTrakKills: s.statTrakKills,
      };
    });

    this.upgrades.forEach(u => {
      data.upgrades[u.id] = u.level;
    });

    this.prestigePerks.forEach(p => {
      data.prestigePerks[p.id] = p.level;
    });

    this.achievements.forEach(a => {
      data.achievements[a.id] = {
        isUnlocked: a.isUnlocked,
        isClaimed: a.isClaimed,
      };
    });

    SaveManager.saveToLocal(data);
    yandexGames.saveCloudData(data as unknown as Record<string, unknown>);
  }

  public loadSavedState(): void {
    const saved = SaveManager.loadFromLocal();
    if (!saved) return;

    try {
      this.balance = typeof saved.balance === 'number' ? saved.balance : this.balance;
      this.allTimeCoins = typeof saved.allTimeCoins === 'number' ? saved.allTimeCoins : this.allTimeCoins;
      this.totalClicks = typeof saved.totalClicks === 'number' ? saved.totalClicks : 0;
      this.keys = typeof saved.keys === 'number' ? saved.keys : 2;
      this.stars = typeof saved.stars === 'number' ? saved.stars : 0;
      this.prestigeCount = typeof saved.prestigeCount === 'number' ? saved.prestigeCount : 0;
      this.level = typeof saved.level === 'number' ? saved.level : 1;
      this.xp = typeof saved.xp === 'number' ? saved.xp : 0;
      this.maxXp = typeof saved.maxXp === 'number' ? saved.maxXp : ECONOMY_CONFIG.BASE_LEVEL_XP;

      if (saved.currentBackground) {
        this.currentBackground = saved.currentBackground;
      }

      // Filter out any starter items from inventory so tap weapon is never in inventory
      if (Array.isArray(saved.inventory)) {
        this.inventory = saved.inventory.filter(i => i.source !== 'starter');
      }

      // Restore skins
      if (saved.skins) {
        Object.entries(saved.skins).forEach(([id, sData]) => {
          const skin = this.skins.find(s => s.id === id);
          if (skin) {
            skin.isUnlocked = !!sData.isUnlocked;
            skin.level = sData.level || (skin.isUnlocked ? this.level : 0);
            skin.floatValue = sData.floatValue || 0.0142;
            skin.wear = getSkinCondition(skin.floatValue);
            skin.statTrakKills = sData.statTrakKills || 0;
          }
        });
      }

      // Restore upgrades
      if (saved.upgrades) {
        Object.entries(saved.upgrades).forEach(([id, lvl]) => {
          const upg = this.upgrades.find(u => u.id === id);
          if (upg) {
            upg.level = lvl;
            upg.cost = calcUpgradeCost(upg, upg.level);
          }
        });
      }

      // Restore prestige perks
      if (saved.prestigePerks) {
        Object.entries(saved.prestigePerks).forEach(([id, lvl]) => {
          const perk = this.prestigePerks.find(p => p.id === id);
          if (perk) perk.level = lvl;
        });
      }

      // Restore achievements
      if (saved.achievements) {
        Object.entries(saved.achievements).forEach(([id, aData]) => {
          const ach = this.achievements.find(a => a.id === id);
          if (ach) {
            ach.isUnlocked = !!aData.isUnlocked;
            ach.isClaimed = !!aData.isClaimed;
          }
        });
      }

      // Restore contracts
      if (Array.isArray(saved.contracts)) {
        saved.contracts.forEach(savedC => {
          const c = this.contracts.find(item => item.id === savedC.id);
          if (c) {
            c.level = savedC.level || 1;
            c.current = savedC.current;
            c.isCompleted = savedC.isCompleted;
            c.isClaimed = savedC.isClaimed;
            // Update target/desc if saved level is higher
            if (c.level > 1) {
              this.advanceContractToNextLevel(c);
            }
          }
        });
      }
      this.syncContractsProgress();
    } catch (e) {
      console.error('[GameState] Error parsing saved data:', e);
    }
  }
}

export const gameState = new GameState();
