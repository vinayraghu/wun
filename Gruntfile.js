module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['scripts/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          sourcemap: true,
          lineNumbers: false,
          noCache: true
        },
        files: {
          'css/style.css': 'scss/style.scss',
        },
      }
    },
    sassdown: {
      styleguide: {
        options: {
          assets: ['css/style.css'],
          highlight: 'monokai',
          excludeMissing: true,
          commentStart: /\/\*doc/,
          commentEnd: /\*\//
        },
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['**/*.scss'],
          dest: 'public/styleguide'
        }]
      }
    },
    autoprefixer: {
      css: {
        options: {
          browsers: ['last 2 version'],
          cascade: true,
        },
        src: 'css/style.css',
        dest: 'css/style.css'
      },
    },
    csscomb: {
        options: {
            config: 'csscomb.json'
        },
        files: {
          'css/style.css': 'css/style.css'
        },
    },
    watch: {
      styleguide: {
        files: ['scss/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'csscomb', 'sassdown'],
        options: {
         livereload: 1337,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('sassdown-v');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-csscomb');

  grunt.registerTask('styleguide', ['sass', 'autoprefixer', 'csscomb', 'sassdown', 'watch'])
};

