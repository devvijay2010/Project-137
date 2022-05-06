status = "";
objects = [];


function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResults);

        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 10);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == objectname)
            {
              video.stop();
              objectDetector.detect(gotResults);
              synth = window.speechSynthesis;
              speak_data = objectname + " found";
              utterthis = new SpeechSynthesisUtterance(speak_data);
              synth.speak(utterthis);
              document.getElementById("objectname").innerHTML = objectname + " found";
            }
            else
            {
                document.getElementById("objectname").innerHTML = objectname + " not found";
            }
        }
    }
}




function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    objectname = document.getElementById("input").value;
}

function modelloaded()
{
    console.log("Model Loaded!");
    status = true;
}