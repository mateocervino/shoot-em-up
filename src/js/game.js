(function() {
  'use strict';

  function Game() {
	this.player = null;
	this.starfield = null;
	this.bullets = null;
	this.bulletTime = 0;this.nextFire = 0;		
	this.createMultiple = null;
	this.cursors = null;
	this.fireButton = null;	  	   
	this.firingTimer = null;
	this.aliens = null;
	this.enemyBullet = null;
	this.livingEnemies = null;
	this.explosion = null;	   
	this.score = 0;
	this.scoreString = '';	   
	this.lives = null;
	this.stateText = null;
	this.totalLives = 3;		
	this.over='GAME OVER';
	this.click = 'Click to restart';
  }
	
	
  Game.prototype = {
	  

    create: function () {6
		// Fondo
		this.starfield = this.add.tileSprite(0, 0, 600, 800, 'starfield');
		
		this.music = this.game.add.audio('musicTheme', 1, true);
        this.music.play('', 0, 1, true);
 
		// Creamos al jugador
		this.player = this.add.sprite(this.world.centerX, 700, 'ship');
		this.player.anchor.setTo(0.5, 0.5);
 
 
		// Creamos nuestras balas
		this.bullets = this.add.group();
		this.bullets.createMultiple(50, 'bullet');
		this.bullets.setAll('anchor.x', 0.5);
		this.bullets.setAll('anchor.y', 0.5);
		this.bullets.setAll('outOfBoundsKill', true);
		
		
		// Balas de los enemigos
		this.enemyBullets = this.add.group();
		this.enemyBullets.createMultiple(50, 'bullet');
		this.enemyBullets.setAll('anchor.x', 0.5);
		this.enemyBullets.setAll('anchor.y', 0.5);
		this.enemyBullets.setAll('outOfBoundsKill', true);
    
    
		//  Grupo de explosiones
		this.explosions = this.add.group();
		this.explosions.createMultiple(30, 'explosion');
		this.explosions.forEach(this.setupAlien, this);

		
	    this.createAliens();
		
	   //  El score
		this.scoreString = 'Score : ';
		this.scoreText = this.add.text(10, 10, this.scoreString + this.score, { fontSize: '34px', fill: '#fff' });


		//  Las vidas
		this.lives = this.add.group();
		this.add.text(this.world.width - 100, 10, 'Lives : ', { fontSize: '34px', fill: '#fff' });

		for (var i = 0; i < 3; i++) 
		{
        var live = this.lives.create(this.world.width - 100 + (30 * i), 60, 'heart');
        live.anchor.setTo(0.5, 0.5);
        live.angle = 0;
        live.alpha = 0.4;
		}


		// Asignamos el boton de disparo
		this.cursors = this.input.keyboard.createCursorKeys();
		this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			
		
		this.time.events.repeat(Phaser.Timer.SECOND * 5, 30, this.createAliens, this);
    },
   
   
   
   // Funcion que crea los aliens
 createAliens: function () { 
	this.aliens = this.add.sprite(this.world.randomX, 0, 'alien');
 },
 
 setupAlien: function (aliens) {
    aliens.anchor.x = 0.5;
    aliens.anchor.y = 0.5;
    aliens.animations.add('explosion');
},



	update: function () {
		// Sensacion de movimiento
		this.starfield.tilePosition.y += 2;
		
		this.player.body.velocity.setTo(0, 0);
		
		// Movimiento
		if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		{
			this.player.x -= 10;
		}
		else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		{
			this.player.x += 10;
		}

		if (this.input.keyboard.isDown(Phaser.Keyboard.UP))
		{
			this.player.y -= 10;
		}
		else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN))
		{
			this.player.y += 10;
		}
		
		
		 //  Disparos
		if (this.fireButton.isDown)
		{
			this.fireBullet();
		}
		if (this.game.time.now > this.firingTimer)
		{
			this.enemyFires();
		}	
		
		this.aliens.y += 5;
		
		// Fisicas de colision
		this.game.physics.overlap(this.bullets, this.aliens, this.collisionHandler, null, this);
		this.game.physics.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
	},
	
	
	
	// Funcion que crea los disparos de los enemigos
	 enemyFires: function () {

    this.enemyBullet = this.enemyBullets.getFirstExists(false);
    this.livingEnemies=1;

    if (this.enemyBullet && this.livingEnemies > 0)
    {
        this.enemyBullet.reset(this.aliens.body.x, this.aliens.body.y);
        this.physics.moveToObject(this.enemyBullet,this.player,400);
        this.firingTimer = this.game.time.now + 2000;
    }
},


	
	// Funcion que crea nuestros disparos
	fireBullet: function() {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (this.game.time.now > this.bulletTime)
    {
        //  Grab the first bullet we can from the pool
        this.bullet = this.bullets.getFirstExists(false);

        if (this.bullet)
        {
            //  And fire it
            this.bullet.reset(this.player.x, this.player.y + 8);
            this.bullet.body.velocity.y = -400;
            this.bulletTime = this.game.time.now + 200;
        }
    }
},



	//Borra los disparos
reset: function(bullet){
		 bullet.kill();
	},
	
	// Colisiones entre nuestras balas y los enemigos
	 collisionHandler: function (bullet, aliens) {

    // Se eliminan la bala y el alien
    bullet.kill();
    aliens.destroy();

    //  Aumentamos el score
    this.score += 20;
    this.scoreText.content = this.scoreString + this.score;

    // Creamos la explosion
    this.explosion = this.explosions.getFirstDead();
    this.explosion.reset(this.aliens.body.x, this.aliens.body.y);
    this.explosion.play('explosion', 30, false, true);

},



	// Colisiones estre el jugador y las balas
 enemyHitsPlayer: function (player,bullet) {
    
    bullet.kill();

    this.live = this.lives.getFirstAlive();
    
	// Perdida de vida
    if (this.live)
    {
        this.live.kill();
        this.totalLives-=1;
    }

    //  Creamos la explosion 
    this.explosion = this.explosions.getFirstDead();
    this.explosion.reset(player.body.x, player.body.y);
    this.explosion.play('explosion', 30, false, true);

    // El jugador muere
    if (this.totalLives < 1)
    {
       player.kill();
       this.enemyBullets.callAll('kill'); 
       this.aliens.destroy();       
       var end = this.add.text(225, 100, this.over, { fontSize: '50px', fill: '#fff' });  
       var Clic = this.add.text(225, 500, this.click, { fontSize: '50px', fill: '#fff' });  
       this.input.onTap.addOnce(this.restart,this);
      
    }

},
	

	
	// Funcion de reinio
 restart: function () {
	this.score = 0;
	this.totalLives = 3;
	this.create();
	this.update();
},
		


  };

  window['game'] = window['game'] || {};
  window['game'].Game = Game;

}());
