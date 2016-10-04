/*
  Class that represents a torus primitive in the scene
*/

function Torus(node){
  this.node = node;

  this.inner = node.attributes.getNamedItem("inner").value;
  this.outer = node.attributes.getNamedItem("outer").value;
  this.slices = node.attributes.getNamedItem("slices").value;
  this.loops = node.attributes.getNamedItem("loops").value;
}
