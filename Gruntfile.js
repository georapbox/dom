module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/**/*.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},

		watch: {
			scripts: {
				files: ['src/**/*.js'],
				tasks: ['uglify']
			}
		}
	});

	// Load plugins.
  	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-watch');

  	// Default task(s).
  	grunt.registerTask('default', ['uglify']);
};