class Header extends _Header{

  static ON_SHOW = "HEADERSHOW";
  static ON_HIDE = "HEADERHIDE";
  static isBlocked = true;
  static showOnBack = false;
  static _buttonEye;
  static _back;
  static isDetailMode = false;

  static init() {
    super.init();

    this._buttonEye = new ButtonEye(C.GetBy.class("button-eye")[0]);
    this._back = C.GetBy.class("__back", this.container)[0];

    gsap.set(this._back, {alpha: 0, duration:1});
  }

  static show_block() {
    this.isBlocked = false;
    if(this.isShow) {
      this.show__effect();
    }
  }

  static hide_block() {
    this.isBlocked = true;
    this.hide__effect();
  }

  static show__effect(__delay = 0) {
    EventDispatcher.dispatchEvent(Header.ON_SHOW);
  }

  static hide__effect() {
    EventDispatcher.dispatchEvent(Header.ON_HIDE);
  }

  static showDetail(__delay = 0) {
    this.isDetailMode = true;

    TweenLite.killTweensOf(this._back);
    TweenLite.killTweensOf(this._buttonEye);

    this._buttonEye.hide();
    this._back.classList.add("__show");
    gsap.to(this._back, {alpha: 1, duration:1, ease: Power3.easeOut, delay:__delay});
  }

  static showPhotoDetail(__delay = 0) {
    this.isDetailMode = true;

    TweenLite.killTweensOf(this._back);

    this._back.classList.add("__show");
    gsap.to(this._back, {alpha: 1, duration:1, ease: Power3.easeOut, delay:__delay});
  }

  static hideDetail(__delay = 0) {
    this.isDetailMode = false;

    TweenLite.killTweensOf(this._back);
    TweenLite.killTweensOf(this._buttonEye);

    this._buttonEye.show();
    this._back.classList.remove("__show");
    gsap.to(this._back, {alpha: 0, duration:.3, ease: Power3.easeIn, delay:__delay});
  }

  static directHide() {
    this.isShow = false;
    TweenLite.set(this.container,{y:-70, force3D:true});
  }

  static loop() {
    this._buttonEye.loop();
  }

  static resize() {
    this._buttonEye.resize();
    super.resize();
  }
}

