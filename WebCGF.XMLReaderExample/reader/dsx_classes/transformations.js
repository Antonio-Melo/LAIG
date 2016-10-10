function Transformation(node){

    this.reader = new CGFXMLreader();

    this.node = node;

    if(this.reader.getString(node,'id') != null){
      this.id = this.reader.getString(node,'id');
    }else {
      this.id = "ctransformation";
    }
    this.translations = [];
    this.rotations = [];
    this.scales = [];

    var translate = node.getElementsByTagName('translate');
    console.debug(translate.length+"\n");
    for(var i = 0;i < translate.length;i++){
      var t = [];
      var tr = translate[i];
      t.push(this.reader.getFloat(tr,'x'));
      t.push(this.reader.getFloat(tr,'y'));
      t.push(this.reader.getFloat(tr,'z'));
      this.translations.push(t);
    }

    var rotate = node.getElementsByTagName('rotate');
    console.debug(rotate.length+"\n");
    for(var i = 0;i <rotate.length;i++){
      var r =[];
      var rot = rotate[i];
      r.push(this.reader.getFloat(rot,'axis'));
      r.push(this.reader.getFloat(rot,'angle'));
      this.rotations.push(r);
    }


    var scale = node.getElementsByTagName('scale');
    console.debug(scale.length+"\n");
    for(var i = 0; i< scale.length;i++){
        var s = [];
        var sca = scale[i];
        s.push(this.reader.getFloat(sca,'x'));
        s.push(this.reader.getFloat(sca,'y'));
        s.push(this.reader.getFloat(sca,'z'));
        this.scales.push(s);
    }


  console.debug(this.id + '\n');
  //console.debug(this.tx + '\n');
	//console.debug(this.angle + '\n');
  //console.debug(this.sx + '\n');

};
