const area = document.querySelector("body .qus h1"),
    score = document.querySelector(".score .sc"),
    qusAkd = document.querySelector(".score .qa");
var level = {
    size: 3,
    len: 4,
    sub: true,
};
var scoreVal = [0, 0];
var num = new SpeechSynthesisUtterance();
num.voice = speechSynthesis.getVoices()[45]
num.pitch = 1.875
num.lang = "en-US"
num.voiceURI = "native"

askQues();

function getRandQues() {
    let qus = "",
        ans = 0
    for (let i = 0; i < level.size; i++) {
        let sign = "",
            rand = Math.random() * 10;
        (!level.sub && (sign = "+")) ||
            (i !== 0 && ((rand > 4 && (sign = "-")) || (sign = "+")));
        let num = Math.floor((rand - Math.floor(rand)) * 10 ** level.len);
        (sign === "-" && (ans -= num)) || (ans += num);
        qus += `${sign}${num.toLocaleString()} `;
    }
    ans = ans.toLocaleString();
    return {
        qus,
        ans
    };
}
function askQues() {
    qusAkd.innerText = `Questions Asked: ${scoreVal[1]}`;
    let question = getRandQues();
    area.innerHTML = `${question.qus
        .replaceAll("+", "<i class='plus'>+</i>")
        .replaceAll("-", "<i class='minus'>-</i>")} <br><br>= ${question.ans}`;
    num.textList = `${question.qus}=${question.ans}`.replaceAll("-", "minus").split(" ")
    num.sd = 0
    spkNext()
    scoreVal[1]++;
}
function incScore() {
    scoreVal[0]++;
    score.innerText = `Score: ${scoreVal[0]}`;
    askQues();
}
function spkNext() {
    num.textList[num.sd]===undefined && (num.sd=0)
    num.text = num.textList[num.sd];
    speechSynthesis.speak(num)
    num.sd++
}
addEventListener("keydown", (e) => {
    k = e.key
    k === "ArrowLeft" && askQues() || k === "ArrowRight" && incScore() || k === " " && spkNext()
})  