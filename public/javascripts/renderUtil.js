/*
* Method - init
* Set up BABYLON scene.
*/
function init(){
  window.addEventListener('DOMContentLoaded', function(){
      // get the canvas DOM element
      var canvas = document.getElementById('renderCanvas');

      // load the 3D engine
      var engine = new BABYLON.Engine(canvas, true);

      // createScene function that creates and return the scene
      var createScene = function(){
          // create a basic BJS Scene object
          var scene = new BABYLON.Scene(engine);

          // ArcRotateCamera >> Camera turning around a 3D point (here Vector zero) with mouse and cursor keys
          // Parameters : name, alpha, beta, radius, target, scene
          var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 3000, new BABYLON.Vector3(0, 0, 0), scene);

          // target the camera to scene origin
          camera.setTarget(BABYLON.Vector3.Zero());

          // attach the camera to the canvas
          camera.attachControl(canvas, false);

          // create a basic light, aiming 0,1,0 - meaning, to the sky
          var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1,0,0), scene);

          scene = createSphere(scene, 1000, 100, 100);
          //scene = createDonut(scene, 12, 24, 24);
          //scene = createCube(scene, 5);

          // return the created scene
          return scene;
      }

      // call the createScene function
      var scene = createScene();

      // run the render loop
      engine.runRenderLoop(function(){
          scene.render();
      });

      // the canvas/window resize event handler
      window.addEventListener('resize', function(){
          engine.resize();
      });
  });
}

/*
* Method - createSphere
* Parameters - scene
* Prepare the sphere vertices so it can be added to the scene.
*/
function createSphere(scene, radius, stacks, slices){

  //Create Sphere
  var allStackVertex = Sphere(radius, stacks, slices);

  //Convert vertices to Babylon vertex.
  var vertices = [];
  for (var i = 0; i < allStackVertex.length; i++){
    var v = [];
    for (var j = 0; j<allStackVertex[i].length; j++){
      v.push(new BABYLON.Vector3(allStackVertex[i][j].x, allStackVertex[i][j].y, allStackVertex[i][j].z));
    }
    vertices.push(v);
  }

	var mat = new BABYLON.StandardMaterial("texture1", scene);
    mat.diffuseTexture = new BABYLON.Texture("/images/earth.jpg", scene);
  	mat.backFaceCulling = true;
  	mat.wireframe = false;
  var ribbon = BABYLON.Mesh.CreateRibbon("ribbon", vertices, false, true, 0, scene);
  	ribbon.material = mat;

  console.log(allStackVertex);
  var uvs = getSphereUV(vertices);
  console.log(uvs);

  return scene;
}

/*
* Method - createCube
* Parameters - scene
* Prepare the sphere vertices so it can be added to the scene.
*/
function createCube(scene, size){
  var cubeVertices = Cube(size);

  // material
	var mat = new BABYLON.StandardMaterial("mat1", scene);
  	mat.alpha = 1;
  	mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
  	mat.emissiveColor = new BABYLON.Color3.Black();
  	mat.backFaceCulling = false;
  	mat.wireframe = true;

  var vertices = [];
  //Convert vertices to Babylon vertex.
  for (var i = 0; i < cubeVertices.length; i++){
      var v = [];
      for (var j = 0; j<cubeVertices[i].length; j++){
        v.push(new BABYLON.Vector3(cubeVertices[i][j].x, cubeVertices[i][j].y, cubeVertices[i][j].z));
      }
      vertices.push(v);
    }

  //Get vertices for front of cube.
  var front = [];
  var v2 = [];
    v2.push(new BABYLON.Vector3(cubeVertices[0][0].x, cubeVertices[0][0].y, cubeVertices[0][0].z));
    v2.push(new BABYLON.Vector3(cubeVertices[0][1].x, cubeVertices[0][1].y, cubeVertices[0][1].z));
  front.push(v2);
    v2 = [];
    v2.push(new BABYLON.Vector3(cubeVertices[0][2].x, cubeVertices[0][2].y, cubeVertices[0][2].z));
    v2.push(new BABYLON.Vector3(cubeVertices[0][3].x, cubeVertices[0][3].y, cubeVertices[0][3].z));
  front.push(v2);
    v2 = [];

  //Get vertices for back of cube.
  var back = [];
    v2.push(new BABYLON.Vector3(cubeVertices[1][0].x, cubeVertices[1][0].y, cubeVertices[1][0].z));
    v2.push(new BABYLON.Vector3(cubeVertices[1][1].x, cubeVertices[1][1].y, cubeVertices[1][1].z));
  back.push(v2);
    v2 = [];
    v2.push(new BABYLON.Vector3(cubeVertices[1][2].x, cubeVertices[1][2].y, cubeVertices[1][2].z));
    v2.push(new BABYLON.Vector3(cubeVertices[1][3].x, cubeVertices[1][3].y, cubeVertices[1][3].z));
  back.push(v2);

  //tbs accronym stands for Top, bottom and sides.
  var tbs = BABYLON.Mesh.CreateRibbon("tbs", vertices, true, true, 0, scene, false, BABYLON.Mesh.BACKSIDE);
  var front = BABYLON.Mesh.CreateRibbon("front", front, false, false, 0, scene, false, BABYLON.Mesh.BACKSIDE);
  var back = BABYLON.Mesh.CreateRibbon("back", back, false, false, 0, scene, false, BABYLON.Mesh.BACKSIDE);
  	tbs.material = mat;
  	front.material = mat;
  	back.material = mat;

  return scene;
}

/*
* Method - createDonut
* Parameters - scene
* Prepare the sphere vertices so it can be added to the scene.
*/
function createDonut(scene, radius, stacks, slices){

  var allStackVertex = Donut(radius, stacks, slices);

  //Convert vertices to Babylon vertex.
  var vertices = [];
  for (var i = 0; i < allStackVertex.length; i++){
    var v = [];
    for (var j = 0; j<allStackVertex[i].length; j++){
      v.push(new BABYLON.Vector3(allStackVertex[i][j].x, allStackVertex[i][j].y, allStackVertex[i][j].z));
    }
    vertices.push(v);
  }

  // material
	var mat = new BABYLON.StandardMaterial("mat1", scene);
  	mat.alpha = 1;
  	mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
  	mat.emissiveColor = new BABYLON.Color3.Black();
  	mat.backFaceCulling = false;
  	mat.wireframe = true;

  var donut = BABYLON.Mesh.CreateRibbon("donut", vertices, true, true, 0, scene, false, BABYLON.Mesh.BACKSIDE);
    donut.material = mat;

  return scene;
}
