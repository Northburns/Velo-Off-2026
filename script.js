//import intervalToDuration from 'date-fns/intervalToDuration';

let target = Date.parse(
    "2026-01-01T06:00:00+02:00" // <-- kohde
    //"2025-12-17T17:53:00+02:00"
    //"2024-09-02T17:53:00+02:00"
);

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  })
;


var days = 0;
var hours = 0;
var minutes = 0;
var seconds = 0;

var animate = false;

let calc = function () {
    let now = new Date().getTime();

    let sign = Math.sign(target - now);
    let distance = Math.abs(target - now);

    // TODO Oh... rewrite this, pls
    var days1 = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours1 = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes1 = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds1 = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    //document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    //    + minutes + "m " + seconds + "s ";

    if(animate) {
        if(days!=days1) {
            animateCSS("#t-div", "rubberBand");
        } else if (hours!=hours1) {
            animateCSS("#t-div", "heartBeat");
        } else if (minutes!=minutes1) {
            animateCSS("#t-div", "tada");
        }
    } else {
        animate = true;
    }

    days = days1;
    hours = hours1;
    minutes = minutes1;
    seconds = seconds1;

    let body = document.getElementById("body");
    body.style.setProperty("--display-before", sign <  0 ? "none" : "block");
    body.style.setProperty("--display-after",  sign >= 0 ? "none" : "block");

    // T

    for (const el of document.getElementsByClassName("t-days")) {
        el.textContent = days;
    }
    for (const el of document.getElementsByClassName("t-hours")) {
        el.textContent = hours;
    }
    for (const el of document.getElementsByClassName("t-minutes")) {
        el.textContent = minutes;
    }
    for (const el of document.getElementsByClassName("t-seconds")) {
        el.textContent = seconds;
    }

    for (const el of document.getElementsByClassName("txt-days")) {
        el.textContent = days == 1 ? 'päivä' : 'päivää';
    }
    for (const el of document.getElementsByClassName("txt-hours")) {
        el.textContent = hours == 1 ? 'tunti' : 'tuntia';
    }
    for (const el of document.getElementsByClassName("txt-minutes")) {
        el.textContent = minutes == 1 ? 'minuutti' : 'minuuttia';
    }
    for (const el of document.getElementsByClassName("txt-seconds")) {
        el.textContent = seconds == 1 ? 'sekunti' : 'sekuntia';
    }

    // Plus

    let dur = dateFns.intervalToDuration({start: target, end: new Date()});
    if(!dur.weeks && dur.days) {
        dur.weeks = dur.days / 7 | 0;
        dur.days  = dur.days - 7 * dur.weeks;
    }
    // console.log(dur);

    let displayPlus = sign <= 0 ? dur.years || dur.months || dur.weeks || dur.days : false;
    
    document.getElementById('t-plus-div').style.setProperty("--display-plus", displayPlus ? "block" : "none");

    for (const el of document.getElementsByClassName("t-plus-years")) {
        if(dur.years)
            el.textContent = `${dur.years} ${dur.years == 1 ? 'vuosi' : 'vuotta'}`;
        else el.textContent = ''
    }
    for (const el of document.getElementsByClassName("t-plus-months")) {
        if(dur.months)
            el.textContent = `${dur.months} ${dur.months == 1 ? 'kuukausi' : 'kuukautta'}`;
        else el.textContent = ''
    }
    for (const el of document.getElementsByClassName("t-plus-weeks")) {
        if(dur.weeks)
            el.textContent = `${dur.weeks} ${dur.weeks == 1 ? 'viikko' : 'viikkoa'}`;
        else el.textContent = ''
    }
    for (const el of document.getElementsByClassName("t-plus-days")) {
        if(dur.days)
            el.textContent = `${dur.days} ${dur.days == 1 ? 'päivä' : 'päivää'}`;
        else el.textContent = ''
    }

};

calc();
let x = setInterval(calc, 1000);

// On document load: lasketaan kerran tsemppiviestien näkyvyys:

