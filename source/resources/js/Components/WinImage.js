class WinImage {
  static container = C.GetBy.class("win-image")[0];
  static figure = C.GetBy.selector("figure", this.container)[0];
  static caption = C.GetBy.selector("figcaption", this.container)[0];

  static get text() { return this.caption.textContent; }
  static set text(__text) {
    this.caption.textContent = __text;
  }

  static show(__w,__h,__isdDirect) {
    this.container.classList.add("__show");
    this.resize(__w,__h);
    gsap.killTweensOf(this.container);

    if(__isdDirect) {
      gsap.set(this.container, {alpha: 1})
    } else {
      gsap.to(this.container, {alpha: 1, duration: .2, delay: .7})
    }
  }

  static hide() {
    gsap.killTweensOf(this.container);
    gsap.to(this.container,{alpha:0, duration:.1, onComplete:()=> {
      this.container.classList.remove("__show");
      }})
  }

  static resize(__w,__h) {
    this.figure.style.setProperty('--width', __w + "px");
    this.figure.style.setProperty('--height', __h + "px");
  }
}