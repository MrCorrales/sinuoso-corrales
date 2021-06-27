class Wrap extends _Wrap {
  static show(__call) {
    gsap.to(this.mainholder, {
      alpha: 1,
      duration:.4,
      ease:Power3.easeOut,
      onComplete:() => {
        if(__call) __call();
      }
    });
  }

  static hide(__call) {
    gsap.to(this.mainholder, {
      alpha: 0,
      duration:.3,
      ease:Power3.easeIn,
      onComplete:() => {
        if(__call) {
          setTimeout(()=>{ __call();},100);
        }
      }
    });
  }
}


