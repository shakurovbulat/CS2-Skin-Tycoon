/**
 * CS2 Skin Tycoon - Centralized Economy & Balance Configuration
 */

export const ECONOMY_CONFIG = {
  // Core Clicker Parameters
  BASE_CLICK_POWER: 1,
  BASE_CRIT_CHANCE: 0.05,       // 5% base crit chance
  BASE_CRIT_MULTIPLIER: 3.0,     // 3x coins on critical hit
  MAX_CRIT_CHANCE: 0.50,         // Cap at 50%
  
  // Starting Player State
  STARTING_COINS: 25,
  STARTING_KEYS: 2,
  STARTING_LEVEL: 1,
  BASE_XP_PER_CLICK: 2,
  CRIT_XP_BONUS: 8,

  // Offline Earnings
  MAX_OFFLINE_SECONDS: 8 * 3600, // 8 hours cap
  OFFLINE_EFFICIENCY: 0.70,      // 70% of online CPS
  MIN_OFFLINE_SECONDS_FOR_CLAIM: 60, // 1 minute minimum

  // Level Progression Formula: XP(lvl) = Math.floor(BASE * Math.pow(GROWTH, lvl - 1))
  BASE_LEVEL_XP: 100,
  LEVEL_XP_GROWTH: 1.35,

  // Prestige Formulas
  PRESTIGE_MIN_ALLTIME_COINS: 500_000,
  // Stars awarded = Math.floor(Math.sqrt(allTimeCoins / 250_000))
  calcPrestigeStars(allTimeCoins: number): number {
    if (allTimeCoins < this.PRESTIGE_MIN_ALLTIME_COINS) return 0;
    return Math.max(1, Math.floor(Math.sqrt(allTimeCoins / 250_000)));
  },

  // Case Drop Odds (authentic CS2 tiering)
  CASE_RARITY_ODDS: {
    consumer: 0.45,     // 45%
    industrial: 0.30,   // 30%
    milSpec: 0.15,      // 15%
    restricted: 0.06,   // 6%
    classified: 0.025,  // 2.5%
    covert: 0.012,      // 1.2%
    special: 0.003,     // 0.3%
  },
};

/**
 * Format large numbers for CS2 tactical display
 */
export function formatCurrency(num: number): string {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(2) + 'T';
  }
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M';
  }
  if (num >= 10_000) {
    return (num / 1_000).toFixed(1) + 'k';
  }
  return num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
}

export function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}ч ${mins}м`;
  }
  if (mins > 0) {
    return `${mins}м ${secs}с`;
  }
  return `${secs}с`;
}
