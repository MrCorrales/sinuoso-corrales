class ScrollbarTimer extends Scrollbar {
  isShow = false;
  isCounter = false;
  lblProgress;
  _time = 0;
  _timeScroll = 0;

  domProgress = C.GetBy.class("__progress")[0];

  get time() { return this._time; }
  set time(__n) {
    this._time = Math.round(__n);

    let text = ""

    if(this._time < 10) {
      text = text + "000" + this._time;
    } else if(this._time < 100) {
      text = text + "00" + this._time;
    } else if(this._time < 1000) {
      text = text + "0" + this._time;
    } else {
      text = text + this._time;
    }

    //this.lblProgress.textContent = text;
  }

  constructor() {
    super();
    this.lblProgress = C.GetBy.class("__progress-scroll")[0];
  }

  setCounter(__n, __is) {
    if(__is) this.isCounter = __is

    const DELAY = __is? 0 : .4;
    gsap.to(this, {time:__n, duration:.4, delay:DELAY, onComplete:()=> {
        this.isCounter = __is
      }});
  }

  setup() {}
  setupLetters() {}
  update(__progress) {
    this.progress = __progress;



    gsap.set(this.domProgress, {drawSVG: "100% " + Number((1 - __progress)*100) + "%"});


    this._timeScroll = Math.round(Maths.lerp(Basics.TOTAL_IMAGES, 0, this.progress));
    if(this.isCounter) return;

    this.time = this._timeScroll
  }

  show(__d = 0) {}
  hide(__d = 0) {}
  end() {}
  resize(){}
  dispose() {}
}