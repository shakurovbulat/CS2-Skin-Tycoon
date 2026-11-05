/**
 * Achievements and Tactical Contracts Models
 */

export interface AchievementDefinition {
  id: string;
  title: string;
  desc: string;
  category: 'combat' | 'economy' | 'arsenal' | 'prestige';
  target: number;
  rewardCoins: number;
  rewardKeys?: number;
  rewardStars?: number;
}

export interface PlayerAchievement extends AchievementDefinition {
  currentProgress: number;
  isUnlocked: boolean;
  isClaimed: boolean;
}

export interface TacticalContract {
  id: string;
  title: string;
  desc: string;
  level: number;
  current: number;
  target: number;
  rewardCoins: number;
  rewardKeys?: number;
  isCompleted: boolean;
  isClaimed: boolean;
}

export const ACHIEVEMENTS_CATALOG: AchievementDefinition[] = [
  // Combat
  {
    id: 'first_shot',
    title: 'Первый выстрел',
    desc: 'Сделайте ваш первый выстрел по скину.',
    category: 'combat',
    target: 1,
    rewardCoins: 50,
  },
  {
    id: 'gunner_100',
    title: 'Меткий стрелок',
    desc: 'Произведите 100 выстрелов по скину.',
    category: 'combat',
    target: 100,
    rewardCoins: 500,
  },
  {
    id: 'machinegun_1000',
    title: 'Шквальный огонь',
    desc: 'Произведите 1,000 выстрелов по скину.',
    category: 'combat',
    target: 1_000,
    rewardCoins: 5_000,
    rewardKeys: 1,
  },
  {
    id: 'rambo_10000',
    title: 'Мастер StatTrak™',
    desc: 'Произведите 10,000 выстрелов по скину.',
    category: 'combat',
    target: 10_000,
    rewardCoins: 50_000,
    rewardKeys: 3,
  },

  // Economy
  {
    id: 'first_thousand',
    title: 'Первый капитал',
    desc: 'Заработайте свои первые 1,000 монет.',
    category: 'economy',
    target: 1_000,
    rewardCoins: 250,
  },
  {
    id: 'first_hundred_thousand',
    title: 'Трейдер скинов',
    desc: 'Заработайте в общей сложности 100,000 монет.',
    category: 'economy',
    target: 100_000,
    rewardCoins: 15_000,
    rewardKeys: 1,
  },
  {
    id: 'millionaire',
    title: 'Скин-миллионер',
    desc: 'Заработайте 1,000,000 монет за все время.',
    category: 'economy',
    target: 1_000_000,
    rewardCoins: 100_000,
    rewardKeys: 2,
    rewardStars: 2,
  },
  {
    id: 'passive_100',
    title: 'Автоматизация цеха',
    desc: 'Достигните пассивного дохода более 100 монет в секунду.',
    category: 'economy',
    target: 100,
    rewardCoins: 2_500,
  },
  {
    id: 'passive_5000',
    title: 'Промышленный размах',
    desc: 'Достигните пассивного дохода более 5,000 монет в секунду.',
    category: 'economy',
    target: 5_000,
    rewardCoins: 75_000,
    rewardKeys: 2,
  },

  // Arsenal
  {
    id: 'arsenal_3',
    title: 'Начинающий коллекционер',
    desc: 'Разблокируйте 3 различных скина в арсенале.',
    category: 'arsenal',
    target: 3,
    rewardCoins: 2_000,
    rewardKeys: 1,
  },
  {
    id: 'arsenal_7',
    title: 'Арсенал спецоперации',
    desc: 'Разблокируйте 7 различных скинов в арсенале.',
    category: 'arsenal',
    target: 7,
    rewardCoins: 35_000,
    rewardKeys: 2,
  },
  {
    id: 'own_covert',
    title: 'Тайное знание',
    desc: 'Получите в коллекцию скин категории «Тайное» (Covert).',
    category: 'arsenal',
    target: 1,
    rewardCoins: 50_000,
    rewardKeys: 2,
  },
  {
    id: 'own_knife',
    title: 'Венец коллекции',
    desc: 'Получите в коллекцию Экстраординарный нож (Special Grade).',
    category: 'arsenal',
    target: 1,
    rewardCoins: 500_000,
    rewardKeys: 5,
    rewardStars: 5,
  },

  // Prestige
  {
    id: 'first_prestige',
    title: 'Медаль за службу',
    desc: 'Совершите свой первый Престижный сброс.',
    category: 'prestige',
    target: 1,
    rewardCoins: 25_000,
    rewardStars: 5,
  },
];
