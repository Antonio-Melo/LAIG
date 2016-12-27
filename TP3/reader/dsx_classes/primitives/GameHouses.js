/*
  Class that represents a GameHouses primitive in the scene
*/
 function GameHouses(scene) {
 	CGFobject.call(this,scene);

  this.scene = scene;
  //Line 1
  //this.h11 blocked cell X
  this.h12 = new House(scene,"12",-10,-16);
  this.h13 = new House(scene,"13",0,-16);
  this.h14 = new House(scene,"14",10,-16);
  //this.h15 blocked cell X
  //Line 2
  //this.h21 blocked cell X
  this.h22 = new House(scene,"22",-13.5,-8);
  this.h23 = new House(scene,"23",-5,-8);
  this.h24 = new House(scene,"24",5,-8);
  this.h25 = new House(scene,"25",13.5,-8);
  //Line 3
  this.h31 = new House(scene,"31",-20,0);
  this.h32 = new House(scene,"32",-10,0);
  this.h33 = new House(scene,"33",0,0);
  this.h34 = new House(scene,"34",10,0);
  this.h35 = new House(scene,"35",20,0);
  //Line 4
  //this.h41 blocked cell X
  this.h42 = new House(scene,"42",-13.5,8);
  this.h43 = new House(scene,"43",-5,8);
  this.h44 = new House(scene,"44",5,8);
  this.h45 = new House(scene,"45",13.5,8);
  //Line 5
  //this.h51 blocked cell X
  this.h52 = new House(scene,"52",-10,16);
  this.h53 = new House(scene,"53",0,16);
  this.h54 = new House(scene,"54",10,16);
  //this.h55 blocked cell X

  this.list = new Array();
  this.list.push(this.h12);
  this.list.push(this.h13);
  this.list.push(this.h14);
  this.list.push(this.h22);
  this.list.push(this.h23);
  this.list.push(this.h24);
  this.list.push(this.h25);
  this.list.push(this.h31);
  this.list.push(this.h32);
  this.list.push(this.h33);
  this.list.push(this.h34);
  this.list.push(this.h35);
  this.list.push(this.h42);
  this.list.push(this.h43);
  this.list.push(this.h44);
  this.list.push(this.h45);
  this.list.push(this.h52);
  this.list.push(this.h53);
  this.list.push(this.h54);
 };

GameHouses.prototype = Object.create(CGFobject.prototype);
GameHouses.prototype.constructor = GameHouses;

GameHouses.prototype.display = function(){
  for(var i = 0;i < this.list.length;i++){
    this.list[i].display();
  }
}
