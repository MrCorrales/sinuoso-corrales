class AnimItem {
  _x = 0;
  _y = 0;
  _z = 0;
  dom;

  get x() { return this._x; }
  set x(__n) {
    this._x = __n;
    this.draw();
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
  }

  draw() {
    this.dom.style[CSS.transform] = CSS.translate3D(this.x, this.y, this.z);
  }
}