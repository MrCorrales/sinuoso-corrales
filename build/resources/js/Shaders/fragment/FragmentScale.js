const FRAGMENT_SCALE =  `
uniform float time;
uniform float progress;
uniform float alpha;
uniform float burn;
uniform float speed;
uniform sampler2D texture;
uniform vec4 resolution;
varying vec2 vUv;

void main() {
    float utime = time * -0.01 * speed;
    float scaleCenter = 0.5;
    vec2 newUVScale = (vUv - scaleCenter) * progress + scaleCenter;
    vec2 newUV = (newUVScale - vec2(progress))*resolution.zw + vec2(progress);
    vec4 color = texture2D(texture,newUV);
    
    gl_FragColor = vec4(color.rgb * burn, alpha * color.a);
}
`;





