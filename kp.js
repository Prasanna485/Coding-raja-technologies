document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressBar = document.getElementById('progressBar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const playlist = document.getElementById('playlist').getElementsByTagName('li');
  
    let currentTrackIndex = 0;
    let isMuted = false;
  
    // Initialize the player with the first track
    loadTrack();
  
    function loadTrack() {
      audioPlayer.src = playlist[currentTrackIndex].getAttribute('data-src');
      audioPlayer.load();
      updateDurationDisplay();
    }
  
    function playTrack() {
      audioPlayer.play();
      playBtn.textContent = 'Pause';
    }
  
    function pauseTrack() {
      audioPlayer.pause();
      playBtn.textContent = 'Play';
    }
  
    function playNextTrack() {
      currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
      loadTrack();
      playTrack();
    }
  
    function playPreviousTrack() {
      currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
      loadTrack();
      playTrack();
    }
  
    function toggleMute() {
      if (!isMuted) {
        audioPlayer.volume = 0;
        muteBtn.textContent = 'Unmute';
      } else {
        audioPlayer.volume = parseFloat(volumeSlider.value);
        muteBtn.textContent = 'Mute';
      }
      isMuted = !isMuted;
    }
  
    function updateVolume() {
      audioPlayer.volume = parseFloat(volumeSlider.value);
      if (audioPlayer.volume === 0) {
        muteBtn.textContent = 'Unmute';
        isMuted = true;
      } else {
        muteBtn.textContent = 'Mute';
        isMuted = false;
      }
    }
  
    function updateProgressBar() {
      const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.style.width = progress + '%';
    }
  
    function updateCurrentTimeDisplay() {
      const currentTime = formatTime(audioPlayer.currentTime);
      currentTimeDisplay.textContent = currentTime;
    }
  
    function updateDurationDisplay() {
      const duration = formatTime(audioPlayer.duration);
      durationDisplay.textContent = duration;
    }
  
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      const formatted = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      return formatted;
    }
  
    // Event listeners
    playBtn.addEventListener('click', function() {
      if (audioPlayer.paused) {
        playTrack();
      } else {
        pauseTrack();
      }
    });
  
    nextBtn.addEventListener('click', playNextTrack);
    prevBtn.addEventListener('click', playPreviousTrack);
    muteBtn.addEventListener('click', toggleMute);
    volumeSlider.addEventListener('input', updateVolume);
  
    audioPlayer.addEventListener('timeupdate', function() {
      updateProgressBar();
      updateCurrentTimeDisplay();
    });
  
    audioPlayer.addEventListener('ended', playNextTrack);
  
    // Playlist item click
    for (let i = 0; i < playlist.length; i++) {
      playlist[i].addEventListener('click', function() {
        currentTrackIndex = i;
        loadTrack();
        playTrack();
      });
    }
  
  });
  