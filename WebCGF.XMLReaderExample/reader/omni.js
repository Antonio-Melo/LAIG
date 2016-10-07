function Omni(node){

    this.reader = new CGFXMLreader();

    this.node = node;


    this.id = this.reader.getString(node,'id');
    this.enabled = this.reader.getBoolean(node,'enabled');

    var location = node.getElementsByTagName('location')[0];
    this.lx = this.reader.getFloat(location,'x');
    this.ly = this.reader.getFloat(location,'y');
    this.lz = this.reader.getFloat(location,'z');

    var ambient = node.getElementsByTagName('ambient')[0];
    this.ar = this.reader.getFloat(ambient,'r');
    this.ag = this.reader.getFloat(ambient,'g');
    this.ab = this.reader.getFloat(ambient,'b');
    this.aa = this.reader.getFloat(ambient,'a');

    var diffuse = node.getElementsByTagName('diffuse')[0];
    this.dr = this.reader.getFloat(diffuse,'r');
    this.dg = this.reader.getFloat(diffuse,'g');
    this.db = this.reader.getFloat(diffuse,'b');
    this.da = this.reader.getFloat(diffuse,'a');

    var specular = node.getElementsByTagName('specular')[0];
    this.sr = this.reader.getFloat(specular,'r');
    this.sg = this.reader.getFloat(specular,'g');
    this.sb = this.reader.getFloat(specular,'b');
    this.sa = this.reader.getFloat(specular,'a');

  console.debug(this.id + '\n');
	console.debug(this.enabled + '\n');
  console.debug(this.ar + '\n');
  console.debug(this.sb + '\n');
};
