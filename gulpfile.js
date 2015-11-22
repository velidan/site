var gulp = require('gulp'),
    concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifycss = require('gulp-minify-css');
	
	
gulp.task('styles', function() {
  return gulp.src(['./engine/public/css/*.css'
				  ,'./engine/public/css/thirdparty/**/*.css'
				  ,'./engine/public/fonts/css/*.css'])
    //.pipe(minifycss())
	.pipe(concat('compiled.css'))
    .pipe(gulp.dest('./engine/public/compile/css/'))
});
	
	/*
gulp.task('js_thirdparty', function() {
  return gulp.src(['./engine/public/js/thirdparty/jquery-2.1.4.js'
])
	.pipe(uglify())
    .pipe(concat('compiled.js'))
    .pipe(gulp.dest('./engine/public/compile/js/thirdparty/'));
});
*/
gulp.task('js_thirdpartyFooter', function() {
  return gulp.src(['./engine/public/js/thirdparty/jquery-2.1.4.js'
                   ,'./engine/public/js/thirdparty/bootstrap.js'
                   ,'./engine/public/js/thirdparty/terminal.js'
				 
])
	.pipe(uglify())
    .pipe(concat('compiledFooter.js'))
    .pipe(gulp.dest('./engine/public/compile/js/thirdparty/'));
});



gulp.task('js_utility', function() {
  return gulp.src(['./engine/public/js/utility/*.js'])
	.pipe(uglify())
    .pipe(concat('compiled.js'))
    .pipe(gulp.dest('./engine/public/compile/js/utility/'));
});	

gulp.task('js_angular', function() {
  return gulp.src(['./engine/public/js/angular/vendor/angular.js'
				  ,'./engine/public/js/angular/vendor/angular-route.js'
				  ,'./engine/public/js/angular/vendor/angular-animate.js'
				  ,'./engine/public/js/angular/vendor/loading-bar.js'
				  ,'./engine/public/js/angular/app.js'
				  ,'./engine/public/js/angular/services/*.js'
				  ,'./engine/public/js/angular/routes/*.js'
				  ,'./engine/public/js/angular/controllers/**/*.js'
				  ,'./engine/public/js/angular/factories/*.js'
				  ,'./engine/public/js/angular/directives/*.js'
				 ])
    //.pipe(uglify())
    .pipe(concat('compiled.js'))
    .pipe(gulp.dest('./engine/public/compile/js/angular/'));
});

// Отслеживаем изменения в файлах
gulp.watch(['./engine/public/js/thirdparty/jquery-2.1.4.js'
			  ,'./engine/public/js/thirdparty/bootstrap.js',
			 ], ['js_thirdparty']
);
  
gulp.watch(['./engine/public/js/utility/*.js'
			 ], ['js_utility']
);
			 
gulp.watch(['./engine/public/js/angular/vendor/angular.js'
			  ,'./engine/public/js/angular/vendor/angular-route.js'
			  ,'./engine/public/js/angular/vendor/angular-animate.js'
			  ,'./engine/public/js/angular/app.js'
			  ,'./engine/public/js/angular/routes/*.js'
			  ,'./engine/public/js/angular/controllers/**/*.js'
			  ,'./engine/public/js/angular/directives/*.js'
			  ,'./engine/public/js/angular/services/*.js'
			 ], ['js_angular']
);

gulp.watch(['./engine/public/css/*.css'
            ,'./engine/public/css/thirdparty/*.css'
			 ], ['styles']
);
 
gulp.task('default', function() {  
    gulp.run('js_thirdpartyFooter', 'js_utility', 'js_angular', 'styles');
  });