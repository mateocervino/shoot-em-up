(function() {
  'use strict';

  function Preloader() {
	  this.cursors;
	  this.player;
  }

  Preloader.prototype = {
        
    preload: function () {
		this.asset = this.add.sprite(320, 240, 'preloader');
		this.asset.anchor.setTo(5.5, 5.5); 
		this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
		this.load.setPreloadSprite(this.asset);
		this.load.image('startBackground', 'assets/startImage.jpg');
		this.load.image('starfield', 'assets/starfield.png');
		this.load.image('ship', 'assets/nave.png');
		this.load.image('bullet', 'assets/bullet.png');
		this.load.image('alien', 'assets/aliens2.gif');
		//this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');      
		this.load.image('button', 'assets/startbuttom.png');
		this.load.image('button1', 'assets/instruccions.png');
		//this.load.spritesheet('button2', 'assets/red_button.jpg', 0, 0);
		this.load.spritesheet('explosion', 'assets/explosion.png', 128, 128);
		this.load.image('heart', 'assets/heart.png');
		
		
		this.load.image('left', 'assets/left.png');
		this.load.image('right', 'assets/right.png');
		this.load.image('up', 'assets/up.png');
		this.load.image('down', 'assets/down.png');
		this.load.image('space', 'assets/spacebar.png');
		this.load.audio('musicTheme', 'assets/Speedball - Speedball.mp3');
			  
    },

    create: function () {
      this.asset.cropEnabled = false;
     
      
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['game'] = window['game'] || {};
  window['game'].Preloader = Preloader;

}());
