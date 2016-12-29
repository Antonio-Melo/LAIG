//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(m,key,value) {
      vars[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return vars;
}

serialInclude(['../lib/CGF.js',
'XMLscene.js',
'MySceneGraph.js',
'Stack.js',
'MyInterface.js',
'dsx_classes/primitives/Rectangle.js',
'dsx_classes/primitives/CylinderSurf.js',
'dsx_classes/primitives/CylinderBase.js',
'dsx_classes/primitives/Triangle.js',
'dsx_classes/primitives/Cylinder.js',
'dsx_classes/primitives/Sphere.js',
'dsx_classes/primitives/Plane.js',
'dsx_classes/primitives/Patch.js',
'dsx_classes/primitives/Chessboard.js',
'dsx_classes/primitives/HexBoard.js',
'dsx_classes/primitives/Torus.js',
'dsx_classes/primitives/Vehicle.js',
'dsx_classes/primitives/Piece.js',
'dsx_classes/primitives/House.js',
'dsx_classes/omni.js',
'dsx_classes/spot.js',
'dsx_classes/views.js',
'dsx_classes/illumination.js',
'dsx_classes/textures.js',
'dsx_classes/materials.js',
'dsx_classes/component.js',
'dsx_classes/transformations.js',
'animations/animation.js',
'animations/circularanimation.js',
'animations/linearanimation.js',
'animations/ComponentAnimation.js',
'animations/LinearRotation.js',
'GameLAIG/GameHouses.js',
'GameLAIG/GamePieces.js',
'GameLAIG/GameState.js',
main=function()
{
	// Standard application, scene and interface setup
    var app = new CGFapplication(document.body);
    var myScene = new XMLscene();
    var myInterface = new MyInterface(myScene);

    app.init();

    app.setScene(myScene);
    app.setInterface(myInterface);

    myInterface.setActiveCamera(myScene.camera);

	// get file name provided in URL, e.g. http://localhost/myproj/?file=myfile.xml
	// or use "demo.xml" as default (assumes files in subfolder "scenes", check MySceneGraph constructor)

	var filename=getUrlVars()['file'] || "test.dsx";

	// create and load graph, and associate it to scene.
	// Check console for loading errors
	var myGraph = new MySceneGraph(filename, myScene);

	// start
  app.run();
}

]);
