//ROS////////////////////////////////
var ros;

//Hold DPAD_UP == SERVO UP FOR ARM///
//SELECT == ACTIVATES AUTONOMOUS READY MODE//
//START == CANCELS AUTONOMOUS READY MODE//
//FACE_2 == IN AUTONOMOUS READY MODE, ACTIVATES ROKU//
//FACE_3 == IN AUTONOMOUS READY MODE, ACTIVATES FOLLOWING INSTRUCTIONS//
//FACE_4 == IN AUTONOMOUS READY MODE, ACTIVATES LINE FOLLOWING//
//LEFT_ANALOG_STICK == LEFT WHEEL//
//RIGHT_ANALOG_STICK == RIGHT WHEEL//
//DPAD_UP == CAMERA UP//
//DPAD_DOWN == CAMERA DOWN//
//DPAD_LEFT == ARM SWIVEL LEFT//
//DPAD_RIGHT == ARM SWIVEL RIGHT//
//LEFT_SHOULDER == ARM MOVING UP//
//LEFT_SHOULDER_BOTTOM == ARM MOVING DOWN//
//RIGHT_SHOULDER == MAKES HOOK GO UP//
//RIGHT_SHOULDER_BOTTOM == MAKES HOOK GO DOWN//
//START, FACE_4, FACE_2 == RETURN TO START, END PROGRAM, TURN OFF//


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
