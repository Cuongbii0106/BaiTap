const timeDisplay = document.getElementById('time')
const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
const resetBtn = document.getElementById('reset')
const lapBtn = document.getElementById('lap')
const lapsList = document.getElementById('laps')

let startTime = 0
let elapsedTime = 0     
let timerInterval = null  

function timeToString(time) {
  let milliseconds = time % 1000
  let totalSeconds = Math.floor(time / 1000)
  let seconds = totalSeconds % 60
  let minutes = Math.floor(totalSeconds / 60) % 60
  let hours = Math.floor(totalSeconds / 3600)

  return (
    String(hours).padStart(2,'0') + ':' +
    String(minutes).padStart(2,'0') + ':' +
    String(seconds).padStart(2,'0') + '.' +
    String(milliseconds).padStart(3,'0')
  )
}

function start() {
  if (timerInterval) return; 

  startTime = Date.now() - elapsedTime
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime
    timeDisplay.textContent = timeToString(elapsedTime)
  }, 10);
}

function pause() {
  if (!timerInterval) return; 
  clearInterval(timerInterval)
  timerInterval = null   
}

function reset() {
  clearInterval(timerInterval)
  timerInterval = null
  elapsedTime = 0
  timeDisplay.textContent = "00:00:00.000"
  lapsList.innerHTML = ''
}

function lap() {
  const li = document.createElement('li')
  li.textContent = timeToString(elapsedTime)
  lapsList.appendChild(li)
}


startBtn.addEventListener('click', start)
pauseBtn.addEventListener('click', pause)
resetBtn.addEventListener('click', reset)
lapBtn.addEventListener('click', lap)
