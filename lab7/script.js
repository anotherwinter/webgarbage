let clicks = 0;
let cps = 0;
let time = 0;
let timer;

document.addEventListener('DOMContentLoaded', function () {
    let images = ["orchid.jpg", "rose.jpg", "sunflower.jpg"];
    let thumbnails = document.getElementById("thumbnails-container").children;

    for (i = 0; i < images.length; i++) {
        thumbnails[i].style.backgroundImage = `url("${images[i]}")`;
        thumbnails[i].setAttribute("data-file", images[i]);
    }

    let containers = Array.from(document.getElementById("paragraphs").children);
    containers.forEach(e => {
        if (e.tagName == "DIV")
            removeParagraphs(e);
    });
});

function showImage(button) {
    const file = button.getAttribute("data-file");
    if (file != null)
        document.getElementById("image-element").src = file;
}

function updateCPS() {
    time++;
    cps = clicks / time;

    document.getElementById("clicks-info").textContent = `CPS: ${cps.toFixed(2)}, total clicks: ${clicks}, time: ${time} s`;

    timer = setTimeout(updateCPS, 1000);
}

function buttonClicker(button) {
    if (clicks == 0) {
        timer = setTimeout(updateCPS, 1000);
    }
    clicks++;

    button.textContent = `Clicks: ${clicks}`;
}

function buttonClickerReset() {
    clearTimeout(timer);

    document.getElementById("clicks-info").textContent = "No clicks yet";
    document.getElementById("button-clicker").textContent = "Click me!";
}

function removeParagraphs(container) {
    let paragraphs = 0;
    let children = Array.from(container.children);

    children.forEach(e => {
        if (e.tagName == "P")
            paragraphs++;
    });

    if (paragraphs > 3) {
        container.remove();
    }
}