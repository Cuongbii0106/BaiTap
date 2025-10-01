let playlist = []
let currentIndex = 0
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const playBtn = document.getElementById("play")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const progress = document.getElementById("progress")


fetch("bai18.json")
  .then(res => res.json())
  .then(data => {
    playlist = data
    loadSong(currentIndex)
  })
  .catch(err => console.error("Lỗi load playlist:", err))

//load 
function loadSong(index) {
  const song = playlist[index]
  title.textContent = song.title
  cover.src = song.cover
  audio.src = song.src
}


let isPlaying = false

function playSong() {
  isPlaying = true
  audio.play()
  playBtn.textContent = "⏸"
}

function pauseSong() {
  isPlaying = false
  audio.pause()
  playBtn.textContent = "▶️"
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong()
})

// next / prev
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length
  loadSong(currentIndex)
  playSong()
})

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length
  loadSong(currentIndex)
  playSong()
})

// cập nhật 
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100
  }
})

// kéo tua
progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration
  }
})

// tự động next 
audio.addEventListener("ended", () => {
  nextBtn.click()
})
