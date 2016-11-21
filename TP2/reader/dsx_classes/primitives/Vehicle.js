/**
 * Vehicle
 * @constructor
 */
function Vehicle(scene,id){
  this.id = id;
  this.scene = scene;




  //Fire
  this.exhaustLeftPipe;
  this.exhaustRightPipe;
  this.leftFire;
  this.rightFire;

  //Flag
  this.FlagHolder;
  this.flag;

  //Primitives used
  this.rectangle = new Rectangle(this.scene,"rectangeVehicle",-0.5,0.5,-0.5,0.5);
  this.wheel = new Torus(this.scene,"wheel",0.5,1.5,40,40);
  this.exhaustPipe = new Cylinder(this.scene,"exhaustPipe",0.5,0.5,1,50,20);
  this.fire = new Cylinder(this.scene,"fire",0.5,0.0,1,50,20);

  var controlPointsFlag = [
      [-2,-2,1],
      [-2,-1,-2],
      [-2,1,2],
      [-2,2,-1],
      [0,-2,0],
      [0,-1,-1],
      [0,1,1.2],
      [0,2,0],
      [2,-2,0],
      [2,-1,2],
      [2,1,-2],
      [2,2,0],
  ];
  this.flag = new Patch(this.scene,"flag",2,3,20,20,controlPointsFlag);

  //Apperences
  this.normalAppearance = new CGFappearance(this.scene);
  this.normalAppearance.loadTexture("textures\\bus.jpg");

  this.windowAppearance = new CGFappearance(this.scene);
  this.windowAppearance.loadTexture("textures\\window.jpg");

  this.whellsAppearance = new CGFappearance(this.scene);
  this.whellsAppearance.loadTexture("textures\\tire.jpg");

  this.metalAppearance = new CGFappearance(this.scene);
  this.metalAppearance.loadTexture("textures\\metal.jpg");

  this.fireAppearance = new CGFappearance(this.scene);
  this.fireAppearance.loadTexture("textures\\fire.jpg");

  this.flagAppearance = new CGFappearance(this.scene);
  this.flagAppearance.loadTexture("textures\\portugal.png");

  this.poleAppearance = new CGFappearance(this.scene);
  this.poleAppearance.loadTexture("textures\\chimney.jpg");

}

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor = Vehicle;


Vehicle.prototype.display = function(){

  this.normalAppearance.apply();
  //----------Back of the Car-----------
  //Sides
  //positiveZside
  this.scene.pushMatrix();
    this.scene.translate(0,0,5);
    this.scene.scale(15,6,1);
    this.rectangle.display();
  this.scene.popMatrix();
  //negativeZside
  this.scene.pushMatrix();
    this.scene.translate(0,0,-5);
    this.scene.rotate(Math.PI,0,1,0);
    this.scene.scale(15,6,1);
    this.rectangle.display();
  this.scene.popMatrix();
  //top
  this.scene.pushMatrix();
    this.scene.translate(0,3,0);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.scale(15,10,1);
    this.rectangle.display();
  this.scene.popMatrix();
  //back
  this.scene.pushMatrix();
    this.scene.translate(-7.5,0,0);
    this.scene.rotate(-Math.PI/2,0,1,0);
    this.scene.scale(10,6,1);
    this.rectangle.display();
  this.scene.popMatrix();
  //front
  this.scene.pushMatrix();
    this.scene.translate(7.5,0,0);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.scale(10,6,1);
    this.rectangle.display();
  this.scene.popMatrix();

  //----------Front of the Car-----------
  this.metalAppearance.apply();
  //right
  this.scene.pushMatrix();
    this.scene.translate(8.5,-1,-5);
    this.scene.rotate(Math.PI,0,1,0);
    this.scene.scale(2,4,1);
    this.rectangle.display();
  this.scene.popMatrix();
  //left
  this.scene.pushMatrix();
    this.scene.translate(8.5,-1,5);
    this.scene.scale(2,4,1);
    this.rectangle.display();
  this.scene.popMatrix();
  //front
  this.scene.pushMatrix();
    this.scene.translate(9.5,-1,0);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.scale(10,4,1);
    this.rectangle.display();
  this.scene.popMatrix();
  //top
  this.scene.pushMatrix();
    this.scene.translate(8.5,1,0);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.scale(2,10,1);
    this.rectangle.display();
  this.scene.popMatrix();

  //Windows
  this.windowAppearance.apply();
  //right window
  this.scene.pushMatrix();
    this.scene.translate(8.5,0,-5.1);
    this.scene.rotate(Math.PI,0,1,0);
    this.scene.scale(1.5,1.5,1);
    this.rectangle.display();
  this.scene.popMatrix();
  //lef window
  this.scene.pushMatrix();
    this.scene.translate(8.5,0,5.1);
    this.scene.scale(1.5,1.5,1);
    this.rectangle.display();
  this.scene.popMatrix();
  //front window
  this.scene.pushMatrix();
    this.scene.translate(9.6,0,0);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.scale(9,1.5,1);
    this.rectangle.display();
  this.scene.popMatrix();

  //----------Whells---------------
  this.whellsAppearance.apply();
  //backRightWheel
  this.scene.pushMatrix();
    this.scene.translate(-5,-3,5);
    this.wheel.display();
  this.scene.popMatrix();
  //backLeftWheel
  this.scene.pushMatrix();
    this.scene.translate(-5,-3,-5);
    this.wheel.display();
  this.scene.popMatrix();
  //frontRightWheel
  this.scene.pushMatrix();
    this.scene.translate(5,-3,5);
    this.wheel.display();
  this.scene.popMatrix();
  //frontLeftWheel
  this.scene.pushMatrix();
    this.scene.translate(5,-3,-5);
    this.wheel.display();
  this.scene.popMatrix();

  //ExhaustPipes
  this.metalAppearance.apply();
  //left
  this.scene.pushMatrix();
    this.scene.translate(-8.5,-2.5,-2);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.exhaustPipe.display();
  this.scene.popMatrix();
  //Right
  this.scene.pushMatrix();
    this.scene.translate(-8.5,-2.5,2);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.exhaustPipe.display();
  this.scene.popMatrix();

  //Fire
  this.fireAppearance.apply();
  //Left
  this.scene.pushMatrix();
    this.scene.translate(-8.5,-2.5,-2);
    this.scene.rotate(-Math.PI/2,0,1,0);
    this.fire.display();
  this.scene.popMatrix();
  //Right
  this.scene.pushMatrix();
    this.scene.translate(-8.5,-2.5,2);
    this.scene.rotate(-Math.PI/2,0,1,0);
    this.fire.display();
  this.scene.popMatrix();

  //Flags
  this.flagAppearance.apply();
  //left
  this.scene.pushMatrix();
    this.scene.translate(4,6,2);
    this.flag.display();
  this.scene.popMatrix();
  //Right
  this.scene.pushMatrix();
    this.scene.translate(4,6,-2);
    this.flag.display();
  this.scene.popMatrix();

  //Poles
  this.poleAppearance.apply();
  //Left
  this.scene.pushMatrix();
    this.scene.translate(6.2,2,2);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.scale(0.5,0.5,6);
    this.exhaustPipe.display();
  this.scene.popMatrix();
  //Right
  this.scene.pushMatrix();
    this.scene.translate(6.2,2,-2);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.scale(0.5,0.5,6);
    this.exhaustPipe.display();
  this.scene.popMatrix();
}
