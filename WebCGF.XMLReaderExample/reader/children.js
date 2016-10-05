function Children(node,reader){

    this.reader = new CGFXMLreader();

    this.node = node;



    var comp = node.getElementsByTagName('componentref')[0];
    this.idc = this.reader.getString(comp,'id');

    var prim = node.getElementsByTagName('primitiveref')[0];
    this.idp = this.reader.getString(prim,'id');


  console.debug(this.idc + '\n');
  console.debug(this.idp + '\n');

};
