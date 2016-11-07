function Animation(node){

    this.reader = new CGFXMLreader();

    this.node = node;

    this.id = this.reader.getString(node,'id');
    this.span = this.reader.getFloat(node,'span');
};
