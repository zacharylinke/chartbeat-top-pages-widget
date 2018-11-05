module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'js/dist/<%= pkg.name %>.min.js': 'js/src/zl-chartbeat-widget.js'
        }
      }
    },
    qunit: {
      options: {
        '--web-security': 'no'
      },
      all: ['js/test/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'js/src/*.js', 'js/test/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          console: true,
          module: true,
          document: true
        }
      }
    },
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: ['> 0.05%', 'ie >= 8'], cascade: false}),
          require('cssnano')()
        ],
      },
      dist: {
        src: 'css/dist/*.css'
      }
    },
    sass: {
      options: {
        style: 'expanded'
      },
      dist: {
        files: {
          'css/dist/zl-chartbeat-widget.min.css' : 'css/src/zl-chartbeat-widget.scss'
        }
      }
    },
    scsslint: {
      allfiles: ['css/src/*.scss']
    },
    watch: {
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'qunit', 'uglify']
      },
      scss: {
        files: 'css/src/*.scss',
        tasks: ['scsslint', 'sass:dist', 'postcss:dist']
      }

    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-scss-lint');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['jshint', 'scsslint', 'sass', 'postcss', 'qunit', 'uglify', 'watch']);

};
