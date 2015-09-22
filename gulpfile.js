// 首先引入对应的模块
var gulp = require('gulp');
// sass编译
var sass = require('gulp-sass');

/**
 * 编写第一个task
 * 运行: gulp hello
 */
gulp.task('hello', function() {
	console.log('hellp gulp');
});

// 接下来使用gulp编译scss文件
gulp.task('sass', function() {
	return gulp.src('app/scss/styles.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
});