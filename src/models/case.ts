/**
 * Virtual CS2 Case Definitions for CS2 Skin Tycoon
 */

export interface CaseDefinition {
  id: string;
  name: string;
  desc: string;
  costCoins: number;
  requiresKey: boolean;
  themeColor: string;
  skinsPool: string[];
}

export const CASES_CATALOG: CaseDefinition[] = [
  {
    id: 'case_milspec',
    name: 'CS2 Weapon Case #1',
    desc: 'Классический армейский кейс с популярными скинами начального уровня.',
    costCoins: 350,
    requiresKey: false,
    themeColor: '#f59e0b',
    skinsPool: [
      'p250_sand_dune',
      'mp9_storm',
      'mac10_silver',
      'usp_forest',
      'glock_high_beam',
      'p250_valence',
      'ssg08_abyss',
      'm4a4_magnesium',
      'deagle_light_rail',
      'usp_guardian',
      'm4a4_evil_daimyo',
      'm4a1_basilisk',
      'usp_cortex',
    ],
  },
  {
    id: 'case_chroma',
    name: 'Хромированный кейс спецоперации',
    desc: 'Яркие неоновые скины, включая AWP Atheris, AK-47 Slate и Glock Water Elemental.',
    costCoins: 6_500,
    requiresKey: true,
    themeColor: '#8847ff',
    skinsPool: [
      'usp_cortex',
      'awp_capillary',
      'awp_atheris',
      'ak47_slate',
      'mp9_mount_fuji',
      'glock_water_elemental',
      'm4a4_spider_lily',
      'deagle_kumicho_dragon',
      'awp_fever_dream',
      'ak47_redline',
      'm4a4_desolate_space',
    ],
  },
  {
    id: 'case_revolution',
    name: 'Кейс «Революция»',
    desc: 'Элитное тайное оружие: M4A1-S Printstream, Deagle Blaze, M4A4 Asiimov и AK-47 Case Hardened!',
    costCoins: 95_000,
    requiresKey: true,
    themeColor: '#ef4444',
    skinsPool: [
      'm4a4_spider_lily',
      'deagle_code_red',
      'm4a4_desolate_space',
      'ak47_case_hardened',
      'usp_orion',
      'm4a1_player_two',
      'm4a4_the_emperor',
      'm4a1_cyrex',
      'm4a1_printstream',
      'm4a1_hyper_beast',
      'usps_kill_confirmed',
      'deagle_blaze',
    ],
  },
  {
    id: 'case_dreams',
    name: 'Кейс «Грёзы и кошмары»',
    desc: 'Мифический оружейный кейс с AWP Dragon Lore, M4A4 Howl, AK-47 Asiimov и AWP Gungnir.',
    costCoins: 850_000,
    requiresKey: true,
    themeColor: '#06b6d4',
    skinsPool: [
      'm4a1_printstream',
      'm4a1_hyper_beast',
      'usps_kill_confirmed',
      'deagle_blaze',
      'ak47_vulcan',
      'm4a4_asiimov',
      'ak47_asiimov',
      'ak47_the_empress',
      'm4a4_howl',
      'awp_dragon_lore',
      'awp_gungnir',
      'ak47_wild_lotus',
    ],
  },
  {
    id: 'case_knives',
    name: 'Сувенирный кейс «Экстраординарное»',
    desc: 'Золотой сувенирный набор с гарантированным шансом на редчайшие ножи CS2!',
    costCoins: 12_000_000,
    requiresKey: true,
    themeColor: '#ffd700',
    skinsPool: [
      'm4a4_howl',
      'awp_dragon_lore',
      'awp_gungnir',
      'ak47_wild_lotus',
      'ak47_gold_arabesque',
      'karambit_slaughter',
      'karambit_fade',
      'karambit_tiger_tooth',
      'karambit_doppler',
      'butterfly_slaughter',
      'butterfly_fade',
      'butterfly_doppler',
    ],
  },
];
