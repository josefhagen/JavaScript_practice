/* Get elements */

const player = document.querySelector(".player"); 
const muteBtn = document.getElementById('mute-button');
//const fullscreenBtn = document.getElementById("fullscreen-button")
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const fullscreen = player.querySelector('.fullscreen');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* Build our functions */ 

function togglePlay() {
    if (video.paused) {
        video.play(); 
    } else {
        video.pause(); 
    }
}

function changeButtonType(btn, value) {
    btn.title = value;
    btn.innerHTML = value;
    btn.className = value;
 }

 function updateButton() {
     const icon = this.paused ? "►" : "❚ ❚"; 
     console.log(icon); 
     toggle.textContent = icon; 
 }

 function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
 } 

 function handleRangeUpdate() {
     video[this.name] = this.value;
     console.log(this.value); 

 }

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100; 
    progressBar.style.flexBasis = `${percent}%`; 
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime; 
}
function toggleMute() {
    if (video.muted) {
       changeButtonType(muteBtn, 'Mute');
       video.muted = false;
    }
    else {
       changeButtonType(muteBtn, 'Unmute');
       video.muted = true;
    }
 }

 
 //Only shows black screen but with sounds
 function openFullScreen() { 

    // const icon2 = this.paused ? "►" : "❚ ❚"; 
    //  console.log(icon2); 

     if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
     } else if (player.webkitExitFullscreen) {
            changeButtonType(fullscreen, 'Not')
            player.webkitExitFullscreen();
         }
     }
  
  

// show in bio-mode
// function openFullScreen() {
//     if (!document.fullscreenElement &&  
//document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) { 
//       if (document.documentElement.requestFullscreen) {
//         document.documentElement.requestFullscreen();
//       } else if (document.documentElement.msRequestFullscreen) {
//         document.documentElement.msRequestFullscreen();
//       } else if (document.documentElement.mozRequestFullScreen) {
//         document.documentElement.mozRequestFullScreen();
//       } else if (document.documentElement.webkitRequestFullscreen) {
//         document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
//       }
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       } else if (document.msExitFullscreen) {
//         document.msExitFullscreen();
//       } else if (document.mozCancelFullScreen) {
//         document.mozCancelFullScreen();
//       } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen();
//       }
//     }
//   }


 /*Add listeners*/

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);   
video.addEventListener('click', togglePlay);
video.addEventListener("timeupdate", handleProgress); 

toggle.addEventListener("click", togglePlay);
muteBtn.addEventListener('click', toggleMute);
fullscreen.addEventListener("click", openFullScreen); 

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));   

let mousedown = false; 

progress.addEventListener("click", scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true); 
progress.addEventListener("mouseup", () => mousedown = false); 
