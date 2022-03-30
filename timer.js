const hset = document.getElementById('hset')
const htext = document.getElementById('hsett')
const hdis = document.getElementById('hdis')
const mset = document.getElementById('mset')
const mtext = document.getElementById('msett')
const mdis = document.getElementById('mdis')
const sset = document.getElementById('sset')
const stext = document.getElementById('ssett')
const sdis = document.getElementById('sdis')

hset.oninput= function () {
    hdis.innerHTML = hset.value.toString().padStart(2, "0")
    htext.value = hset.value.toString().padStart(2, "0")
}
htext.oninput = function () {
    hset.value = htext.value
    hdis.innerHTML = hset.value.toString().padStart(2, "0")
}

mset.oninput= function () {
    mdis.innerHTML = mset.value.toString().padStart(2, "0")
    mtext.value = mset.value.toString().padStart(2, "0")
}
mtext.oninput = function () {
    mset.value = mtext.value
    mdis.innerHTML = mset.value.toString().padStart(2, "0")
}

sset.oninput= function () {
    sdis.innerHTML = sset.value.toString().padStart(2, "0")
    stext.value = sset.value.toString().padStart(2, "0")
}
stext.oninput = function () {
    sset.value = stext.value
    sdis.innerHTML = sset.value.toString().padStart(2, "0")
}



//1時間を3600秒、1分を60秒、にして合計の秒数を返す
  function timeAll(){
    var hour_all = hset.value;
    var minute_all = mset.value;
        var second_all = sset.value;
    var all = Number(hour_all*3600)+Number(minute_all*60)+Number(second_all);
    return all;
}

//タイム計測中であるかどうか
var ontheway = false;
//入力された合計の秒数
var onthewayallsec = 0;
//スタートボタンを押したときの処理
function start(){
    //visibilityプロパティを使用してスライダーを隠し、disabled属性でスタートボタン、リセットボタンも押せなくしている
    /*document.getElementById("bargroup").style.visibility ="hidden";*/
    document.getElementById("start_button").disabled="disabled";
    /*document.getElementById("reset_button").disabled="disabled";*/
    document.getElementById("stop_button").disabled=""
    document.getElementById("reset_button").disabled="disabled";
    document.getElementById("controls").style.pointerEvents="none";
    if(ontheway == false){
                  var allsec = timeAll(); 
       }else{
           var allsec = onthewayallsec;
       }
    ontheway = false;
    var dt = new Date();
    var endDt = new Date(dt.getTime() + allsec * 1000);
    hour = Math.floor(allsec/3600);
    if(hour < 10){
    hdis.innerHTML="0"+hour;
       }else{
       hdis.innerHTML=hour;
       }
    hour_remainder =Math.floor(allsec%3600);
    minute = Math.floor(hour_remainder/60);
    if(minute < 10){
    mdis.innerHTML="0"+minute;
       }else{
       mdis.innerHTML=minute;
       }
    sec=Math.floor(hour_remainder%60);
if(sec < 10){
    sdis.innerHTML="0"+sec;
       }else{
       sdis.innerHTML=sec;
       }
//処理間隔は0.1秒にしている、1秒だとストップする際にラグを感じる
var count_down = setInterval(function(){
allsec = allsec-0.1;
  dt = new Date();
    hour = Math.floor(allsec/3600);
    if(hour < 10){
    hdis.innerHTML="0"+hour;
       }else{
       hdis.innerHTML=hour;
       }
    hour_remainder =Math.floor(allsec%3600);
    minute = Math.floor(hour_remainder/60);
    if(minute < 10){
    mdis.innerHTML="0"+minute;
       }else{
       mdis.innerHTML=minute;
       }
    sec=Math.floor(hour_remainder%60);
if(sec < 10){
    sdis.innerHTML="0"+sec;
       }else{
       sdis.innerHTML=sec;
       }
if (allsec-1 <= 30) {
    var elements = document.getElementsByClassName('disp');
    for(i=0;i<elements.length;i++){
        elements[i].style.color = "darkorange";
    }
}
if (allsec-1 <= 10) {
    var elements = document.getElementsByClassName('disp');
    for(i=0;i<elements.length;i++){
        elements[i].style.color = "red";
    }
    var body = document.getElementById("body")
    body.style.background = "linear-gradient(lightcoral,white)"
}
if(dt.getTime() >= endDt.getTime()){
    playaudio();
    start_notification();
    clearInterval(count_down);
    mdis.innerHTML=minute;
    sdis.innerHTML="00";
    mdis.innerHTML="00";
    hdis.innerHTML="00";
    var elements = document.getElementsByClassName('disp');
    for(i=0;i<elements.length;i++){
        elements[i].style.color = "cadetblue";
    }
    var body = document.getElementById("body")
    body.style.background = "linear-gradient(darkturquoise,white)"
    var elements = document.getElementsByClassName('disp');
    for(i=0;i<elements.length;i++){
        elements[i].style.color = "white";
    }
}
if(ontheway == true){
 clearInterval(count_down);
 onthewayallsec = allsec;
 }
}, 100);
}

function stop(){
    stopaudio();
    ontheway = true;
    document.getElementById("start_button").disabled="";
    document.getElementById("reset_button").disabled="";
    document.getElementById("stop_button").disabled="disabled"
    document.getElementById("controls").style.pointerEvents="auto";
    var body = document.getElementById("body")
    body.style.background = "white"
    var elements = document.getElementsByClassName('disp');
    for(i=0;i<elements.length;i++){
        elements[i].style.color = "cadetblue";
    }
}

function reset(){
location.reload();
}

//音楽を鳴らす
function playaudio(){
    document.getElementById('audio').play();
}
//音楽を止める
function stopaudio(){
    document.getElementById('audio').pause();
}

function start_notification() {
    if ( ! window.Notification) { return false; }
    if (window.Notification.permission === 'denied' || window.Notification.permission === 'default' ) {
        window.Notification.requestPermission().then(function() {
            exec_notification();
        });
    } else {
        exec_notification();
    }
}

function exec_notification() {
    var notifyTitle = '時間です！'; 		// 25文字まで表示される
    var notifyBody  = 'タイマーの設定した時間になりました。';	// 27文字まで表示される

    var options = {
        'body': notifyBody,
        // icon: notifyIcon
    }
    var n = new Notification(notifyTitle, options);
    setTimeout(n.close.bind(n), 5000);
}
