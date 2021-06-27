const FRAGMENT_LINE =  `
uniform float time;
uniform float progress;
uniform float alpha;
uniform float burn;
uniform float speed;
uniform sampler2D texture;
uniform vec4 resolution;
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(0.0,0.0,1.0,.9);
}
`;





