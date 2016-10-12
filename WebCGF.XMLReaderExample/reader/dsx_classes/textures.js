function Textures(node){

    this.reader = new CGFXMLreader();

    this.node = node;


    this.id = this.reader.getString(node,'id');
    this.file = this.reader.getString(node,'file');
    this.length_s = this.reader.getFloat(node,'length_s');
    this.length_t = this.reader.getFloat(node,'length_t');



  //console.debug(this.id + '\n');
  //console.debug(this.file + '\n');
	//console.debug(this.length_s + '\n');
  //console.debug(this.length_t + '\n');

};
