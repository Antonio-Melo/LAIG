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

    for(var i = node.children.length -1; i >= 0;i--){
      console.debug("Transformation ");
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
  var vec = vec3.create();
  var tx = this.reader.getFloat(node,"x");
  var ty = this.reader.getFloat(node,"y");
  var tz = this.reader.getFloat(node,"z");
  vec3.set(vec,tx,ty,tz);

  mat4.translate(this.matrix,this.matrix,vec);
}

Transformation.prototype.rotate = function(node){
  var axis = this.reader.getString(node,"axis");
  var angle = this.reader.getFloat(node,"angle")*Math.PI/180;

  if (axis == 'x') mat4.rotateX(this.matrix,this.matrix,angle);
  else if (axis == 'y') mat4.rotateY(this.matrix,this.matrix,angle);
  else if (axis == 'z') mat4.rotateZ(this.matrix,this.matrix,angle);
}

Transformation.prototype.scale = function(node){
  var vec = vec3.create();
  var sx = this.reader.getFloat(node,"x");
  var sy = this.reader.getFloat(node,"y");
  var sz = this.reader.getFloat(node,"z");
  vec3.set(vec,sx,sy,sz);

  mat4.scale(this.matrix,this.matrix,vec);
}
