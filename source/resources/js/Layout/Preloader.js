class Preloader extends _Preloader {
    static enabled = true;
    static _isPossible = false;
    static _isLoaded = false;
    static _logo;
    static _logoLine;
    static _line2;
    static _lblProgress;

    static init() {
      this._logo = new AnimItem(C.GetBy.class("logo", this.container)[0]);
      this._logoLine = new AnimItem(C.GetBy.class("logo_line", this.container)[0]);
      this._line2 = new AnimItem(C.GetBy.id("Scrollbar"));
      this._lblProgress = C.GetBy.class("progress", this._line2.dom)[0];

      this._logo.y = Metrics.HEIGHT+this._line2.dom.offsetHeight*10;
      this._line2.y = this._line2.dom.offsetHeight*10;
    }
    static beforeShow() {}
    static show__effect() {
      if(!Basics.isDebug) {
        //Cursor.loading = true;

        LoaderController.onProgress = (e) => {
          Preloader.progress__effect(e);
        };

        const YPOS1 = Metrics.HEIGHT - this._logo.dom.offsetHeight;

        gsap.set(this._logo.dom,{alpha:1});
        gsap.to(this._logo,{y:YPOS1, duration:1.4, ease:Power4.easeOut,delay:0});

        gsap.set(this._line2.dom,{alpha:1});
        gsap.to(this._line2,{y:0, duration:1.4, ease:Power4.easeOut, delay:1.2,
          onUpdate:() => {
            const Y = this._line2.dom.offsetHeight - this._line2.y;
            if(Y>0) {
              this._logoLine.y = -Y;
            }
          },
          onComplete:()=>{
            this._isPossible = true;
            this.afterShow();
          }});

      } else {
        this.afterShow();
        this.hide__effect();
      }
    }

    static afterShow() {
      super.afterShow();
    }

    static beforeHide() {}
    static hide__effect() {
      if(!Basics.isDebug) {

        this.afterHide();

      } else {
        this.afterHide();
      }
    }

    static afterHide() {
      this.enabled = false;
      this._isPossible = false;
      this._isLoaded = false;
      super.afterHide();
    }

    static progress__effect(__progress) {
      const TIME = Math.round(Maths.lerp(0, 200, __progress));
      let text = "Personal works ";

      if(TIME < 10) {
        text = text + "000" + TIME;
      } else if(TIME < 100) {
        text = text + "00" + TIME;
      } else if(TIME < 1000) {
        text = text + "0" + TIME;
      } else {
        text = text + TIME;
      }

      this._lblProgress.textContent = text;
    }
}

