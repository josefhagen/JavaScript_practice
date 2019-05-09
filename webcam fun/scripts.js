const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false}) //constraint parameters represent the media types 
    .then(localMediaStream => { //Returns a promise
        console.log(localMediaStream); 
        video.srcObject = localMediaStream;
        video.play(); //converts the media stream to something readable for the video (livestream)
        //When played "canplay" will be called and run painToCanvas();                                                      
    }) 
    .catch(err => {
      
        console.error(`NEIN!!!`, err);
      });
  }

function painToCanvas() {
    const width = video.videoWidth; //Get the actual width of the video
    const height = video.videoHeight; //get the actual height of the video
    canvas.width = width; //the size of the canvas must be as the size of the video
    canvas.height = height;

    setInterval(() => {
       ctx.drawImage(video, 0, 0, width, height); //pass an image or video element and paint right to it. Start with the top left corner in the canvas.
       let pixels = ctx.getImageData(0, 0, width, height); 
    //    pixels = redEffect(pixels);
    //    pixels = rbgSplit(pixels); // mess with the pixels
       pixels = greenScreen(pixels); 
       ctx.globalAlpha = 0.8; //ghosting effect
       ctx.putImageData(pixels, 0, 0); //put them back 
    }, 16); //16 millisecs
}

function takePhoto() {
    //play sound
    snap.currentTime = 0;
    snap.play(); 
    //Take the data out of the canvas
    const data = canvas.toDataUrl('image/jpeg'); //create image
    const link = document.createElement('a'); //create inker-link to put in strip
    link.href = data;
    link.setAttribute('download', 'handsome'); //downloads the image with name handsome
    // link.textContent = 'Download Image'; //Returns the text content of link
    link.innerHTML = `<img src="${data}" alt="Handsome man" />` //sets html content of link element
    strip.insertBefore(link, strip.firstChild); //strip is where we gonna dump our links
}

function redEffect(pixels) {
    for (let i = 0; i < data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
}

function rbgSplit(pixels) {
    for (let i = 0; i < data.length; i+=4) {
        pixels.data[i - 100] = pixels.data[i + 0] + 200; // RED the pixel that is 150 px before the current
        pixels.data[i + 100] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i - 150] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels; 
}

function greenScreen(pixels) { //give me these rgb values in a certain range and take them out
    const levels = {}; // going to hold our minimum and maximum green

  document.querySelectorAll('.rgb input').forEach((input) => { //
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    //If there is anywhere in between the min and max levels --
    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0; //fourth pixel is alpha (transparancy pixel). =0 makes it totally transparent. 
    }
  }

  return pixels;
}
 

getVideo();


video.addEventListener('canplay', painToCanvas); 