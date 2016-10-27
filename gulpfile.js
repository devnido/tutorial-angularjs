var gulp = require('gulp'),
 connect = require('gulp-connect');


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
// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
     gulp.watch(['./app/**/*.html'], ['html']);
     gulp.watch(['./app/stylesheets/**/*.styl'], ['css']);
});


gulp.task('default', [ 'watch','server']);
