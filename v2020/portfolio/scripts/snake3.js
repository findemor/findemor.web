/* Elliott Kember's jSnake, version 3 */
/* Edited by findemor.es */
// Usage: new Snake()
// Adding options: new Snake({ width: 30, mouse_chasing: true })
// TODO: Add list of options

// Compass bearings for directions
UP = 0;
RIGHT = 90;
DOWN = 180;
LEFT = 270;

var stadium;
var bindwindowresize = false;

/* Fruit object */
// We don't need all these variables. I'll take them out sooner or later.
Fruit = function(options) {
  this.init(options)
}
$.extend(Fruit.prototype, {
  stadium: false,
  position_x: 0,
  position_y: 0,
  element: 0,
  width: 0,
  left: 0,
  right: 0,
  
  // Create.
  init: function(options){
    
    this.options = $.extend({
      width: 20
    }, options)
    
    stadium = $('#snake-stadium');
    this.element = $('#fruit');
    
    if(this.element.length == 0){
      this.element = $('<'+'div id="fruit"><'+'/div>');  
    }
    if(stadium.length == 0){
      stadium = $('<'+'div id="snake-stadium"><'+'/div>')
      stadium.appendTo($('body'));
    }
	
    /*
    if(this.options['mouse_chasing']){
      this.element.css('display', 'none')
      $('body').mousemove(function(e){
        self.position_x = e.pageX
        self.position_y = e.pageY
        self.element.css({'top' : self.position_y, 'left' : self.position_x}); 
      });
    }*/
    
    /*this.element.css('position', 'fixed !important').css('background', '#00FF00')*/
	this.element.css('position', 'absolute').css('background', '#00FFCD')
    this.element.css('width', this.options['width']).css('height', this.options['width'])
    
    this.element.appendTo(stadium);
    this.place();
	
	
	if (bindwindowresize)
	{
    var self = this;

    $(window).bind('resize', function(){    
      // On resize, move it move it. 
      // This could be refactored into only-moving when outside the window.
      self.place();
    });
	}

  },
  
  remove: function(){
    this.element.remove();
  },
  
  place: function(){
    // Come up with a random number
    this.position_x = Math.floor(Math.random() * ($(stadium).width() - this.options['width']));
    // Take off remainder
    this.position_x -= (this.position_x % this.options['width']);

    // Come up with a random number
    this.position_y = Math.floor(Math.random() * ($(stadium).height() - this.options['width']));
    // Again, take off remainder
    this.position_y -= (this.position_y % this.options['width']);

    // Don't let it place off the page!  
    /*if(
      this.position_y < 0 
      || this.position_x < 0 
      || this.position_x > ($(stadium).width() - this.options['width']) 
      || this.position_y > ($(stadium).width() - this.options['width'])
    ){
      this.place();
    }else{
      this.element.css({'top' : this.position_y, 'left' : this.position_x}); 
    }*/
	
	this.element.css({'top' : this.position_y, 'left' : this.position_x}); 
  }
});

/* A snake */

Snake = function(options) {
  this.init(options);
}

$.extend(Snake.prototype, {
  head: false,
  tail: [],
  width: 20,
  position_x: 0,
  position_y: 0,
  screen_width: false,
  screen_height: false,
  timeout: 100,
  direction: DOWN,
  snake_name: 'snake',
  self: this,
  automatic: 0,
  score: 0,
  tailcount: 0,
  
  // Let's get this party started!
  init: function(options){
        
    this.options = $.extend({
      showScores : false,
      keys       : 'arrows',
      starting_x : 'random',
      starting_y : 'random',
      snake_name : 'one',
      timeout    : 100,
      name       : 'snake1',
      colour     : 'random',
      skynet_only: false,
      human_only : false,
      width      : 20,
      mouse_chasing: false
    }, options);
    
    //this.showScores = true;
    
    this.width = this.options['width'];

    // If it has no fruit, create one!
    if(typeof(fruit) == 'undefined' || fruit == false){
      this.fruit_object = $('<'+'div id="fruit"><'+'/div>');
      this.fruit_object.appendTo($("body"));
      this.fruit = new Fruit({ height:this.height, width:this.width, mouse_chasing: this.options['mouse_chasing']});
      fruit = this.fruit; 
    }else{
      this.fruit = fruit;
    }
    
    if(this.width != this.fruit.options['width']){
      this.width = this.fruit.options['width']
    }
    
    this.randomizePlacement();
    this.randomizeDirection();
    
    
    this.tail = [];
    
    //this.setKeys();
    
    this.position_x = this.options['starting_x'];
    this.position_y = this.options['starting_y'];
    this.snake_name = this.options['name'];
    this.timeout    = this.options['timeout'];
    
    this.doSizes();
    this.doHTML();
    this.doColours();
    this.move();
    
    var self = this;
    
    // Default tt mode timeout: 2 seconds
    this.skynetModeTimeout = this.options['skynetModeTimeout'] ? this.options['skynetModeTimeout'] : 2000
        
    // Enable Skynet mode after 2 seconds.
    if(!this.options['human_only']){
      setTimeout(function(){if(!self.automatic){
        if(self.automatic == 0)
          self.automatic = true;
      }}, this.skynetModeTimeout)
    }
    
    // This is what the doSizes is for. 
    if (bindwindowresize)
    {
    	$(window).bind('resize', function(){
    	  self.doSizes();
    	})
    }
    
    // If they have human control, add human control.
    if(!this.options['skynet_only']){
      $(document).keydown(function(e){
        var code = (e.keyCode ? e.keyCode : e.which);
        self.getDirectionFrom(code);
      });
    }else{
      this.automatic = true;
    }
  },
  
  // Append a tail.
  addTail: function(){
    var h = this.head.clone().text('');
    h.attr('id', this.position_x+'x'+this.position_y);
    h.addClass('block tail '+this.snake_name);
    h.css({'left': this.position_x, 'top':this.position_y, 'background-color': this.options['tail_colour']});
    // This has to be Before instead of After. Don't ask me why, because I can't remember.
    h.insertBefore($(this.head));
	//this.tailcount+=1;
    //this.tail.pop();
    this.tail.unshift(h);
    
    var lastTailItem = this.tail[this.tail.length-1];
    lastTailItem.remove();
    
  },
  
  // Have they lost!?!?!?!
  hasLost: function(){
    /*var element = '#'+this.position_x+'x'+this.position_y
    if ($(element).length > 0){
      return true;
    }else{
      return false;
    }*/
	return this.tailcount > 20;
  },
  
  // Functions for creating HTML and colours
  doHTML: function(){
    name = this.position_x + 'x' + this.position_y
    this.head = $('<'+'div id="'+name+'" class="head"><'+'/div>');
    this.head.css('width', this.width).css('height', this.width)
    this.head.css('left', this.position_y).css('top', this.position_x);
    this.head.attr('id', this.position_x+'x'+this.position_y);
    
    stadium = $('#snake-stadium');
    if(stadium.length == 0){
      stadium = $('<'+'div id="snake-stadium"><'+'/div>');
      stadium.appendTo($("body"))
    }
    
    this.head.appendTo(stadium);
  },
  
  doColours: function(){
    
    this.head.css('width', this.width);   // Probably shouldnt' be hard coded. TODO.
    this.head.css('height', this.width);  // See above and TODO.
    
    if (this.options['colour'] == 'random'){
      n = Math.floor(Math.random()*16777215)
      var unpaddedhexstr = n.toString(16);
      var hexstr = "000000".substring(unpaddedhexstr.length) + unpaddedhexstr;
      this.options['head_colour'] = '#'+hexstr;
      this.options['tail_colour'] = '#'+colorscale(this.options['head_colour'], 6)
    }else{
      this.options['head_colour'] = this.options['colour'];
      if(!this.options['tail_colour']){
        this.options['tail_colour'] = '#'+colorscale(this.options['colour'], 6)
      }
    }
    this.head.css('background', this.options['head_colour']);
  },
  
  // Set the key codes to keys.
  /*setKeys: function(){
    switch(this.options['keys']){
      case 'arrows':
        this.up_key = 38
        this.down_key = 40
        this.left_key = 37
        this.right_key = 39
        break;
      case 'wasd':
        this.up_key = 87
        this.down_key = 83
        this.left_key = 65
        this.right_key = 68
        break;
      case 'keypad':
        this.up_key = 104
        this.down_key = 98
        this.left_key = 100
        this.right_key = 102
        break;
      case 'ijkl':
        this.up_key = 73
        this.down_key = 75
        this.left_key = 74
        this.right_key = 76
        break;
      default:
        this.up_key = this.options['up_key'];
        this.down_key = this.options['down_key'];
        this.left_key = this.options['left_key'];
        this.right_key = this.options['right_key'];
        break;
    }
  },*/
  
  // Convert a keycode to a direction
  getDirectionFrom: function(input){
    switch(input){
      case this.up_key:
        if (this.direction != DOWN)   {this.automatic = false; this.direction = UP;    }  break;
      case this.right_key:                                                                      
        if (this.direction != LEFT)   {this.automatic = false; this.direction = RIGHT; }  break;
      case this.down_key:                                                                       
        if (this.direction != UP)     {this.automatic = false; this.direction = DOWN;  }  break;
      case this.left_key:                                                                       
        if (this.direction != RIGHT)  {this.automatic = false; this.direction = LEFT;  }  break;
    }
  },
  
  // Clear functions. Pathfinding.
  clearLeft: function(){
    left = $('#'+(this.position_x - this.width)+"x"+this.position_y).length == 0
    return left
  },
  clearRight: function(){
    right = $('#'+(this.position_x + this.width)+"x"+this.position_y).length == 0
    return right;
  },
  clearUp: function(){
    return $('#'+(this.position_x)+"x"+(this.position_y - this.width)).length == 0
  },
  clearDown: function(){
    return $('#'+(this.position_x)+"x"+(this.position_y + this.width)).length == 0
  },
  
  // Move
  move: function(){
    
    // Skynet
    if (this.automatic != false){
      this.doSkynet();
    }
    
    switch(this.direction){
      case UP:    this.position_y -= this.width; break;
      case RIGHT: this.position_x += this.width; break;
      case DOWN:  this.position_y += this.width; break;
      case LEFT:  this.position_x -= this.width; break;
    }

    this.fixOverlaps();

    if (this.hasLost()){
      this.reset();
    }
        
    // Do the actual moving
    this.head.css({'position': 'absolute', 'left': this.position_x, 'top': this.position_y});
    this.head.attr('id', this.position_x+'x'+this.position_y);
    
    // Remove the last tail, unless they've eaten a fruit.
    if (this.eatingFruit()){
      this.fruit.place();
      if(!this.automatic){
        this.timeout -= 2;
      }
	  //this.addTail();
    }else{
      if (this.tail.length > 1){
        this.tail.pop().remove();
      }
    }
    
    // Set up the next loop too
    var self = this;
    this.moving = setTimeout(function(){self.move();},this.timeout);
    
    this.addTail();
    this.tailcount = this.tail.length - 2;
  },
  
  // Random placement.
  randomizePlacement: function(force){
    if(this.options['starting_x'] == 'random' || force){
      r = Math.floor(Math.random()* $(stadium).width());
      r -= r % this.width;
      this.options['starting_x'] = r; //this.width;
      this.position_x = r;
    }
    if(this.options['starting_y'] == 'random' || force){
      r = Math.floor(Math.random()* $(stadium).height());
      r -= r % this.width;
      this.options['starting_y'] = r; //this.width;
      this.position_y = r;
    }
  },

  // Randomise direction
  randomizeDirection: function(){
    seed_direction = Math.random();
    if(seed_direction < 0.25){
      this.direction = UP;
    }else if(seed_direction < 0.5){
      this.direction = DOWN;
    }else if(seed_direction < 0.75){
      this.direction = LEFT;
    }else{
      this.direction = RIGHT;
    }
  },
  
  // Automatic-move
  doSkynet: function(){
    if (this.fruit.position_x < this.position_x && this.clearLeft() ){ this.direction = LEFT}
    else if (this.fruit.position_x >  this.position_x && this.clearRight() ){ 
      this.direction = RIGHT
    }else if (this.fruit.position_y >  this.position_y && this.clearDown() ){ 
      this.direction = DOWN
    }else if (this.fruit.position_x == this.position_x && this.fruit.position_y <= this.position_y && this.clearUp() ){ 
      this.direction = UP
    }else if (this.fruit.position_x == this.position_x && this.fruit.position_x >=  this.position_y && this.clearDown() ){
      this.direction = DOWN
    }
  
  
    // This code does diagonals. It's pretty creepy, so it's commented out.
    if(Math.random() > 0.5){
      if(this.fruit.position_y > this.position_y && this.direction == LEFT && this.clearDown()){
        this.direction = DOWN;
      }else if(this.fruit.position_y > this.position_y && this.direction == RIGHT && this.clearDown()){
        this.direction = DOWN;
      }
      if(this.fruit.position_y < this.position_y && this.direction == LEFT && this.clearDown()){
        this.direction = UP;
      }else if(this.fruit.position_y < this.position_y && this.direction == RIGHT && this.clearDown()){
        this.direction = UP;
      }
    }
  
    if(this.direction == UP && !this.clearUp()){
      this.direction = LEFT;
    }
    if (this.direction == LEFT && !this.clearLeft()){
      this.direction = DOWN;
    }
    if (this.direction == DOWN && !this.clearDown()){
      this.direction = RIGHT;
    }
    if (this.direction == RIGHT && !this.clearRight()){
      this.direction = UP;
    }
  },
  
  // Fixing modulus-related overlaps
  fixOverlaps: function(){
    // Overlap
    if (this.position_y < 0){                               // Off the top
      this.position_y =  (this.screen_height - this.width); 
      this.position_y -= (this.screen_height % this.width); // remainder if there is one
    } else
    if (this.position_x < 0){                               // Off the left
      this.position_x =  (this.screen_width - this.width);
      this.position_x -= (this.screen_width % this.width);  // remainder if there is one
    } else
    if (this.position_x > (this.screen_width - this.width)){  // Off the right
      this.position_x = 0;
    } else
    if (this.position_y >= (this.screen_height - this.width)){ // Off the bottom
      this.position_y = 0;
    } else

    if (this.position_x % this.width != 0){
      this.position_x -= this.screen_width % this.width
    }
  },
  
  // Start over, you lost!
  reset: function(){
    // A collision! Set the timeout to 1000 before their next move.
    this.timeout = 500;
    this.tailcount = 0;
    this.randomizeDirection();
    
    var self = this;
    // Reset everything after 1 second
    setTimeout(function(){
      $.each(self.tail, function(i, t){t.remove()})
      self.randomizePlacement(true);
      self.tail = [];
      self.timeout = self.options['timeout'];
    }, 1000);
  },
  
  // Screen sizes
  doSizes: function(){
    this.screen_width   =   $(stadium).width();
    this.screen_height  =   $(stadium).height();
    this.screen_width   -=  (this.screen_width % this.width);
    this.screen_height  -=  (this.screen_width % this.width);
  },
  
  // Is there a fruit where the head is?
  eatingFruit: function(){
    var fruit_x = this.fruit.position_x;
    var fruit_y = this.fruit.position_y;
    
    var fruit_x1 = fruit_x + this.fruit.width;
    var fruit_y1 = fruit_y + this.fruit.width;
    
    if (fruit_x == 0){
      return true;
    }
    if (this.position_x == fruit_x && this.position_y == fruit_y) {
      this.score += 1;
      if(this.showScores){
        this.head.text(this.tailcount);//this.score+11);
      }
      return true;
    }
  },
  
  stop: function(){
    $.each(this.tail, function(i, t){
      t.remove();
    });
    this.head.remove();
    if(this.fruit){
      this.fruit.remove();
    }
    
    clearTimeout(this.moving);
    
    return true;
  }
  
});





/* This script and many more are available free online at
The JavaScript Source!! http://javascript.internet.com
Created by: Joseph Myers | http://www.codelib.net/ */

function colorscale(hexstr, scalefactor) {
/* declared variables first, in order;
  afterwards, undeclared local variables */

  var r = scalefactor;
  var a, i;
  if (r < 0 || typeof(hexstr) != 'string')
    return hexstr;
    hexstr = hexstr.replace(/[^0-9a-f]+/ig, '');
    if (hexstr.length == 3) {
    a = hexstr.split('');
  } else if (hexstr.length == 6) {
    a = hexstr.match(/(\w{2})/g);
  } else
    return hexstr;
  for (i=0; i < a.length; i++) {
    if (a[i].length == 2)
      a[i] = parseInt(a[i], 16);
    else {
      a[i] = parseInt(a[i], 16);
      a[i] = a[i]*16 + a[i];
  }
  
}

var maxColor = parseInt('ff', 16);

function relsize(a) {
  if (a == maxColor)
  return Infinity;
  return a/(maxColor-a);
}

function relsizeinv(y) {
  if (y == Infinity)
  return maxColor;
  return maxColor*y/(1+y);
}

for (i=0; i < a.length; i++) {
  a[i] = relsizeinv(relsize(a[i])*r);
  a[i] = Math.floor(a[i]).toString(16);
  if (a[i].length == 1)
  a[i] = '0' + a[i];
}
return a.join('');
}


