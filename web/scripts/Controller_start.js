// reading in controller inputs

// index.html
<script src="js/Controller.min.js"></script>

Controller.search();

window.addEventListener('gc.controller.found', function(event) {
    var controller = event.detail.controller;
    console.log("Controller found at index " + controller.index + ".");
    console.log("'" + controller.name + "' is ready!");
}, false);

// Button press event
window.addEventListener('gc.button.press', function(event) {
    var button = event.detail;
    console.log(button);
}, false);