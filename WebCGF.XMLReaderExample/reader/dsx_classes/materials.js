function Materials(node){

    this.reader = new CGFXMLreader();

    this.node = node;


    this.id = this.reader.getString(node,"id");

    var emission = this.node.getElementsByTagName("emission")[0];
    this.er = this.reader.getFloat(emission,"r");
    this.eg = this.reader.getFloat(emission,"g");
    this.eb = this.reader.getFloat(emission,"b");
    this.ea = this.reader.getFloat(emission,"a");

    var ambient = this.node.getElementsByTagName("ambient")[0];
    this.ar = this.reader.getFloat(ambient,"r");
    this.ag = this.reader.getFloat(ambient,"g");
    this.ab = this.reader.getFloat(ambient,"b");
    this.aa = this.reader.getFloat(ambient,"a");

    var diffuse = this.node.getElementsByTagName("diffuse")[0];
    this.dr = this.reader.getFloat(diffuse,"r");
    this.dg = this.reader.getFloat(diffuse,"g");
    this.db = this.reader.getFloat(diffuse,"b");
    this.da = this.reader.getFloat(diffuse,"a");

    var specular = this.node.getElementsByTagName("specular")[0];
    this.sr = this.reader.getFloat(specular,"r");
    this.sg = this.reader.getFloat(specular,"g");
    this.sb = this.reader.getFloat(specular,"b");
    this.sa = this.reader.getFloat(specular,"a");

    var shininess = this.node.getElementsByTagName("shininess")[0];
    this.value = this.reader.getFloat(shininess,"value");


  console.debug(this.id + '\n');
  console.debug(this.er + '\n');
	console.debug(this.ag + '\n');
  console.debug(this.sr + '\n');

}
