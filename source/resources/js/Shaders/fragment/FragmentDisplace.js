const FRAGMENT_DISPLACE =  `
uniform float time;
uniform float progress;
uniform float alpha;
uniform float burn;
uniform float speed;
uniform sampler2D texture;
uniform vec4 resolution;
varying vec2 vUv;

////SOLO CENTRADO

void main() {

  float scaleCenter = 0.5;
  vec2 newUVScale = (vUv - scaleCenter) + scaleCenter;
  vec2 newUV = (vUv - vec2(.5))*resolution.zw + vec2(.5);
  
  vec4 color = texture2D(texture,newUV);
  gl_FragColor = vec4(color.rgb * burn, alpha * color.a);
}
`;



