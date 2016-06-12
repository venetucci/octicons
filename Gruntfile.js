module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
      },
      dist: {
        files: {
          'build/octicons.css': 'index.scss'
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({ browsers: '> 5%' })
        ]
      },
      build: {
        src: 'build/**/*.*css'
      }
    },

    cssnano: {
      options: {
        sourcemap: true
      },
      dist: {
        files: {
          'build/octicons.min.css': 'build/octicons.css',
          'build/font/octicons.min.css': 'build/font/octicons.css'
        }
      }
    },

    svgmin: {
      options: {
        plugins: [
          {removeTitle: true},
          {removeStyleElement: true},
          {removeAttrs: { attrs: ['id', 'class', 'data-name', 'fill', 'fill-rule'] }},
          {removeEmptyContainers: true},
          {sortAttrs: true},
          {removeUselessDefs: true},
          {removeEmptyText: true},
          {removeEditorsNSData: true},
          {removeEmptyAttrs: true},
          {removeHiddenElems: true}
        ]
      },
      large: {
        files: [{
          expand: true,
          cwd: 'lib/svg/l',
          src: ['*.svg'],
          dest: 'build/svg/l'
        }]
      },
      medium: {
        files: [{
          expand: true,
          cwd: 'lib/svg/m',
          src: ['*.svg'],
          dest: 'build/svg/m'
        }],
      },
      small: {
        files: [{
          expand: true,
          cwd: 'lib/svg/s',
          src: ['*.svg'],
          dest: 'build/svg/s'
        }]
      }
    },

    svg_sprite: {
      large: {
        files: [{
          expand: true,
          cwd: 'lib/svg/l',
          src: ['*.svg'],
          dest: 'build/'
        }],
        options: {
          mode: {
            symbol: {
              dest: "",
              sprite: "sprite.octicons.large.svg"
            }
          }
        }
      },
      medium: {
        files: [{
          expand: true,
          cwd: 'lib/svg/m',
          src: ['*.svg'],
          dest: 'build/'
        }],
        options: {
          mode: {
            symbol: {
              dest: "",
              sprite: "sprite.octicons.medium.svg"
            }
          }
        }
      },
      small: {
        files: [{
          expand: true,
          cwd: 'lib/svg/s',
          src: ['*.svg'],
          dest: 'build/'
        }],
        options: {
          mode: {
            symbol: {
              dest: "",
              sprite: "sprite.octicons.small.svg"
            }
          }
        }
      }
    },

    webfont: {
      options: {
        font: "octicons",
        fontFamilyName: "Octicons",
        types: 'eot,woff,woff2,ttf,svg',
        fontHeight: 96,
        normalize: false,
        ascent: 84,
        descent: 12,
        htmlDemo: false,
        codepointsFile: 'lib/font/codepoints.json',
        templateOptions: {
          baseClass: 'octicon',
          classPrefix: 'octicon-',
          mixinPrefix: 'octicon-',
          fontFamilyName: "Octicons"
        }
      },
      octicons_css: {
        src: 'lib/svg/*.svg',
        dest: 'build/font',
        options: {
          template: 'lib/font/template.css'
        }
      },
      octicons_scss: {
        src: 'lib/svg/*.svg',
        dest: 'build/font',
        options: {
          stylesheet: 'scss',
          template: 'lib/font/template.scss'
        }
      }
    },

    clean: {
      font: [
        'build/font/*'
      ],
      svg: [
        'build/svg/*',
        'build/sprite.octicons.svg',
        'build/octicons.*'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-svg-sprite');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-cssnano');
  grunt.loadNpmTasks('grunt-sass');

  // build tasks
  grunt.registerTask('css',  ['sass', 'postcss', 'cssnano']);
  grunt.registerTask('font', ['clean:font', 'webfont']);
  grunt.registerTask('svg', ['clean:svg', 'svgmin', 'svg_sprite']);

  // default task, build /dist/
  grunt.registerTask('default', [ 'svg', 'font', 'css']);
};
