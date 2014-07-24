(function() {
  'use strict';
  
  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
    this.instruccions = null;
    
  
   
   
  }
  
  Menu.prototype = {
    
    
    create: function () {
     // var x = this.game.width 
     //  , y = this.game.height ;

      
      this.background=this.add.sprite(0, 0, 'startBackground');
      this.background.anchor.setTo(0, 0, 'startBackground');
      //this.ship=this.add.sprite(this.world.centerX, this.world.centerY, 'ship');
      this.titleTxt = this.add.text(100, 40, 'ALIEN ATTACK', { font: "68px Arial", fill: "white", align: "right" });
      this.startTxt = this.add.text(270, 310, 'START', { font: "20px Arial", fill: "white", align: "right" });
      //this.optionsTxt = this.add.text(120, 100, 'OPTIONS', { font: "20px Arial", fill: "white", align: "right" });
        
      
		this.instruccions = this.add.text(230, 500, 'INSTRUCCIONS', { font: "20px Arial", fill: "white", align: "right" });
      //this.image = this.add.sprite (270 ,135 , 'startImage');
      //this.image.background
       this.button = this.add.button(this.world.centerX, this.world.centerY,'button', function(){this.game.state.start('game') }, this, 2, 1, 0);
       this.button.anchor.setTo(0.5,0.5);
       this.button = this.add.button(this.world.centerX, 600,'button1', function(){this.game.state.start('instruccions') }, this, 2, 1, 0);
       this.button.anchor.setTo(0.5,0.5);
      
    },
    
    update: function () {
		

    },

   
  };

  window['game'] = window['game'] || {};
  window['game'].Menu = Menu;

}());
