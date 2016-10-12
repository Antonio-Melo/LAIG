function Transformation(node){

    this.reader = new CGFXMLreader();


    this.node = node;

    if(this.reader.getString(node,'id') != null){
      this.id = this.reader.getString(node,'id');
    }else {
      this.id = "ctransformation";
    }

    this.matrix = mat4.create();
    mat4.identity(this.matrix);

    for(var i = 0; i < node.children.length;i++){
      switch (node.children[i].nodeName) {
        case "translate":
          this.translate(node.children[i]);
          break;
        case "rotate":
          this.rotate(node.children[i]);
          break;
        case "scale":
          this.scale(node.children[i]);
          break;
        default:
          break;
      }
    }
};

Transformation.prototype.translate = function(node){
  var tx = this.reader.getFloat(node,"x");
  var ty = this.reader.getFloat(node,"y");
  var tz = this.reader.getFloat(node,"z");
  mat4.translate(this.matrix,this.matrix,[tx,ty,tz]);
}

Transformation.prototype.rotate = function(node){
  var axis = this.reader.getString(node,"axis");
  var angle = this.reader.getFloat(node,"angle")*Math.PI/180;
  var rotation;

  if (axis == 'x') rotation = [1, 0, 0];
  else if (axis == 'y') rotation = [0, 1, 0];
  else if (axis == 'z') rotation = [0, 0, 1];

  mat4.rotate(this.matrix,this.matrix,angle,rotation);
}

Transformation.prototype.scale = function(node){
  var sx = this.reader.getFloat(node,"x");
  var sy = this.reader.getFloat(node,"y");
  var sz = this.reader.getFloat(node,"z");

  mat4.scale(this.matrix,this.matrix,[sx,sy,sz]);
}
