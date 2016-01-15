var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

var jsFiles = ['*.js', 'src/**/*.js'];
var unitTestFiles = 'tests/**/*.js';
var systemTestFiles = 'tests/system/**/*.js';
var e2eTestFiles = 'tests/end2end/**/*.js';
var integrationTestFiles = 'tests/integration/**/*.js';

gulp.task('coding-standards', function defineCodingStandards() {
	return gulp.src(jsFiles)
		.pipe(jshint({esnext: true}))
		.pipe(jshint.reporter('jshint-stylish', {
			verbose: true
		}));
});

gulp.task('coding-style', function defineCodingStyle() {
	return gulp.src(jsFiles)
		.pipe(jscs())
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'));
});

//API with dev-ops
gulp.task('unit-test', function unitTests() {
	return gulp.src([].concat(unitTestFiles, systemTestFiles), {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('integration-test', function integrationTests() {
	return gulp.src([].concat(integrationTestFiles), {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('e2e-test', function e2eTests() {
	return gulp.src([].concat(e2eTestFiles), {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('serve', ['coding-standards', 'coding-style', 'unit-test'], function serve() {
	//gulp.watch(jsFiles, ['coding-standards', 'coding-style', 'unit-tests']);

	var options = {
		script: 'app.js',
		delayTime: 1,
		env: {
			// 'PORT': 5000
			// 'dbConnection': ...
		},
		tasks: ['coding-standards', 'coding-style', 'unit-test'],
		watch: jsFiles
	};

	return nodemon(options).on('restart', function res() {
		console.log('restarting server......');

	});
});