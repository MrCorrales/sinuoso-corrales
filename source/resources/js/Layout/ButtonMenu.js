class ButtonMenu {
  static btn;

  static close() {
    this.btn.actual = 1;
    this.btn._container.classList.add("--close");
  }
  static open() {
    this.btn.actual = 0;
    this.btn._container.classList.remove("--close");
  }

  static init() {
    this.btn = new ButtonCarrusel(C.GetBy.class("__btnFluid")[0]);
  }

  static changeMain(__text) {
    this.btn.changeText(0, __text);
  };
}


