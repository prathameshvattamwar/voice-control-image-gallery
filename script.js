let currentIndex = 1;
let totalImages = document.querySelectorAll('.gallery-image').length;

// Function to show the zoom modal
function showImage(index) {
  const img = document.querySelector(`.gallery-image[data-index="${index}"]`);
  if (img) {
    $('#zoomedImage').attr('src', img.src);
    $('#zoomModal').modal('show');
  }
}

// Function to go to the next image
function nextImage() {
  if (currentIndex < totalImages) {
    currentIndex++;
    showImage(currentIndex);
  }
}

// Function to go to the previous image
function previousImage() {
  if (currentIndex > 1) {
    currentIndex--;
    showImage(currentIndex);
  }
}

// Voice command setup
if (annyang) {
  let commands = {
    "next": nextImage,
    "previous": previousImage,
    "show image *number": function (number) {
      const imgIndex = parseInt(number);
      if (imgIndex > 0 && imgIndex <= totalImages) {
        currentIndex = imgIndex;
        showImage(imgIndex);
      }
    },
    "zoom": function () {
      showImage(currentIndex);
    }
  };

  annyang.addCommands(commands);
  annyang.start();
}

// Adding click functionality for zoom
document.querySelectorAll('.gallery-image').forEach(image => {
  image.addEventListener('click', function () {
    const imgIndex = this.getAttribute('data-index');
    currentIndex = parseInt(imgIndex);
    showImage(currentIndex);
  });
});
