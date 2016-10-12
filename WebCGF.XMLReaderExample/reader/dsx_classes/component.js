function Component (node){
    this.reader = new CGFXMLreader();

    this.node = node;
    this.transformations = null;
    this.materials = [];
    this.componentref = [];
    this.primitiveref = [];

    //id
    this.id = this.reader.getString(node,'id');

    //Transformations
    //verificar que existe pelo menos uma das coisas
    var trans = this.node.getElementsByTagName('transformation')[0];
    var transref = trans.getElementsByTagName('transformationref')[0];
    if(transref != null){
      this.transref = this.reader.getString(transref,"id");
    }else{
        this.transformations = new Transformation(trans);
    }

    //Materials
    //falta verificar que existe block e material
    //falta id="inherit"
    //carregar no m e mudar de material
    var mat = this.node.getElementsByTagName('materials')[0];
    for(var i = 0;i < mat.children.length;i++){
      this.materials.push(this.reader.getString(mat.children[i],"id"));
    }

    //Textures
    //falta verificar que existe sempre block e textura
    //falta id="inherit" id "none"
    var tex = this.node.getElementsByTagName('texture')[0];
    this.textureid = this.reader.getString(tex,"id");

    //Children
    //Obrigatório
    //verificar que existe uma ou mais tags
    var children = this.node.getElementsByTagName('children')[0];
    var cref = children.getElementsByTagName('componentref');
    for(var i = 0; i < cref.length;i++){
        this.componentref.push(this.reader.getString(cref[i],"id"));
    }
    var pref = children.getElementsByTagName('primitiveref');
    for(var i = 0;i < pref.length;i++){
      this.primitiveref.push(this.reader.getString(pref[i],"id"));
    }
}
