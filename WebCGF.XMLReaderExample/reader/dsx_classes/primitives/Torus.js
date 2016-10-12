function Torus(node,scene){
  OGFobject.call(this,scene);

  this.materialDefault = new CGFappearance(this.scene);
  this.node= node;

  this.inner =  node.attributes.getNamedItem("inner").value;
  this.outer = node.attributes.getNamedItem("outer").value;
  this.slices = node.attributes.getNamedItem("slices").value;
  this.loops = node.attributes.getNamedItem("loops").value;

  this.initBuffers();
};
//u = 2%pi/stacks;
//v = 2%pi/slices;
Torus.prototype = Object.create(CGFobject.prototype);
Torus.prototype.constructor=Torus;

Torus.prototype.initBuffers = function(){
      this.vertices = [];
      this.indices = [];
      this.normals = [];
      this.texCoords = [];

      var u = 2*Math.PI /this.stacks;
      var v = 2*Math.PI/this.loops;

      

      this.primitiveType = this.scene.gl.TORUS;
      this.initGLBuffers();
}
