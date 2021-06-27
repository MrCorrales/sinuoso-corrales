class Default {
  id;
  _color;
  _tl;
  _title;_l1;_line2;_line3;_line4;_p;


//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor() {
    this._title = new AnimItem(C.GetBy.class("header__title", this.container)[0]);
    this._l1 = new AnimItem(C.GetBy.class("__line", this.container)[0]);
    this._l2 = new AnimItem(C.GetBy.class("__line", this.container)[1]);
    this._l3 = new AnimItem(C.GetBy.class("__line", this.container)[2]);
    this._l4 = new AnimItem(C.GetBy.class("__line", this.container)[3]);
    this._p = C.GetBy.class("__p", this.container)[0];

    this._title.y = this._title.dom.offsetHeight*9;
    this._l1.y =
      this._l2.y =
        this._l3.y =
          this._l4.y =  this._l1.dom.offsetHeight*9;
  }

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  //SHOW
  beforeShow() {
    this._tl = new gsap.timeline();
    this._tl.to(this._title,{y:0, duration:1.4, ease:Power4.easeOut});
    this._tl.to(this._l1,{y:0, duration:1.4, ease:Power4.easeOut},.2);
    this._tl.to(this._l2,{y:0, duration:1.4, ease:Power4.easeOut},.3);
    this._tl.to(this._l3,{y:0, duration:1.4, ease:Power4.easeOut},.4);
    this._tl.to(this._l4,{y:0, duration:1.4, ease:Power4.easeOut},.5);
    this._tl.from(this._p,{y:this._p.offsetHeight*.1, duration:1, ease:Power4.easeOut},.8);
    this._tl.from(this._p,{alpha:0, duration:.4, ease:Quad.easeOut},.8);

    /* SCROLL */
    Scroll.init(Scroll.AXIS_Y, {smooth:!Basics.isMobile, multiplicator:1});
    Scroll.addAll();
    Scroll.setScrollbar(Main.scrollbar);
    Scroll.resize();
    Scroll.start();
  }

  show__effect(__call) {
    Wrap.directShow();
    this._tl.play();
    //Scroll.show();
  }

  afterShow() {
    super.afterShow();
  }

  //HIDE
  beforeHide() {}

  hide__effect() {
    Sidemenu.hide();
    Wrap.hide(() => {this.afterHide();});
  }

  afterHide() {
    Scroll.hide();
    Scroll.dispose();
    super.afterHide();
  }

  //RESIZE
  resize() {
    super.resize();
  }

  //LOOP
  loop() {
    if(this._isActive) {
      super.loop();
    }
  }
}