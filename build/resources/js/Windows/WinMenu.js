class WinMenu extends Win {

  _domFilter;
  _domRivers;
  _waiting;
  _buttonMenu;
  _holder;

  constructor(__container) {
    super(__container, "win-menu");
    this.directHide();

    this._domFilter = C.GetBy.class("win-menu__filtros", this.container)[0];
    this._domRivers = C.GetBy.class("win-menu__rivers", this.container)[0];
    this._holder = {
      "Bizkaia": C.GetBy.class("__biz", this.container)[0],
      "Araba": C.GetBy.class("__ara", this.container)[0],
      "Guipuzkoa": C.GetBy.class("__gui", this.container)[0]
    }
  }

  setup() {
    this.setupRivers();
  }

  setupRivers() {
    DataHolder.getAllRivers().then((all)=> {
      all.map((river) => {
        const li = document.createElement("li");
        const button = document.createElement("button");

        button.setAttribute("data-value", river.id);
        button.setAttribute("data-name", river.name);
        button.textContent = river.name;

        button.addEventListener(Basics.clickEvent, (e)=> {
          e.preventDefault();
          Main.selectRiver(e.target.getAttribute("data-value"), e.target.getAttribute("data-name"))
        })

        li.appendChild(button);
        this._holder[river.province].appendChild(li);
      });
    });
  }

  success(__text, __btn) {
    this.text(__text, "__success", __btn);
  }

  error(__text, __btn) {
    this.text(__text, "__error", __btn);
  }

  text(__text, __type, __btn) {

    if(this.isOpen) {
      this._waiting = {
        text: __text,
        btn: __btn,
        type: __type,
      }
    } else {
      this.p.textContent = __text;
      if(__btn) {
        this.btn.textContent = __textBTN;
      }
      if(__type) {
        this.container.classList.add(__type);
      }

      this.show();
    }
  }

  show__effect(__d = 0) {
    ButtonMenu.close();

    gsap.to(this.container,{alpha:1,duration:.4, ease:Power3.easeOut, onComplete:()=>{this.afterShow()}});
    gsap.to(this._domFilter,{alpha:1,duration:.4, delay:.1, ease:Power3.easeOut});
    gsap.to(this._domRivers,{alpha:1,duration:.4, delay:.1, ease:Power3.easeOut});
  }

  afterShow() {
    super.afterShow();
  }

  hide__effect(__d = 0) {
    ButtonMenu.open();

    gsap.to(this._domRivers,{alpha:0, duration:.2, ease:Power3.easeIn});
    gsap.to(this._domFilter,{alpha:0, duration:.2, ease:Power3.easeIn});
    gsap.to(this.container,{alpha:0, duration:.3, delay:.1, ease:Power3.easeIn, onComplete:()=>{this.afterHide();}});
  }

  afterHide() {
    this.container.classList.remove("__success");
    this.container.classList.remove("__error");

    super.afterHide();

    if(this._waiting) {
      this.text(this._waiting.text, this._waiting.type, this._waiting.btn);
      this._waiting = null;
    }
  }

  directHide() {
    gsap.set(this.container,{alpha:0});
    gsap.set(this._domFilter,{alpha:0});
    gsap.set(this._domRivers,{alpha:0});
    super.directHide();
  }

  resize() {
    super.resize();
  }
}

const WindowMenu = new WinMenu(C.GetBy.id("Menu"));

