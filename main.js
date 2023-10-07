objects = [];
status1 = "";
video = "";

function preload(){
    video = createVideo('video.mp4');

}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function start(){
object_detector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoaded(){
    console.log("model is loaded");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results){
if(error){
    console.log(error);
}
else{
     console.log(results);
     objects = results;
}
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status1 != ""){
        object_detector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects detected";
            document.getElementById("NoOfObjects").innerHTML = "Number of objects detected are :" + objects.length;
            fill("#17202A");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#17202A");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}
