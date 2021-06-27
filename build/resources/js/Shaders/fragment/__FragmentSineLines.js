const FRAGMENT_SINE_LINES =  `
uniform float time;
uniform float speed;
uniform float red;
uniform float green;
uniform float blue;


uniform float progress;
uniform float alpha;
uniform float burn;
uniform float speed;
uniform float velocity;
uniform sampler2D texture;
uniform vec4 resolution;
varying vec2 vUv;

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    
    //float y = mix(random(vec2(i).x, vec2(i + 1).x, smoothstep(0., 1., 1.));
   
    
    float y = mix(random(vec2(i, i)), random(vec2(i+1., i+1.)), smoothstep(0., 1., f));
    
    return y;
}


void main() {
    vec3 color1 = vec3(0.0, 0.0, 0.0);
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 wave_color = vec3(0.0);
    vec3 final_color = vec3(1.0);
  
    float wave_width = 0.01;
    
    uv.y -= 0.65;
    
    
    for(float i = 0.0; i < 25.0; i++) {
        //uv.y += (0.01 * sin(uv.x + i/100.0 + time ));
        //uv.y += (sin(uv.x * 10.0 + time) * 1.0) * (uv.x * sin(.9 * 1000.0 + time) * 20.0);
      
    
  
        float yPos = (noise(10.0) * .2);
        float yPos2 = (noise(40.0));
  
        uv.y += (sin(uv.x * 10.0 + (time + i * .2)) * .01) * (uv.x * sin(.9 + (time + i * .4)) * (2.0 * velocity));
      
       
        wave_width = abs(.5 / (3000.0 * uv.y));
        //wave_color += vec3(wave_width * 0.0, wave_width * (i * .00) * (uv.x - 0.2), wave_width * (uv.x - 0.2) * (i * .1));
        
        
        
        wave_color += vec3(wave_width * red, wave_width * green * (uv.x - 0.2), wave_width * (uv.x - 0.2) * (i * .1));
    }
    
    

    final_color = color1 + wave_color;
    
    gl_FragColor = vec4(final_color, 1.0);
}
`;





