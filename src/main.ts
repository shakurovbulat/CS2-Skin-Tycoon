import './style.css';
import { TopBar } from './ui/TopBar.ts';
import { Sidebar } from './ui/Sidebar.ts';
import { CenterHud } from './ui/CenterHud.ts';
import { UpgradePanel } from './ui/UpgradePanel.ts';
import { InventoryView } from './ui/views/InventoryView.ts';
import { UpgraderView } from './ui/views/UpgraderView.ts';
import { CaseShopView } from './ui/views/CaseShopView.ts';
import { AchievementsView } from './ui/views/AchievementsView.ts';
import { PrestigeView } from './ui/views/PrestigeView.ts';
import { SettingsView } from './ui/views/SettingsView.ts';
import { OfflineDialog } from './ui/views/OfflineDialog.ts';
import { initPhaserGame } from './game/config.ts';
import { applyMapBackground } from './assets/assetTextures.ts';
import { gameState } from './state/gameState.ts';
import { yandexGames } from './state/yandexSdk.ts';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Yandex Games SDK (safe fallback in local/standalone)
  await yandexGames.init();

  // 2. Set Background
  applyMapBackground(gameState.currentBackground);

  // 3. Mount Main HUD & Panels
  const topbarEl = document.getElementById('topbar');
  const sidebarEl = document.getElementById('sidebar');
  const centerHudEl = document.getElementById('center-hud');
  const upgradesEl = document.getElementById('upgrades-panel');
  const modalContainer = document.getElementById('modal-container') || document.body;

  if (topbarEl) new TopBar(topbarEl);
  if (sidebarEl) new Sidebar(sidebarEl);
  if (centerHudEl) new CenterHud(centerHudEl);
  if (upgradesEl) new UpgradePanel(upgradesEl);

  // 4. Initialize Modal Views
  const inventoryView = new InventoryView(modalContainer);
  const upgraderView = new UpgraderView(modalContainer);
  const caseShopView = new CaseShopView(modalContainer);
  const achievementsView = new AchievementsView(modalContainer);
  const prestigeView = new PrestigeView(modalContainer);
  const settingsView = new SettingsView(modalContainer);
  const offlineDialog = new OfflineDialog(modalContainer);

  const closeAllViews = () => {
    inventoryView.close();
    upgraderView.close();
    caseShopView.close();
    achievementsView.close();
    prestigeView.close();
    settingsView.close();
    offlineDialog.close();
  };

  // 5. Global Navigation Router
  window.addEventListener('nav-change', (e: Event) => {
    const detail = (e as CustomEvent).detail;
    const tab = detail?.tab;

    switch (tab) {
      case 'clicker':
        closeAllViews();
        break;

      case 'inventory':
      case 'loadout':
        closeAllViews();
        inventoryView.open(detail?.preselectedInstanceId);
        break;

      case 'upgrader':
      case 'contracts':
        closeAllViews();
        upgraderView.open(detail?.preselectedInstanceId);
        break;

      case 'cases':
        closeAllViews();
        caseShopView.open();
        break;

      case 'workshop':
        closeAllViews();
        const upgPanel = document.getElementById('upgrades-panel');
        if (upgPanel) {
          upgPanel.scrollIntoView({ behavior: 'smooth' });
          upgPanel.classList.add('purchase-flash');
          setTimeout(() => upgPanel.classList.remove('purchase-flash'), 400);
        }
        break;

      case 'achievements':
        closeAllViews();
        achievementsView.open();
        break;

      case 'prestige':
        closeAllViews();
        prestigeView.open();
        break;

      case 'settings':
        closeAllViews();
        settingsView.open();
        break;
    }
  });

  // 6. Initialize Phaser 3 Interactive Weapon Canvas
  initPhaserGame('phaser-canvas-container');

  // 7. Check for Offline Earnings (show welcome dialog if accrued)
  setTimeout(() => {
    offlineDialog.checkAndShow();
  }, 600);
});
