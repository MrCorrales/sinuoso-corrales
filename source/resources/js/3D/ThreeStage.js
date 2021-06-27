class ThreeStage {
  container = C.GetBy.id("Interface");
  time=0;
  mouse;
  raycaster;
  camera;
  controls;
  cameraDistanceScroll = 300;
  cameraDistance;
  scene;
  renderer;
  width;
  height;
  alpha = 1;
  geometry;
  material;
  tee;
  isEnabled = false;

  constructor(){}

  init(__call) {
    this.scene = new THREE.Scene();

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.cameraDistance = this.cameraDistanceScroll;
    this.mouse = new THREE.Vector2();

    this.loadShaders(() => {
      this.setupRenderer();
      this.setupCamera();

      this.isEnabled = true;
      this.resize();

      __call();
    });
  }

  loadShaders(__call) {
    __call();
  }

  setupRenderer() {
    this.raycaster = new THREE.Raycaster(); // create once
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true
    });
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(this.width,this.height);
    this.renderer.sortObjects = false;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    //this.renderer.setClearColor( Colors.PRIMARY, 1);

    this.renderer.domElement.id = "Interface_x_Canvas"
    this.container.appendChild(this.renderer.domElement);
  }

  domPositionTo3D(__x, __y) {
    const x = 0 - this.width * .5 + __x;
    const y = (Metrics.HEIGHT / 2) -  __y;

    return {
      x:x, y:y, z:0
    }
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      10,
      10000
    );

    this.camera.position.set(0, 0, this.cameraDistance);
    this.camera.lookAt(0, 0, 0);
  }

  resize(){
    if(!this.isEnabled) return false;

    this.width = Metrics.WIDTH;
    this.height = Metrics.HEIGHT;

    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    this.camera.fov =
      2 *
      Math.atan(this.width / this.camera.aspect / (2 * this.cameraDistance)) *
      (180 / Math.PI); // in degrees

    this.camera.updateProjectionMatrix();
  };

  createMesh(o) {
    let material = MATERIAL_CINTA.clone();
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

    material.uniforms.columns.value = Math.ceil(o.width/(o.iWidth*imageAspect));
    material.uniforms.rows.value = 1;
    material.uniforms.speed.value = 1;

    material.uniforms.texture.value = texture;
    material.uniforms.texture.value.needsUpdate = true;

    let mesh = new THREE.Mesh(BASIC_PLANE, material);

    mesh.scale.set(o.width, o.height, o.width / 2);

    return mesh;
  }

  getSpeed() {

  }

  loop(__time, __force){
    /*if(this.isMouseEnabled) {
      this.checkMouseOver();
    }*/

    if(this.isEnabled || __force) {
      this.renderer.render(this.scene, this.camera);
    }
  };
}


