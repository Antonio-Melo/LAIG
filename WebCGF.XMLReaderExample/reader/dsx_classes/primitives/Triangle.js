/*
  Class that represents a triangle primitive in the scene
*/

function Triangle(node){

  this.node = node;

  this.x1 = node.attributes.getNamedItem("x1").value;
  this.x2 = node.attributes.getNamedItem("x2").value;
  this.x3 = node.attributes.getNamedItem("x3").value;

  this.y1 = node.attributes.getNamedItem("y1").value;
  this.y2 = node.attributes.getNamedItem("y2").value;
  this.y3 = node.attributes.getNamedItem("y3").value;

  this.z1 = node.attributes.getNamedItem("z1").value;
  this.z2 = node.attributes.getNamedItem("z2").value;
  this.z3 = node.attributes.getNamedItem("z3").value;

  console.debug("Triangle "+this.x1);
}
