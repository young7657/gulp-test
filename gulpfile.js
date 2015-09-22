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
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
});

// 提供watch监听文件变化,这是单个监听的写法，如果想添加多个监听，可以使用watch task
// gulp.watch('app/scss/**/*.scss', ['sass']);

gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
});