var running = "";
var cursorIndex = 0;

const numView = document.querySelector('#num-view');

const textButtons = document.querySelectorAll('.text-button');
const clear = document.querySelector('#c');
const left = document.querySelector('#left');
const right = document.querySelector('#right');
const equals = document.querySelector('#equal');
const back = document.querySelector('#back');

textButtons.forEach((textButton) => {
    textButton.addEventListener("click", () => {
        if (running.length == 0 || cursorIndex == running.length) {
            running = running.substring(0,cursorIndex - 1) + textButton.id + "|";
            cursorIndex = running.length;
        } else {
            running = running.substring(0,cursorIndex - 1) + textButton.id + running.substring(cursorIndex - 1, running.length);
            cursorIndex++;
        }        
        numView.textContent = running;
    });
});

clear.addEventListener("click", () => {
    running = "";
    numView.textContent = "0";
});

left.addEventListener("click", () => {
    if (cursorIndex > 0) {
        running = running.substring(0,cursorIndex - 1) + running.substring(cursorIndex, running.length);
        numView.textContent = running;
        cursorIndex--;
        running = running.substring(0,cursorIndex - 1) + "|" + running.substring(cursorIndex - 1, running.length);
        numView.textContent = running;
    }
});

right.addEventListener("click", () => {
    if (cursorIndex < running.length - 1 || cursorIndex == running.length - 1) {
        running = running.substring(0,cursorIndex - 1) + running.substring(cursorIndex, running.length);
        numView.textContent = running;
        cursorIndex++;
        running = running.substring(0,cursorIndex - 1) + "|" + running.substring(cursorIndex - 1, running.length);
        numView.textContent = running;
    }
});

back.addEventListener("click", () => {
    running = running.substring(0,running.length - 1);
    numView.textContent = running + "|";
});

equals.addEventListener("click", () => {
    console.log('equals');
});


