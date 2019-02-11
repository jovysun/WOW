// 获得端点集，注意边界处理
function getVertices(imgWidth, imgHeight, xSubNum, ySubNum, offsetRatio) {
  var xSub = imgWidth / xSubNum,
    ySub = imgHeight / ySubNum;
  var vertices = [];
  for (var i = 0; i <= xSubNum; i++) {
    for (var j = 0; j <= ySubNum; j++) {
      var x = 0;
      if (i == 0) {
        x = 0
      } else if (i == xSubNum) {
        x = imgWidth;
      } else {
        x = i * xSub + randomRange(-xSub * offsetRatio, xSub * offsetRatio);
      }

      var y = 0;
      if (j == 0) {
        y = 0
      } else if (j == ySubNum) {
        y = imgHeight;
      } else {
        y = j * ySub + randomRange(-ySub * offsetRatio, ySub * offsetRatio);
      }

      vertices.push([x, y]);
    }
  }
  return vertices;
}
// 获得碎片集
function getFragments(vertices, image) {
  var triangles = Delaunay.triangulate(vertices);

  var fragments = [];

  for (var i = 0; i < triangles.length; i += 3) {
    var v0 = vertices[triangles[i + 0]];
    var v1 = vertices[triangles[i + 1]];
    var v2 = vertices[triangles[i + 2]];

    var xMin = Math.min(v0[0], v1[0], v2[0]),
      xMax = Math.max(v0[0], v1[0], v2[0]),
      yMin = Math.min(v0[1], v1[1], v2[1]),
      yMax = Math.max(v0[1], v1[1], v2[1]);

    var box = {
      x: Math.round(xMin),
      y: Math.round(yMin),
      w: Math.round(xMax - xMin),
      h: Math.round(yMax - yMin)
    };


    var canvas = document.createElement('canvas');
    canvas.width = box.w;
    canvas.height = box.h;
    canvas.style.width = box.w + 'px';
    canvas.style.height = box.h + 'px';
    canvas.style.left = box.x + 'px';
    canvas.style.top = box.y + 'px';
    var ctx = canvas.getContext('2d');

    ctx.translate(-box.x, -box.y);
    ctx.beginPath();
    ctx.moveTo(v0[0], v0[1]);
    ctx.lineTo(v1[0], v1[1]);
    ctx.lineTo(v2[0], v2[1]);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(image, 0, 0);



    var fragment = {
      canvas: canvas,
      box: box
    };

    fragments.push(fragment);

  }
  return fragments;
}