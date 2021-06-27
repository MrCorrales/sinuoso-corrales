Instalar middleman 
```
bundle install
```

Instalar gulp copiando y pegando todo el bloque "INSTALACIÓN" del archivo gulpfile.js en el terminal
```
npm install gulp
npm install gulp-sass
npm install gulp-postcss
npm install gulp-sourcemaps
npm install autoprefixer
npm install cssnano
npm install gulp-imagemin
npm install gulp-typescript typescript
npm install gulp-concat
npm install gulp-uglify
npm install gulp-babel
npm install babel-preset-env
npm install --save-dev @babel/plugin-proposal-class-properties
npm install --save-dev @babel/core
npm install --save-dev @babel/preset-env
npm install gulp-sequence
npm install gulp-rename
npm install del
npm install gulp-print
npm install gulp-util
npm install gulp-wait
npm install file-system --save
npm install postcss-css-variables --save-dev
npm install --save-dev gulp-gzip
```

Crear las librerías
```
gulp libs
gulp libs_preload
```

Iniciar server
```
middleman server
```

Ejecutar el compilador de SASS
```
gulp watch_sass
```

## Scroll

```
Scroll.init(__smooth:[true || false], __type:["V" || "H"], __infinity:[true || false]);
Scroll.setScrollbar(new Scrollbar());
Scroll.addAll();
Scroll.resize();
Scroll.start(true);
this.addDispose(Scroll.dispose);
```

## Scrollbar

```
new Scrollbar(__container)
```
Si no se pasa __container cogeria la scrollbar general #Scrollbar 

```
<div id="Scrollbar" [data-vertical || data-horizontal]>
    <div class="track"></div>
    <div class="thumb"></div>
</div>
```

## Links


Externos -> target="_blank"
```
<a href="http://cuchillo.studio" target="__blank">Link</a>
```
Anclas -> data-anchor
```
<a href="#anchor01" data-anchor>Link</a>
```
Acciones internas -> data-internal
```
<a href="Acción abrir ventana" data-internal>Link</a>
```