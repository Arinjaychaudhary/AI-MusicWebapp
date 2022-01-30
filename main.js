dynamite="";
dance="";
leftWristX="";
leftWristY="";
rightWristX="";
rightWristY="";

leftWristscore="";

function preload(){
    dynamite = loadSound("BTS-Dynamite-(TrendyBeatz.com).mp3");
    dance=loadSound("levitating.mp3");
}

function setup(){
    canvas = createCanvas(800,450);
    canvas.position(400,200);
    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);

    poseNet.on('pose',gotPoses);

}

function draw(){
    image(video,0,0,800,450);
    fill("#0000FF");
    stroke("#0000FF");

    if(dynamite.isPlaying())
    {
        dynamite.stop();
    }

    if(leftWristscore > 0.001)
    {
    dance.stop();
    circle(leftWristX,leftWristY,20);
    LeftWristint=Number(leftWristY);
    leftWristDec=floor(LeftWristint);
    
    dynamite.play();
     document.getElementById("name").innerHTML="Song = Dynamite";
    }
}


function modelLoaded(){
console.log("Model Loaded Successfully");
}

function gotPoses(results){
    if(results.length>0)
    {

        console.log(results);
        leftWristscore=results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrst X = " +leftWristX+ "Left Wrist Y = " +leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrst X = " +rightWristX+ "Right Wrist Y = " +rightWristY);
        console.log(leftWristscore);
    }
}

