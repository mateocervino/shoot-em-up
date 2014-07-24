window.onload = function () {
  'use strict';

  var game
    , ns = window['game'];
  
  game = new Phaser.Game(600, 800, Phaser.AUTO, 'game-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);
  game.state.add('instruccions', ns.Instruccions);

  game.state.start('boot');
};
