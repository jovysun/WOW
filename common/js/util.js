function preloadImg(sourceArray, callback) {
  var images = [];
  for (let i = 0; i < sourceArray.length; i++) {
    const element = sourceArray[i];
    var image = new Image();
    images.push(image);
    image.onload = function () {
      if (i === sourceArray.length - 1) {
        callback(images);
      }
    }
    image.src = element;
  }

}

// 生成区间随机数
function randomRange(min, max) {
  return min + (max - min) * Math.random();
}