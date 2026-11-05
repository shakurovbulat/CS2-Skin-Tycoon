/**
 * Complete CS2 Skins Catalog & Steam Inventory Models for CS2 Skin Tycoon
 * Features over 80+ iconic, authentic skins from CS2 / CS:GO across all tiers.
 */

export type SkinRarity = 
  | 'consumer'
  | 'industrial'
  | 'milSpec'
  | 'restricted'
  | 'classified'
  | 'covert'
  | 'special';

export type WeaponCategory = 'pistol' | 'rifle' | 'sniper' | 'knife';

export interface SkinDefinition {
  id: string;
  name: string;
  category: WeaponCategory;
  categoryName: string;
  rarity: SkinRarity;
  rarityName: string;
  rarityColor: string;
  baseCost: number;
  baseClickBonus: number;
  baseCpsBonus: number;
  textureKey: string;
  statTrak: boolean;
  desc: string;
}

export interface PlayerSkin extends SkinDefinition {
  isUnlocked: boolean;
  level: number;
  floatValue: number;
  wear: string;
  statTrakKills: number;
}

export interface WeaponMilestone {
  minLevel: number;
  skinId: string;
  name: string;
  categoryName: string;
  rarityName: string;
  rarityColor: string;
  bonusDesc: string;
  textureKey: string;
}

export const WEAPON_MILESTONES: WeaponMilestone[] = [
  {
    minLevel: 1,
    skinId: 'p250_sand_dune',
    name: 'P250 | Sand Dune',
    categoryName: 'Пистолет',
    rarityName: 'Ширпотреб',
    rarityColor: '#b0c3d9',
    bonusDesc: 'Базовый кликер спецназа',
    textureKey: 'p250_sand_dune',
  },
  {
    minLevel: 3,
    skinId: 'glock_high_beam',
    name: 'Glock-18 | High Beam',
    categoryName: 'Пистолет',
    rarityName: 'Промышленное',
    rarityColor: '#5e98d9',
    bonusDesc: '+20 к базовому урону выстрела',
    textureKey: 'glock_high_beam',
  },
  {
    minLevel: 5,
    skinId: 'deagle_light_rail',
    name: 'Desert Eagle | Light Rail',
    categoryName: 'Тяжелый пистолет',
    rarityName: 'Армейское',
    rarityColor: '#4b69ff',
    bonusDesc: '+150 к базовому урону выстрела',
    textureKey: 'deagle_light_rail',
  },
  {
    minLevel: 8,
    skinId: 'mp9_mount_fuji',
    name: 'MP9 | Mount Fuji',
    categoryName: 'ПП',
    rarityName: 'Запрещенное',
    rarityColor: '#8847ff',
    bonusDesc: '+1,400 к базовому урону выстрела',
    textureKey: 'mp9_mount_fuji',
  },
  {
    minLevel: 12,
    skinId: 'm4a4_magnesium',
    name: 'M4A4 | Magnesium',
    categoryName: 'Штурмовая винтовка',
    rarityName: 'Армейское',
    rarityColor: '#4b69ff',
    bonusDesc: '+3,500 к базовому урону выстрела',
    textureKey: 'm4a4_magnesium',
  },
  {
    minLevel: 16,
    skinId: 'ak47_redline',
    name: 'AK-47 | Redline',
    categoryName: 'Штурмовая винтовка',
    rarityName: 'Засекреченное',
    rarityColor: '#d32ce6',
    bonusDesc: '+12,000 к базовому урону выстрела',
    textureKey: 'ak47_redline',
  },
  {
    minLevel: 22,
    skinId: 'm4a1_printstream',
    name: 'M4A1-S | Printstream',
    categoryName: 'Винтовка с глушителем',
    rarityName: 'Тайное',
    rarityColor: '#eb4b4b',
    bonusDesc: '+48,000 к базовому урону выстрела',
    textureKey: 'm4a1_printstream',
  },
  {
    minLevel: 28,
    skinId: 'awp_atheris',
    name: 'AWP | Atheris',
    categoryName: 'Снайперская винтовка',
    rarityName: 'Запрещенное',
    rarityColor: '#8847ff',
    bonusDesc: '+150,000 к базовому урону выстрела',
    textureKey: 'awp_atheris',
  },
  {
    minLevel: 35,
    skinId: 'ak47_case_hardened',
    name: 'AK-47 | Case Hardened',
    categoryName: 'Штурмовая винтовка',
    rarityName: 'Засекреченное',
    rarityColor: '#d32ce6',
    bonusDesc: '+450,000 к базовому урону выстрела',
    textureKey: 'ak47_case_hardened',
  },
  {
    minLevel: 42,
    skinId: 'm4a4_howl',
    name: 'M4A4 | Howl',
    categoryName: 'Штурмовая винтовка',
    rarityName: 'Контрабанда',
    rarityColor: '#eb4b4b',
    bonusDesc: '+1,200,000 к базовому урону выстрела',
    textureKey: 'm4a4_howl',
  },
  {
    minLevel: 50,
    skinId: 'awp_dragon_lore',
    name: 'AWP | Dragon Lore',
    categoryName: 'Снайперская винтовка',
    rarityName: 'Тайное',
    rarityColor: '#eb4b4b',
    bonusDesc: '+3,500,000 к базовому урону выстрела',
    textureKey: 'awp_dragon_lore',
  },
  {
    minLevel: 60,
    skinId: 'karambit_fade',
    name: '★ Karambit | Fade',
    categoryName: 'Керамбит',
    rarityName: 'Экстраординарное',
    rarityColor: '#ffd700',
    bonusDesc: '+10,000,000 к базовому урону выстрела',
    textureKey: 'karambit_fade',
  },
];

/**
 * Steam-like Inventory Item instance (authentic Steam item with unique instanceId, float, wear, price)
 */
export interface SteamInventoryItem {
  instanceId: string;
  skinId: string;
  name: string;
  category: WeaponCategory;
  categoryName: string;
  rarity: SkinRarity;
  rarityName: string;
  rarityColor: string;
  floatValue: number;
  wear: string;
  statTrak: boolean;
  statTrakKills: number;
  marketPrice: number;
  source: 'case' | 'contract' | 'starter' | 'shop';
  acquiredAt: number;
  textureKey: string;
}

export const RARITY_CONFIG: Record<SkinRarity, { name: string; color: string; tier: number }> = {
  consumer: { name: 'Ширпотреб', color: '#b0c3d9', tier: 1 },
  industrial: { name: 'Промышленное', color: '#5e98d9', tier: 2 },
  milSpec: { name: 'Армейское', color: '#4b69ff', tier: 3 },
  restricted: { name: 'Запрещенное', color: '#8847ff', tier: 4 },
  classified: { name: 'Засекреченное', color: '#d32ce6', tier: 5 },
  covert: { name: 'Тайное', color: '#eb4b4b', tier: 6 },
  special: { name: 'Экстраординарное', color: '#ffd700', tier: 7 },
};

export const INITIAL_SKINS_CATALOG: SkinDefinition[] = [
  // ========================================================
  // 1. CONSUMER GRADE (ШИРПОТРЕБ)
  // ========================================================
  {
    id: 'p250_sand_dune',
    name: 'P250 | Sand Dune',
    category: 'pistol',
    categoryName: 'Пистолет',
    rarity: 'consumer',
    rarityName: 'Ширпотреб',
    rarityColor: '#b0c3d9',
    baseCost: 40,
    baseClickBonus: 1,
    baseCpsBonus: 0,
    textureKey: 'p250_sand_dune',
    statTrak: false,
    desc: 'Классический пистолет спецназа в легендарном песчаном камуфляже.',
  },
  {
    id: 'mp9_storm',
    name: 'MP9 | Storm',
    category: 'rifle',
    categoryName: 'ПП',
    rarity: 'consumer',
    rarityName: 'Ширпотреб',
    rarityColor: '#b0c3d9',
    baseCost: 60,
    baseClickBonus: 3,
    baseCpsBonus: 1.0,
    textureKey: 'mp9_storm',
    statTrak: false,
    desc: 'Штормовой монохромный окрас с легким металлическим отливом.',
  },
  {
    id: 'mac10_silver',
    name: 'MAC-10 | Silver',
    category: 'rifle',
    categoryName: 'ПП',
    rarity: 'consumer',
    rarityName: 'Ширпотреб',
    rarityColor: '#b0c3d9',
    baseCost: 75,
    baseClickBonus: 4,
    baseCpsBonus: 1.5,
    textureKey: 'mac10_silver',
    statTrak: false,
    desc: 'Холодное серебряное покрытие ствольной коробки.',
  },

  // ========================================================
  // 2. INDUSTRIAL GRADE (ПРОМЫШЛЕННОЕ)
  // ========================================================
  {
    id: 'usp_forest',
    name: 'USP-S | Forest Leaves',
    category: 'pistol',
    categoryName: 'Пистолет с глушителем',
    rarity: 'industrial',
    rarityName: 'Промышленное',
    rarityColor: '#5e98d9',
    baseCost: 110,
    baseClickBonus: 8,
    baseCpsBonus: 3.0,
    textureKey: 'usps_forest',
    statTrak: false,
    desc: 'Бесшумный пистолет с лесным тактическим паттерном.',
  },
  {
    id: 'glock_high_beam',
    name: 'Glock-18 | High Beam',
    category: 'pistol',
    categoryName: 'Пистолет',
    rarity: 'industrial',
    rarityName: 'Промышленное',
    rarityColor: '#5e98d9',
    baseCost: 240,
    baseClickBonus: 18,
    baseCpsBonus: 8.0,
    textureKey: 'glock_high_beam',
    statTrak: false,
    desc: 'Анодированный синий металл с радиальным эффектом дальнего света.',
  },
  {
    id: 'p250_valence',
    name: 'P250 | Valence',
    category: 'pistol',
    categoryName: 'Пистолет',
    rarity: 'industrial',
    rarityName: 'Промышленное',
    rarityColor: '#5e98d9',
    baseCost: 320,
    baseClickBonus: 25,
    baseCpsBonus: 12.0,
    textureKey: 'p250_sand_dune',
    statTrak: false,
    desc: 'Геометрический серый хай-тек паттерн с лазурными акцентами.',
  },
  {
    id: 'ssg08_abyss',
    name: 'SSG 08 | Abyss',
    category: 'sniper',
    categoryName: 'Снайперская винтовка',
    rarity: 'industrial',
    rarityName: 'Промышленное',
    rarityColor: '#5e98d9',
    baseCost: 380,
    baseClickBonus: 30,
    baseCpsBonus: 16.0,
    textureKey: 'awp_atheris',
    statTrak: false,
    desc: 'Глубокий синий узор морской пучины и чёрный каркас.',
  },

  // ========================================================
  // 3. MIL-SPEC GRADE (АРМЕЙСКОЕ)
  // ========================================================
  {
    id: 'm4a4_magnesium',
    name: 'M4A4 | Magnesium',
    category: 'rifle',
    categoryName: 'Штурмовая винтовка',
    rarity: 'milSpec',
    rarityName: 'Армейское',
    rarityColor: '#4b69ff',
    baseCost: 420,
    baseClickBonus: 60,
    baseCpsBonus: 28.0,
    textureKey: 'm4a4_magnesium',
    statTrak: true,
    desc: 'Серебристый магниевый корпус с элементами углеволокна и языками белого пламени.',
  },
  {
    id: 'deagle_light_rail',
    name: 'Desert Eagle | Light Rail',
    category: 'pistol',
    categoryName: 'Тяжелый пистолет',
    rarity: 'milSpec',
    rarityName: 'Армейское',
    rarityColor: '#4b69ff',
    baseCost: 900,
    baseClickBonus: 120,
    baseCpsBonus: 65.0,
    textureKey: 'deagle_light_rail',
    statTrak: true,
    desc: 'Градиентный металлический рельс с высокой пробивной мощью.',
  },
  {
    id: 'usp_guardian',
    name: 'USP-S | Guardian',
    category: 'pistol',
    categoryName: 'Пистолет с глушителем',
    rarity: 'milSpec',
    rarityName: 'Армейское',
    rarityColor: '#4b69ff',
    baseCost: 1_200,
    baseClickBonus: 160,
    baseCpsBonus: 90.0,
    textureKey: 'usps_forest',
    statTrak: true,
    desc: 'Тёмно-синий кобальтовый окрас с белой эмблемой контртеррористов.',
  },
  {
    id: 'm4a4_evil_daimyo',
    name: 'M4A4 | Evil Daimyo',
    category: 'rifle',
    categoryName: 'Штурмовая винтовка',
    rarity: 'milSpec',
    rarityName: 'Армейское',
    rarityColor: '#4b69ff',
    baseCost: 1_500,
    baseClickBonus: 200,
    baseCpsBonus: 110.0,
    textureKey: 'm4a4_magnesium',
    statTrak: true,
    desc: 'Грозный самурайский орнамент в контрастных чёрно-красных тонах.',
  },
  {
    id: 'awp_capillary',
    name: 'AWP | Capillary',
    category: 'sniper',
    categoryName: 'Снайперская винтовка',
    rarity: 'milSpec',
    rarityName: 'Армейское',
    rarityColor: '#4b69ff',
    baseCost: 1_800,
    baseClickBonus: 240,
    baseCpsBonus: 140.0,
    textureKey: 'awp_atheris',
    statTrak: true,
    desc: 'Бирюзовые и коралловые кровеносные капилляры на тёмно-сером фоне.',
  },
  {
    id: 'm4a1_basilisk',
    name: 'M4A1-S | Basilisk',
    category: 'rifle',
    categoryName: 'Винтовка с глушителем',
    rarity: 'milSpec',
    rarityName: 'Армейское',
    rarityColor: '#4b69ff',
    baseCost: 2_100,
    baseClickBonus: 280,
    baseCpsBonus: 160.0,
    textureKey: 'm4a1_printstream',
    statTrak: true,
    desc: 'Тонкая металлическая гравировка василиска на стальной ствольной коробке.',
  },
  {
    id: 'usp_cortex',
    name: 'USP-S | Cortex',
    category: 'pistol',
    categoryName: 'Пистолет с глушителем',
    rarity: 'milSpec',
    rarityName: 'Армейское',
    rarityColor: '#4b69ff',
    baseCost: 2_400,
    baseClickBonus: 320,
    baseCpsBonus: 190.0,
    textureKey: 'usps_cortex',
    statTrak: true,
    desc: 'Взрывной мозг и розовый сироп, стекающий по глушителю и рукояти.',
  },

  // ========================================================
  // 4. RESTRICTED GRADE (ЗАПРЕЩЕННОЕ)
  // ========================================================
  {
    id: 'awp_atheris',
    name: 'AWP | Atheris',
    category: 'sniper',
    categoryName: 'Снайперская винтовка',
    rarity: 'restricted',
    rarityName: 'Запрещенное',
    rarityColor: '#8847ff',
    baseCost: 1_800,
    baseClickBonus: 480,
    baseCpsBonus: 260.0,
    textureKey: 'awp_atheris',
    statTrak: true,
    desc: 'Изумрудная древесная гадюка, обвивающая чёрную ствольную коробку.',
  },
  {
    id: 'ak47_slate',
    name: 'AK-47 | Slate',
    category: 'rifle',
    categoryName: 'Штурмовая винтовка',
    rarity: 'restricted',
    rarityName: 'Запрещенное',
    rarityColor: '#8847ff',
    baseCost: 2_600,
    baseClickBonus: 650,
    baseCpsBonus: 380.0,
    textureKey: 'ak47_slate',
    statTrak: true,
    desc: 'Матово-чёрный графитовый шедевр тактического минимализма.',
  },
  {
    id: 'mp9_mount_fuji',
    name: 'MP9 | Mount Fuji',
    category: 'rifle',
    categoryName: 'ПП',
    rarity: 'restricted',
    rarityName: 'Запрещенное',
    rarityColor: '#8847ff',
    baseCost: 4_200,
    baseClickBonus: 950,
    baseCpsBonus: 540.0,
    textureKey: 'mp9_mount_fuji',
    statTrak: true,
    desc: 'Закат над священной горой Фудзи с цветущей нежно-розовой сакурой.',
  },
  {
    id: 'glock_water_elemental',
    name: 'Glock-18 | Water Elemental',
    category: 'pistol',
    categoryName: 'Пистолет',
    rarity: 'restricted',
    rarityName: 'Запрещенное',
    rarityColor: '#8847ff',
    baseCost: 7_500,
    baseClickBonus: 1_400,
    baseCpsBonus: 820.0,
    textureKey: 'glock_water_elemental',
    statTrak: true,
    desc: 'Огненно-красный корпус и дух бушующей лазурной воды со всплесками.',
  },
  {
    id: 'm4a4_spider_lily',
    name: 'M4A4 | Spider Lily',
    category: 'rifle',
    categoryName: 'Штурмовая винтовка',
    rarity: 'restricted',
    rarityName: 'Запрещенное',
    rarityColor: '#8847ff',
    baseCost: 22_000,
    baseClickBonus: 2_800,
    baseCpsBonus: 1_600.0,
    textureKey: 'm4a4_spider_lily',
    statTrak: true,
    desc: 'Алые цветы паучьей лилии на тёмном матовом сплаве.',
  },
  {
    id: 'deagle_kumicho_dragon',
    name: 'Desert Eagle | Kumicho Dragon',
    category: 'pistol',
    categoryName: 'Тяжелый пистолет',
    rarity: 'restricted',
    rarityName: 'Запрещенное',
    rarityColor: '#8847ff',
    baseCost: 35_000,
    baseClickBonus: 4_200,
    baseCpsBonus: 2_400.0,
    textureKey: 'deagle_light_rail',
    statTrak: true,
    desc: 'Гравированный белый дракон якудза на матовой рукояти и затворе.',
  },
  {
    id: 'awp_fever_dream',
    name: 'AWP | Fever Dream',
    category: 'sniper',
    categoryName: 'Снайперская винтовка',
    rarity: 'restricted',
    rarityName: 'Запрещенное',
    rarityColor: '#8847ff',
    baseCost: 45_000,
    baseClickBonus: 5_500,
    baseCpsBonus: 3_200.0,
    textureKey: 'awp_atheris',
    statTrak: true,
    desc: 'Панк-граффити в розовых и голубых тонах со словом DEADLY.',
  },

  // ========================================================
  // 5. CLASSIFIED GRADE (ЗАСЕКРЕЧЕННОЕ)
  // ========================================================
  {
    id: 'ak47_redline',
    name: 'AK-47 | Redline',
    category: 'rifle',
    categoryName: 'Штурмовая винтовка',
    rarity: 'classified',
    rarityName: 'Засекреченное',
    rarityColor: '#d32ce6',
    baseCost: 18_000,
    baseClickBonus: 7_500,
    baseCpsBonus: 4_500.0,
    textureKey: 'ak47_redline',
    statTrak: true,
    desc: 'Углеволокно и тонкие алые полосы культовой гоночной серии Redline.',
  },
  {
    id: 'deagle_code_red',
    name: 'Desert Eagle | Code Red',
    category: 'pistol',
    categoryName: 'Тяжелый пистолет',
    rarity: 'classified',
    rarityName: 'Засекреченное',
    rarityColor: '#d32ce6',
    baseCost: 48_000,
    baseClickBonus: 12_000,
    baseCpsBonus: 7_200.0,
    textureKey: 'deagle_code_red',
    statTrak: true,
    desc: 'Ярко-красный агрессивный дизайн с белыми полосами и надписью AGGRESSIVE.',
  },
  {
    id: 'm4a4_desolate_space',
    name: 'M4A4 | Desolate Space',
    category: 'rifle',
    categoryName: 'Штурмовая винтовка',
    rarity: 'classified',
    rarityName: 'Засекреченное',
    rarityColor: '#d32ce6',
    baseCost: 65_000,
    baseClickBonus: 16_000,
    baseCpsBonus: 9_500.0,
    textureKey: 'm4a4_magnesium',
    statTrak: true,
    desc: 'Череп погибшего космонавта, парящий в бездне открытого космоса.',
  },
  {
    id: 'ak47_case_hardened',
    name: 'AK-47 | Case Hardened',
    category: 'rifle',
    categoryName: 'Штурмовая винтовка',
    rarity: 'classified',
    rarityName: 'Засекреченное',
    rarityColor: '#d32ce6',
    baseCost: 110_000,
    baseClickBonus: 24_000,
    baseCpsBonus: 14_000.0,
    textureKey: 'ak47_case_hardened',
    statTrak: true,
    desc: 'Легендарный Blue Gem паттерн #661 с максимальным количеством синевы.',
  },
  {
    id: 'usp_orion',
    name: 'USP-S | Orion',
    category: 'pistol',
    categoryName: 'Пистолет с глушителем',
    rarity: 'classified',
    rarityName: 'Засекреченное',
    rarityColor: '#d32ce6',
    baseCost: 140_000,
    baseClickBonus: 30_000,
    baseCpsBonus: 18_000.0,
    textureKey: 'usps_forest',
    statTrak: true,
    desc: 'Хай-тек графика в стиле созвездия Ориона с ярко-оранжевым затвором.',
  },
  {
    id: 'm4a1_player_two',
    name: 'M4A1-S | Player Two',
    category: 'rifle',
    categoryName: 'Винтовка с глушителем',
    rarity: 'classified',
    rarityName: 'Засекреченное',
    rarityColor: '#d32ce6',
    baseCost: 180_000,
    baseClickBonus: 38_000,
    baseCpsBonus: 22_000.0,
    textureKey: 'm4a1_player_two',
    statTrak: true,
    desc: 'Ретро-гейминг манга-арт на корпусе винтовки с псом-воином.',
  },
  {
    id: 'm4a4_the_emperor',
    name: 'M4A4 | The Emperor',
    category: 'rifle',
    categoryName: 'Штурмовая винтовка',
    rarity: 'classified',
    rarityName: 'Засекреченное',
    rarityColor: '#d32ce6',
    baseCost: 220_000,
    baseClickBonus: 45_000,
    baseCpsBonus: 26_000.0,
    textureKey: 'm4a4_magnesium',
    statTrak: true,
    desc: 'Император из колоды Таро в золотой короне с пылающим лазурным взором.',
  },
  {
    id: 'm4a1_cyrex',
    name: 'M4A1-S | Cyrex',
    category: 'rifle',
    categoryName: 'Винтовка с глушителем',
    rarity: 'classified',
    rarityName: 'Засекреченное',
    rarityColor: '#d32ce6',
    baseCost: 260_000,
    baseClickBonus: 52_000,
    baseCpsBonus: 30_000.0,
    textureKey: 'm4a1_printstream',
    statTrak: true,
    desc: 'Футуристический красно-белый кибер-паттерн с карбоновыми вставками.',
  },

  // ========================================================
  // 6. COVERT GRADE (ТАЙНОЕ)
  // ========================================================
  {
    id: 'm4a1_printstream',
    name: 'M4A1-S | Printstream',
    category: 'rifle',
    categoryName: 'Винтовка с глушителем',
    rarity: 'covert',
    rarityName: 'Тайное',
    rarityColor: '#eb4b4b',
    baseCost: 320_000,
    baseClickBonus: 68_000,
    baseCpsBonus: 40_000.0,
    textureKey: 'm4a1_printstream',
    statTrak: true,
    desc: 'Жемчужно-белое перламутровое покрытие с кинетическим tech-артом и символами XX.',
  },
  {
    id: 'm4a1_hyper_beast',
    name: 'M4A1-S | Hyper Beast',
    category: 'rifle',
    categoryName: 'Винтовка с глушителем',
    rarity: 'covert',
    rarityName: 'Тайное',
    rarityColor: '#eb4b4b',
    baseCost: 480_000,
    baseClickBonus: 95_000,
    baseCpsBonus: 56_000.0,
    textureKey: 'm4a1_hyper_beast',
    statTrak: true,
    desc: 'Хищный психоделический монстр с клыками, разрывающими глушитель.',
  },
  {
    id: 'usps_kill_confirmed',
    name: 'USP-S | Kill Confirmed',
    category: 'pistol',
    categoryName: 'Пистолет с глушителем',
    rarity: 'covert',
    rarityName: 'Тайное',
    rarityColor: '#eb4b4b',
    baseCost: 750_000,
    baseClickBonus: 140_000,
    baseCpsBonus: 82_000.0,
    textureKey: 'usps_kill_confirmed',
    statTrak: true,
    desc: 'Пуля пробивает зловещий череп, оставляя за собой сноп огня и крови.',
  },
  {
    id: 'deagle_blaze',
    name: 'Desert Eagle | Blaze',
    category: 'pistol',
    categoryName: 'Тяжелый пистолет',
    rarity: 'covert',
    rarityName: 'Тайное',
    rarityColor: '#eb4b4b',
    baseCost: 1_100_000,
    baseClickBonus: 200_000,
    baseCpsBonus: 120_000.0,
    textureKey: 'deagle_blaze',
    statTrak: true,
    desc: 'Классическое чёрное воронение и пылающие языки пламени на стволе.',
  },
  {
    id: 'ak47_vulcan',
    name: 'AK-47 | Vulcan',
    category: 'rifle',
    categoryName: 'Штурмовая винтовка',
    rarity: 'covert',
    rarityName: 'Тайное',
    rarityColor: '#eb4b4b',
    baseCost: 1_250_000,
    baseClickBonus: 260_000,
    baseCpsBonus: 155_000.0,
    textureKey: 'ak47_vulcan',
    statTrak: true,
    desc: 'Спортивный высокотехнологичный стиль в контрастных сине-белых цветах.',
  },
  {
    id: 'm4a4_asiimov',
    name: 'M4A4 | Asiimov',
    category: 'rifle',
    categoryName: 'Штурмовая винтовка',
    rarity: 'covert',
    rarityName: 'Тайное',
    rarityColor: '#eb4b4b',
    baseCost: 2_600_000,
    baseClickBonus: 480_000,
    baseCpsBonus: 280_000.0,
    textureKey: 'm4a4_asiimov',
    statTrak: true,
    desc: 'Сай-фай дизайн с оранжево-белыми геометрическими линиями серии Азимов.',
  },
  {
    id: 'ak47_asiimov',
    name: 'AK-47 | Asiimov',
    category: 'rifle',
    categoryName: 'Штурмовая винтовка',
    rarity: 'covert',
    rarityName: 'Тайное',
    rarityColor: '#eb4b4b',
    baseCost: 4_200_000,
    baseClickBonus: 750_000,
    baseCpsBonus: 440_000.0,
    textureKey: 'ak47_asiimov',
    statTrak: true,
    desc: 'Икона CS — космическая геометрия серии Азимов на легендарном автомате.',
  },
  {
    id: 'ak47_the_empress',
    name: 'AK-47 | The Empress',
    category: 'rifle',
    categoryName: 'Штурмовая винтовка',
    rarity: 'covert',
    rarityName: 'Тайное',
    rarityColor: '#eb4b4b',
    baseCost: 5_500_000,
    baseClickBonus: 950_000,
    baseCpsBonus: 560_000.0,
    textureKey: 'ak47_gold_arabesque',
    statTrak: true,
    desc: 'Императрица Таро в царском золотом одеянии с лазурными лучами солнца.',
  },
  {
    id: 'm4a4_howl',
    name: 'M4A4 | Howl',
    category: 'rifle',
    categoryName: 'Штурмовая винтовка',
    rarity: 'covert',
    rarityName: 'Контрабанда',
    rarityColor: '#eb4b4b',
    baseCost: 8_500_000,
    baseClickBonus: 1_400_000,
    baseCpsBonus: 820_000.0,
    textureKey: 'm4a4_howl',
    statTrak: true,
    desc: 'Огнедышащий воющий волк с пылающими глазами. Самая желанная винтовка CS.',
  },
  {
    id: 'awp_dragon_lore',
    name: 'AWP | Dragon Lore',
    category: 'sniper',
    categoryName: 'Снайперская винтовка',
    rarity: 'covert',
    rarityName: 'Тайное',
    rarityColor: '#eb4b4b',
    baseCost: 15_000_000,
    baseClickBonus: 2_400_000,
    baseCpsBonus: 1_400_000.0,
    textureKey: 'awp_dragon_lore',
    statTrak: true,
    desc: 'Огнедышащий дракон на золотом кельтском полотне. Символ абсолютной элиты.',
  },
  {
    id: 'awp_gungnir',
    name: 'AWP | Gungnir',
    category: 'sniper',
    categoryName: 'Снайперская винтовка',
    rarity: 'covert',
    rarityName: 'Тайное',
    rarityColor: '#eb4b4b',
    baseCost: 22_000_000,
    baseClickBonus: 3_500_000,
    baseCpsBonus: 2_100_000.0,
    textureKey: 'awp_atheris',
    statTrak: true,
    desc: 'Священное копьё Одина с ледяной скандинавской вязью и лазурным свечением.',
  },
  {
    id: 'ak47_wild_lotus',
    name: 'AK-47 | Wild Lotus',
    category: 'rifle',
    categoryName: 'Штурмовая винтовка',
    rarity: 'covert',
    rarityName: 'Тайное',
    rarityColor: '#eb4b4b',
    baseCost: 30_000_000,
    baseClickBonus: 4_800_000,
    baseCpsBonus: 2_900_000.0,
    textureKey: 'ak47_case_hardened',
    statTrak: true,
    desc: 'Экзотический дикий лотос с изумрудными лозами и пурпурными лепестками.',
  },
  {
    id: 'ak47_gold_arabesque',
    name: 'AK-47 | Gold Arabesque',
    category: 'rifle',
    categoryName: 'Штурмовая винтовка',
    rarity: 'covert',
    rarityName: 'Тайное',
    rarityColor: '#eb4b4b',
    baseCost: 45_000_000,
    baseClickBonus: 7_200_000,
    baseCpsBonus: 4_300_000.0,
    textureKey: 'ak47_gold_arabesque',
    statTrak: true,
    desc: 'Чистое золото высшей пробы с тончайшей арабской гравировкой.',
  },

  // ========================================================
  // 7. SPECIAL GRADE (★ НОЖИ / ЭКСТРАОРДИНАРНОЕ)
  // ========================================================
  {
    id: 'karambit_slaughter',
    name: '★ Karambit | Slaughter',
    category: 'knife',
    categoryName: 'Керамбит',
    rarity: 'special',
    rarityName: 'Экстраординарное',
    rarityColor: '#ffd700',
    baseCost: 28_000_000,
    baseClickBonus: 5_000_000,
    baseCpsBonus: 3_000_000.0,
    textureKey: 'karambit_fade',
    statTrak: true,
    desc: 'Кроваво-красный анодированный клинок с абстрактным узором бойни.',
  },
  {
    id: 'karambit_fade',
    name: '★ Karambit | Fade',
    category: 'knife',
    categoryName: 'Керамбит',
    rarity: 'special',
    rarityName: 'Экстраординарное',
    rarityColor: '#ffd700',
    baseCost: 38_000_000,
    baseClickBonus: 7_500_000,
    baseCpsBonus: 4_500_000.0,
    textureKey: 'karambit_fade',
    statTrak: true,
    desc: 'Полупрозрачный анодированный клинок с радужным переливом 100% Fade.',
  },
  {
    id: 'karambit_tiger_tooth',
    name: '★ Karambit | Tiger Tooth',
    category: 'knife',
    categoryName: 'Керамбит',
    rarity: 'special',
    rarityName: 'Экстраординарное',
    rarityColor: '#ffd700',
    baseCost: 48_000_000,
    baseClickBonus: 9_200_000,
    baseCpsBonus: 5_500_000.0,
    textureKey: 'karambit_fade',
    statTrak: true,
    desc: 'Золотой анодированный коготь с вытравленными полосами бенгальского тигра.',
  },
  {
    id: 'karambit_doppler',
    name: '★ Karambit | Doppler Sapphire',
    category: 'knife',
    categoryName: 'Керамбит',
    rarity: 'special',
    rarityName: 'Экстраординарное',
    rarityColor: '#ffd700',
    baseCost: 65_000_000,
    baseClickBonus: 12_500_000,
    baseCpsBonus: 7_500_000.0,
    textureKey: 'karambit_doppler',
    statTrak: true,
    desc: 'Редчайший сапфировый спектр с глубинным мерцанием ультрамарина.',
  },
  {
    id: 'butterfly_slaughter',
    name: '★ Butterfly Knife | Slaughter',
    category: 'knife',
    categoryName: 'Нож-бабочка',
    rarity: 'special',
    rarityName: 'Экстраординарное',
    rarityColor: '#ffd700',
    baseCost: 75_000_000,
    baseClickBonus: 15_000_000,
    baseCpsBonus: 9_000_000.0,
    textureKey: 'butterfly_fade',
    statTrak: true,
    desc: 'Балисонг с алыми вихрями и зеркальной геометрией лезвия.',
  },
  {
    id: 'butterfly_fade',
    name: '★ Butterfly Knife | Fade',
    category: 'knife',
    categoryName: 'Нож-бабочка',
    rarity: 'special',
    rarityName: 'Экстраординарное',
    rarityColor: '#ffd700',
    baseCost: 110_000_000,
    baseClickBonus: 22_000_000,
    baseCpsBonus: 13_000_000.0,
    textureKey: 'butterfly_fade',
    statTrak: true,
    desc: 'Идеальный баланс и радужное сияние балисонга высшей пробы.',
  },
  {
    id: 'butterfly_doppler',
    name: '★ Butterfly Knife | Doppler Phase 2',
    category: 'knife',
    categoryName: 'Нож-бабочка',
    rarity: 'special',
    rarityName: 'Экстраординарное',
    rarityColor: '#ffd700',
    baseCost: 180_000_000,
    baseClickBonus: 35_000_000,
    baseCpsBonus: 21_000_000.0,
    textureKey: 'butterfly_doppler',
    statTrak: true,
    desc: 'Розово-дымчатый паттерн Phase 2. Венец любой коллекции CS2.',
  },
];

export function getSkinCondition(floatVal: number): string {
  if (floatVal <= 0.07) return 'Factory New (Прямо с завода)';
  if (floatVal <= 0.15) return 'Minimal Wear (Немного поношенное)';
  if (floatVal <= 0.38) return 'Field-Tested (После полевых испытаний)';
  if (floatVal <= 0.45) return 'Well-Worn (Поношенное)';
  return 'Battle-Scarred (Закаленное в боях)';
}

export function getShortWear(floatVal: number): string {
  if (floatVal <= 0.07) return 'FN';
  if (floatVal <= 0.15) return 'MW';
  if (floatVal <= 0.38) return 'FT';
  if (floatVal <= 0.45) return 'WW';
  return 'BS';
}

export function generateRealisticFloat(): number {
  const roll = Math.random();
  if (roll < 0.12) return +(Math.random() * 0.069 + 0.001).toFixed(4);
  if (roll < 0.35) return +(Math.random() * 0.079 + 0.071).toFixed(4);
  if (roll < 0.75) return +(Math.random() * 0.229 + 0.151).toFixed(4);
  if (roll < 0.90) return +(Math.random() * 0.069 + 0.381).toFixed(4);
  return +(Math.random() * 0.49 + 0.451).toFixed(4);
}

export function calcFloatMultiplier(floatVal: number): number {
  if (floatVal <= 0.07) {
    const factor = Math.max(0, Math.min(1, (0.07 - floatVal) / 0.07));
    return +(1.8 + factor * 0.6).toFixed(2);
  }
  if (floatVal <= 0.15) {
    const factor = Math.max(0, Math.min(1, (0.15 - floatVal) / 0.08));
    return +(1.3 + factor * 0.3).toFixed(2);
  }
  if (floatVal <= 0.38) {
    const factor = Math.max(0, Math.min(1, (0.38 - floatVal) / 0.23));
    return +(0.95 + factor * 0.2).toFixed(2);
  }
  if (floatVal <= 0.45) {
    const factor = Math.max(0, Math.min(1, (0.45 - floatVal) / 0.07));
    return +(0.75 + factor * 0.15).toFixed(2);
  }
  const factor = Math.max(0, Math.min(1, (1.0 - floatVal) / 0.55));
  return +(0.50 + factor * 0.20).toFixed(2);
}

export function calcItemMarketPrice(baseCost: number, floatVal: number, isStatTrak: boolean): number {
  const floatMult = calcFloatMultiplier(floatVal);
  const stMult = isStatTrak ? 2.2 : 1.0;
  return Math.max(10, Math.round(baseCost * floatMult * stMult));
}

export function createInventoryItem(
  skinDef: SkinDefinition,
  source: 'case' | 'contract' | 'starter' | 'shop' = 'case',
  floatOverride?: number,
  statTrakOverride?: boolean
): SteamInventoryItem {
  const floatVal = floatOverride !== undefined ? floatOverride : generateRealisticFloat();
  const isStatTrak = statTrakOverride !== undefined 
    ? statTrakOverride 
    : (source === 'case' ? Math.random() < 0.10 : (source === 'contract' ? Math.random() < 0.15 : false));

  const base = skinDef.baseCost > 0 ? skinDef.baseCost : 25;
  const price = calcItemMarketPrice(base, floatVal, isStatTrak);
  const displayName = isStatTrak ? `StatTrak™ ${skinDef.name}` : skinDef.name;

  return {
    instanceId: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8),
    skinId: skinDef.id,
    name: displayName,
    category: skinDef.category,
    categoryName: skinDef.categoryName,
    rarity: skinDef.rarity,
    rarityName: skinDef.rarityName,
    rarityColor: skinDef.rarityColor,
    floatValue: floatVal,
    wear: getSkinCondition(floatVal),
    statTrak: isStatTrak,
    statTrakKills: isStatTrak ? 0 : 0,
    marketPrice: price,
    source,
    acquiredAt: Date.now(),
    textureKey: skinDef.textureKey,
  };
}

export function calcSkinUpgradeCost(skin: PlayerSkin): number {
  const base = Math.max(50, skin.baseCost > 0 ? Math.floor(skin.baseCost * 0.25) : 50);
  return Math.floor(base * Math.pow(1.35, skin.level - 1));
}

export function getSkinMultiplier(skin: PlayerSkin): number {
  if (skin.level <= 1) return 1.0;
  return 1.0 + (skin.level - 1) * 0.25;
}
