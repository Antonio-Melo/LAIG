
/**
 * HexBoard
 * @constructor
 */
function HexBoard(scene) {
  CGFobject.call(this, scene);


  this.boardRex = new Rectangle(scene,"hexboard",15,-15,20,-20);
  this.leftTri = new Triangle(scene,"leftTri",-25,-15,-15,0,-20,20,0,0,0);
  this.rightTri = new Triangle(scene,"rightTri",15,15,25,20,-20,0,0,0,0);


	//this.appearance = new CGFappearance(this.scene);
	//this.appearance.loadTexture("textures\\"+this.textureref+".jpg");

};

HexBoard.prototype = Object.create(CGFobject.prototype);
HexBoard.prototype.constructor=HexBoard;

HexBoard.prototype.display = function(){
  this.scene.pushMatrix();
    //this.appearance.apply();
    this.leftTri.display();
    this.rightTri.display();
	  this.boardRex.display();
  this.scene.popMatrix();
}
