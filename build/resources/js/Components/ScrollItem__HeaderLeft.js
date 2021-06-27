class ScrollItem__HeaderLeft__Slider {
  item;
  img;
  isShow = false;

  set progress(__progress) {
   // __progress = Math.max(0, Math.min(1, __progress));

    /*const POS1 = Maths.lerp(-Metrics.HEIGHT, 0, __progress);
    const POS2 = Maths.lerp(Metrics.HEIGHT, 0, __progress);
    const ALPHA = Math.min(1,Maths.lerp(0, 2, __progress));*/

    if(__progress > .5) {
      this.show();
    } else {
      this.hide();
    }

   // gsap.set(this.item,{alpha:ALPHA, force3D:true});
    //gsap.set(this.col2,{y:POS2, alpha:ALPHA, force3D:true});
  }

  constructor(__item) {
    this.item = __item;
    this.img = C.GetBy.selector("img", this.item);

    this.hide(true);
    this.resize();
    this.progress = 0;
  }

  show() {
    if(this.isShow) return;

    this.isShow = true;

    gsap.set(this.item, {alpha: 1});
    gsap.to(this.img, {alpha: 1, z:0, duration:.6, ease: Expo.easeOut, force3D: true});
  }

  hide(__force = false) {
    if(!this.isShow && !__force) return;

    this.isShow = false;

    gsap.set(this.item, {alpha: 0});
    gsap.set(this.img, {alpha: 0, z: 100, force3D: true});
  }

  resize() {
    const WIDTH = this.item.offsetWidth;
    const HEIGHT = this.item.offsetHeight;

    const X = Maths.lerp(Metrics.WIDTH * 1.1 - WIDTH, -Metrics.WIDTH * .1, Math.random());
    const Y = Maths.lerp(Metrics.HEIGHT * 1.0 - HEIGHT,- Metrics.HEIGHT * .0, Math.random());
    const ROT = Maths.lerp(10,-10,Math.random())

    gsap.set(this.item, {x:X, y:Y, rotation:ROT, force3D: true});

    //this.item.style[CSS.transform] = CSS.translate3D(X, Y, 1);
  }
}

class ScrollItem__HeaderLeft extends VScroll_Item {

  _slides = [];

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

    const FIGURE = C.GetBy.class("__fistImage", this._item)[0];
    const PARTIAL_LIMIT = 1/3;

    this.onVisible = () => {};
    this.onShow = () => {};
    this.onHide = () => {};
    this.onMove = () => {
      const PROGRESS = this.progressZero;
      const PARTIAL_PROGRESS = Maths.normalize(PARTIAL_LIMIT * 2, PARTIAL_LIMIT, PROGRESS)
      const ALPHA = Math.max(0, Math.min(1, PARTIAL_PROGRESS))*4;
      const Z = Maths.lerp(400, 300, PARTIAL_PROGRESS);

      FIGURE.style.setProperty('--alphaBox', `${ALPHA*10}`);
      FIGURE.style.setProperty('--alpha', `${ALPHA}`);
      FIGURE.style.setProperty('--z', `${Z}px`);

      /*for(let i = 0; i<TOTAL_SLIDES; i++) {
        const PARTIAL_PROGRESS = Maths.normalize(PARTIAL_LIMIT * (i+1), PARTIAL_LIMIT * i, PROGRESS);
        this._slides[i].progress = Maths.lerp(0,1,PARTIAL_PROGRESS);
      }*/
    }

    /*const ITEM = C.GetBy.class("__imageHome")[0];
    const ITEM2 = C.GetBy.class("__imageHome2")[0];
    let observer = new IntersectionObserver((entries, observer)=>{

        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            console.log("IN");
            entry.target.classList.add('in-viewport');
          } else {
            console.log("OUT");
            entry.target.classList.remove('in-viewport');
          }
        });

    }, {
      threshold: 0}
      );
    setTimeout(()=>{observer.observe(ITEM)},1000);
    setTimeout(()=>{observer.observe(ITEM2)},1000);*/
  }

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  dispose() {
    super.dispose();
  }
}

Scroll._addClass("header-left", ScrollItem__HeaderLeft);