var AudioContext = window.AudioContext || window.webkitAudioContext || false; 
var ac	= new AudioContext || new webkitAudioContext;
var digits = new Array();
function playFunction(){
    document.getElementById("playButton").innerText = "Playing...";
    document.getElementById("playButton").disabled  = true;
    
    //generating first 30 fibonacci numbers
    for(let i = 0 ;i<30;i++){
      digits = digits.concat(fibonacci(i).toString().split(''));
    }
    playSomthing();  
}
function playSomthing(){
let soundUrl = getRandomInstrumentUrl();
Soundfont.instrument(ac, 
                    soundUrl)
                    .then(function (instrument) {
                        for(let j=0; j<digits.length;j++){
                            if(parseInt(digits[j]) < 8 && parseInt(digits[j]) > 0){
                                instrument.schedule(this.ac.currentTime, [{note: 'D'+digits[j], time:j/5}]) 
                             } 
                              else {
                                if (parseInt(digits[j])<=0) {
                                    let value = parseInt(digits[j])+4;
                                    instrument.schedule(this.ac.currentTime, [{note: 'A'+value, time:j/5}]) 
                                }else
                                {
                                    let value = parseInt(digits[j])-2;
                                     instrument.schedule(this.ac.currentTime, [{note: 'E'+value, time:j/5}]) 

                                }
                            }
                        }
                    }).catch(function(err){ 
                        console.log(err)
                     })
}
function fibonacci(num) {
    if(num == 0) return 0;
    if (num == 1) return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
}

function getRandomInstrumentUrl(){
    var selectedInstrument = parseInt(document.getElementById("instrumentSelection").value);
    if (selectedInstrument === 3) {
        return "https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/Tabla-soundfont/tabla-mp3.js";
    } else if (selectedInstrument === 2) {
        return "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/marimba-mp3.js";
    } else {
        return "https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/MusyngKite/acoustic_guitar_nylon-mp3.js";
    }
}