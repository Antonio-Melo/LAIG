/*
  Class that represents a House primitive in the scene
*/
 function House(scene,id,x,z) {
 	CGFobject.call(this,scene);

  this.id = id;
  this.scene = scene;
  this.x = x;
  this.z = z;

  this.surface = new CylinderSurf(scene,this.id,2.5,2.5,0.03,40,40);
  this.topCir = new CylinderBase(scene,2.5,40);
  this.baseCir = new CylinderBase(scene,2.5,40);
  this.basecolor = new CGFappearance(scene);
  this.basecolor.loadTexture("textures\\yellow.png");
 };

House.prototype = Object.create(CGFobject.prototype);
House.prototype.constructor = House;

House.prototype.display = function(){
  this.basecolor.apply();
  this.scene.pushMatrix();
    this.scene.translate(this.x,0,this.z);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.surface.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
    this.scene.translate(this.x,0,this.z);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.rotate(Math.PI,0,1,0);
    this.baseCir.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.scene.translate(this.x,0,this.z);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.translate(0,0,0.03);
    this.topCir.display();
  this.scene.popMatrix();
}
