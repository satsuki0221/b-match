
var gulp        = require('gulp');
var compass     = require('gulp-compass');
var browserSync = require('browser-sync').create();
var babel       = require("gulp-babel");
var plumber     = require('gulp-plumber');
var pug         = require('gulp-pug');

gulp.task('default', function(){
	gulp.watch('./public/sass/**/*.scss', ["compass"]);
	gulp.watch("./public/es6/**/*.js", ["js"]);
	gulp.watch(['./public/pug/*.pug','./public/pug/**/*.pug','!./public/pug/**/_*.pug'],['pug']);
	gulp.run('browserSync');
});

gulp.task('pug', function () {
	gulp.src(['./public/pug/*.pug','./public/pug/**/*.pug','!./public/pug/**/_*.pug'])
	.pipe(plumber())
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('./public/'));
});

gulp.task("js", function() {
	gulp.src("./public/es6/**/*.js")
		.pipe(plumber())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./public/js'));
});

gulp.task('browserSync', function() {
	browserSync.init({
		files: [
			'./public/**/*.html',
			'./public/**/*.php',
			'./public/**/*.css',
			'./public/js/**/*',
			'./public/img/**/*'
		],
		proxy: 'http://mylocal.com/b-match/public/',
	});
});

gulp.task('compass', function(){
	gulp.src('./public/sass/**/*.scss').pipe(compass({
		config_file: './public/config.rb',
		comments: false,
		css: './public/stylesheets/',
		sass: './public/sass/'
	}));
});
