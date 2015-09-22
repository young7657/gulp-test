// 首先引入对应的模块
var gulp = require('gulp');
// sass编译
var sass = require('gulp-sass');
// 实时刷新
var browsersync = require('browser-sync');
// 合并js文件
var useref = require('gulp-useref');

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
		.pipe(browsersync.reload({
			stream: true
		}))
});

// 提供watch监听文件变化,这是单个监听的写法，如果想添加多个监听，可以使用watch task
// gulp.watch('app/scss/**/*.scss', ['sass']);
// 添加依赖参数
gulp.task('watch', ['browsersync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browsersync.reload);
	gulp.watch('app/js/**/*.js', browsersync.reload);
});

// gulp还有一个强大的功能叫做live-reloading，实时刷新网页
gulp.task('browsersync', function() {
	browsersync({
		server: {
			baseDir: 'app'
		}
	});
});

// 合并js
gulp.task('useref', function() {
	var assets = useref.assets();
	return gulp.src('app/*.html')
		.pipe(assets)
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist'))
});