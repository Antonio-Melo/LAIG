
/**
 * Chessboard
 * @constructor
 */
function Chessboard(scene,id,du,dv,textureref,su,sv,c1,c2,cs) {
  CGFobject.call(this, scene);
  this.id = id;
  this.scene=scene;
  this.du = du;
	this.dv = dv;
	this.textureref = textureref;
	this.su = su;
	this.sv = sv;
	this.c1 = c1;
	this.c2 = c2;
	this.cs = cs;

  this.boardPlane = new Plane(this.scene,"id",1,1,this.du*4,this.dv*4);

	this.shader = new CGFshader(this.scene.gl, "shaders/Chessboard.vert", "shaders/Chessboard.frag");

  this.shader.setUniformsValues({du: this.du});
	this.shader.setUniformsValues({dv: this.dv});
	this.shader.setUniformsValues({su: this.su});
	this.shader.setUniformsValues({sv: this.sv});
	this.shader.setUniformsValues({c1: vec4.fromValues(c1.r, c1.g, c1.b, c1.a)});
	this.shader.setUniformsValues({c2: vec4.fromValues(c2.r, c2.g, c2.b, c2.a)});
	this.shader.setUniformsValues({cs: vec4.fromValues(cs.r, cs.g, cs.b, cs.a)});

	this.appearance = new CGFappearance(this.scene);
	this.appearance.loadTexture("textures\\wood.jpg");

};

Chessboard.prototype = Object.create(CGFobject.prototype);
Chessboard.prototype.constructor=Chessboard;

Chessboard.prototype.display = function(){
  this.scene.pushMatrix();
    this.appearance.apply();
    this.scene.setActiveShader(this.shader);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.scale(20,20,1);
	     this.boardPlane.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix();
}
