

function Carousel (){
    this.container = document.querySelector('#carousel');
    this.slides = this.container.querySelectorAll('.slide');
    
   
    this.interval = 2000;
   
    this.timerID = null;
   

    
    this._initProp();
    this._initControls();
    this._indicators();
    this.initListener();
}
Carousel.prototype = {

    initListener:function(){
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.nextBtn.addEventListener('click',this.next.bind(this));
        this.prevBtn.addEventListener('click',this.prev.bind(this));
        this.indicatorsContainer.addEventListener('click',this.indicate.bind(this));
            document.addEventListener('keydown',this.pressKey.bind(this));
    },
  

    _initProp:function () {
        this.slidesCount  = this.slides.length;
        this.currentSlide = 0;
        this.isPlaying = true
        this.SPACE = ' '
        this.LEFT_ARROW = 'ArrowLeft'
        this.RIGHT_AROW = 'ArrowRight'

    },
    _initControls(){

        let controls = document.createElement('div')
        this.container.appendChild(controls)
        controls.setAttribute('id','controls');
        controls.setAttribute('class', 'btn-container');
        const PAUSE = ` <div class="btn-pause" id="pause-btn">PAUSE</div>`;
        const PREV = `<div class="btn-prev" id="prev-btn">PREV</div>`;
        const NEXT =` <div class="btn-next" id="next-btn">NEXT</div>`;
        controls.innerHTML = PAUSE + PREV + NEXT;
        this.pauseBtn = this.container.querySelector('#pause-btn');
        this.nextBtn = this.container.querySelector('#next-btn');
        this.prevBtn = this.container.querySelector('#prev-btn');


    },

    _indicators(){
        let indicators =document.createElement('ol');
        
        indicators.setAttribute('class', 'indicators');
        indicators.setAttribute('id','indicators-container');
       
        
        for(i=0, n= this.slidesCount;i < n; i++){
            let indicator = document.createElement('li');
            indicator.setAttribute('class','indicator');
            indicator.setAttribute('data-slide-to', `${i}`);
            i===0 && indicator.classList.add('active');
            indicators.appendChild(indicator);
        }

        this.container.appendChild(indicators);
        this.indicatorsContainer = this.container.querySelector('#indicators-container');
        this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');


    },

     gotoNth:function (n)  {
        this.slides [this.currentSlide].classList.toggle('active');
        this.indicators [this.currentSlide].classList.toggle('active');
        this.currentSlide = (this.slidesCount + n)% this.slidesCount;
        this.slides [this.currentSlide].classList.toggle('active');
        this.indicators [this.currentSlide].classList.toggle('active');
    },
    
     gotoNext:function(){ 
        this.gotoNth(this.currentSlide+1 )
        console.log(this)
    },
     gotoPrev:function(){
        this.gotoNth(this.currentSlide-1)
        
    },
    
    
     pause:function(){
        if(this.isPlaying){
            this.pauseBtn.innerHTML = 'PLAY';
        this.isPlaying = false
        clearInterval(this.timerID);
        }
        
    },
    
     play:function(){
        this.pauseBtn.innerHTML = 'PAUSE';
        this.isPlaying = true
        this.timerID = setInterval(() => this.gotoNext(), this.interval);
        
    },
    
     pausePlay:function() {
         console.log(this)
    if (this.isPlaying){
        this.pause()
    }else{
    this.play()
    }
    },
    
     prev:function(){
        this.pause()
        this.gotoPrev()
    },
    
     next:function(){
    this.pause()
    this.gotoNext()
    },
    
     indicate:function(event){
       let target = event.target;
       if(target.classList.contains('indicator')){
        this.pause()
        this.gotoNth(target.getAttribute('data-slide-to'))
       }
    },
    
     pressKey:function(event){
    if(event.key === this.LEFT_ARROW) this.prev()
    if(event.key === this.RIGHT_AROW) this.next()
    if(event.key === this.SPACE) this.pausePlay()
    },
     
     
    
    
 
     
    init:function(){
        this.timerID = setInterval(() => this.gotoNext(), this.interval);
    },

   

};





 
function SwipeCarousel(){
    Carousel.apply(this, arguments);

}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype.initListener = function(){
    Carousel.prototype.initListener.apply(this);
    this.container.addEventListener('touchstart' , this.swipeStart.bind(this));
    this.container.addEventListener('touchend' , this.swipeEnd.bind(this));
};

SwipeCarousel.prototype.swipeStart = function(event){
   this.swipeStartX = event.changedTouches[0].pageX;
  };

SwipeCarousel.prototype.swipeEnd = function(event){
   this.swipeEndX = event.changedTouches[0].pageX;
   this.swipeStartX-this.swipeEndX < - 100&&this.prev();
   this.swipeStartX-this.swipeEndX >100&&this.next();
   };