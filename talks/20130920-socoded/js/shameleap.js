var controller = new Leap.Controller({enableGestures: true});


var circleCondition = false;

controller.on('frame', function(frame){
    if(frame.hands.length===2){
        circleCondition = true;
    }
    else{
        circleCondition = false;
    }
    if(frame.hands.length>=1){
        //console.log(frame.hands[0].sphereCenter);
    }
});
controller.on('gesture', function (gesture){
    if(!circleCondition && gesture.type === 'swipe'){
        handleSwipe(gesture);
    }
    if(circleCondition && gesture.type === 'circle'){
        handleCircle(gesture);
    }
});

function handleSwipe (swipe){
    var startFrameID;
    if(!timeoutActive && swipe.state === 'stop'){
        if (swipe.direction[0] > 0){
            Reveal.left();
        }else{
            Reveal.right();
        }
        timeOut(650);
    }
}

function handleCircle (circle){
    var startFrameID;
    if(!timeoutActive && circle.state === 'stop'){
        Reveal.toggleOverview();
        timeOut(1000);
    }
}

var timeoutActive = false;
function timeOut(ms){
    timeoutActive = true;
    setTimeout(function(){
        timeoutActive = false;
    },ms)

}

controller.connect();
