const mineflayer = require('mineflayer')
var start = 0
var start2 = 0
var wins = 0
var game = 0
var seconds = 0

const victim = mineflayer.createBot({
    host: 'mc.hypixel.net',
    version: '1.8.9',
    username: process.env.victim1,
    password: process.env.victim2,
})

const winstreaker = mineflayer.createBot({
    host: 'mc.hypixel.net',
    version: '1.8.9',
    username: process.env.winstreak1,
    password: process.env.winstreak2,
})

var startTime, endTime;
startTime = new Date()
var end = ""
var output = ""
var outputArray = []
var output2 = ""
var outputArray2 = []

async function random(message){
    end = message
    for (i = 0; i < Math.floor(Math.random() * (20 - 10 + 1) + 10); i++){
    randomNumber = Math.floor(Math.random() * (end.length - 4 + 1) + 4)
    end = (`${end.slice(0, randomNumber*-1)}⛮${end.slice(end.length-randomNumber)}`)
    }
}


function setDelay2(){
    if (winstreaker.players.Ranger_Fowl !== undefined){
        start = 1
    } else{
        winstreaker.chat("/play duels_bow_duel")
    }
}

winstreaker.on("spawn", login=>{
    console.log("Winstreaker ON")
    winstreaker.chat("/play duels_bow_duel")
})

victim.on("spawn", login =>{
    console.log("Victim ON")
    victim.chat("/play duels_bow_duel")
})

winstreaker.on("message", message =>{
    output = (`${message}`)
    outputArray = output.split(` `)
    if (output.includes("has joined")){
        setTimeout(setDelay2, 5000)
    }
    if (output.includes("YOU WON! Want to play again? CLICK HERE! ")){
        winstreaker.chat("/play duels_bow_duel")
        wins ++
        console.log(`Session winstreak:${wins}! Games queued: ${game}`)
        start = 0
    }
    if (output.includes("The game starts in 3 seconds") && start == 0){
        winstreaker.chat("/play duels_bow_duel")
        game++
        console.log("Winstreaker Requeued")
    }
    if (output.includes("!stats")){
        endTime = new Date()
        var timeDiff = endTime - startTime
        timeDiff /= 1000;
        seconds = Math.round(timeDiff)
        random(`WS: ${wins}, MINUTES: ${Math.round((seconds/60)*100)/100}, WPM: ${Math.round((wins/(seconds/60))*100)/100}`)
        winstreaker.chat(`/r ${end}`)
    }
    if (output.includes("!stop") && start == 0){
        start = 1
        start2 = 1
    }
    if (output.includes("!start")){
        start = 0
        start2 = 0
    }
    if (output.includes("From") && outputArray[3] == ("!manual")){
        winstreaker.chat(output.slice(outputArray[0].length + 1 + outputArray[1].length + 1 + outputArray[2].length + 1 + outputArray[3].length + 2))
    }
})
victim.on("message", message =>{
    output2 = (`${message}`)
    outputArray2 = output2.split(` `)
    if (output2.includes("has joined")){
        if (victim.players.Fat_Platapus !== undefined || victim.players.eightypixels !== undefined){
            start2 = 1
        }
    }
    if (output2.includes("Eliminate your opponents!")){
        victim.chat("/play duels_bow_duel")
        start2 = 0
    }
    if (output2.includes("The game starts in 3 seconds!") && start2 == 0){
        game ++
        console.log("Victim Requeued")
        victim.chat("/play duels_bow_duel")
    }
})
