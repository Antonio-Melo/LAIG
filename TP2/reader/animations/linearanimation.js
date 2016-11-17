function LinearAnimation(id,span,points){
    Animation.call(this,id,span);

    this.points = points;
    console.debug(this.points);
    var totalAnimationDistance = 0;
    this.animationDistances = [];
    for(var i = 0; i <this.points.length-1;i++){
        var distance = this.calculateDistanceBetween2Points(this.points[i],this.points[i+1]);
        totalAnimationDistance +=distance;
        this.animationDistances.push(distance);
    }

    this.animationVelocity = totalAnimationDistance/span;

    this.currentAnimationControl = 0;
    this.currentAnimationPosition = this.points[0];
    this.currentAnimationAngle = Math.atan2*((this.points[1][0]-this.points[0][0]),(this.points[1][2]-this.points[0][2]));

    this.lastAnimationTime = -1;
};

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.update = function () {

};

LinearAnimation.prototype.getAnimationPosition = function () {
    return this.currentAnimationPosition;
};

LinearAnimation.prototype.getAnimationAngle = function () {
    return this.currentAnimationAngle;
};
LinearAnimation.prototype.calculateDistanceBetween2Points = function (p1,p2) {
    var deltax = p2[0]-p1[0];
    var deltay = p2[1]-p1[1];
    var deltaz = p2[2]-p1[2];

    return Math.sqrt(deltax*deltax+deltay*deltay+deltaz*deltaz);
};
