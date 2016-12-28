/*
  Class that represents a GameHouses primitive in the scene
*/
 function GameHouses(scene) {
 	CGFobject.call(this,scene);

  this.scene = scene;
  this.list = new Array();
  //Line 1
  //this.h11 blocked cell X
  this.list["12"] = new House(scene,"12",-10,-16);
  this.list["13"] = new House(scene,"13",0,-16);
  this.list["14"] = new House(scene,"14",10,-16);
  //this.h15 blocked cell X
  //Line 2
  //this.h21 blocked cell X
  this.list["22"] = new House(scene,"22",-13.5,-8);
  this.list["23"] = new House(scene,"23",-5,-8);
  this.list["24"] = new House(scene,"24",5,-8);
  this.list["25"] = new House(scene,"25",13.5,-8);
  //Line 3
  this.list["31"] = new House(scene,"31",-20,0);
  this.list["32"] = new House(scene,"32",-10,0);
  this.list["33"] = new House(scene,"33",0,0);
  this.list["34"] = new House(scene,"34",10,0);
  this.list["35"] = new House(scene,"35",20,0);
  //Line 4
  //this.h41 blocked cell X
  this.list["42"] = new House(scene,"42",-13.5,8);
  this.list["43"] = new House(scene,"43",-5,8);
  this.list["44"] = new House(scene,"44",5,8);
  this.list["45"] = new House(scene,"45",13.5,8);
  //Line 5
  //this.h51 blocked cell X
  this.list["52"] = new House(scene,"52",-10,16);
  this.list["53"]= new House(scene,"53",0,16);
  this.list["54"] = new House(scene,"54",10,16);
  //this.h55 blocked cell X
 };

GameHouses.prototype = Object.create(CGFobject.prototype);
GameHouses.prototype.constructor = GameHouses;

GameHouses.prototype.display = function(){
  for(var key in this.list){
    this.scene.registerForPick(key,this.list[key]);
    this.list[key].display();
  }
}
