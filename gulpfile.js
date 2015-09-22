// 首先引入对应的模块
var gulp = require('gulp');
// sass编译
var sass = require('gulp-sass');
// 实时刷新
var browsersync = require('browser-sync');
// 合并js文件
var useref = require('gulp-useref');
// 判断
var gulpIf = require('gulp-if');
// 压缩代码
var uglify = require('gulp-uglify');
// 压缩css
var minifycss = require('gulp-minify-css');
// 压缩图片
var imagemin = require('gulp-imagemin');
// 缓存
var cache = require('gulp-cache');
// 清除
var del = require('del');
// 顺序执行
var runsequence = require('run-sequence');

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
		// 判断是否是css文件
		.pipe(gulpIf('*.css', minifycss()))
		// 判断是否是js文件
		.pipe(gulpIf('*.js', uglify()))
		// .pipe(uglify()) //压缩代码
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist'))
});
// 让我们开始压缩图片
gulp.task('images', function() {
	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function(callback) {
	del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback);
});

gulp.task('clean', function(callback) {
  del('dist');
  return cache.clearAll(callback);
});

gulp.task('build', function(callback) {
	runsequence('clean:dist',
		['sass', 'useref', 'images', 'fonts'],
		callback
	)
});
// 顺序执行参数的task,数组内的是task是异步执行
gulp.task('default', function(callback) {
	runsequence(['sass', 'browsersync', 'watch'], callback)
});