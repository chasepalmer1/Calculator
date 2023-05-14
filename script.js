var running = "";
var cursorIndex = 0;

const numView = document.querySelector('#num-view');

const textButtons = document.querySelectorAll('.text-button');
const clear = document.querySelector('#c');
const left = document.querySelector('#left');
const right = document.querySelector('#right');
const equals = document.querySelector('#equal');
const back = document.querySelector('#back');

function addText(id) {
    if (running.length == 0 || cursorIndex == running.length - 1) {
        running = running.substring(0,cursorIndex) + id + "|";
    } else {
        running = running.substring(0,cursorIndex) + id + running.substring(cursorIndex, running.length);
    }        
    updateCursorIndex();
    numView.textContent = running;
} 

function parseText() {
    for (var i = 0; i < running.length / 2; i++) {
        running = running.replace("x", "%2A"); // %2A
        running = running.replace("/", "%2F"); // %2F
        running = running.replace("-", "%2D"); // %2D
        running = running.replace("+", "%2B"); // %2B
        running = running.replace("^", "%5E"); // %5E
        running = running.replace("|", ""); 
    }
    console.log(running);
    
    fetch("http://api.mathjs.org/v4/?expr=" + running, {
        method: "GET",
    })  
    .then((response) => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        numView.textContent = data;
    });
    running = "";
    cursorIndex = 0;
}

function updateCursorIndex() {
    for (var i = 0; i < running.length; i++) {
        //if (i == running.length - 1) {
          //  cursorIndex = running.length;
        //} 
        if (running.charAt(i) === '|') {
            cursorIndex = i;
            return;
        }
    }
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
        running = running.substring(0,cursorIndex - 1) + "|" + running.charAt(cursorIndex - 1) + running.substring(cursorIndex + 1, running.length);
        updateCursorIndex();
        numView.textContent = running;
    }
});

right.addEventListener("click", () => {
    if (cursorIndex <= running.length - 1) {
        running = running.substring(0,cursorIndex) + running.charAt(cursorIndex + 1) + "|" + running.substring(cursorIndex + 2, running.length);
        updateCursorIndex();
        numView.textContent = running;
    }
});

back.addEventListener("click", () => {
    if (cursorIndex == running.length - 1) {
        running = running.substring(0,cursorIndex - 1) + "|";
        updateCursorIndex();
    } else {
        running = running.substring(0,running.length - 1);
    }
    numView.textContent = running;
});

equals.addEventListener("click", () => {
    if (running.length != 0) {
        console.log('equals');
        parseText();
    }
});
