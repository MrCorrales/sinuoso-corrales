class InfoViewer {

  static _data;

  static _actual = 0;
  static _total = 0;
  static _nZero = 0;

  static _location = "";
  static _charsScramble = "-_/\\"
  static dataTemp = {
    "Longitud": "44,90 km",
    "Superficie de cuenca": "279 km²",
    "Caudal medio": "9,99 m³/s",
    "Longitud total": "44,90 km",
    "Cuenca": "279 km²",
    "Regiones": "279 km²",
    "Caudal": "9,99 m³/s"
  }
  static _recSize = 980;
  static container = C.GetBy.id("MainInfo")
  static _ul = C.GetBy.class("__ul", InfoViewer.container)[0];
  static _svg = C.GetBy.class("__svg", InfoViewer.container)[0];
  static _pathDeco = C.GetBy.class("__path0", InfoViewer.container)[0];
  static _path = C.GetBy.class("__path", InfoViewer.container)[0];
  static _pathHover = C.GetBy.class("__pathHover", InfoViewer.container)[0];
  static _frameDeco = C.GetBy.class("__frame0", InfoViewer.container)[0];
  static _frame = C.GetBy.class("__frame1", InfoViewer.container)[0];
  static _domLocation = C.GetBy.class("__location", InfoViewer.container)[0];
  static _domCounter;


  static get location() { return this._location; }
  static set location(__s) {
    if(this._location !== __s) {
      this._location = __s;

      gsap.to(this._domLocation, {duration:__s.length/10, scrambleText:{text:"−_", rightToLeft:true}});
      gsap.to(this._domLocation, {duration:__s.length/10, delay:.1, scrambleText:{text:__s, chars:this._charsScramble}});
    }
  }

  static get actual() { return this._actual; }
  static set actual(__n) {
    this._actual = __n;
    this._domCounter.textContent = this.getTextCounter();
  }

  static getTextCounter() {
    return String(this._actual).padStart(this._nZero, "0") + "/" + this._total;
  }

  static changeInfo(__id) {
    this.hide();

    DataHolder.getRiver(38458).then((data)=> {
      this._data = data;
      this._actual = 0;
      this._total = DataHolder.images.length;
      this._nZero = String(DataHolder.images.length).length;

      requestAnimationFrame(()=> {
        this.drawMap(this._data.points, this._data.width, this._data.height);
        this.showData(.2);
      });
    });
  }

  static hide() {
    C.Empty(this._ul);

    gsap.killTweensOf(this._frameDeco);
    gsap.killTweensOf(this._frame);
    gsap.killTweensOf(this._pathDeco);
    gsap.killTweensOf(this._pathHover);
    gsap.killTweensOf(this._path);

    gsap.set(this._frameDeco, {drawSVG: "0% 0%"});
    gsap.set(this._frame, {drawSVG: "0% 0%"});
    gsap.set(this._pathDeco, {drawSVG: "0% 0%"});
    gsap.set(this._path, {drawSVG: "0% 0%"});
    gsap.set(this._pathHover, {drawSVG: "0% 0%"});

    this._location = "";
    this._domLocation.textContent = "";
  }

  static showData(delay = 0) {

    const createLi = (text, d) => {
      const li = document.createElement("li");
      const duration = text.length/10;
      this._ul.appendChild(li);

      gsap.to(li, {duration:duration, delay:d, scrambleText:{text:text, chars:this._charsScramble}});

      return li;
    }

    let i=0;
    for(let a in this.dataTemp) {
      createLi(`${a}: ${this.dataTemp[a]}`, delay + .2*i);
      i++;
    }

    this._domCounter = createLi(this.getTextCounter(), .2*i);

    gsap.to(this._frameDeco, {duration:2, delay: delay + .2, drawSVG: "0% 100%", ease:Power3.easeOut, onStart: ()=> {this.location = "EL REGATO, BARAKALDO";}});
    gsap.to(this._frame, {duration:1.8, delay: delay + .4, drawSVG: "0% 100%", ease:Power3.easeOut});
    gsap.to(this._pathDeco, {duration:2, delay: delay + .3, drawSVG: "0% 100%", ease:Power3.easeOut});
    gsap.to(this._path, {duration:1.8, delay: delay + .5, drawSVG: "0% 100%", ease:Power3.easeOut});
  }

  static drawMap(__points, __w = InfoViewer._recSize, __h = InfoViewer._recSize) {
    const scale = Math.min(InfoViewer._recSize/__w, InfoViewer._recSize/__h);
    const w = __w * scale;
    const h = __h * scale;

        let path = ""
    __points.map((p) => {
      const letter = path === "" ? "M" : "L";
      path += letter + Number(p.x * scale) + "," + Number(p.y * scale);
    });

    this._svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    this._pathDeco.setAttribute("d", path);
    this._pathHover.setAttribute("d", path);
    this._path.setAttribute("d", path);
    this._pathHover.setAttribute("style", "");
    this._path.setAttribute("style", "");
    this._pathHover.setAttribute("style", "");

    gsap.set(this._pathDeco, {drawSVG: "0% 0%"});
    gsap.set(this._pathHover, {drawSVG: "0% 0%"});
    gsap.set(this._path, {drawSVG: "0% 0%"});
  };
}


