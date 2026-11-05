/**
 * Robust Save / Load Persistence System for CS2 Skin Tycoon
 * Handles versioning, schema validation, localStorage and Yandex Cloud saves.
 */

import { SteamInventoryItem } from '../models/skin.ts';

export const SAVE_KEY = 'cs2_skin_tycoon_save_v2';
export const CURRENT_SAVE_VERSION = '2.1.0';

export interface SerializedSkin {
  isUnlocked: boolean;
  level: number;
  floatValue: number;
  statTrakKills: number;
}

export interface SaveDataV2 {
  version: string;
  savedAt: number;
  balance: number;
  allTimeCoins: number;
  totalClicks: number;
  keys: number;
  stars: number;
  prestigeCount: number;
  level: number;
  xp: number;
  maxXp: number;
  activeSkinId: string;
  equippedInstanceId?: string;
  currentBackground?: string;
  inventory: SteamInventoryItem[];
  skins: Record<string, SerializedSkin>;
  upgrades: Record<string, number>; // id -> level
  prestigePerks: Record<string, number>; // id -> level
  achievements: Record<string, { isUnlocked: boolean; isClaimed: boolean }>;
  contracts: Array<{ id: string; level?: number; current: number; isCompleted: boolean; isClaimed: boolean }>;
}

export class SaveManager {
  private static autoSaveInterval: number | null = null;

  public static saveToLocal(data: SaveDataV2): boolean {
    try {
      data.savedAt = Date.now();
      const serialized = JSON.stringify(data);
      localStorage.setItem(SAVE_KEY, serialized);
      return true;
    } catch (e) {
      console.error('[SaveManager] Failed to save game to localStorage:', e);
      return false;
    }
  }

  public static loadFromLocal(): SaveDataV2 | null {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;

      const parsed = JSON.parse(raw) as SaveDataV2;
      if (!parsed || typeof parsed !== 'object') {
        console.warn('[SaveManager] Corrupt save object.');
        return null;
      }

      // Basic validation
      if (typeof parsed.balance !== 'number' || isNaN(parsed.balance)) {
        parsed.balance = 25;
      }
      if (typeof parsed.allTimeCoins !== 'number' || isNaN(parsed.allTimeCoins)) {
        parsed.allTimeCoins = parsed.balance;
      }
      if (!parsed.skins || typeof parsed.skins !== 'object') {
        parsed.skins = {};
      }
      if (!Array.isArray(parsed.inventory)) {
        parsed.inventory = [];
      }
      if (!parsed.upgrades || typeof parsed.upgrades !== 'object') {
        parsed.upgrades = {};
      }

      return parsed;
    } catch (e) {
      console.error('[SaveManager] Exception parsing save data:', e);
      return null;
    }
  }

  public static clearSave(): void {
    localStorage.removeItem(SAVE_KEY);
    // Also remove old v1 keys if any
    localStorage.removeItem('cs2_skin_tycoon_save');
  }

  public static exportSave(): string {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return '';
    return btoa(raw);
  }

  public static importSave(base64Str: string): boolean {
    try {
      const decoded = atob(base64Str);
      const parsed = JSON.parse(decoded);
      if (parsed && typeof parsed.balance === 'number') {
        localStorage.setItem(SAVE_KEY, decoded);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public static startAutoSave(saveFn: () => void, intervalMs: number = 10_000): void {
    if (this.autoSaveInterval) return;
    this.autoSaveInterval = window.setInterval(saveFn, intervalMs);

    window.addEventListener('beforeunload', () => {
      saveFn();
    });
  }
}
