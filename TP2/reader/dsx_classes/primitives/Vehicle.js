/**
 * Vehicle
 * @constructor
 */
function Vehicle(scene){

  //----------Back of the Car-----------
  //Sides
  this.positiveZside;
  this.negativeZside;
  this.top;
  this.back;

  //Whells
  this.backRightWheel;
  this.backLeftWheel;
  this.frontRightWheel;
  this.frontLeftWheel;

  //Fire
  this.exhaustLeftPipe;
  this.exhaustRightPipe;
  this.leftFire;
  this.rightFire;

  //--------Front of the Car------------
  this.frontFront;
  this.frontLeft;
  this.frontRight;
  this.frontTop;

  //Flag
  this.FlagHolder;
  this.flag;

}

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor = Vehicle;


Vehicle.prototype.display = function(){
}
