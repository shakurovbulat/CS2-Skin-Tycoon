/**
 * Upgrades model and initial configurations for CS2 Skin Tycoon
 * Streamlined to 5 core impactful workshop modifications & bots.
 */

export type UpgradeCategory = 'click' | 'cps' | 'workshop' | 'crit';

export interface UpgradeDefinition {
  id: string;
  name: string;
  desc: string;
  category: UpgradeCategory;
  baseCost: number;
  costMultiplier: number;
  bonusValue: number;
  iconType: string;
  rarityColor: string;
  unlockRequirement?: {
    level?: number;
    allTimeCoins?: number;
  };
}

export interface PlayerUpgrade extends UpgradeDefinition {
  level: number;
  cost: number;
}

export const INITIAL_UPGRADES_CATALOG: UpgradeDefinition[] = [
  // 1. Click Power
  {
    id: 'tactical_gloves',
    name: 'Тактические перчатки',
    desc: 'Усиливают отдачу монет за каждый выстрел кликера.',
    category: 'click',
    baseCost: 25,
    costMultiplier: 1.18,
    bonusValue: 3,
    iconType: 'gloves',
    rarityColor: '#b0c3d9',
  },

  // 2. Automated Bot 1
  {
    id: 'bot_clicker',
    name: 'Авто-Кликер Bot v1',
    desc: 'Базовый торговый бот, собирающий монеты в фоновом режиме.',
    category: 'cps',
    baseCost: 60,
    costMultiplier: 1.16,
    bonusValue: 2.0,
    iconType: 'bot',
    rarityColor: '#5e98d9',
  },

  // 3. Automated Bot 2
  {
    id: 'market_sniper',
    name: 'Steam Sniper Bot v2',
    desc: 'Продвинутый алгоритм снайпит выгодные лоты на площадке.',
    category: 'cps',
    baseCost: 450,
    costMultiplier: 1.20,
    bonusValue: 18.0,
    iconType: 'sniper',
    rarityColor: '#4b69ff',
    unlockRequirement: { level: 2 },
  },

  // 4. Critical Hits
  {
    id: 'pattern_gem',
    name: 'Паттерн Blue Gem',
    desc: 'Повышает вероятность критического выстрела с множителем x3.0.',
    category: 'crit',
    baseCost: 1_200,
    costMultiplier: 1.30,
    bonusValue: 0.04,
    iconType: 'diamond',
    rarityColor: '#8847ff',
    unlockRequirement: { level: 3 },
  },

  // 5. Global Workshop Multiplier
  {
    id: 'workshop_nanotech',
    name: 'Мастерская CS2',
    desc: 'Повышает общую доходность всей экономики (клики и боты) на +15%.',
    category: 'workshop',
    baseCost: 8_000,
    costMultiplier: 1.45,
    bonusValue: 0.15,
    iconType: 'hammer',
    rarityColor: '#eb4b4b',
    unlockRequirement: { level: 5 },
  },
];

export function calcUpgradeCost(upg: UpgradeDefinition, currentLevel: number): number {
  return Math.floor(upg.baseCost * Math.pow(upg.costMultiplier, currentLevel));
}
