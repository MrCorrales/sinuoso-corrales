class CarruselText {
  _x = 0;
  _y = 0;
  _z = 0;
  _height = 0;
  _actual = 0;
  dom;

  get height() { return this._height; }
  set height(__n) {
    this._height = __n;
    this.dom.style.setProperty('--height', this._height + "px");
  }

  get actual() { return this._actual; }
  set actual(__n) {
    this._actual = __n;
    this.dom.style.setProperty('--actual', this._actual);
  }

  get y() { return this._y; }
  set y(__n) {
    this._y = __n;
    this.draw();
  }

  get z() { return this._z; }
  set z(__n) {
    this._z = __n;
    this.draw();
  }

  constructor(__dom) {
    this.dom = __dom;
    this._actual = -1;
    this.resize();
  }

  draw() {
    this.dom.style[CSS.transform] = CSS.translate3D(this.x, this.y, this.z);
  }

  resize() {
    this.height = C.GetBy.class("__slide", this.dom)[0].offsetHeight;
  }
}