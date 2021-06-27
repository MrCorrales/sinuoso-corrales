const MATERIAL_SINE_LINES= new THREE.ShaderMaterial({
  extensions: {
    derivatives: "#extension GL_OES_standard_derivatives : enable"
  },
  side: THREE.FrontSide,
  uniforms: {
    time: { type: "f", value: 0 },
    time2: { type: "f", value: 0 },
    speed1: { type: "f", value: 1 },
    speed2: { type: "f", value: 1 },
    stroke: { type: "f", value: 0 },
    red: { type: "f", value: 0 },
    green: { type: "f", value: 0 },
    blue: { type: "f", value: 0 },
    amplitude: { type: "f", value: 0 },
    period: { type: "f", value: 0 },
    gap: { type: "f", value: 0 },
    m1: { type: "f", value: .9 },
    m2: { type: "f", value: 2 },
    m3: { type: "f", value: 0 },
    timeMod2: { type: "f", value: .4 },



    progress: { type: "f", value: 1 },
    alpha: { type: "f", value: 1 },
    burn: { type: "f", value: 1 },
    resolution: { type: "v4", value: new THREE.Vector4() },
    velocity: { type: "f", value: 0 },
    texture: { type: "t", value: null },
    color: {}
  },

  transparent: true,
  vertexShader: VERTEX_BASIC,
  fragmentShader: FRAGMENT_SINE_LINES
});


const MATERIAL_LINE = new THREE.ShaderMaterial({
  extensions: {
    derivatives: "#extension GL_OES_standard_derivatives : enable"
  },
  side: THREE.FrontSide,
  uniforms: {
    time: { type: "f", value: 0 },
    progress: { type: "f", value: 1 },
    alpha: { type: "f", value: 1 },
    burn: { type: "f", value: 1 },
    resolution: { type: "v4", value: new THREE.Vector4() },
    velocity: { type: "f", value: 0 },
    texture: { type: "t", value: null },
    color: {}
  },

  transparent: true,
  vertexShader: VERTEX_LINE,
  fragmentShader: FRAGMENT_LINE
});