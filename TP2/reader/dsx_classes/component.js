function Component (node,graph){
    this.reader = new CGFXMLreader();
    this.node = node;

    this.materials = [];
    this.children = [];
    this.animations = [];

    //id
    this.id = this.reader.getString(node,'id');

    //Transformations
    var trans = this.node.getElementsByTagName('transformation')[0];
    if(trans.children.length == 0)
      return "Neither transformationref or translate/rotation/scale in component";

    var transref = trans.getElementsByTagName('transformationref')[0];
    if(transref != null){
      this.transref = this.reader.getString(transref,"id");
    }else{
        this.transref = this.id + "trans";
        graph.transformations[this.transref]= new Transformation(trans,this.transref);
    }

    //Materials
    //falta id="inherit"
    //carregar no m e mudar de material
    var mat = this.node.getElementsByTagName('materials')[0];
    if(mat.children.length == 0)
      return "Zero materials found in the component";

    for(var i = 0;i < mat.children.length;i++){
      this.materials.push(this.reader.getString(mat.children[i],"id"));
    }

    //Textures
    //falta id="inherit" id "none"
    var tex = this.node.getElementsByTagName('texture')[0];
    if(tex == null)
      return "Not textures found in component";
    this.textureid = this.reader.getString(tex,"id");

    //Animations
    var anim = this.node.getElementsByTagName('animation')[0];
    //TODO check is this block is there
    if(anim != undefined){
      for(var i = 0; i < anim.children.length;i++){
        var arefnode = anim.children[i];
        var aref = this.reader.getString(arefnode,"id");
        this.animations.push(aref);
      }
    }

    //Children
    var children = this.node.getElementsByTagName('children')[0];
    if(children.children.length == 0)
      return "Neither componentref or primitiveref found in children block";

    var cref = children.getElementsByTagName('componentref');
    for(var i = 0; i < cref.length;i++){
        this.children.push(this.reader.getString(cref[i],"id"));
    }
    var pref = children.getElementsByTagName('primitiveref');
    for(var i = 0;i < pref.length;i++){
      this.children.push(this.reader.getString(pref[i],"id"));
    }
}
