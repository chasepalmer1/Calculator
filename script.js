let running = "";

const numView = document.querySelector('#num-view');

const textButtons = document.querySelectorAll('.text-button');
const clear = document.querySelector('#c');
const left = document.querySelector('#left');
const right = document.querySelector('#right');
const equals = document.querySelector('#equal');

textButtons.forEach((textButton) => {
    textButton.addEventListener("click", () => {
        running += textButton.id;
        numView.textContent = running;
    });
});

clear.addEventListener("click", () => {
    running = "";
    numView.textContent = "0";
});

left.addEventListener("click", () => {
    console.log('left');
});

right.addEventListener("click", () => {
    console.log('right');
});

equals.addEventListener("click", () => {
    console.log('equals');
})


