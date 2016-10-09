function Component(node){

    this.reader = new CGFXMLreader();

    this.node = node;
    this.listrans = [];

    this.id = this.reader.getString(node,'id');

    var trans = this.node.getElementsByTagName('transformation')[0];
    var transref = trans.getElementsByTagName('transformationref')[0];
    if(transref != null){
      this.transref = this.reader.getString(transref,"id");
    }else{
      for(var i =0; i < trans.children.length;i++){
        this.transformations = new Transformation(trans);
      }
    }



  console.debug(this.id + '\n');
};
