function Sprite(){
  this.position = { x:0, y: 0};
  this.velocity = { x:0, y: 0};
  this.orientation = 0;
  this.name = "Sprite_" + this.totalCount;
  Sprite.prototype.totalCount += 1;
}
Sprite.prototype.rotate = function(angle) {
  console.log("rotate called");
  this.setOrientation(this.orientation + angle);
};
Sprite.prototype.totalCount = 0;
Sprite.prototype.setOrientation = function(newOrientation) {
  console.log("setOrientation called");
  this.orientation  = newOrientation;
};
Sprite.prototype.setPosition = function(newPos) {
  this.position.x = newPos.x;
  this.position.y = newPos.y;
};
Sprite.prototype.setVelocity = function(newV) {
  this.velocity.x = newV.x;
  this.velocity.y = newV.y;
};
Sprite.prototype.update = function(deltaMs){
  this.position.x += this.velocity.x * (deltaMs / 1000.0 );
  this.position.y += this.velocity.y * (deltaMs / 1000.0 );
};
Sprite.prototype.animate = function(){
  var self = this;
  setTimeout(function(){
    self.update(100);
    self.animate();
  }, 100);
}
