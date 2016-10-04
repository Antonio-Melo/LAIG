/*
  Class that represents a sphere primitive in the scene
*/

function Sphere(node){

  this.node = node;

  this.radius = node.attributes.getNamedItem("radius").value;
  this.slices = node.attributes.getNamedItem("slices").value;
  this.stacks = node.attributes.getNamedItem("stackes").value;
}
