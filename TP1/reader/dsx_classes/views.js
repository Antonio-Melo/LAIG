function View(node){

    this.reader = new CGFXMLreader();

    this.node = node;

    this.id =   this.reader.getString(node,'id');
    this.near = this.reader.getFloat(node,'near');
    this.far =  this.reader.getFloat(node,'far');
    this.angle = this.reader.getFloat(node,'angle');
    this.angle = this.angle *Math.PI/180;

    var f = node.getElementsByTagName('from')[0];

    this.fromX = this.reader.getFloat(f,'x');
    this.fromY = this.reader.getFloat(f,'y');
    this.fromZ = this.reader.getFloat(f,'z');

    var t = node.getElementsByTagName('to')[0];

    this.toX = this.reader.getFloat(t,'x');
    this.toY = this.reader.getFloat(t,'y');
    this.toZ = this.reader.getFloat(t,'z');
}
