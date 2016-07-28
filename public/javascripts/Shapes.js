/*
* Method - cube
* Parameters - size
* Calculate vertices for cube
*/
function Cube(size){

  var m = size / 2;
  var x, y, z;
                  //Front Face
  var vertices = [[{x: -m, y: m, z: m}, {x: m, y: m, z: m},
                  {x: m, y: -m, z: m}, {x: -m, y: -m, z: m}],
                  //Back Face
                  [{x: -m, y: m, z: -m}, {x: m, y: m, z: -m},
                  {x: m, y: -m, z: -m}, {x: -m, y: -m, z: -m}]];

  return vertices;
}

/*
* Method - Sphere
* Parameters - radius, stacks, slices
* Calculate vertices on the slices for each stack
*/
function Sphere(radius, stacks, slices){
  var stackAngle = 180.0 / stacks;
  var degree = 360.0 / slices;
  var currentRadius;

  var vertices = [];
  var allStackVertices = [];

  //Duplicate vertices for starting point of cube
  var firstPath = [];
  for (var i = 0; i < slices; i++ ) {
    var x, y, z;
    x = 0; y = radius; z = 0;
    firstPath.push({x, y, z});
  }
  allStackVertices.push(firstPath);

  //Calculate vertices for each stack
  for (var j = 1; j < stacks; j++){
      var y;
      var angle = stackAngle * j;
      currentRadius = Math.sin(degreeToRadian(angle)) * radius;

      y = Math.cos(degreeToRadian(angle)) * radius;

      for(var i = 0; i < slices; i++){
        var x, z;
        angle = degree * i;
        x = Math.cos(degreeToRadian(angle)) * currentRadius;
        z = Math.sin(degreeToRadian(angle)) * currentRadius;
        vertices.push({x, y, z});
      }
      allStackVertices.push(vertices);
      vertices = [];
  }

  //Duplicate vertices for starting point of cube
  var lastPath = [];
  for (var i = 0; i < slices; i++ ) {
    var x, y, z;
    x = 0; y = -radius; z = 0;
    lastPath.push({x, y, z});
  }
  allStackVertices.push(lastPath);

  return allStackVertices;
}

/*
* Method - Donut
* Parameters - radius, stacks, slices
* Calculate vertices to create a tyre
*/
function Donut(radius, stacks, slices){
  var stackAngle = 180 / stacks;
  var degree = 360.0 / slices;
  var currentRadius;

  var vertices = [];
  var allStackVertices = [];

  for (var j = 1; j < stacks; j++){
      var y;
      var angle = stackAngle * j;
      currentRadius = Math.sin(degreeToRadian(angle)) * radius;

      y = Math.cos(degreeToRadian(angle)) * currentRadius;

      for(var i = 0; i < slices; i++){
        var x, z;
        angle = degree * i;

        x = Math.cos(degreeToRadian(angle)) * currentRadius;
        z = Math.sin(degreeToRadian(angle)) * currentRadius;
        vertices.push({x, y, z});
      }
      allStackVertices.push(vertices);
      vertices = [];
  }

  vertices.push(0, -radius, 0);
  allStackVertices.push(vertices);
  console.log(vertices);
  console.log(allStackVertices);
  return allStackVertices;
}

/*
* Method - createCircle
* Parameters - slices
* Calculate the vertices on the circle
*/
var createCircle = function(slices){
  var degree = 360 / slices;
  var vertices = [];

  for(var i = 0; i < slices; i++){
    var x, y, z;
    var angle = degree * i;

    x = Math.cos(degreeToRadian(angle));
    y = 0;
    z = Math.sin(degreeToRadian(angle));
    vertices.push({x, y, z});
  }

  x = Math.cos(0);
  y = 0;
  z = Math.sin(0);
  vertices.push(new BABYLON.Vector3(x, y, z));

  return vertices;
}

/*
* Method - degreeToRadian
* Parameters - degrees
* Convert degrees value into radians
*/
var degreeToRadian = function(degrees){
  var deg2Rad = Math.PI / 180.0;
  return degrees * deg2Rad;
}
