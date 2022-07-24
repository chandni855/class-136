object=[];
video="";
status="";
function preload()
{
    video=createVideo('video.mp4');
    video.hide();
}
function setup()
{
    canvas=createCanvas(480,380);
    canvas.center();
}
function draw()
{
    image(video,0,0,480,380);
    if (status!="")
    {
        objectDetector.detect(video,gotresutls);
        for(i=0 ; i<object.length ; i++)
        {
            document.getElementById("status").innerHTML="status : object detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are "+object.length;
        }
        fill("#FF0000");
        percent=floor(object[i].confidence*100);
        text(object[i].label+""+percent+"%",object[i].x+15,object[i].y+15);
        nofill();
        strock("#FF0000");
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
    }
}
function gotresutls(error , result)
{
    if (error)
    {
        console.error(error);
    }
    console.log(result);
    object=result;
}
function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="status : deleting object";
}
function modelloaded()
{
    console.log("model loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}