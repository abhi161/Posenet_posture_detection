let capture;
let posenet;
let noseX,noseY;
let singlepose,skel;
let actor;



function setup(){
    createCanvas(800,600)
    capture = createCapture(VIDEO)
    capture.hide();

    posenet = ml5.poseNet(capture,modelloaded)
    posenet.on('pose',receivedPoses)

    actor = loadImage('images/Akshay_Kumar.jpg');
}

function receivedPoses(poses){
    console.log(poses);
    if(poses.length > 0){
        singlepose = poses[0].pose;
        skel = poses[0].skeleton;
        
    }
    console.log(noseX+ " " +noseY);
}

function modelloaded(){
    console.log('Model has loaded')
}

function draw(){
    image(capture,0,0);
    fill(255,0,0)

    if(singlepose){

        for(let i=0; i<singlepose.keypoints.length; i++){
            ellipse(singlepose.keypoints[i].position.x,singlepose.keypoints[i].position.y,20)
        }
        stroke(255,255,255)
        strokeWeight(5)

        for(let j=0;j<skel.length;j++){
            line(skel[j][0].position.x,skel[j][0].position.y,skel[j][1].position.x,skel[j][1].position.y)
        }

        image(actor,singlepose.nose.x-40,singlepose.nose.y-50,100,100);
    }
    
}