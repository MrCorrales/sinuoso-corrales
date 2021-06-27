class RiverLines {

  static plane;
  static total = 1;
  static _lines = [];
  static time = 0;
  static timeAux = 0;
  static speed1 = 0;
  static speed2 = 0;
  static isPlay = true;
  static parameters = {
    time: 750,
    stroke: 750,
    green: .31,
    red: .17,
    blue: 1,
    amplitude: 10,
    period: 10,
    speed1: 1,
    speed2: 1,
    gap: 0,
    timeMod2: .4,
    m1: .9,
    m2: 2,
    m3: 0
  }

  static init() {
    //this._setupObjects();
    this._setupObject();

    gsap.ticker.add(()=> {this.loop()})
  }

  static _setupObject() {
    const material = MATERIAL_SINE_LINES.clone();
    material.depthTest = false;
    this.plane = new THREE.Mesh(BASIC_PLANE, material);
    const width = Metrics.WIDTH + 400;

    this.plane.scale.set(width, Metrics.HEIGHT, 100);
    this.plane.position.set(-10,0,0);

    material.uniforms.resolution.value.x = width;
    material.uniforms.resolution.value.y = Metrics.HEIGHT;

    material.uniforms.stroke.value = 750;
    material.uniforms.green.value = .31;
    material.uniforms.red.value = .17;
    material.uniforms.blue.value = 1;
    material.uniforms.amplitude.value = 10;
    material.uniforms.period.value = 10;
    material.uniforms.speed1.value = 1;
    material.uniforms.speed2.value = 1;
    material.uniforms.gap.value = 0;
    material.uniforms.timeMod2.value = .4;


    Main.stage.scene.add(this.plane);

    this._lines.push(this.plane);


    const guiFunctions = {
      Type1: () => {
        gsap.to(this.parameters, {
          duration: 2,
          stroke: 750,
          green: .31,
          red: .17,
          blue: 1,
          amplitude: 10,
          period: 10,
          speed1: 1,
          speed2: 1,
          gap: 0,
          timeMod2: .4,
          m1: .9,
          m2: 2,
          m3: 0,
          ease: Power3.easeInOut
        })
      },
      Type2: () => {
        gsap.to(this.parameters, {
          duration: 2,
          stroke: 750,
          green: 0,
          red: 0,
          blue: .5,
          amplitude: 10,
          period: 5.4,
          speed1: 1,
          speed2: 1,
          gap: .95,
          timeMod2: .56,
          m1: .9,
          m2: 2,
          m3: 0,
          ease: Power3.easeInOut
        })
      },
      Type3: () => {
        gsap.to(this.parameters, {
          duration: 2,
          stroke: 750,
          green: .31,
          red: .17,
          blue: 1,
          amplitude: 11.3,
          period: 6,
          speed1: 1,
          speed2: 1,
          gap: 0,
          timeMod2: .4,
          m1: .9,
          m2: 2,
          m3: 0,
          ease: Power3.easeInOut
        })
      },
      Type4: () => {
        gsap.to(this.parameters, {
          duration: 2,
          stroke: 750,
          green: .31,
          red: .17,
          blue: 1,
          amplitude: 11.3,
          period: 6,
          speed1: 1,
          speed2: 1,
          gap: 0.5,
          timeMod2: .4,
          m1: .9,
          m2: 2,
          m3: 0,
          ease: Power3.easeInOut
        })
      },
      Type5: () => {
        gsap.to(this.parameters, {
          duration: 2,
          stroke: 430,
          green: .14,
          red: .44,
          blue: .84,
          amplitude: 10,
          period: 10,
          speed1: .29,
          speed2: .94,
          gap: 0.75,
          timeMod2: .4,
          m1: .9,
          m2: 2,
          m3: 0,
          ease: Power3.easeInOut
        })
      },
    }


    Main.gui.add(this, 'isPlay').name('play');

    Main.gui.add(this.parameters, 'speed1', - 5, 5, 0.01).name('speed');
    Main.gui.add(this.parameters, 'speed2', - 5, 5, 0.01).name('speedMod');
    Main.gui.add(this.parameters, 'timeMod2', -1, 1, 0.01).name('timeMod2');
    Main.gui.add(this.parameters, 'stroke', 1, 2000, 1).name('stroke');
    Main.gui.add(this.parameters, 'red', 0, 1, 0.01).name('red');
    Main.gui.add(this.parameters, 'green', 0, 1, 0.01).name('green');
    Main.gui.add(this.parameters, 'blue', 0, 1, 0.01).name('blue');
    Main.gui.add(this.parameters, 'period', 0, 50, 0.01).name('period');
    Main.gui.add(this.parameters, 'amplitude', 0, 50, 0.01).name('amplitude');
    Main.gui.add(this.parameters, 'gap', 0, 10, 0.01).name('gap');


    Main.gui.add(this.parameters, 'm1', -10, 10, 0.01).name('mod1');
    Main.gui.add(this.parameters, 'm2', -10, 10, 0.01).name('mod2');

    Main.gui.add(guiFunctions, 'Type1')
    Main.gui.add(guiFunctions, 'Type2')
    Main.gui.add(guiFunctions, 'Type3')
    Main.gui.add(guiFunctions, 'Type4')
    Main.gui.add(guiFunctions, 'Type5')
  }

  static _setupObjects() {
    for(let i=0; i<this.total; i++) {
      const material = MATERIAL_LINE.clone();
      const line = new THREE.Mesh(BASIC_PLANE, material);
      const width = Metrics.WIDTH + 400;

      line.scale.set(width, 1, 100);
      line.position.set(-10,i,-100);

      this._lines.push(line);

      Main.stage.scene.add(line);

      material.uniforms.time.value = i * .1;
    }
  }

  static resize() {
    const width = Metrics.WIDTH + 400;
    this.plane.scale.set(width, Metrics.HEIGHT, 100);
    this.plane.position.set(-10,0,0);

    this.plane.material.uniforms.resolution.value.x = width;
    this.plane.material.uniforms.resolution.value.y = Metrics.HEIGHT;
  }

  static loop() {

    this.time = Math.max(.01,.01 * (Scroll.speed1 * -.002)) * .1;
    this.time2 = Math.max(.01,.01 * (Scroll.speed2 * -.002)) * .1;

console.log(this.speed1)
    for(let i=0; i<this.total; i++) {
      if(this.isPlay) {
        this._lines[i].material.uniforms.time.value += this.parameters.speed1 * .05;
        this._lines[i].material.uniforms.time2.value += this.parameters.speed2 * .05;
        this._lines[i].material.uniforms.velocity.value = Math.max(Math.abs(Scroll.speed * .01), 1);
      }
    }


    this._lines[0].material.uniforms.stroke.value = this.parameters.stroke;
    this._lines[0].material.uniforms.green.value = this.parameters.green;
    this._lines[0].material.uniforms.red.value = this.parameters.red;
    this._lines[0].material.uniforms.blue.value = this.parameters.blue;
    this._lines[0].material.uniforms.amplitude.value = this.parameters.amplitude;
    this._lines[0].material.uniforms.period.value = this.parameters.period;
    this._lines[0].material.uniforms.speed1.value = this.parameters.speed1;
    this._lines[0].material.uniforms.speed2.value = this.parameters.speed2;
    this._lines[0].material.uniforms.gap.value = this.parameters.gap;
    this._lines[0].material.uniforms.timeMod2.value = this.parameters.timeMod2;
    this._lines[0].material.uniforms.m1.value = this.parameters.m1;
    this._lines[0].material.uniforms.m2.value = this.parameters.m2;
    this._lines[0].material.uniforms.m3.value = this.parameters.m3;
  }
}


