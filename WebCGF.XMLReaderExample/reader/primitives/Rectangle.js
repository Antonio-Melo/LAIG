/*
  Class that represents a rectangle primitive in the scene
*/

function Rectangle(node){

  this.node = node;

  this.x1 = node.attributes.getNamedItem("x1").value;
  this.x2 = node.attributes.getNamedItem("x2").value;
  this.y1 = node.attributes.getNamedItem("y1").value;
  this.y2 = node.attributes.getNamedItem("y2").value;
}
