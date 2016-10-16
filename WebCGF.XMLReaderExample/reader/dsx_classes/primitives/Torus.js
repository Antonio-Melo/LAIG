function Torus(node, scene,id){
  CGFobject.call(this,scene);
  this.reader = new CGFXMLreader();

  this.node= node;
  this.id = id;

  this.inner =  this.reader.getFloat(node,'inner');
  this.outer = this.reader.getFloat(node,'outer');
  this.slices =  this.reader.getFloat(node,'slices');
  this.loops =  this.reader.getFloat(node,'loops');

  //console.debug(this.inner);
  //console.debug(this.outer);
  //console.debug(this.slices);


  this.initBuffers();
};

Torus.prototype = Object.create(CGFobject.prototype);
Torus.prototype.constructor = Torus;

Torus.prototype.initBuffers = function(){
  this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

 	var deltaAlpha = 360.0/this.slices;
 	var deltaPhi = 360.0/this.loops;
 	var r = (this.outer - this.inner)/2;

 	var deg2Rad = Math.PI/180.0;

	var phi = 0;
	for(var k = 0; k <= this.loops; k++)
	{
		var phiRad = phi*deg2Rad;
		var alpha = 0;
		for(var i = 0; i <= this.slices; i++)
		{
			var alphaRad = alpha*deg2Rad;

			//Vertices
			var d = this.inner + r + r*Math.cos(phiRad);
			this.vertices.push(d*Math.cos(alphaRad),d*Math.sin(alphaRad),r*Math.sin(phiRad));

			//Indices
			if(i > 0 && k > 0)
			{
				this.indices.push((this.slices+1)*(k)+(i),(this.slices+1)*(k)+(i-1),(this.slices+1)*(k-1)+(i-1));
				this.indices.push((this.slices+1)*(k)+(i),(this.slices+1)*(k-1)+(i-1),(this.slices+1)*(k-1)+(i));
			}

			//Normals
			this.normals.push(d*r*Math.cos(alphaRad)*Math.cos(phiRad),d*r*Math.sin(alphaRad)*Math.cos(phiRad),d*r*Math.sin(phiRad));

			//Texture coords
			this.texCoords.push(i/(this.slices), 1 -k/this.loops);

			alpha += deltaAlpha;
		}

		phi += deltaPhi;
	}


	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
