var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var gPlugins = require('gulp-load-plugins')();
var path = require('path');

var vinylBuffer = require('vinyl-buffer');
var browserSync = require('browser-sync').create();
var bsReload = browserSync.reload;

// path options
var opts = {
    tq: String.fromCharCode(9775),
    htmlIdx: 'assets/index.html',
    htmlSrc: 'assets/_partials/**/*.html',
    pbf: './public/',
    htmlParDes: './public/_partials/',
    // jscAisle:   'public/javascripts/**/*.js',
    jsApp: 'app/**/*.js',
    npmJs: 'node_modules/',
    imgOg: 'assets/images/**/*',
    cssOg: 'assets/style/',
    bsFontsSrc: 'node_modules/bootstrap-sass/assets/fonts/bootstrap/**/*',
    bsFontDest: './public/_mincss/bsFonts/',
    // jsTmp:      'assets/bundleTmp/tmp.js',
    jsMetaMid: './public/buildjs/',
    cssMetaMid: 'assets/build/css/',
    imgMin: 'public/_img/',
    jsMin: 'public/_minjs/',
    cssMin: 'public/_mincss/'
};

gulp.task('cpBsFont', function() {
    gulp.src(opts.bsFontsSrc)
        .pipe(gulp.dest(opts.bsFontDest));
});

gulp.task('MoveIndexToPublic', function() {
    gulp.src(opts.htmlIdx)
        .pipe(gPlugins.htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(opts.pbf));
});

gulp.task('MovePartialsToPublic', function() {
    gulp.src(opts.htmlSrc)
        .pipe(gPlugins.htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(opts.htmlParDes));
});

// clean and then move all static images
gulp.task('images', /* ['cleanCacheAndOldImages'],*/ function() {
    var imgCollection = opts.imgOg;
    console.log('line 61 minify images... original path is ' + opts.imgOg);

    // return
    gulp.src(imgCollection)
        .pipe(gPlugins.changed(opts.imgOg))
        .pipe(gPlugins.imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(opts.imgMin));
});

// modifies styles
gulp.task('styles', /* ['cleanCacheAndOldCss'],*/ function() {
    var logPrefix = 'sass->prefix->css->concatCss(may not need)->MinifyCss: ';
    var pfxVer = 'last 2 versions';
    var traitSrc = opts.cssOg + 'main.scss';
    console.log(logPrefix + opts.tq + ' original path is: ' + opts.cssOg);

    gulp.src(traitSrc)
        .pipe(gPlugins.sourcemaps.init({ largeFile: true }))
        .pipe(gPlugins.sass({
            errLogToConsole: true,
            // outputStyle: 'compact'
            //outputStyle: 'compressed'
            // outputStyle: 'nested'
            outputStyle: 'expanded'
        }))
        // .pipe(gPlugins.autoprefixer(pfxVer))
        .pipe(gPlugins.rename('app_min.css'))
        .pipe(cleanCss())
        .on('error', gPlugins.util.log.bind(
            gPlugins.util, '85 -- Browserify-Sass_Error'))
        .pipe(gPlugins.sourcemaps.write('.'))
        .pipe(gulp.dest(opts.cssMin))
        // only match to update .css file.
        .pipe(browserSync.stream({ match: "**/*.css" }))
        .pipe(bsReload({ stream: true }));
});


var jq = opts.npmJs + 'jquery/dist/jquery.min.js';
var jqmigrate = opts.npmJs + 'jquery-migrate/dist/jquery-migrate.js';
var apicheck = opts.npmJs + 'api-check/dist/api-check.min.js';
var lodash = opts.npmJs + 'lodash/lodash.js';
var moment = opts.npmJs + 'moment/min/moment.min.js';
var momentLocal = opts.npmJs + 'moment/min/moment-with-locales.min.js';
var bsjs = opts.npmJs + 'bootstrap-sass/assets/javascripts/bootstrap.js';
var angula = opts.npmJs + 'angular/angular.min.js';
var anguAnimate = opts.npmJs + 'angular-animate/angular-animate.min.js';
var uirouter = opts.npmJs + 'angular-ui-router/release/angular-ui-router.min.js';
var uiBootstrap = opts.npmJs + 'angular-ui-bootstrap/dist/ui-bootstrap-tpls.js';
var formly = opts.npmJs + 'angular-formly/dist/formly.min.js';
var formlyTmpl = opts.npmJs + 'angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.min.js';
var ngTableJs = opts.npmJs + 'ng-table/bundles/ng-table.min.js';
var ngTabsInputJs = opts.npmJs + 'ng-tags-input/build/ng-tags-input.min.js';
// var ngMask      = opts.npmJs + 'ng-mask/dist/ngMask.js';

// clllections
var jqRelated = [jq, jqmigrate, apicheck, lodash, bsjs, moment, momentLocal];
var anguRelated = [angula, anguAnimate, uirouter, uiBootstrap, formly, formlyTmpl, ngTableJs, ngTabsInputJs /*, ngMask*/ ];

var libjsArr = jqRelated.concat(anguRelated);
var metaMid = opts.jsMetaMid;

gulp.task('libjsCompile', function() {
    // lib compile
    var pfxLibMetamo = 'lib js files concat -> build/js/ - original path: ';
    console.log(pfxLibMetamo + opts.npmJs);

    gulp.src(libjsArr)
        .pipe(gPlugins.concat('lib-compiled.js'))
        .pipe(gPlugins.uglify({ mangle: false }))
        // .pipe(gPlugins.uglify())
        .pipe(gulp.dest(metaMid))
        .on('end', function() {
            bsReload();
        });
});

var appjs = opts.jsApp;
// var custjs   = opts.jscAisle;
var appjsArr = [appjs /*, custjs*/ ];

gulp.task('appJsConcat', /* ['cleanCacheAndOldJs'],*/ function() {
    // app compile
    var pfxAppMetamo = 'app js files browserify -- concat -> build/js/ - original path: ';
    console.log(pfxAppMetamo + 'app/ folder and public/javascripts/');
    gulp.src(appjsArr)
        // .pipe(gPlugins.jshint())
        // .pipe(gPlugins.jshint.reporter(jshSty))
        // .pipe(gPlugins.jshint.reporter('fail'))
        .pipe(gPlugins.sourcemaps.init({ largeFile: true }))
        .pipe(vinylBuffer())
        .on('error', gPlugins.util.log.bind(
            gPlugins.util, '145 -- Browserify Error'))
        .pipe(gPlugins.concat('app-compiled.js'))
        .pipe(gPlugins.sourcemaps.write('.'))
        .pipe(gulp.dest(metaMid))
        .on('end', function() {
            bsReload();
        });
});

var libJs = metaMid + 'lib-compiled.js';
var appJs = metaMid + 'app-compiled.js';
var concatJsArr = [libJs, appJs];

gulp.task('jsMinified', function() {
    var miniJs = opts.jsMin;
    console.log('concat compiled files and uglify them.');

    gulp.src(concatJsArr)
        .pipe(gPlugins.sourcemaps.init({ largeFile: true }))
        .pipe(gPlugins.concat('app.min.js'))
        .pipe(gPlugins.uglify({ mangle: false }))
        .pipe(gPlugins.sourcemaps.write('.', {
            lodaMaps: true
        }))
        .pipe(gulp.dest(miniJs))
        .on('end', function() {
            bsReload();
        });
});

gulp.task('browser-sync', function() {
    var staticPublic = path.join(__dirname, 'public');
    // files: [opts.imgOg, opts.cssOg],
    // port: 8000,
    browserSync.init({
        logPrefix: 'browserSyn_Says:',
        logFileChanges: true,
        // sample for multiple base server, donot use it.
        // server: [opts.imgOg, opts.cssOg, opts.jsDir]
        // server must be the folder contains index.html file
        server: {
            // __dirname = "./"
            baseDir: staticPublic
        }
        /*,
                proxy: {
                    target: "localhost:3000",
                    ws: true // enables websockets
                }*/
    });
});

// watches files
gulp.task('watch', ['browser-sync'], function() {
    var imgFiles = opts.imgOg;
    var ogCss = opts.cssOg + '**/*.scss';

    gulp.watch(opts.htmlIdx, ['MoveIndexToPublic']);

    gulp.watch(opts.htmlSrc, ['MovePartialsToPublic']);

    gulp.watch(imgFiles, ['images']);

    gulp.watch(ogCss, ['styles']);

    gulp.watch(libjsArr, ['libjsCompile']);

    gulp.watch(appjsArr, ['appJsConcat']);

    // gulp.watch(concatJsArr, ['jsMinified']);

    gulp.watch(opts.htmlIdx).on('change', bsReload);

    gulp.watch(opts.htmlSrc).on('change', bsReload);
});

gulp.task('pjinit', ['MoveIndexToPublic', 'MovePartialsToPublic', 'images', 'styles', 'cpBsFont', 'libjsCompile', 'appJsConcat', 'jsMinified']);
gulp.task('default', ['watch']);