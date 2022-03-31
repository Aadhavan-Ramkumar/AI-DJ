var Song = ""
var LeftWristX = 0
var LeftWristY = 0
var RightWristX = 0
var RightWristY = 0
var LeftWristScore = 0
var RightWristScore = 0

function preload() {
    Song = loadSound("Music.mp3")
}

function setup() {
    Canvas = createCanvas(600, 500)
    Canvas.center()

    Video = createCapture(VIDEO)
    Video.hide()

    PoseNet = ml5.poseNet(Video, () => {
        console.log("PoseNet is Initalized!")
    })
    PoseNet.on("pose", GetPoses)
}

function draw() {
    image(Video, 0, 0, 600, 500)

    fill("#FF0000")
    stroke("#FF0000")

    if (RightWristScore > 0.002) {
        circle(RightWristX, RightWristY, 20)

        if (RightWristY > 0 && RightWristY <= 100) {
            document.getElementById("Speed").innerHTML = "Speed = 0.5"
            Song.rate(0.5)
        } else if (RightWristY > 100 && RightWristY <= 200) {
            document.getElementById("Speed").innerHTML = "Speed = 1"
            Song.rate(1)
        } else if (RightWristY > 200 && RightWristY <= 300) {
            document.getElementById("Speed").innerHTML = "Speed = 1.5"
            Song.rate(1.5)
        } else if (RightWristY > 300 && RightWristY <= 400) {
            document.getElementById("Speed").innerHTML = "Speed = 2"
            Song.rate(2)
        } else if (RightWristY > 400 && RightWristY <= 500) {
            document.getElementById("Speed").innerHTML = "Speed = 2.5"
            Song.rate(2.5)
        }
    }

    if (LeftWristScore > 0.002) {
        circle(LeftWristX, LeftWristY, 20)
        NumberLeftWristY = Number(LeftWristY)
        NoDecimals = floor(NumberLeftWristY)
        Volume = NoDecimals / 500
        document.getElementById("Volume").innerHTML = "Volume = " + Volume
        Song.setVolume(Volume)
    }
}

function Play() {
    Song.stop()
    Song.play()
    Song.setVolume(1)
    Song.rate(1)
}

function Stop() {
    Song.stop()
}

function GetPoses(Results) {
    if (Results.length > 0) {
        console.log(Results)
        LeftWristScore = Results[0].pose.keypoints[9].score
        RightWristScore = Results[0].pose.keypoints[10].score
        console.log("LeftWristScore = " + LeftWristScore + ", RightWristScore = " + RightWristScore)

        LeftWristX = Results[0].pose.leftWrist.x
        LeftWristY = Results[0].pose.leftWrist.y
        console.log("LeftWristX = " + LeftWristX + " LeftWristY = " + LeftWristY)

        RightWristX = Results[0].pose.rightWrist.x
        RightWristY = Results[0].pose.rightWrist.y
        console.log("RightWristX = " + RightWristX + " RightWristY = " + RightWristY)
    }
}