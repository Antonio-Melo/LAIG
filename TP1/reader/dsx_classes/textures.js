function Textures(node,scene){
    this.reader = new CGFXMLreader();

    this.node = node;


    this.id = this.reader.getString(node,'id');
    this.file = this.reader.getString(node,'file');
    this.texture = new CGFtexture(scene,this.file);
    this.length_s = this.reader.getFloat(node,'length_s');
    this.length_t = this.reader.getFloat(node,'length_t');
};
