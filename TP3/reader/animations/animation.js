function Animation(id,span){
    this.id = id;
    this.span = span;

    this.finished = false;
    this.render = false;
};

Animation.prototype.update = function(currTime) { };
Animation.prototype.getCurrentPosition = function() { };
Animation.prototype.getCurrentAngle = function() { };
