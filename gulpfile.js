
var gulp = require('gulp'),
	del = require('del'),
	path    = require('path'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    ERROR = gutil.colors.red('[ERROR]'),
	minifycss = require('gulp-minify-css'),
	sourcemaps  = require('gulp-sourcemaps'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	minifyHTML = require('gulp-minify-html'),
    watchify    = require('watchify'),
    babel = require('babelify'),

	bundle  = function bundle() {
    	return rebundle.call(createBundler());
	};



global.paths = {

	src: './src',
	out: './bin',

	get jsEntry() { return this.src + '/js/index.js'; },
	get scripts() { return this.src + '/**/*.js'; },
	get templates() { return this.src + '/**/*.tmpl'; },

};


function logChanges(event) {
    gutil.log(
        gutil.colors.green('File ' + event.type + ': ') +
        gutil.colors.magenta(path.basename(event.path))
    );
}


gulp.task('default', [ 'build', 'build-html', 'watch' ], function(){
	//gulp.start('build');
});

gulp.task('clean', function(cb) {
	del(['tmp', 'www/bin/*'], cb);
});


gulp.task('unit-test', function () {
    return gulp.src('spec/*.js')
        .pipe(jasmine({
        	//isVerbose: true,
        	includeStackTrace:true
            //reporter: new reporters.JUnitXmlReporter()
        }));
});


gulp.task('build', [  'build-js', 'browserify', 'less'], function(){
	
});


gulp.task('less', function() {

	gulp.src([ 'src/less/app.less', 'src/less/**/*.less' ])
	//.pipe(watch())
	.pipe(less())
	.pipe(concat('app.css'))
	.pipe(gulp.dest(paths.out))

});


gulp.task('prefix', function () {
    return gulp.src('bin/app.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('build-html', function(){
	gulp.src('src/index.html')
		.pipe(gulp.dest('bin'));
});


gulp.task('build-js', ['browserify'], function(){
	gulp.src('src/jsvendor/*')
		.pipe(gulp.dest('bin/'));

});


gulp.task('browserify', function(){
    return browserify('./src/js/index.js')
	    .bundle()
	    .pipe(source('app.js'))
	    .pipe(gulp.dest('bin'));
});


gulp.task('watch', function() {

		gulp.watch( 'src/js/**/*.js', [ 'browserify' ] );
		gulp.watch( 'src/less/**/*.less', [ 'less' ]).on('change', logChanges);
		gulp.watch( 'src/index.html', [ 'build-html' ]).on('change', logChanges);
		watchBundle();

});


function rebundle() {
    var debug, min;

    debug = sourcemaps.init({loadMaps: true});
    debug.pipe(sourcemaps.write('./', {sourceRoot: '../'}))
        .pipe(gulp.dest(paths.out));

    return this.bundle()
        .on('error', handleErrors)
        //.pipe(handleErrors())
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(debug);
}

function createBundler(args) {
    args = args || {};
    args.debug = true;

    return browserify(paths.jsEntry, args).transform(babel, {presets: ["es2015"]});
}

function watchBundle(onUpdate) {
    var bundler = watchify(createBundler(watchify.args));

    bundler.on('update', function () {
        var bundle = rebundle.call(this);

        if (onUpdate) {
            bundle.on('end', onUpdate);
        }
    });

    return rebundle.call(bundler);
}

function handleErrors(err) {

    var msg = err.toString();

    if (msg === '[object Object]') {
        msg = err;
    }

    gutil.log(ERROR, err);

    if (err.stack) {
        gutil.log(ERROR, err.stack);
    }

    // Keep gulp from hanging on this task
    this.emit('end');
}