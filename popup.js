
let totalSeconds = 5, // total seconds (25 minutes * 60 seconds)
    minutes = 19,
    seconds = 59,
    stopCountDown = true,
    countDown;

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers. 
document.addEventListener('DOMContentLoaded', function() {
    let start = document.getElementById('startButton'),
        reset = document.getElementById('resetButton');
        displayCountDown = document.getElementById('countDown');
    start.addEventListener('click', controller);
    reset.addEventListener('click', controller);

    function controller(e) {
        console.log(e.target.innerHTML)

        if (e.target.innerHTML === 'Start') {
            start.innerHTML = "Pause";
            !stopCountDown;
            //start timer
            countDownTimer = setInterval(
                () => updateTimer(),
                1000,
            );
        }
        else if (e.target.innerHTML === 'Pause') {
            start.innerHTML = "Start";
            !stopCountDown;
            //stop timer
            clearTimeout(countDownTimer)
        }
        else if (e.target.innerHTML === 'Reset') {
            resetCountDown();
        }
    }

    function resetCountDown() {
        start.innerHTML = "Start";
        stopCountDown = true;
        //stop timer and reset countDown
        clearTimeout(countDownTimer);
        totalSeconds = 1200;
        minutes = 20;
        seconds = 0;
        displayCountDown.innerHTML = 20 + ':' + 00;
    }

    // Update the count down every 1 second
    function updateTimer() {
        console.log('in updateTimer function');

        totalSeconds--;
        minutes = parseInt(totalSeconds / 60);
        seconds = parseInt(totalSeconds % 60);

        // update display
        displayCountDown.innerHTML = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);

         // stops countdown if seconds and minutes are down to zero and resets variables
         if (minutes === 0 && seconds === -1) {
            resetCountDown();
        }
    } 

})