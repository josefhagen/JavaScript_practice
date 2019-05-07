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
    }, 16); //16 millisecs
}

function takePhoto() {
    //play sound
    snap.currentTime = 0;
    snap.play(); 

    //Take the data out of the canvas
    const data = canvas.toDataUrl('image/jpeg') 
}

getVideo();

video.addEventListener('canplay', painToCanvas); 