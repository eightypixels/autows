const mineflayer = require('mineflayer')
var start = 0
var start2 = 0
var wins = 0

const victim = mineflayer.createBot({
    host: 'mc.hypixel.net',
    version: '1.8.9',
    username: "jaeron114@gmail.com",
    password: "dwaQMmx5UYZ5t5gd4dFVgrNftLJSwu",
})

const winstreaker = mineflayer.createBot({
    host: 'mc.hypixel.net',
    version: '1.8.9',
    username: "endos211@gmail.com",
    password: "fPtvKP3vX62zJSZM4q2MWutPkj9Z7f",
})

var startTime, endTime;
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
winstreaker.on("spawn", spawn=>{
    winstreaker.chat("/play duels_mw_duel")
    startTime = new Date()
})

victim.on("spawn", spawn =>{
    victim.chat("/play duels_mw_duel")
    startTime = new Date()
})

winstreaker.on("message", message =>{
    output = (`${message}`)
    outputArray = output.split(` `)
    if (output.includes("has joined") && winstreaker.players.hqurs !== undefined){
        start = 1
    }
    if (output.includes("YOU WON! Want to play again? CLICK HERE! ")){
        winstreaker.chat("/play duels_mw_duel")
        wins ++
        start = 0
    }
    if (output.includes("The game starts in 5 seconds") && start == 0){
        winstreaker.chat("/play duels_mw_duel")
    }
    if (output.includes("!stats")){
        endTime = new Date()
        var timeDiff = endTime - startTime
        timeDiff /= 1000;
        seconds = Math.round(timeDiff)
        random(`Session Winstreak: ${wins}`)
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
    if (output2.includes("has joined") && victim.players.minutqs !== undefined){
        start2 = 1
    }
    if (output2.includes("Eliminate your opponents!")){
        victim.chat("/play duels_mw_duel")
        start2 = 0
    }
    if (output2.includes("The game starts in 5 seconds!") && start2 == 0){
        victim.chat("/play duels_mw_duel")
    }
})
