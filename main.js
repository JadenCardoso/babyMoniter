objects = [];
status = "";
video = "";

function preload(){
    alarm = loadSound("Alarm.mp3");
}
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetecter = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Person";
}

function modelLoaded(){
    status = "true";
    console.log("modelLoaded");
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 380, 380);
    r = random(255);
    g = random(255);
    b = random(255);
    if(status != ""){
        objectDetecter.detect(video, gotResult);
        for (i=0; i>objects.length; i++){
            if (objects[i].label == "person"){
            document.getElementById("Status").innerHTML = "Status: Object Detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("NumberOfObjects").innerHTML = "Number of people: " + objects.length;
            }
            else{
                alarm.play();
            }
        }
    }
}
