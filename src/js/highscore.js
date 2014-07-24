(function() {
  'use strict';

  function Highscore() {
    this.highscoreTxt = null;
    this.mummy = null;
  }

  Highscore.prototype = {
    
    
    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.highscoreTxt = this.add.bitmapText(x, y, 'HIGHSCORE', {font: '12px minecraftia', align: 'center'});
      this.highscoreTxt.anchor.setTo(0.5, 0.5);
      
      this.mummy=this.add.sprite(300, 200, 'mummy');
      this.mummy.anchor.setTo(2.5, -1.5);
      this.mummy.animations.add('walk');
      this.mummy.animations.play('walk', 20, true);
      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

 /* window['game'] = window['game'] || {};
  window['game'].Menu = Menu;*/

}());
