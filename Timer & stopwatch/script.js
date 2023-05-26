$(".stopwatch-btn").click(function () {
    // hide all other wrappers
    $(".outer-wrapper > div").slideUp();
    // show stopwatch wrapper
    $(".stopwatch").slideDown();
    // update type text
    $(".type").html("Stopwatch");
});

$(".back-btn").click(function () {
    // hide all other wrappers
    $(".outer-wrapper > div").slideUp();
    // show clock wrapper
    $(".clock").slideDown();
    // update type text
    $(".type").html("Stopwatch");
});

$(".timer-btn").click(function () {
    // hide all other wrappers
    $(".outer-wrapper > div").slideUp();
    // show timer wrapper
    $(".timer").slideDown();
    // update type text
    $(".type").html("Stopwatch");
});

const addTrailingZero = (num) => {
    return num < 10 ? "0" + num : num;
};

const updateTime = () => {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours > 12 ? "PM" : "AM";
    let otherampm = hours > 12 ? "AM" : "PM";

    // converting 24 hours to 12
    hours = hours % 12 || 12;

    // add trailing zeros if less than 10
    hours = addTrailingZero(hours);
    minutes = addTrailingZero(minutes);
    seconds = addTrailingZero(seconds);

    $("#hour").html(hours);
    $("#min").html(minutes);
    $("#sec").html(seconds);
    $("#ampm").html(ampm);
    $("#other-ampm").html(otherampm);
};

// call the function on page load
updateTime();

// call function after every second
setInterval(updateTime, 1000);

// stopwatch

let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMiliSeconds = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;

const stopwatch = () => {
    // increase miliseconds by one
    stopwatchMiliSeconds++;

    if (stopwatchMiliSeconds === 100) {
        // if stopwatch miliseconds equals 100 increase one second and set ms 0
        stopwatchSeconds++;
        stopwatchMiliSeconds = 0;
    }

    if (stopwatchSeconds === 60) {
        // same with minutes
        stopwatchMinutes++;
        stopwatchSeconds = 0;
    }

    if (stopwatchMinutes === 60) {
        // same with hours
        stopwatchHours++;
        stopwatchMinutes = 0;
    }

    // show values on document
    $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
    $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
    $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
    $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliSeconds));
};

// function to start stopwatch
const startStopwatch = () => {
    if (!stopwatchRunning) {
        // if stopwatch not already running
        stopwatchInterval = setInterval(stopwatch, 10);
        stopwatchRunning = true;
    }
};

// function to stop stopwatch
const stopStopwatch = () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
};

// reset stopwatch function
const resetStopwatch = () => {
    // clear interval and set all values to default
    clearInterval(stopwatchInterval);
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMiliSeconds = 0;
    stopwatchRunning = false;
    laps = 0;

    // update values on document to 00
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $("#stopwatch-ms").html("00");
    $(".laps").html("");
};

// start stopwatch on start button
$(".start-stopwatch").click(function () {
    startStopwatch();
    //hide start button show lap button
    $(".start-stopwatch").hide();
    $(".lap-stopwatch").show();
});

$(".reset-stopwatch").click(function () {
    resetStopwatch();
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
});
