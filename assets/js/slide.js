(function(){

let container = document.querySelector('#carousel');
let slides = container.querySelectorAll('.slide');
let indicatorsContainer = container.querySelector('#indicators-container')
let indicators = indicatorsContainer.querySelectorAll('.indicator')
let controls = container.querySelector('#controls')
let currentSlide = 0;
let slidesCount  = slides.length;
let interval = 2000;
let pauseBtn = controls.querySelector('#pause-btn');
let timerID = null;
let isPlaying = true
let nextBtn = controls.querySelector('#next-btn')
let prevBtn = controls.querySelector('#prev-btn')

console.log(controls)

const SPACE = ' '
const LEFT_ARROW = 'ArrowLeft'
const RIGHT_AROW = 'ArrowRight'



function gotoNth (n)  {
    slides [currentSlide].classList.toggle('active');
    indicators [currentSlide].classList.toggle('active');
    currentSlide = (slidesCount + n)% slidesCount;
    slides [currentSlide].classList.toggle('active');
    indicators [currentSlide].classList.toggle('active');
}

function gotoNext(){ 
    gotoNth(currentSlide+1 )
}
function gotoPrev(){
    gotoNth(currentSlide-1)
    
}


function pause(){
    if(isPlaying){
        pauseBtn.innerHTML = 'PLAY';
    isPlaying = false
    clearInterval(timerID);
    }
    
}

function play(){
    pauseBtn.innerHTML = 'PAUSE';
    isPlaying = true
    timerID = setInterval(gotoNext, interval);
    
}

function pausePlay() {
if (isPlaying){
    pause()
}else{
play()
}
}

function prev(){
    pause()
    gotoPrev()
}

function next(){
pause()
gotoNext()
}

function indicate(event){
   let target = event.target;
   if(target.classList.contains('indicator')){
    pause()
    gotoNth(target.getAttribute('data-slide-to'))
   }
}

function pressKey(event){
if(event.key === LEFT_ARROW) prev()
if(event.key === RIGHT_AROW) next()
if(event.key === SPACE) pausePlay()
}
 
function swipeStart(event){
 swipeStartX = event.changedTouches[0].pageX

}

function swipeEnd(event){
 swipeEndX = event.changedTouches[0].pageX
 if(swipeStartX-swipeEndX < - 100){
    prev()
 }
 if(swipeStartX-swipeEndX >100){
    next()
 }

   
}


function initListener(){
    pauseBtn.addEventListener('click', pausePlay);
    nextBtn.addEventListener('click',next);
    prevBtn.addEventListener('click',prev);
    indicatorsContainer.addEventListener('click',indicate)
    document.addEventListener('keydown',pressKey)
    container.addEventListener('touchstart' , swipeStart)
    container.addEventListener('touchend' , swipeEnd)
}

(function init(){
    timerID = setInterval(gotoNext, interval);
    initListener()
})()
})()



