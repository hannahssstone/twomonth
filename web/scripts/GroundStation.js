//ROS////////////////////////////////
var ros;

//Hold DPAD_UP == SERVO UP FOR ARM///


//ROS CONNECTING////////////////////////////////
function setup() {
    ros = new ROSLIB.Ros();
var rosbridge_status = $("#rosbridge_status");
ros.on('connection', function () {
    console.log('Connected to websocket server.');
    rosbridge_status.val("Connected");
});

ros.on('error', function (error) {
    console.log('Error connection to websocket server: ' + error);
    rosbridge_status.val("Error");
});

ros.on('close', function () {
    console.log('Connection to websocket server closed.');
    rosbridge_status.val("Closed");
});

$("#rosbridge_connect").click(connect_rosbridge);
}

function connect_rosbridge() {
    var address = "ws://" + $("#rosbridge_address").val();

    ros.connect(address);
}


////CONTROLLER////////////////////////////////
window.addEventListener('gc.button.press', function(event) {
    var button = event.detail;
    console.log(button);
}, false);

window.addEventListener('gc.analog.start', function(event) {
    var stick = event.detail;
    console.log(stick);
})


window.onload = setup;
