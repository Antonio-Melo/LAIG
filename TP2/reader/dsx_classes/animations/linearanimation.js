function LinearAnimation(node){

    this.reader = new CGFXMLreader();
    Animation.call(this);

    var controlpoint = node.getElementsByTagName('controlpoint')[0];

    this.xx = this.reader.getFloat(controlpoint,'xx');
    this.yy = this.reader.getFloat(controlpoint,'yy');
    this.zz = this.reader.getFloat(controlpoint,'zz');
};

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;
