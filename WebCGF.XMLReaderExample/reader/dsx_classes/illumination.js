function Illumination(node){

    this.reader = new CGFXMLreader();

    this.node = node;

    this.doublesided = this.reader.getBoolean(node,'doublesided');
    this.local = this.reader.getFloat(node,'local');
    var ambient = node.getElementsByTagName('ambient')[0];

    this.ra = this.reader.getFloat(ambient,'r');
    this.ga = this.reader.getFloat(ambient,'g');
    this.ba = this.reader.getFloat(ambient,'b');
    this.aa = this.reader.getFloat(ambient,'a');

    var background = node.getElementsByTagName('background')[0];

    this.rb = this.reader.getFloat(background,'r');
    this.gb = this.reader.getFloat(background,'g');
    this.bb = this.reader.getFloat(background,'b');
    this.ab = this.reader.getFloat(background,'a');


  console.debug(this.doublesided + '\n');
  console.debug(this.local + '\n');
	console.debug(this.ra + '\n');
  console.debug(this.ba + '\n');
  console.debug(this.gb + '\n');
};
