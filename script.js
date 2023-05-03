var running = "";
var cursorIndex = 0;
var result = 0;

const numView = document.querySelector('#num-view');

const textButtons = document.querySelectorAll('.text-button');
const clear = document.querySelector('#c');
const left = document.querySelector('#left');
const right = document.querySelector('#right');
const equals = document.querySelector('#equal');
const back = document.querySelector('#back');

function addText(id) {
    if (running.length == 0 || cursorIndex == running.length) {
        running = running.substring(0,cursorIndex - 1) + id + "|";
        cursorIndex = running.length;
    } else {
        running = running.substring(0,cursorIndex - 1) + id + running.substring(cursorIndex - 1, running.length);
        cursorIndex++;
    }        
    numView.textContent = running;
} 

function parseText() {
    running.replace("x", "*");
    running.replace("|", "");
    result = math.evaluate(running);
    numView.textContent = result;
}

textButtons.forEach((textButton) => {
    textButton.addEventListener("click", () => {
        if (textButton.id != "neg") {        
            addText(textButton.id);
        } else {
            addText("-");
        }
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
    cursorIndex--;
});

equals.addEventListener("click", () => {
    console.log('equals');
    parseText();
});
