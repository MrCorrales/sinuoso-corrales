class Sidemenu extends _Sidemenu{

  static _tl = new gsap.timeline();

  static init() {
    super.init();
    this.setupAnimation();
  }

  static setupAnimation() {
    this._tl.clear();
    this._tl.pause();

    const bg1 = C.GetBy.class("bg-logo", this.container)[0];
    const bg2 = C.GetBy.class("bg-main", this.container)[0];
    const logo = C.GetBy.class("sidemenu__logo", this.container)[0];
    const aux = C.GetBy.class("sidemenu__aux", this.container)[0];

    gsap.set(bg1, {x:-Metrics.WIDTH, skewX:40, transformOrigin:"100% 100%"});
    gsap.set(bg2, {x:-Metrics.WIDTH, skewX:40, transformOrigin:"100% 100%"});
    gsap.set(logo, {x:-Metrics.WIDTH});
    gsap.set(aux, {alpha:0, x:-Metrics.WIDTH*.1, skewX:40, transformOrigin:"100% 100%"});

    this._tl.set(this.container, {alpha:1});

    let time = 0;
    this._tl.to(bg1, {x:0, duration: .4, ease:Power4.easeOut}, time);
    this._tl.to(bg1, {skewX:0, duration: .2, ease:Power4.easeOut}, time+.1)


    const items = C.GetBy.selector(".sidemenu__nav li");
    for(let i=0, j=items.length; i<items.length; i++,j--) {
      gsap.set(items[i], {x:-Metrics.WIDTH});
      this._tl.to(items[i], {x:0, duration:1 + .1 * j, ease:Power4.easeOut}, time);
    }

    time+=.3;

    this._tl.to(bg2, {x:0, duration: .8, ease:Power4.easeOut}, time);
    this._tl.to(bg2, {skewX:0, duration: 1.2, ease:Power4.easeOut}, time+.1);
    this._tl.to(logo, {x:0, duration: 1.3, ease:Power4.easeOut}, time);

    this._tl.to(aux, {alpha:1, x:0, skewX:0, duration: 1, ease:Power4.easeOut}, time+.2);
  }

  static show__effect(__d = 0) {
    this._tl.restart();
    super.afterShow();
  }

  static hide__effect(__d = 0) {
    gsap.to(this.container,{alpha:0, duration: 0.2, ease:Power2.easeIn, onComplete:()=>{
        this.hide__effectEnd();
      }});
  }

  static hide__effectEnd() {
    super.afterHide();
  }

  static loop() {
    if(this.isOpen) {
      super.loop();
    }
  }
  static resize() {
    this.setupAnimation();
    super.resize();
  }
}


