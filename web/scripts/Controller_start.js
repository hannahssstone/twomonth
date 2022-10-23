// reading in controller inputs

// index.html
//<script src="js/Controller.min.js"></script>

Controller.search();


window.addEventListener('gc.controller.found', function(event) {
    var elem = document.getElementById("controller_status");
    if (elem.value=="disconnected") elem.value = "connected";
    var controller = event.detail.controller;
    console.log("Controller found at index " + controller.index + ".");
    console.log("'" + controller.name + "' is ready!");
}, false);

window.addEventListener('gc.controller.lost', function(event) {
    var elem = document.getElementById("controller_status");
    if (elem.value=="connected") elem.value = "disconnected";
   }, false);



// Command Publisher 

// ROS Instance Object
var ros;

// ROS Subscriber
var pico_sub;

// ROS Publisher
var command_pub;

// Text box reference
var pico_log;

function setup() {
    pico_log = $("#pico_log");

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
    
    pico_sub = new ROSLIB.Topic({
        ros: ros,
        name: '/pico/output',
        messageType: 'std_msgs/String'
    });
    pico_sub.subscribe(update_log);

    command_pub = new ROSLIB.Topic({
        ros: ros,
        name: '/pico/command',
        messageType: 'std_msgs/String'
    });

    $("#rosbridge_connect").click(connect_rosbridge);

window.addEventListener('gc.button.press', function(event){
    if (event.detail.name == 'START'){
        var command = new ROSLIB.Message({
            data: "ENTER_AUTO"
        });
        command_pub.publish(command);
    }
    else if (event.detail.name == 'SELECT'){
        var command = new ROSLIB.Message({
            data: "EXIT_AUTO"
        });
        command_pub.publish(command);
    }
    else if (event.detail.name == 'FACE_2'){
        var command = new ROSLIB.Message({
            data: "AUTO_ARUCO"
        });
        command_pub.publish(command);
    }
    else if (event.detail.name == 'FACE_3'){
        var command = new ROSLIB.Message({
            data: "AUTO_INSTR"
        });
        command_pub.publish(command);
    }
    else if (event.detail.name == 'FACE_4'){
        var command = new ROSLIB.Message({
            data: "AUTO_LINE"
        });
        command_pub.publish(command);
    }
    else if (event.detail.name == 'DPAD_LEFT'){
        var command = new ROSLIB.Message({
            data: "ARM_LEFT"
        })
    }
    else if (event.detail.name == 'DPAD_RIGHT'){
        var command = new ROSLIB.Message({
            data: "ARM_RIGHT"
        })
    }
})

window.addEventListener('gc.button.hold', function(event){
    if (event.detail.name == 'LEFT_SHOULDER_BOTTOM'){
        var command = new ROSLIB.Message({
            data: "ARM_UP"
        });
        command_pub.publish(command);
    }
    else if (event.detail.name == 'RIGHT_SHOULDER_BOTTOM'){
        var command = new ROSLIB.Message({
            data: "ARM_DOWN"
        });
        command_pub.publish(command);
    }
})

window.addEventListener('gc.analog.hold', function(event){
    if (event.detail.name == "RIGHT_ANALOG_STICK"){
        if (event.detail.position.x > 0){
            var command = new ROSLIB.message({
                data: "turn right"
            });
            command_pub.publish(command);
        }
        else if (event.detail.position.x < 0){
            var command = new ROSLIB.message({
                data: "turn left"
            });
            command_pub.publish(command);
        }

        }
       
    else if (event.detail.name == "LEFT_ANALOG_STICK"){
        if (event.detail.position.y > 0){
            var command = new ROSLIB.message({
                data: "move backward"
            });
            command_pub.publish(command);
        }
        else if (event.detail.position.y < 0){
            var command = new ROSLIB.message({
                data: "move forward"
            });
            command_pub.publish(command);
        }

        command_pub.publish(command);
    }
})

window.addEventListener('gc.analog.end',function event(){
    if (event.detail.name == "LEFT_ANALOG_STICK"){
        var command = new ROSLIB.message({
            data: "NO_INPUT"
        });
        command_pub.publish(command);
    }

})
}
