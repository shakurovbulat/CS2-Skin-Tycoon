/**
 * Yandex Games SDK Integration Wrapper
 * Safe fallback when running locally or outside Yandex Games.
 */

declare global {
  interface Window {
    YaGames?: {
      init: () => Promise<YandexSDK>;
    };
  }
}

export interface YandexSDK {
  environment: {
    app: { id: string };
    browser: { lang: string };
    i18n: { lang: string; tld: string };
  };
  features: {
    GameplayAPI?: {
      start: () => void;
      stop: () => void;
    };
  };
  adv: {
    showFullscreenAdv: (opts?: {
      callbacks?: {
        onClose?: (wasShown: boolean) => void;
        onError?: (error: unknown) => void;
      };
    }) => void;
    showRewardedVideo: (opts: {
      callbacks: {
        onOpen?: () => void;
        onRewarded?: () => void;
        onClose?: () => void;
        onError?: (error: unknown) => void;
      };
    }) => void;
  };
  getPlayer: (opts?: { scopes?: boolean }) => Promise<YandexPlayer>;
}

export interface YandexPlayer {
  getUniqueID: () => string;
  getName: () => string;
  getPhoto: (size: 'small' | 'medium' | 'large') => string;
  setData: (data: Record<string, unknown>, flush?: boolean) => Promise<void>;
  getData: (keys?: string[]) => Promise<Record<string, unknown>>;
}

class YandexGamesService {
  private ysdk: YandexSDK | null = null;
  private player: YandexPlayer | null = null;
  private isInitialized: boolean = false;

  public async init(): Promise<boolean> {
    if (this.isInitialized) return true;

    if (typeof window !== 'undefined' && window.YaGames) {
      try {
        console.log('[YandexSDK] Initializing YaGames SDK...');
        this.ysdk = await window.YaGames.init();
        this.isInitialized = true;
        console.log('[YandexSDK] Initialized successfully.');

        // Initialize Player if possible
        try {
          this.player = await this.ysdk.getPlayer({ scopes: false });
          console.log('[YandexSDK] Player initialized.');
        } catch (playerErr) {
          console.warn('[YandexSDK] Player unauthorized or guest mode:', playerErr);
        }

        // Notify gameplay start
        this.notifyGameplayStart();
        return true;
      } catch (e) {
        console.warn('[YandexSDK] YaGames.init() failed or not on Yandex:', e);
      }
    } else {
      console.log('[YandexSDK] Standalone / Local development mode (No Yandex SDK script).');
    }

    this.isInitialized = true;
    return false;
  }

  public notifyGameplayStart(): void {
    try {
      this.ysdk?.features?.GameplayAPI?.start();
    } catch {}
  }

  public notifyGameplayStop(): void {
    try {
      this.ysdk?.features?.GameplayAPI?.stop();
    } catch {}
  }

  public async saveCloudData(data: Record<string, unknown>): Promise<boolean> {
    if (!this.player) return false;
    try {
      await this.player.setData(data, true);
      return true;
    } catch (e) {
      console.warn('[YandexSDK] Failed to save cloud data:', e);
      return false;
    }
  }

  public async loadCloudData(): Promise<Record<string, unknown> | null> {
    if (!this.player) return null;
    try {
      const data = await this.player.getData();
      return data || null;
    } catch (e) {
      console.warn('[YandexSDK] Failed to load cloud data:', e);
      return null;
    }
  }

  public showRewardedVideo(onRewarded: () => void, onClose?: () => void): void {
    if (!this.ysdk) {
      console.log('[YandexSDK] Mock rewarded video: awarding reward immediately.');
      onRewarded();
      if (onClose) onClose();
      return;
    }

    this.notifyGameplayStop();
    this.ysdk.adv.showRewardedVideo({
      callbacks: {
        onOpen: () => console.log('[YandexSDK] Rewarded video opened.'),
        onRewarded: () => {
          console.log('[YandexSDK] Rewarded callback fired.');
          onRewarded();
        },
        onClose: () => {
          this.notifyGameplayStart();
          if (onClose) onClose();
        },
        onError: (err) => {
          console.warn('[YandexSDK] Rewarded video error:', err);
          this.notifyGameplayStart();
          if (onClose) onClose();
        },
      },
    });
  }

  public isAvailable(): boolean {
    return !!this.ysdk;
  }
}

export const yandexGames = new YandexGamesService();
