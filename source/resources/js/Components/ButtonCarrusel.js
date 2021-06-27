class ButtonCarrusel {

  sizes = [];
  _actual = 0;
  _texts;
  _container;

  get actual() {
    return this._actual;
  }
  set actual(__n) {
    this._actual = __n;

    this._container.style.setProperty('--value', `${this.actual}`);
    this._container.style.setProperty('--width', `${this.sizes[this.actual]}px`);
  }

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor(__dom) {
    this._container = __dom;
    this._texts = C.GetBy.class("text", this._container);
    this.setupSizes();
  }

  setupSizes() {
    this.sizes = [];

    for(let i=0; i<this._texts.length; i++) {
      this.sizes.push(Math.round(this._texts[i].offsetWidth));
    }

    this._container.style.setProperty('--width', `${this.sizes[this.actual]}px`);
  }

  changeText(index,text) {
    this._texts[index].textContent = text;
    this.setupSizes();
  }

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  resize() {}
}