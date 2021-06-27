class Visor {
  centerX = 0;
  centerY = 0;
  style;
  _containerDOM = C.GetBy.id("Page")

  x = 0;
  y = 0;
  z = 100;
  xRotate = 0;
  yRotate = 0;
  isShow = false;
  isShowEnd = false;
  isDirect = false;
  image = null;
  actualUID = null;
  _stage;

//==================================================================================================================
//          CONSTRUCTOR
//==================================================================================================================

  constructor(__stage) {
    this._stage = __stage;
  }

//==================================================================================================================
//          PUBLIC
//==================================================================================================================

  show(__uid) {
    if(this.isShow && this.actualUID === __uid) {
      return;
    } else if (this.isShow) {
      this.hide();
    }

    this._containerDOM.classList.add("__cursor-pointer");
    this.style = STYLE_VISOR;
    this.isShow = true;
    this.actualUID = __uid;
    this.image = this.getImage(__uid);

    this.centerX =
        this.x = this.image.attributes.x;

    this.centerY =
        this.y = this.image.attributes.y;

    this.image.style = STYLE_VISOR;
    //this._stage.cameraDistance = 500;

    this.isShowEnd = false;
    gsap.killTweensOf(this.image.attributes__mod);
    gsap.to(this.image.attributes__mod,{
      z: 40,
      scale:.8 - this.image.attributes.scale,
      rotation:0 - this.image.attributes.rotation,
      ease:Power3.easeOut,
      duration:.4,
      onComplete:()=>{
        this.isShowEnd = true;
      }
    });
  }

  hide() {
    if (this.isShow) {
      this._containerDOM.classList.remove("__cursor-pointer");
      const IMG_HIDE = this.image;
      this.image = null;
      this.actualUID = null;
      this.isShow = false;

      IMG_HIDE.style = STYLE_SCROLL;
      //this._stage.cameraDistance = 400;

      gsap.killTweensOf(IMG_HIDE.attributes__mod);
      gsap.to(IMG_HIDE.attributes__mod,{
        x:0,
        y:0,
        z:0,
        scaleItem: 1,
        scale:0,
        rotation:0,
        ease:Power3.easeOut,
        duration:1,
        onUpdate:()=>{
        if(!Scroll.isScrolling) {
          IMG_HIDE.draw();
        }
        }});
    }
  }

  addHistory() {
    history.pushState({}, "Xandra Álvarez Allende", "/photography/" + this.image.indexImage + ".html");
  }

  replaceHistory() {
    history.replaceState({}, "Xandra Álvarez Allende", "/photography/" + this.image.indexImage + ".html");
  }

  openExtern() {
    this._containerDOM.classList.add("__cursor-pointer");
    this.style = STYLE_VISOR;
    this.isShow = true;
    this.actualUID = this.image.mesh.uuid;
    this.isShowEnd = true;
    this.isDirect = true;
  }

  open() {
    Scroll.stop();
    Main.scrollbar.setCounter(this.image.indexImage, true);

    this.addHistory();
    this.style = STYLE_GALLERY;
    this.isShowEnd = false;

    this.image.toGallerySize(this.isDirect);
    this.isDirect = false;
  }

  close() {
    Scroll.start();
    Main.scrollbar.setCounter(Main.scrollbar._timeScroll, false);

    this.image.toScrollSize(()=> {
      this.image = null;
      this.actualUID = null;
      this.isShow = false;
      this.style = STYLE_VISOR;
    });

    this._containerDOM.classList.remove("__cursor-pointer");
    //}
  }

  prev() {
    const NEXT = this.getPrevImage(this.image.indexReal);

    if(NEXT.mesh) {
      this.image.toScrollSize(null,true);
      this.actualUID = NEXT.mesh.uuid;
      NEXT.toGallerySize(true);
      this.image = NEXT
      this.image.toGallerySize(true);
      this.replaceHistory();
    } else {
      history.back();
    }
  }

  next() {
    const NEXT = this.getNextImage(this.image.indexReal);

    if(NEXT.mesh) {
      this.image.toScrollSize(null,true);
      this.actualUID = NEXT.mesh.uuid;
      NEXT.toGallerySize(true);
      this.image = NEXT
      this.image.toGallerySize(true);
      this.replaceHistory();
    } else {
      history.back();
    }
  }

  getImage(__uid) {
    for(let i=0; i<Scroll.engine.total_items; i++) {
      if(Scroll.engine._items[i].mesh) {
        if (__uid === Scroll.engine._items[i].mesh.uuid) {
          return Scroll.engine._items[i];
        }
      }
    }
  }

  getPrevImage(__index) {
    __index = __index === 0? Basics.IMAGES.length - 1 : __index-1;
    return Basics.IMAGES[__index];
  }

  getNextImage(__index) {
    __index = __index + 1 === Basics.IMAGES.length? 0 : __index+1;
    return Basics.IMAGES[__index];
  }

  hideImage(__n) {
    this.actual = null;
  }

  loop() {
    if(this.isShow) {

      if(this.image.style === STYLE_VISOR) {
        /*const deltaX = Math.floor((this.centerX - this.xTemp)) * .7 * -1;
        const deltaY = Math.floor((this.centerY - this.yTemp)) * .7 * -1;

        this.x+=deltaX;
        this.y+=deltaY;*/
        this.centerY = this.image.attributes.y;
        this.image.attributes__mod.x = this.x - this.image.attributes.x;
        this.image.attributes__mod.y = this.y - this.image.attributes.y;
        if (this.isShowEnd) {
          this.image.attributes__mod.rotation += Maths.difference(this.image.attributes__mod.rotation, this.xRotate - this.image.attributes.rotation, .2, true);
        }
      }

      this.image.draw();
    }
  }

  resize() {}
}