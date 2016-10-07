function Transformation(node){

    this.reader = new CGFXMLreader();

    this.node = node;


    this.id = this.reader.getString(node,'id');

    var translate = node.getElementsByTagName('translate')[0];
    this.tx = this.reader.getFloat(translate,'x');
    this.ty = this.reader.getFloat(translate,'y');
    this.tz = this.reader.getFloat(translate,'z');

    var rotate = node.getElementsByTagName('rotate')[0];
    this.axis = this.reader.getFloat(rotate,'axis');
    this.angle = this.reader.getFloat(rotate,'angle');

    var scale = node.getElementsByTagName('scale')[0];
    this.sx = this.reader.getFloat(scale,'x');
    this.sy = this.reader.getFloat(scale,'y');
    this.sz = this.reader.getFloat(scale,'z');


  console.debug(this.id + '\n');
  console.debug(this.tx + '\n');
	console.debug(this.angle + '\n');
  console.debug(this.sx + '\n');

};
