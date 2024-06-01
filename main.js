var song="";
var status="";
var objects=[];
function preload(){
    song=loadSound("call-to-attention-123107.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    object_detector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status : Detecting Object";

}
function draw(){
    image(video,0,0,380,380);
    if(status !=""){
        red=random(255);
        green=random(255);
        blue=random(255);
        object_detector.detect(video,gotResult);
        for(var i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status : objects detected";
            fill(red,green,blue);
            percent=floor(objects[i].confidence*100);
            textSize(20);
            text(objects[i].label+" "+percent+"%",objects[i].x+5,objects[i].y+17);
            noFill();
            stroke(red,green,blue);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("number_of_object_detected").innerHTML="Baby Found ";
                song.stop();
            }
            else{
                document.getElementById("number_of_object_detected").innerHTML="Baby Not Found ";
                song.play();
            }
        }
        
    }

    
}
function modelloaded(){
    console.log("Model loaded");
    status=true;
    
}
function gotResult(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        objects=result;
    }
}
function startmodel(){
    
}