(function() {
  'use strict';

  function Instruccions() {
   
    this.left = 'To move to the left press';
    this.right = 'To move to the right press';
    this.up = 'To move up press';
    this.down = 'To move down press';
    this.shoot = 'To shoot press';
  }

	 Instruccions.prototype = {
    
    
    create: function () {
		
     this.background=this.add.sprite(0, 0, 'startBackground');
      this.background.anchor.setTo(0, 0, 'startBackground');

     var Left = this.add.text(100, 100, this.left, { fontSize: '50px', fill: '#fff' });
	this.image = this.add.sprite (500 ,80 , 'left');
	
	var Right = this.add.text(100, 200, this.right, { fontSize: '50px', fill: '#fff' });
	this.image = this.add.sprite (500 ,180 , 'right');
	
	var Up = this.add.text(100, 300, this.up, { fontSize: '50px', fill: '#fff' });
	this.image = this.add.sprite (500 ,280 , 'up');
	
	var Down = this.add.text(100, 400, this.down, { fontSize: '50px', fill: '#fff' });
	this.image = this.add.sprite (500 ,380 , 'down');
      
    var Shoot = this.add.text(100, 500, this.shoot, { fontSize: '50px', fill: '#fff' });
	this.image = this.add.sprite (350 ,480 , 'space');
	
	this.button = this.add.button(100, 680,'button', function(){this.game.state.start('game') }, this, 2, 1, 0);
       this.button.anchor.setTo(0.5,0.5);
       
    this.button = this.add.button(500, 680,'button1', function(){this.game.state.start('menu') }, this, 2, 1, 0);
       this.button.anchor.setTo(0.5,0.5);
	
	
	
    },

    update: function () {

    },

   
  };

  window['game'] = window['game'] || {};
  window['game'].Instruccions = Instruccions;

}());
