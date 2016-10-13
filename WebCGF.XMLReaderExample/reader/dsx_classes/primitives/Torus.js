function Torus(node, scene){
  CGFobject.call(this,scene);

  this.node= node;

  this.inner =  node.attributes.getNamedItem("inner").value;
  this.outer = node.attributes.getNamedItem("outer").value;
  this.slices = node.attributes.getNamedItem("slices").value;
  this.loops = node.attributes.getNamedItem("loops").value;

  this.initBuffers();
};

Torus.prototype = Object.create(CGFobject.prototype);
Torus.prototype.constructor=Torus;

Torus.prototype.initBuffers = function(){
      this.vertices = [];
      this.indices = [];
      this.normals = [];
      this.texCoords = [];

      var u = 2*Math.PI /this.slices;
      var v = 2*Math.PI/this.loops;

      for(var stack = 0; stack <= this.loops;stack++){
        var ang = stack*v;
        var sin = Math.sin(ang);
        var cos = Math.cos(ang);

        for(var slice = 0;slice <= this.slices;slice++){
          var ang2 = slice * u;
          var sin2 = Math.sin(ang2);
          var cos2 = Math.cos(ang2);

          var x = (this.outer +(this.inner * cos))*cos2;
          var y = (this.outer +(this.inner * cos))*sin2;
          var z = this.inner * sin;
          var s = 1 - (stack/this.loops);
          var t = 1 - (slice/this.slices);

          this.vertices.push(x,y,z);
          this.normals.push(x,y,z);
          this.texCoords.push(s,t);
        }
      }

      for(var stack = 0;stack < this.loops; stack++){
        for(var slice = 0;slice < this.slices;slice++){
          var f =(stack * (this.slices +1))+slice;
          var s = f + this.slices + 1;

          this.indices.push(f,s +1,s);
          this.indices.push(f,f+1,s+1);
        }
      }

      this.primitiveType = this.scene.gl.TORUS;
      this.initGLBuffers();
}
