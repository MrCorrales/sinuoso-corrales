

var Main = {

  scrollbar:null,
  winInquire:null,
  stats:null,
  isResizing:false,
  stage:new ThreeStage(),
  gui:new dat.GUI(),

  firstItem:null,
  firstItem2:null,

  init: function() {
    Basics.id = "Ibaiak_v0.0.1";
    Basics.mainLang = document.documentElement.lang;
    Basics.isDebug = document.body.classList.contains("__isDebug");
    Basics.hasCookies = false;

    //N IMAGES
    const DOM = C.GetBy.selector("img");
    Basics.TOTAL_IMAGES =  DOM.length;
    Basics.REST_TOTAL_IMAGES =  Basics.TOTAL_IMAGES;
    Basics.IMAGES = [];

    CSS.init();
    Metrics.update(true);
    Functions.doMrCorrales();
    Keyboard.init();
    Accessibility.init();
    C.Ease.init();
    Interaction.init({ajax:false, drag:false});
    Interaction.positions.mouse.x = 0;
    Interaction.positions.mouse.y = 0;
    Statics.init(C.GetBy.id("Interface"));

    this.setupStage();
  },

  setupStage() {
    const TIME = .8;
    this.stage.init(()=> {
      //this.stage.alpha = 0;

      RiverLines.init();

      gsap.to(this.carruselLoader,{actual:1, duration:1, ease:Power4.easeInOut, delay:0, onComplete:()=> {
          if (!Basics.isTouch) {
            this.initLoad();
          } else {
            this.initLoadMobile();
          }
        }});
    });

    //this.initLoad();
  },

  initLoad() {

    const tClass = this;
    const DOM = C.GetBy.selector("img");
    const TOTAL = Math.min(20,  Basics.TOTAL_IMAGES);
    const IMAGES = [];
    const LOADER = new THREE.TextureLoader();
    let total_loaded = 0;
    let fake_loader = 0;

    for(let i = 0; i<TOTAL; i++) {
      IMAGES.push(DOM[i].getAttribute("data-src"));

      LOADER.load(
        // resource URL
        DOM[i].getAttribute("data-src"),
        // onLoad callback
        function ( texture ) {
          total_loaded++;
        },
        undefined,
        // onError callback
        function ( err ) {
          console.error( 'An error happened.' );
        }
      );
    }

   /* const checkLoader = () => {
      let progress = total_loaded/TOTAL;
      let progressToShow = Maths.lerp( 0, Basics.TOTAL_IMAGES, progress);

      if(fake_loader < progressToShow) {
        fake_loader = Math.min(Basics.TOTAL_IMAGES, fake_loader + 3);
        if(fake_loader === Basics.TOTAL_IMAGES) {
          gsap.ticker.remove(checkLoader);
          tClass.setupHistory();
          tClass.setupScroll();
        }
      }
    }

    gsap.ticker.add(checkLoader);*/

    tClass.setupHistory();
    tClass.setupScroll();
  },

  initLoadMobile() {
    const DOM = C.GetBy.selector("img");

    for(let i = 0; i<DOM.length; i++) {
      DOM[i].setAttribute("loading", "lazy");
      DOM[i].setAttribute("src", DOM[i].getAttribute("data-src"));
    }

    this.setupScroll();
  },

  setupHistory() {
    window.onpopstate = () => {
      if(this.stage._visor.isShow) {
        if(this.stage._visor.style === STYLE_GALLERY) {
          this.stage.closeVisor();
        } else {
          this.stage.openVisor();
        }
      }
    };
  },

  setupScroll() {
    if (!Basics.isTouch) {
      this.resize();
    } else {
    }

    setTimeout(()=> {
      this.hideLoader();
    },300);
  },

  hideLoader() {
    const TIMELINE = new gsap.timeline();
    TIMELINE.pause();

    C.Remove(C.GetBy.id("Preloader"));
    Scroll.loop(true);
    this.enableStage();
    this.start();


  },

  start() {

    // InfoViewer.changeInfo();

    if(!Basics.isTouch) {
     // Scroll.start();
     // Scroll.show();
      this.stage.isMouseEnabled = true;

      if(Basics.isDebug) {
        gsap.ticker.add(() => {Main.loopDebug();});
      } else {
        gsap.ticker.add(() => {Main.loop();});
      }
    }
  },

  selectRiver(__id, __name) {

  },

  enableStage() {
    Scroll.isScrolling = false;

    if(window.location.href.indexOf("photography") > -1) {
      const S1 = window.location.href.slice(window.location.href.indexOf("photography"), window.location.href.lenght);
      const S2 = S1.slice(12, S1.length);
      let indexTo = 0;

      if(S2.indexOf(".html") > -1) {
        indexTo = Number(S2.slice(0,S2.length-5));
      } else {
        indexTo = Number(S2);
      }

      history.replaceState({}, "Xandra Álvarez Allende", "/");
      this.stage.openExtern(200 - indexTo);
    }
  },

  getTypePage: function() {
    switch (C.GetBy.id("Page").getAttribute("data-page")) {
      default:
        return new Default();
    }
  },

  resize: function() {
    this.isResizing = true;

   // Interface.resize();
   // Cursor.resize();
    this.stage.resize();
    RiverLines.resize();

    this.isResizing = false;
  },

  loop: function(__time, __delta, __frame) {
    if(this.isResizing) return;
    if(Scroll.isScrolling) Scroll.loop();
    this.stage.loop();
  },

  loopDebug: function(__time, __delta, __frame) {
    Statics.begin();
    this.loop();
    Statics.end();
  }
};

function putZeros(__n) {
  let text = ""
  __n = Math.floor(__n)

  if (__n < 10) {
    text = text + "000" + __n;
  } else if (__n < 100) {
    text = text + "00" + __n;
  } else if (__n < 1000) {
    text = text + "0" + __n;
  } else {
    text = text + __n;
  }

  return text;
}

//READY?
if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
  Main.init();
} else {
  document.addEventListener('DOMContentLoaded', Main.init);
}
