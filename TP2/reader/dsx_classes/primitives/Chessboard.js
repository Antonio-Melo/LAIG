function Chessboard(scene,id,du,dv,textureref,su,sv,c1,c2,cs){

  this.scene = scene;
  this.id = id;
  this.du = du;
  this.dv = dv;
  this.textureref = textureref;
  this.su = su;
  this.sv = sv;
  this.c1 = c1;
  this.c2 = c2;
  this.cs = cs;

  CGFobject.call(this, scene);
};


Chessboard.prototype = Object.create(CGFobject.prototype);
Chessboard.prototype.constructor = Chessboard;
