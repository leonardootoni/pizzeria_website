var myImagesArray = [
  "images/home/id1.jpg",
  "images/home/id2.jpg",
  "images/home/id3.jpg",
  "images/home/in.jpg"
];

var ImageNumber = 0;

var difference = myImagesArray.length - 1;

var delay = 8000;

setInterval("ChangeImages(-1)", delay);

function ChangeImages(direction) {
  if (document.images) {
    ImageNumber = ImageNumber + direction;
    if (ImageNumber > difference) {
      ImageNumber = 0;
    }
    if (ImageNumber < 0) {
      ImageNumber = difference;
    }
    document.getElementById("slideshow").src = myImagesArray[ImageNumber];
  }
}
