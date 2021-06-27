class ScrollItem__Footer extends VScroll_Item {
  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

    const ITEM_MOVE = C.GetBy.class("block-info")[0];

    this.onVisible = () => {};
    this.onMove = (__position, __size) => {
      const POSY = Math.max(0, Metrics.HEIGHT - this._item.getBoundingClientRect().top);
      ITEM_MOVE.style[CSS.transform] = CSS.translate3D(0, -POSY, 0);
    };
  }
}

Scroll._addClass("footer", ScrollItem__Footer);