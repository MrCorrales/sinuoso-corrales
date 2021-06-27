var Acordions = {

  _acordions: [],

  init() {
    const ACORDIONS = C.GetBy.selector("[data-acordion]");
    for(let i=0; i<ACORDIONS.length; i++) {
      this._acordions.push(new Acordion(ACORDIONS[i]));
    }
  },

  dispose() {
    this._acordions = [];
  },

  toggle: function(__btn) {
    const ACORDION  = __btn.parentNode;
    ACORDION.setAttribute("aria-expanded", ACORDION.getAttribute("aria-expanded") === "false");
  },

  resize() {
    for(let i=0; i<this._acordions.length; i++) {
      this._acordions[i].resize();
    }
  }
};



class Acordion {
  container;
  group;

  constructor(__container, __id) {
    this.container = __container;
    this.group = C.GetBy.selector("[data-acordion-group]", __container)[0];
    this.container.setAttribute("aria-expanded", "false");
  }

  toogleState() {
    this.container.setAttribute("aria-expanded", this.container.getAttribute("aria-expanded") === "false");
  }

  resize() {
    this.container.style.setProperty("--height-open", this.group.offsetHeight + "px");
  }
}