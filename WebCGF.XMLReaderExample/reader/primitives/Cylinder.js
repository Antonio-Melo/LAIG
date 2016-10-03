/*
  Class that represents a cylinder primitive in the scene
*/

function Cylinder(node){

  this.node = node;

  this.base = node.attributes.getNamedItem("base").value;
  this.top = node.attributes.getNamedItem("top").value;
  this.height = node.attributes.getNamedItem("height").value;

  this.slices = node.attributes.getNamedItem("slices").value;
  this.stacks = node.attributes.getNamedItem("stacks").value;
}
