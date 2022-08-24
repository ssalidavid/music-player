const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector("img"),
    musicName = wrapper.querySelector(".name"),
    musicArtist = wrapper.querySelector(".artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".pregress-bar");


let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load", () =>{
    loadMusic(musicIndex);
});

function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb -1].name;
    musicArtist.innerText = allMusic[indexNumb -1].artist;
    musicImg.src = `assets/img/${allMusic[indexNumb -1].src}.jpg`;
    mainAudio.src = `assets/music/${allMusic[indexNumb -1].src}.mp3`;
}

// function to play music
function playMusic(){
    wrapper.classList.add(' ');
    musicImg.classList.add('rotate');
    playPauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    mainAudio.play();
}
// function to pause music
function pauseMusic(){
    wrapper.classList.remove('paused');
    musicImg.classList.remove('rotate');
    playPauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
    mainAudio.pause();
}

// function for perv music
function prevMusic(){
    musicIndex--;
    musicIndex < 1  ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

// function for perv music
function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex =musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

playPauseBtn.addEventListener("click", () =>{
    const isMusicPlay = wrapper.classList.contains('paused');
    isMusicPlay ? pauseMusic() : playMusic();
});

// prev func
prevBtn.addEventListener("click", () =>{
    prevMusic();
});

// prev func
nextBtn.addEventListener("click", () =>{
    nextMusic();
});

// music Audio
mainAudio.addEventListener("timeupdate", (e) =>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    
    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuration = wrapper.querySelector(".max-duration");

    mainAudio.addEventListener("loadeddata", () =>{
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);

        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerHTML = `${totalMin}:${totalSec}`;
    });

    let currentMin = math.floor(currentTime / 60);
    let currentSec = math.floor(currentTime % 60);

    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerHTML = `${currentMin}:${currentSec}`
});

progressArea.addEventListener("click", (e) =>{
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.OffsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
});

mainAudio.addEventListener("ended", () =>{
    nextMusic();
});
