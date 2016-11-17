function LinearAnimation(id,span,points){
    Animation.call(this,id,span);

    this.points = points;
};

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;
