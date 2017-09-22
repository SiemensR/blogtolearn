var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var php = require('gulp-connect-php');
var browserSync = require('browser-sync'); // Подключаем Browser Sync

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

var reload  = browserSync.reload;


gulp.task('browser-sync',['php'], function() { // Создаем таск browser-sync
   browserSync({ // Выполняем browser Sync
       //server: { // Определяем параметры сервера
       //    baseDir: './'
            // Директория для сервера - app
       // },
       proxy: '127.0.0.1:8000',
        port: 8000,
        open: true,
       notify: false // Отключаем уведомления
   });
});


gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['browser-sync','sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch('**/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
  gulp.watch('**/*.php', browserSync.reload); 
  gulp.watch('css/**/*.css', browserSync.reload);
gulp.watch('js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});
