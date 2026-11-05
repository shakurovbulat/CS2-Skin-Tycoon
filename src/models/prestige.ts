/**
 * Prestige (Service Medal) system models and perks
 */

export interface PrestigePerkDefinition {
  id: string;
  name: string;
  desc: string;
  costInStars: number;
  bonusValue: number;
  maxLevel: number;
  icon: string;
}

export interface PlayerPrestigePerk extends PrestigePerkDefinition {
  level: number;
}

export const PRESTIGE_PERKS_CATALOG: PrestigePerkDefinition[] = [
  {
    id: 'veteran_boost',
    name: 'Ветеранский бонус',
    desc: 'Увеличивает весь заработок (клики и боты) на +25% за уровень.',
    costInStars: 1,
    bonusValue: 0.25, // +25% global earnings
    maxLevel: 10,
    icon: 'shield',
  },
  {
    id: 'tactical_eye',
    name: 'Тактический прицел',
    desc: 'Постоянно увеличивает базовый шанс крита на +4% за уровень.',
    costInStars: 2,
    bonusValue: 0.04, // +4% crit chance
    maxLevel: 5,
    icon: 'crosshair',
  },
  {
    id: 'starter_stash',
    name: 'Стартовый тайник',
    desc: 'Каждый новый сброс начинается с +2,500 монет за уровень.',
    costInStars: 1,
    bonusValue: 2500,
    maxLevel: 10,
    icon: 'money',
  },
  {
    id: 'military_discount',
    name: 'Военный госзаказ',
    desc: 'Снижает базовую стоимость всех улучшений в магазине на -8%.',
    costInStars: 2,
    bonusValue: 0.08,
    maxLevel: 5,
    icon: 'hammer',
  },
];
