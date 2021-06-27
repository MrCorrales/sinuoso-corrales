
var vertex;
var fragment;
var postvertex;
var postfragment;

class ThreeStage {
  container = C.GetBy.id("Scene");

  mouse;
  raycaster;
  camera;
  cameraDistanceGallery = 500;
  cameraDistanceScroll = 400;
  cameraDistance;
  scene;
  renderer;
  width;
  height;

  alpha = 1;

  geometry;
  material;

  _dom = C.GetBy.id("Page");
  _visor;

  isEnabled = false;
  isMouseEnabled = false;

  constructor(){}

  init(__call) {
    this.scene = new THREE.Scene();
    //this._visor = new Visor();

    this.width = Metrics.WIDTH;
    this.height = Metrics.HEIGHT;
    this.cameraDistance = this.cameraDistanceScroll;
    this.mouse = new THREE.Vector2();



    this.loadShaders(() => {
      this.setupRenderer();
      this.setupCamera();
      this.setupObjects();
      this.setupActions();
      //this._visor = new Visor(this);
      this.isEnabled = true;

      __call();
    });
  }

  loadShaders(__call) {
    vertex = "precision mediump float;\n" +
      "uniform float uVelo;\n" +
      "uniform float uProgress;\n" +
      "varying vec2 vUv;\n" +
      "#define M_PI 1.314\n" +
      "\n" +
      "void main(){\n" +
      "vec3 pos = position;\n" +
      "pos.z = pos.z + ((sin(uv.x * M_PI) * max(-4.0, min(4.0,uVelo))) * 0.1);\n" +
      "vUv = uv;\n" +
      "gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);\n" +
      "}";

    fragment="uniform float time;\n" +
      "uniform float progress;\n" +
      "uniform float alpha;\n" +
      "uniform sampler2D texture1;\n" +
      "uniform vec4 resolution;\n" +
      "varying vec2 vUv;\n" +
      "void main()\t{\n" +
      "float scaleCenter = 0.5;\n" +
      "vec2 newUV = (vUv - scaleCenter) * progress + scaleCenter;\n" +
      "vec4 color = texture2D(texture1,newUV);\n" +
      "gl_FragColor = vec4(color.rgb, alpha * color.a);\n" +
      "}";
    __call();
    /*this.getSourceSynch(CDN + "/resources/js/Shaders/shader/vertex-test.glsl")
      .then((response) => {
        vertex = response.responseText;
        return this.getSourceSynch(CDN + "/resources/js/Shaders/shader/scale.glsl");
      })
      .then((response) => {
        fragment = response.responseText;
        __call();
        //return this.getSourceSynch(CDN + "/resources/js/Shaders/post/vertex.glsl");
      })
      .then((response) => {
        postvertex = response.responseText;
        return this.getSourceSynch(CDN + "/resources/js/Shaders/post/fragment.glsl");
      })
      .then((response) => {
        postfragment = response.responseText;
        __call();
      })
      
      .catch(function (error) {
        console.log('Something went wrong', error);
      });*/
  }

  setupRenderer() {
    this.raycaster = new THREE.Raycaster(); // create once
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true
    });
    this.renderer.setPixelRatio(1.4);
    this.renderer.setSize(this.width,this.height);
    this.renderer.sortObjects = false;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    //this.renderer.setClearColor( Colors.PRIMARY, 1);

    this.container.appendChild(this.renderer.domElement);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      100,
      1000
    );

    this.camera.position.set(0, 0, this.cameraDistanceGallery);
    this.camera.lookAt(0, 0, 0);






  }

  setupObjects() {
    let that = this;
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 80, 80);
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        progress: { type: "f", value: 0 },
        alpha: { type: "f", value: 1 },
        uProgress: { type: "f", value: 0 },
        uVelo: { type: "f", value: 0 },
        texture1: { type: "t", value: null },
        resolution: { type: "v4", value: new THREE.Vector4() },
      },
      // wireframe: true,
      transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment
    });
  }

  setupActions() {


    Keyboard.add(Keyboard.LEFT, "LEFT", ()=> {
      if(this._visor.isShow) {
        if(this._visor.style === STYLE_GALLERY) {
          this._visor.prev();
        }
      }
    });

    Keyboard.add(Keyboard.RIGHT, "RIGHT", ()=> {
      if(this._visor.isShow) {
        if(this._visor.style === STYLE_GALLERY) {
          this._visor.next();
        }
      }
    });


  }

  openExtern(__index) {
    ///history.replaceState({}, "Xandra Álvarez Allende", "/");
    this._visor.image = Basics.IMAGES[__index];
    this._visor.openExtern();
    this.openVisor();1
  }

  openVisor() {
    gsap.to(Main.domProgress,{
      x:0,
      scaleX:.4,
      scaleY:.4,
      transformOrigin: "0 100%",
      ease:Power3.easeOut,
      duration:.4,
      force3D:true
    });

    gsap.to(this._dom,{
      alpha:0,
      ease:Power3.easeOut,
      duration:.4,
    });

    gsap.to(this,{
      alpha:0,
      ease:Power3.easeOut,
      duration:.4,
      onUpdate:()=> {
        if(!Scroll.isScrolling) {
          Scroll.loop(true);
        }
      }
    });

    gsap.to(this,{
      cameraDistance:this.cameraDistanceGallery,
      ease:Power3.easeOut,
      duration:1,
    });

    this._visor.open();
  }

  closeVisor() {
    gsap.to(this,{
      cameraDistance:this.cameraDistanceScroll,
      ease:Power3.easeInOut,
      duration:1,
    });

    gsap.to(Main.domProgress,{
      x:0,
      scaleX:1,
      scaleY:1,
      transformOrigin: "0 100%",
      ease:Power3.easeOut,
      duration:.4,
      delay:0.4,
      force3D:true
    });


    gsap.to(this._dom,{
      alpha:1,
      ease:Power3.easeOut,
      duration:.4,
      delay:.4,
    });

    gsap.to(this,{
      alpha:1,
      ease:Power3.easeOut,
      duration:.4,
      delay:.4,
      onUpdate:()=> {
        if(!Scroll.isScrolling) {
          Scroll.loop(true);
        }
      }
    });

    this._visor.close();
  }

  resize(){
    if(!this.isEnabled) return false;

    this.width = Metrics.WIDTH;
    this.height = Metrics.HEIGHT;

    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    this.camera.fov =
      2 *
      Math.atan(this.width / this.camera.aspect / (2 * this.cameraDistanceScroll)) *
      (180 / Math.PI); // in degrees

    this.camera.updateProjectionMatrix();
  };

  createMesh(o) {


    let material = this.material.clone();
    let texture = new THREE.TextureLoader().load(o.src);
    texture.needsUpdate = true;
    // image cover
    let imageAspect = o.iHeight / o.iWidth;
    let a1;
    let a2;
    if (o.height / o.width > imageAspect) {
      a1 = (o.width / o.height) * imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = o.height / o.width / imageAspect;
    }
    texture.minFilter = THREE.LinearFilter;
    material.uniforms.resolution.value.x = o.width;
    material.uniforms.resolution.value.y = o.height;
    material.uniforms.resolution.value.z = a1;
    material.uniforms.resolution.value.w = a2;
    material.uniforms.progress.value = 0;
    material.uniforms.uVelo.value = 0;

    material.uniforms.texture1.value = texture;
    material.uniforms.texture1.value.needsUpdate = true;

    let mesh = new THREE.Mesh(this.geometry, material);

    mesh.scale.set(o.width, o.height, o.width / 2);

    return mesh;
  }

  getSpeed() {

  }

  moveVisor() {
    this.camera.position.z = this.cameraDistance;

    const X = 0 - Metrics.WIDTH / 2 + (Interaction.positions.mouse.x);
    const Y = (Metrics.HEIGHT / 2 - Interaction.positions.mouse.y);

   // const XTO = Math.floor((this._visor.centerX - X)) * .3 * -1;
   // const YTO = Math.floor((this._visor.centerY - Y)) * .2 * -1;

   // const deltaX = Maths.difference(this._visor.x, XTO + this._visor.centerX, .08);
   // const deltaY = Maths.difference(this._visor.y, YTO + this._visor.centerY, .08);

   // this._visor.x += deltaX;
   // this._visor.y += deltaY;
   // this._visor.xRotate = -deltaX*.01;
   // this._visor.loop();
  }

  checkMouseOver() {
    this.mouse.x = (Interaction.positions.mouse.x / Metrics.WIDTH) * 2 - 1;
    this.mouse.y = - (Interaction.positions.mouse.y / Metrics.HEIGHT) * 2 + 1;

    //if(this._visor.style === STYLE_GALLERY) return;

    if(Math.abs(Scroll.speed) < 20) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      var intersects = this.raycaster.intersectObjects(this.scene.children);

      if (intersects.length > 0) {
       // this._visor.show(intersects[0].object.uuid);
      } else {
       // this._visor.hide();
      }
    } else {
     // this._visor.hide();
    }
  }

  loop(__force){
    if(this.isMouseEnabled) {
      this.checkMouseOver();
    }

    if(this.isEnabled || __force) {
      this.moveVisor();
      this.renderer.render(this.scene, this.camera);
    }
  };

  getSourceSynch(url) {
    // Create the XHR request
    var request = new XMLHttpRequest();

    // Return it as a Promise
    return new Promise(function (resolve, reject) {

      // Setup our listener to process compeleted requests
      request.onreadystatechange = function () {

        // Only run if the request is complete
        if (request.readyState !== 4) return;

        // Process the response
        if (request.status >= 200 && request.status < 300) {
          // If successful
          resolve(request);
        } else {
          // If failed
          reject({
            status: request.status,
            statusText: request.statusText
          });
        }
      };

      // Setup our HTTP request
      request.open('GET', url, true);

      // Send the request
      request.send();

    });
  };
}


