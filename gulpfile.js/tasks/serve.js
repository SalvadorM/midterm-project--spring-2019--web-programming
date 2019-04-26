const { series, watch } = require(`gulp`)
const browserSync = require(`browser-sync`)
const reload = browserSync.reload

const serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 100,
        server: {
            baseDir: [`app/dev`]
        }
    })
    watch([
        `./**/*.html`,
        `./**/*.html`,
        `./**/*.js`,
        './**/*.scss'
    ],series(`compileCSSForDev`))
    .on(`change`, reload)
}

module.exports = serve 



/*


// function setup(){
//     createCanvas(640, 480)

//     //dom video capture
//     video = createCapture(VIDEO)
//     video.hide()

//     //load poseNet api
//     poseNet = ml5.poseNet(video, cbReady)

//     //get poseNet pose 
//     poseNet.on('pose', getCurrentPose)
// }

// function getCurrentPose(poses){
//     if (poses.length > 0 ){
//         noseCordX = poses[0].pose.keypoints[0].position.x
//         noseCordy = poses[0].pose.keypoints[0].position.y - 150
//     }
// }

// function cbReady(){
//     console.log('pose net loaded')
// }

// function draw(){
//     image(video, 0, 0)

//     //this where we render the 
//     fill(255, 0, 0)
//     line
// }












*/