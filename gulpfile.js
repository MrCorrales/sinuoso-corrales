'use strict';

/*

gulp libs
gulp ts
gulp sass
gulp watch
gulp watch:ts
gulp watch:sass
gulp production-sass
gulp production-js
gulp production

 */

var gulp = require('gulp');
//var browsersync = require('browser-sync').create();
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cssvariables = require('postcss-css-variables');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var gulpSequence = require('gulp-sequence');
var rename = require('gulp-rename');
var del = require('del');
var gutil = require('gulp-util');
var wait = require('gulp-wait');
var pump = require('pump');
var print = require('gulp-print').default;
var gzip = require('gulp-gzip');
var fs = require('file-system');

var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
/*
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
npm install gulp-svgstore
npm install gulp-svgmin

npm install postcss-css-variables --save-dev
npm install --save-dev gulp-gzip
*/


var _pathApp = './app/';
var _pathPublic = './source/resources/';
var _pathSVG = './source/assets/svg/';
var _pathDist = './source/resources/dist/';
var _pathDistNames = 'source/resources/dist/';

//SYNC
// BrowserSync
/*function _serve(done) {
  browsersync.init({
    server: {
      baseDir: "./source/"
    }
  });
  done();
}*/

// MAIN
function _mainJS() {
  return gulp.src([

    _pathPublic +'js/Canvas/ThreeStage.js',
    _pathPublic +'js/Components/RiverLines.js',

    _pathPublic +'js/Shaders/vertex/VertexBasic.js',
    _pathPublic +'js/Shaders/vertex/VertexLine.js',
    _pathPublic +'js/Shaders/fragment/FragmentSineLines.js',
    _pathPublic +'js/Shaders/fragment/FragmentLine.js',
    _pathPublic +'js/3D/Material.js',
    _pathPublic +'js/3D/Geometry.js',


    _pathPublic +'js/DataHolder.js',

    _pathPublic +'js/main.js',

  ])
    .pipe(babel({
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-class-properties']
    }))
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(uglify(
      {compress: {drop_console: false}}
    ))
    //.pipe(gzip({ append: false }))
    .pipe(gulp.dest(_pathPublic + 'js'));
}

// LIBS
function _libsPreload() {
  return gulp.src([
    _pathApp +'js/cuchillo/Core/Core.js',
    _pathApp +'js/cuchillo/Core/Basics.js',
    _pathApp +'js/cuchillo/Core/Colors.js',
    _pathApp +'js/cuchillo/Core/Ease.js',
    _pathApp +'js/cuchillo/Core/Fonts.js',
    _pathApp +'js/cuchillo/Core/Paths.js',
    _pathApp +'js/cuchillo/Core/Metrics.js',
    _pathApp +'js/cuchillo/Core/Analytics.js',
    _pathApp +'js/cuchillo/Core/Engine.js',
    _pathApp +'js/cuchillo/Core/Engine.js',
    _pathApp +'js/cuchillo/Core/Interaction.js',

    _pathApp +'js/cuchillo/Element/Get.js',
    _pathApp +'js/cuchillo/Element/Index.js',
    _pathApp +'js/cuchillo/Element/Select.js',
    _pathApp +'js/cuchillo/Element/Remove.js',

    _pathApp +'js/cuchillo/Utils/Functions.js',
    _pathApp +'js/cuchillo/Utils/Utils3D.js',
    _pathApp +'js/cuchillo/Utils/Cookie.js',
    _pathApp +'js/cuchillo/Utils/Maths.js',
    _pathApp +'js/cuchillo/Utils/CSS.js',
    _pathApp +'js/cuchillo/Utils/Accessibility.js',
    _pathApp +'js/cuchillo/Utils/CuchilloWorker.js',
    _pathApp +'js/cuchillo/Utils/Keyboard.js',
    _pathApp +'js/cuchillo/Utils/Statics.js',

    _pathApp +'js/cuchillo/Forms/FormValidator.js',
    _pathApp +'js/cuchillo/Forms/FormSender.js',

    _pathApp +'js/cuchillo/Event/EventDispatcher.js',
    _pathApp +'js/cuchillo/Scroll/Scroll.js',
    _pathApp +'js/cuchillo/Scroll/Scrollbar.js',
    _pathApp +'js/cuchillo/Scroll/MrScroll.js',
    //_pathApp +'js/cuchillo/Scroll/MrScroll_Item.js',
    _pathApp +'js/cuchillo/Scroll/VScroll.js',
    _pathApp +'js/cuchillo/Scroll/VScroll_Item.js',
    _pathApp +'js/cuchillo/Scroll/WheelControls.js',

    _pathApp +'js/cuchillo/Scroll/VScrollInfinity.js',
    _pathApp +'js/cuchillo/Scroll/VScrollHInfinity.js',

    _pathApp +'js/cuchillo/Components/Slider.js',
    _pathApp +'js/cuchillo/Components/Carrusel.js',
    _pathApp +'js/cuchillo/Components/Girarotutto.js',
    _pathApp +'js/cuchillo/Components/SliderScroll.js',
    _pathApp +'js/cuchillo/Components/SliderInfinityScroll.js',

    _pathApp +'js/cuchillo/Layout/Wrap.js',
    _pathApp +'js/cuchillo/Layout/Header.js',
    _pathApp +'js/cuchillo/Layout/Footer.js',
    _pathApp +'js/cuchillo/Layout/Sidemenu.js',
    _pathApp +'js/cuchillo/Layout/Preloader.js',
    _pathApp +'js/cuchillo/Layout/Background.js',
    _pathApp +'js/cuchillo/Layout/Cookies.js',
    _pathApp +'js/cuchillo/Windows/ControllerWindow.js',
    _pathApp +'js/cuchillo/Windows/Window.js',

    _pathApp +'js/cuchillo/Layout/Interface.js',
    _pathApp +'js/cuchillo/Layout/Cursor/Cursor.js',
    _pathApp +'js/cuchillo/Layout/Cursor/CursorTypes.js',
    _pathApp +'js/cuchillo/Layout/Cursor/Cursor__Item.js',
    _pathApp +'js/cuchillo/Layout/Cursor/Cursor__Dot.js',
    _pathApp +'js/cuchillo/Layout/Cursor/Cursor__DotComplex.js',
    _pathApp +'js/cuchillo/Layout/Cursor/Cursor__Icon.js',
    _pathApp +'js/cuchillo/Layout/Cursor/Cursor__Drag.js',
    _pathApp +'js/cuchillo/Layout/Cursor/Cursor__Text.js',
    _pathApp +'js/cuchillo/Layout/Cursor/Cursor__Loading.js',
    _pathApp +'js/cuchillo/Layout/Loading.js',


    _pathApp +'js/cuchillo/Loaders/LoaderController.js',
    _pathApp +'js/cuchillo/Loaders/CustomLoader.js',
    _pathApp +'js/cuchillo/Loaders/MediaLoader.js',
    _pathApp +'js/cuchillo/Loaders/LazyLoader.js',
    _pathApp +'js/cuchillo/Loaders/PagesLoader.js',
    _pathApp +'js/cuchillo/Loaders/FontLoader.js',

    _pathApp +'js/cuchillo/Display/MediaObject.js',
    _pathApp +'js/cuchillo/Display/ImageObject.js',
    _pathApp +'js/cuchillo/Display/BGObject.js',
    _pathApp +'js/cuchillo/Display/VideoObject.js',
    _pathApp +'js/cuchillo/Display/Display.js',

    _pathApp +'js/cuchillo/Pages/ControllerPage.js',
    _pathApp +'js/cuchillo/Pages/Page.js',
  ])
    .pipe(babel({
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-class-properties']
    }))
    .pipe(concat('libs-preload.js', {newLine: ';'}))
    /*.pipe(uglify(
      {compress: {drop_console: false}}
    ))*/
    //.pipe(gzip({ append: false }))
    .pipe(gulp.dest(_pathPublic + 'js'));
}

function _libs() {
  return gulp
    .src([
      _pathApp +'js/gsap/gsap.min.js',
      _pathApp +'js/threeJS/three.js',
      /*_pathApp +'js/threeJS/js/loaders/OBJLoader.js',
      _pathApp +'js/threeJS/js/loaders/RGBELoader.js',
      _pathApp +'js/threeJS/js/loaders/HDRCubeTextureLoader.js',
      _pathApp +'js/threeJS/js/postprocessing/EffectComposer.js',
      _pathApp +'js/threeJS/js/postprocessing/RenderPass.js',
      _pathApp +'js/threeJS/js/controls/DeviceOrientationControls.js',
      _pathApp +'js/threeJS/js/postprocessing/MaskPass.js',
      _pathApp +'js/threeJS/js/postprocessing/ShaderPass.js',
      _pathApp +'js/threeJS/js/shaders/CopyShader.js',
      _pathApp +'js/threeJS/js/controls/OrbitControls.js',*/
      _pathApp +'js/gsap/SplitText.min.js',
      _pathApp +'js/gsap/DrawSVGPlugin.min.js',
      _pathApp +'js/gsap/ScrambleTextPlugin.min.js',
    _pathApp +'js/gsap/EasePack.min.js',
    _pathApp +'js/gsap/ScrollToPlugin.min.js',
    _pathApp +'js/gsap/CustomEase.min.js',
    _pathApp +'js/utils/keyboard.js',
    _pathApp +'js/utils/VirtualScroll.js',
    _pathApp +'js/utils/liga.js',
    _pathApp +'js/utils/stats.min.js'
  ])
    .pipe(concat('libs.js', {newLine: ';'}))
    .pipe(uglify(
      {compress: {drop_console: true}}
    ))
    .pipe(gulp.dest(_pathPublic + 'js'));
}

// CSS
function _sass() {
  del([_pathPublic + 'css/']);
  return gulp
    .src(_pathPublic + 'scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(wait(500))
    .pipe(gulp.dest(_pathPublic + 'css'));
}

function _watchSCSS() {
  gulp.watch(_pathPublic + 'scss/**/*.scss', _sass);
}

function _cleanSass() {
  return del([_pathPublic + 'css/']);
}

//Production
function _clean() {
  return del([_pathDist]);
}

function _productionSass() {
  return gulp.src(_pathPublic + 'scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(_pathPublic +  'css'))
    .pipe(postcss([
      //cssvariables(),
      autoprefixer(),
      cssnano()
    ]))
    .pipe(rename({suffix: "_" + ((new Date()).getTime())}))
    .pipe(gulp.dest(_pathDist) );
}

function _productionJS() {
  return gulp.src([
    _pathPublic +'js/libs.js',
    _pathPublic +'js/main.min.js'
  ])
    .pipe(concat('app_'+((new Date()).getTime())+'.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest(_pathDist));
}

function _productionJS_debug() {
  return gulp.src([
    _pathPublic +'js/libs.js',
    _pathPublic +'js/main.min.js'
  ])
    .pipe(concat('app.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest(_pathDist));
}

function _minifyPreload() {
  return gulp.src([
    _pathPublic +'js/preload.js'
  ])
  .pipe(babel({
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties']
  }))
    .pipe(concat('preload.min.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest(_pathPublic + "js/"));
}

function _productionPreload() {
  return gulp.src([
    _pathPublic +'js/libs-preload.js',
    _pathPublic +'js/preload.min.js'
  ])
    .pipe(concat('preload_'+((new Date()).getTime())+'.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest(_pathDist));
}

function _productionPreload_debug() {
  return gulp.src([
    _pathPublic +'js/libs-preload.js',
    _pathPublic +'js/preload.min.js'
  ])
    .pipe(concat('preload.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest(_pathDist));
}

function _productionAnalytics() {
  return gulp.src([
    _pathPublic +'js/analytics.js',
  ])
    .pipe(uglify())
    .pipe(gulp.dest(_pathDist));
}

function _filenames() {
    return gulp.src(_pathDist + '/*.*').pipe(print(filepath => `${filepath.split(_pathDistNames)[1]}`))
}

function _svgStore() {
  return gulp
    .src(_pathSVG + '*.svg')
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore())
    .pipe(gulp.dest(_pathSVG));
}

//
//exports.serve = _serve;
exports.libs = _libs;
exports.libs_preload = _libsPreload;
exports.main = _mainJS;
exports.sass = gulp.series(_cleanSass, _sass);
exports.watch_sass = _watchSCSS;
exports.svg = _svgStore;
exports.clean_sass = _cleanSass;
exports.production_sass = _productionSass;
exports.production_js = _productionJS;
exports.production_js_debug = _productionJS_debug;
exports.production_js_preload = _productionPreload;
exports.production_js_preload_debug = _productionPreload_debug;
exports.filenames = _filenames;
exports.production_debug = gulp.series(
  _libsPreload,
  _libs,
  _mainJS,
  gulp.parallel(
    _productionJS_debug,
    _productionPreload_debug,
  )
);
exports.production = gulp.series(
  _clean,
  //_libsPreload,
  //_libs,
  _minifyPreload,
  _mainJS,
  gulp.parallel(
    _productionSass,
    _productionJS,
    _productionPreload,
    _productionAnalytics
  ),
  _filenames
);



