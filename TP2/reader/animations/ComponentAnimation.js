function ComponentAnimation(animations){
  this.animations = animations;

  this.animationIndex = 0;
  this.animations[0].render = true;
}

ComponentAnimation.prototype.getAnimationPosition = function () {
  if(this.animations[this.animationIndex].finished &&
     this.animationIndex != this.animations.length -1){
       this.animationIndex++;
       this.animations[this.animationIndex].render = true;
  }
  return this.animations[this.animationIndex].getAnimationPosition();
};

ComponentAnimation.prototype.getAnimationAngle = function () {
  return this.animations[this.animationIndex].getAnimationAngle();
};

ComponentAnimation.prototype.getAnimationMatrix = function () {
  var matrix = mat4.create();

  mat4.translate(matrix,matrix,this.getAnimationPosition());
  mat4.rotateY(matrix,matrix,this.getAnimationAngle());
  //mat4.translate(matrix,matrix,[this.animations[this.animationIndex].radius,0,0]);
  if(this.animations[this.animationIndex].rot){
   mat4.rotateY(matrix,matrix,Math.PI);
  }


  return matrix;
};
