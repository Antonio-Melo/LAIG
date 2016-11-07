function CircularAnimation(node){

    this.reader = new CGFXMLreader();
    Animation.call(this,node);

    this.radius = this.reader.getFloat(node,'radius');
    this.startang = this.reader.getFloat(node,'startang');
    this.rotang = this.reader.getFloat(node,'rotang');

};

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;
