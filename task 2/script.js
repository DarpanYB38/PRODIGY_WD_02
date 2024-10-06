// Get references to the necessary elements
let display = document.getElementById('display');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let lapsList = document.getElementById('laps');
let startTimerButton = document.getElementById('start-timer');
let minutesInput = document.getElementById('minutes');
let secondsInput = document.getElementById('seconds');

let stopwatchInterval;
let timerInterval;
let timeElapsed = 0; // Stopwatch time in milliseconds
let timerTimeRemaining = 0; // Timer time in milliseconds
let isRunning = false;

// Function to format time into HH:MM:SS
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start the stopwatch
startButton.addEventListener('click', function() {
    if (!isRunning) {
        stopwatchInterval = setInterval(() => {
            timeElapsed += 1000; // Add 1 second to stopwatch
            display.textContent = formatTime(timeElapsed);
        }, 1000);
        isRunning = true;
    }
});

// Pause the stopwatch and timer
pauseButton.addEventListener('click', function() {
    clearInterval(stopwatchInterval);
    clearInterval(timerInterval);
    isRunning = false;
});

// Reset the stopwatch and timer
resetButton.addEventListener('click', function() {
    clearInterval(stopwatchInterval);
    clearInterval(timerInterval);
    timeElapsed = 0;
    timerTimeRemaining = 0;
    display.textContent = "00:00:00";
    lapsList.innerHTML = ''; // Clear laps
    isRunning = false;
});

// Record a lap
lapButton.addEventListener('click', function() {
    if (isRunning) {
        let lapTime = formatTime(timeElapsed);
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
});

// Start the timer
startTimerButton.addEventListener('click', function() {
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;

    // Calculate the total time in milliseconds
    timerTimeRemaining = (minutes * 60 + seconds) * 1000;

    if (timerTimeRemaining > 0) {
        clearInterval(timerInterval); // Clear any previous intervals
        timerInterval = setInterval(() => {
            if (timerTimeRemaining <= 0) {
                clearInterval(timerInterval);
                display.textContent = "Time's up!";
                return;
            }
            timerTimeRemaining -= 1000; // Subtract 1 second from the remaining time
            display.textContent = formatTime(timerTimeRemaining);
        }, 1000);
    } else {
        alert("Please enter a valid time.");
    }
});
