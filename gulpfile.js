var gulp = require('gulp'),
 connect = require('gulp-connect');
var jshint = require('gulp-jshint'),
stylish = require('jshint-stylish');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;

// Servidor web de desarrollo
gulp.task('server', function() {
     connect.server({
     root: './app',
     port: 7000,
     livereload: true
     });
});

var stylus = require('gulp-stylus'),
 nib = require('nib');
// Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function() {
     gulp.src('./app/stylesheets/main.styl')
     .pipe(stylus({ use: nib() }))
     .pipe(gulp.dest('./app/stylesheets'))
     .pipe(connect.reload());
});


// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
     gulp.src('./app/**/*.html')
     .pipe(connect.reload());
});


gulp.task('jshint', function() { return gulp.src('./app/scripts/**/*.js')
.pipe(jshint('.jshintrc')) .pipe(jshint.reporter('jshint-stylish'))
.pipe(jshint.reporter('fail')); });


gulp.task('inject', function () {
  var target = gulp.src('./app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./app/scripts/**/*.js','./app/stylesheets/**/*.css'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./app'));
});

// Inyecta las librerias que instalemos vía Bower
// Inyecta las librerias que instalemos vía Bower
gulp.task('wiredep', function () {
gulp.src('./app/index.html')
.pipe(wiredep({
directory: './app/lib'
}))
.pipe(gulp.dest('./app'));
});

// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
     gulp.watch(['./app/**/*.html'], ['html']);
     gulp.watch(['./app/stylesheets/**/*.styl'], ['css', 'inject']);
     gulp.watch(['./app/scripts/**/*.js', './Gulpfile.js'], ['jshint', 'inject']);
     gulp.watch(['./bower.json'], ['wiredep']);
});

// Busca en las carpetas de estilos y javascript los archivos que hayamos creado
// para inyectarlos en el index.html
//gulp.task('inject', function() {
//     var sources = gulp.src(['./app/scripts/**/*.js','./app/stylesheets/**/*.css'],{read: false});


//        return gulp.src('index.html')
//            .pipe(inject(sources))
//            .pipe(gulp.dest('./app'));
//});





gulp.task('default',  ['server', 'inject', 'wiredep', 'watch']);
