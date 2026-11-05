import Phaser from 'phaser';
import { MainScene } from './scenes/MainScene.ts';

export function initPhaserGame(containerId: string): Phaser.Game {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: containerId,
    width: '100%',
    height: '100%',
    transparent: true,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false,
      },
    },
    render: {
      antialias: true,
      powerPreference: 'high-performance',
    },
    scene: [MainScene],
  };

  return new Phaser.Game(config);
}
