const cdis = document.getElementById('cdis');
const plusbtn = document.getElementById('ctup');
const minusbtn = document.getElementById('ctdw');
const resetbtn = document.getElementById('ctreset');

var countnumber = 0;
checknumb();

cdis.innerHTML = countnumber;

plusbtn.onclick = function plus1() {
    countnumber = countnumber+1;
    cdis.innerHTML = countnumber;
    checknumb();
}
minusbtn.onclick = function minus1(){
    countnumber = countnumber-1;
    cdis.innerHTML = countnumber;
    checknumb();
}
resetbtn.onclick = function () {
    countnumber = 0;
    cdis.innerHTML = countnumber;
    checknumb();
}

function checknumb() {
    if (countnumber <= 0) {
        minusbtn.disabled="disabled";
    }else if(countnumber >= 0){
        minusbtn.disabled="";
    }    
}

document.body.addEventListener('keypress',
    event => {
        if (event.key === 'c'/* && event.ctrlKey*/) {
            countnumber = countnumber+1;
            cdis.innerHTML = countnumber;
            checknumb();
        }else if (event.key === 'v'/* && event.ctrlKey*/) {
            if (countnumber > 0) {
                countnumber = countnumber-1;
                cdis.innerHTML = countnumber;
                checknumb();
            }
        }
        if (event.key === 'z'){
            countnumber = 0;
            cdis.innerHTML = countnumber;
            checknumb();
        }
    });