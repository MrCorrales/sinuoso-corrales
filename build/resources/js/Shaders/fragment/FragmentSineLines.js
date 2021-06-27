const FRAGMENT_SINE_LINES =  `
uniform float lines;
uniform float time;
uniform float time2;
uniform float speed1;
uniform float speed2;
uniform float red;
uniform float green;
uniform float blue;
uniform float stroke;
uniform float amplitude;
uniform float period;
uniform float gap;
uniform float m1;
uniform float m2;
uniform float m3;

uniform float timeMod2;

uniform float progress;
uniform float alpha;
uniform float burn;
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
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 wave_color = vec4(0.0,0.0,0.0,1.0);  
    float wave_width = 0.01;
    
    uv.y -= 0.65;
    
    float Pi = 6.28318530718; // Pi*2
    float Directions = 16.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
    float Quality = 3.0; // BLUR QUALITY (Default 4.0 - More is better but slower)
    float Size = 8.0; // BLUR SIZE (Radius)
    vec2 Radius = 10.0/resolution.xy;
    
    
    
    for(float i = 0.0; i < 20.0; i++) {
        float yPos = (noise(10.0) * .2);
        float yPos2 = (noise(40.0));
        
        //float fInit = uv.x - 0.2;
        float fInit = uv.x + 0.2;
        float fAlpha = (i + 1.0) * .1;       
        float fRed = min(1.0, max(0.0, red * fInit)) * fAlpha;       
        float fGreen = min(1.0, max(0.0, green * fInit)) * fAlpha;       
        float fBlue = min(1.0, max(0.0, blue * fInit)) * fAlpha;  
        float fAmplitude = amplitude * .001;   
        float fStroke = stroke;   
        float fTime1 = ((time) + i * .2);
        float fTime2 = ((time2) + i * timeMod2);
        
       // float mod1 = (uv.x * sin(uv.x * m1 + fTime2) * m2);
        float mod1 = (uv.x * sin(uv.x * m1 + fTime2) * m2);
        
        uv.y += gap * .01;  
        uv.y += (sin(uv.x * period + fTime1) * fAmplitude) * mod1;
        
        
        //uv.y += (sin(uv.x * period + fTime1) * fAmplitude);
            
        
          
       
       
        wave_width = abs(.5 / (fStroke * uv.y));
        //wave_color += vec3(wave_width * 0.0, wave_width * 1.0, wave_width * (uv.x - 0.2) * (i * .1));
        
         wave_color += vec4(wave_width * fRed, wave_width * fGreen, wave_width * fBlue, 1.0);
        
    }
        
    gl_FragColor = wave_color;
}
`;





