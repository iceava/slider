class Carousel{

    
    constructor(s){

        let initConfig = (obj) => {
            const settings = {
            containerID: '#carousel',
            interval: 3000, 
            slideID: '.slide'
            };
        
        
        if (obj !== undefined){
            settings.containerID = obj.containerID || '#carousel';
            settings.slideID = obj.interval || 5000;
            settings.slideID = obj.slideID || '.slide';
        }

        return settings
    }
    let settings = initConfig();
    this.container = document.querySelector(settings.containerID);
    this.slides = this.container.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    
    }
    
    _initProp() {
        this.slidesCount  = this.slides.length;
        this.currentSlide = 0;
        this.isPlaying = true;
        this.SPACE = ' ';
        this.LEFT_ARROW = 'ArrowLeft';
        this.RIGHT_AROW = 'ArrowRight';

    }

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


    }

    _indicators(){
        let indicators =document.createElement('ol');
        indicators.setAttribute('class', 'indicators');
        indicators.setAttribute('id','indicators-container');
        
      
        for(let i = 0, n = this.slidesCount; i < n; i++){
            let indicator = document.createElement('li')
            indicator.setAttribute('class','indicator')
            indicator.setAttribute('data-slide-to', `${i}`)
            i===0 && indicator.classList.add('active')
            indicators.appendChild(indicator)
        }
        
        
        this.container.appendChild(indicators);
        this.indicatorsContainer = this.container.querySelector('#indicators-container');
        this.indicators = this.indicatorsContainer.querySelectorAll('.indicator')

    }
    
   

    initListener(){
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.nextBtn.addEventListener('click',this.next.bind(this));
        this.prevBtn.addEventListener('click',this.prev.bind(this));
        this.indicatorsContainer.addEventListener('click',this.indicate.bind(this));
            document.addEventListener('keydown',this.pressKey.bind(this));
    }
  

   
    

   

     gotoNth(n)  {
        this.slides [this.currentSlide].classList.toggle('active');
        this.indicators [this.currentSlide].classList.toggle('active');
        this.currentSlide = (this.slidesCount + n)% this.slidesCount;
        this.slides [this.currentSlide].classList.toggle('active');
        this.indicators [this.currentSlide].classList.toggle('active');
    }
    
     gotoNext(){ 
        this.gotoNth(this.currentSlide+1 )
        console.log(this)
    }
     gotoPrev(){
        this.gotoNth(this.currentSlide-1)
        
    }
    
    
     pause(){
        if(this.isPlaying){
            this.pauseBtn.innerHTML = 'PLAY';
        this.isPlaying = false
        clearInterval(this.timerID);
        }
        
    }

     play(){
        this.pauseBtn.innerHTML = 'PAUSE';
        this.isPlaying = true
        this.timerID = setInterval(() => this.gotoNext(), this.interval);
        
    }

    pressKey(event){
        if(event.key === this.LEFT_ARROW) this.prev()
        if(event.key === this.RIGHT_AROW) this.next()
        if(event.key === this.SPACE) this.pausePlay()
        }

        indicate(event){
            let target = event.target;
            if(target.classList.contains('indicator')){
             this.pause()
             this.gotoNth(target.getAttribute('data-slide-to'))
            }
        }
    
     pausePlay() {
         console.log(this)
    if (this.isPlaying){
        this.pause()
    }else{
    this.play()
    }
    }
    
     prev(){
        this.pause()
        this.gotoPrev()
    }
    
     next(){
    this.pause()
    this.gotoNext()
    }
    
     
    init(){

    this._initProp();
    this._initControls();
    this._indicators();
    this.initListener();


        this.timerID = setInterval(() => this.gotoNext(), this.interval);

    
    }
   

};


class SwipeCarousel extends Carousel{

        initListener(){
        super.initListener();
        this.container.addEventListener('touchstart' , this.swipeStart.bind(this));
        this.container.addEventListener('touchend' , this.swipeEnd.bind(this));
    };
    
       swipeStart(event){
       this.swipeStartX = event.changedTouches[0].pageX;
      };
    
       swipeEnd(event){
       this.swipeEndX = event.changedTouches[0].pageX;
       this.swipeStartX-this.swipeEndX < - 100&&this.prev();
       this.swipeStartX-this.swipeEndX >100&&this.next();
       };
}