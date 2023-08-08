"use strict";

const player = document.querySelector(".player");
const video = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const speed = document.querySelector(".player-speed");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");

// Initial
let currentVolume = 1;
let fullScreen = false;

const playerSpeed = document.querySelector(".player-speed");

const togglePlay = () => {
  if (video.paused) {
    video.play();
    playBtn.className = "fas fa-pause";
  } else {
    video.pause();
    playBtn.className = "fas fa-play";
  }
};

video.addEventListener("click", togglePlay);

video.addEventListener("timeupdate", function () {
  console.log(video.volume);
  const durationMinutes = String(Math.floor(video.duration / 60)).padStart(
    2,
    0
  );
  const durationSeconds = String(Math.floor(video.duration % 60)).padStart(
    2,
    0
  );
  duration.innerText = `${durationMinutes}:${durationSeconds}`;
  const currentMinutes = String(Math.floor(video.currentTime / 60)).padStart(
    2,
    0
  );
  const currentSeconds = String(Math.floor(video.currentTime % 60)).padStart(
    2,
    0
  );

  currentTime.innerHTML = `${currentMinutes}:${currentSeconds} /`;

  progressBar.style.width = (video.currentTime / video.duration) * 100 + "%";
});

playBtn.addEventListener("click", togglePlay);

window.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    togglePlay();
  }
});

fullscreenBtn.addEventListener("click", () => {
  video.requestFullscreen();
});

progressRange.addEventListener("click", function (e) {
  const clicked = e.offsetX;
  const width = this.clientWidth;
  const percentage = (clicked / width) * 100;
  progressBar.style.width = percentage + "%";
  video.currentTime = (clicked / width) * video.duration;
});

playerSpeed.addEventListener("change", function () {
  video.playbackRate = this.value;
});

const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");

volumeRange.addEventListener("click", function (e) {
  const clicked = e.offsetX;
  const width = this.clientWidth;
  const percentage = (clicked / width) * 100;
  volumeBar.style.width = percentage + "%";
  video.volume = clicked / width;
  currentVolume = video.volume;

  if (video.volume >= 0.9) {
    volumeIcon.className = "fas fa-volume-up";
    video.volume = 1;
    volumeBar.style.width = "100%";
  }
  if (video.volume < 0.9 && video.volume >= 0.2) {
    volumeIcon.className = "fas fa-volume-down";
  }

  if (video.volume < 0.2) {
    volumeIcon.className = "fas fa-volume-off";
    video.volume = 0;
    volumeBar.style.width = "0";
  }
});

volumeIcon.addEventListener("click", (e) => {
  if (video.volume) {
    e.target.className = "fas fa-volume-off";
    video.volume = 0;
    volumeBar.style.width = "0";
  } else {
    if (currentVolume >= 0.9) {
      e.target.className = "fas fa-volume-up";
    }
    if (currentVolume < 0.9 && currentVolume >= 0.2) {
      e.target.className = "fas fa-volume-down";
    }

    if (currentVolume < 0.2) {
      e.target.className = "fas fa-volume-off";
    }
    video.volume = currentVolume;
    volumeBar.style.width = currentVolume * 100 + "%";
  }
});
