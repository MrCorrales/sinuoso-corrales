const STYLE_SCROLL = "scroll";
const STYLE_GALLERY = "gallery";
const STYLE_VISOR = "visor";

class ScrollItem__Image3D extends VScroll_Item {
  style = STYLE_SCROLL;
  POWER = 0.08;

  indexImage;
  indexReal;

  mesh;

  width;
  height;
  left;
  fixed = false;

  _offsetX;
  _moveX;

  attributes__mod = {x:0, y:0, z:0, rotation:0, scale:0, speed:0, scaleItem:1, positionMod:1, alpha:1};
  attributes = {x:0, y:0, z:0, rotation:0, scale:0, speed:0, scaleItem:1};

  enabledDraw = true;

  _image;
  _img;
  _imageSize;
  _modScale = 0;
  _scaleShow;
  _text;

  constructor(__link, __index, __scroller) {
    super(__link, __index, __scroller);

    this.indexImage =  Basics.REST_TOTAL_IMAGES;
    this.indexReal =  Basics.IMAGES.length;
    Basics.IMAGES.push(this);
    Basics.REST_TOTAL_IMAGES--;

    this.opts.offset = Metrics.HEIGHT;

    this.onVisible = () => {};
    this.onShow = () => {
      this.mesh.visible = true;
    };
    this.onHide = () => {
      this.mesh.visible = false;
    };

    this._image = C.GetBy.selector("figure", this.item)[0];
    this._img = C.GetBy.selector("img", this.item)[0];
    this._text = "Xandra Alvarez Allende © 2019";//this._img.getAttribute("alt").split("XXX").join("\nXandra Alvarez Allende © 2019");
    this._offsetX = __index === 0 || __index === 199? 0 : Maths.maxminRandom(20,-20)/100;

    this.getSize(true);
    this.mesh = Main.stage.createMesh({
      width: this._imageSize.width,
      height: this._imageSize.height,
      src: this._img.getAttribute("data-src"),
      image: this._img,
      iWidth: Number(this._img.getAttribute("width")),
      iHeight: Number(this._img.getAttribute("height")),
    });
    Main.stage.scene.add(this.mesh);

    this.mesh.position.x =  this.attributes.x;
    this.mesh.position.y =  this.attributes.y;
    this.mesh.position.z =  this.attributes.z;
    this.mesh.rotation.z =  this.attributes.rotation;

    if(this.index === 0) {
      Main.firstItem = this;
      this.attributes__mod.y = - (Metrics.HEIGHT - this.item.offsetTop*.9);
      this.attributes__mod.scale = -1;
    } else if(this.index === 1) {
      /*Main.firstItem2 = this;
      this.attributes__mod.y = - (Metrics.HEIGHT - this.item.offsetTop*.9) * 10;
      this.attributes__mod.scale = -1;*/
    }
  }

  draw() {
    super.draw();

    this.attributes.x = this.x - (Metrics.WIDTH * .5 + /*Metrics.WIDTH * this._offsetX*/ + this._moveX * this.progress) + this._imageSize.left + this._imageSize.width / 2;
    this.attributes.y = -this.y + Metrics.HEIGHT * .5 + Metrics.HEIGHT * this._offsetX - this._imageSize.top - this._imageSize.height / 2;

    //this.attributes.x += this.attributes.x * (this._moveX * this.progress);

    this.mesh.position.x = this.attributes.x * this.attributes__mod.positionMod + this.attributes__mod.x;
    this.mesh.position.y = this.attributes.y * this.attributes__mod.positionMod + this.attributes__mod.y;
    this.mesh.position.z = this.style !== STYLE_GALLERY?
      this.attributes.z + this.attributes__mod.z + this._modScale :
      this.attributes.z + this.attributes__mod.z;

    this.mesh.scale.x = this._imageSize.width * this.attributes__mod.scaleItem;
    this.mesh.scale.y = this._imageSize.height * this.attributes__mod.scaleItem;

    this.attributes.scale = Math.min(1, this.progress + this.attributes__mod.scale);
    this.attributes.speed = Scroll.speed * -.04;
    this.mesh.rotation.z = this.attributes.rotation + this.attributes__mod.rotation;

    this.mesh.material.uniforms.progress.value = Maths.lerp(0.5, 1, this.attributes.scale);
    this.mesh.material.uniforms.uVelo.value = this.attributes.speed;
    this.mesh.material.uniforms.alpha.value = this.style === STYLE_GALLERY? this.attributes__mod.alpha : Main.stage.alpha;
  }
  
  toGallerySize(__isdDirect) {
    WinImage.text = this._text;
    WinImage.show(this._imageSize.width * this._scaleShow, this._imageSize.height * this._scaleShow, __isdDirect);

    this.style = STYLE_GALLERY;
    this.attributes__mod.alpha = 1;
    gsap.killTweensOf(this.attributes__mod);

    if(__isdDirect) {
      this.attributes__mod.positionMod = 0;
      this.attributes__mod.x = 0;
      this.attributes__mod.y = 0;
      this.attributes__mod.z = 100 - this.attributes.z;
      this.attributes__mod.scaleItem = this._scaleShow;
      this.attributes__mod.scale = 1;
      this.attributes__mod.rotation = 0 - this.attributes.rotation;
      this.mesh.visible = true;

      Scroll.directGoto(this.top);

      this.draw();

      Main.scrollbar.time = this.indexImage;
    } else {
      gsap.to(this.attributes__mod, {
        positionMod: 0,
        x: 0,
        y: 0,
        z: 100 - this.attributes.z,
        scale: 1,
        scaleItem: this._scaleShow,
        rotation: 0 - this.attributes.rotation,
        ease: Power4.easeOut,
        duration: .8
      });
    }
  }

  toScrollSize(__call, __isdDirect) {
    gsap.killTweensOf(this.attributes__mod);
    if(__isdDirect) {
      this.attributes__mod.positionMod = 1;
      this.attributes__mod.x = 0;
      this.attributes__mod.y = 0;
      this.attributes__mod.z = 0;
      this.attributes__mod.alpha = 0;
      this.attributes__mod.scaleItem = 1;
      this.attributes__mod.scale = 0;
      this.attributes__mod.rotation = 0;
      this.mesh.visible = this.isVisible;
      this.style = STYLE_SCROLL;
      this.draw();
    } else {
      WinImage.hide();
      gsap.to(this.attributes__mod, {
        positionMod: 1,
        x: 0,
        y: 0,
        z: 0,
        alpha: 1,
        scaleItem: 1,
        scale: 0,
        rotation: 0,
        ease: Power4.easeInOut,
        duration: 1,
        onComplete: () => {
          this.style = STYLE_SCROLL;
          __call();
        }
      });
    }
  }

  getSize(__first) {
    const bounds = this._image.getBoundingClientRect();

    this._imageSize = {
      top: bounds.top - Scroll.y,
      left: bounds.left,
      width: bounds.width,
      height: bounds.height
    };

    this._scaleShow = Math.min((Metrics.WIDTH*.8)/this._imageSize.width, (Metrics.HEIGHT*.8)/this._imageSize.height)

    if(__first) {
      const MOD_SCALE = 0;//this._imageSize.height > this._imageSize.width? -50 : 0;

      this.attributes.z = this.index === 0? 0 : this.index === 199? -200 : Maths.maxminRandom(100,-200);
      this._modScale = this.index === 0? 0 : MOD_SCALE;

      this.attributes.rotation = this.index === 0? 0 : Maths.maxminRandom(45,-45)/1000;
      this._moveX = Metrics.WIDTH * (this.attributes.rotation * 1);
    }
  }

  resize(w,h) {
    this.opts.offset = Metrics.HEIGHT;
    super.resize(w,h);
    this.getSize();

    this.mesh.scale.set(this._imageSize.width, this._imageSize.height, 200);

    if(this.style === STYLE_GALLERY) {
      this.attributes__mod.scaleItem = this._scaleShow;
      WinImage.resize(this._imageSize.width * this._scaleShow, this._imageSize.height * this._scaleShow);
    }
  }



  dispose() {
    super.dispose();
  }
}

Scroll._addClass("image3D", ScrollItem__Image3D);