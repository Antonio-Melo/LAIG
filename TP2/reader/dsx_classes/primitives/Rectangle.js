function Rectangle(scene,id,x1,x2,y1,y2) {

  CGFobject.call(this,scene);

	this.materialDefault = new CGFappearance(this.scene);

  this.id = id;

  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;


  //console.debug("Rectangle "+this.x1 +" "+this.x2 +"\n");

	this.initBuffers();

};
Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor=Rectangle;

Rectangle.prototype.initBuffers = function () {
	this.vertices = [
            this.x1, this.y1, 0,
            this.x2, this.y1, 0,
            this.x2, this.y2, 0,
            this.x1, this.y2, 0

			];

	this.indices = [
            0, 1, 2,
			      2, 3, 0
        ];

    this.normals = [
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,1
    ];

  this.texCoords = [
    0, 1,
    this.x2-this.x1, 1,
    this.x2-this.x1, 1-(this.y2-this.y1),
   	0, 1-(this.y2-this.y1)
  ];

  this.baseTexCoords = [
    0, 1,
    this.x2-this.x1, 1,
    this.x2-this.x1, (this.y2-this.y1),
   	0, (this.y2-this.y1)
  ];

  this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

Rectangle.prototype.setTexCoords = function(ls,lt){
  this.texCoords = [
    0,1,
    this.baseTexCoords[2] / ls, 1,
    this.baseTexCoords[4] / ls, 1 - (this.baseTexCoords[5] / lt),
    0, 1 - (this.baseTexCoords[7] / lt)
  ];

  this.updateTexCoordsGLBuffers();
}
