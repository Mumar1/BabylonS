function getSphereUV(vertices){
  var uvs = [];
  for (var i = 0; i < vertices.length; i++){
    for (var j=0; j < vertices[i].length; j++){
      uvs.push(new BABYLON.Vector2(Math.atan2(vertices[i][j].z, vertices[i][j].x) / (Math.PI * 2), Math.asin(vertices[i][j].y / Math.PI)));
    }
  }
  return uvs;
}
