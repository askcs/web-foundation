'use strict';

var LIVERELOAD_PORT = 35729,
    lrSnippet       = require('connect-livereload')({ port: LIVERELOAD_PORT }),
    mountFolder     = function (connect, dir)
                      {
                        return connect.static(require('path').resolve(dir));
                      },
    markdown        = require('marked'),
    semver          = require('semver');


module.exports = function (grunt)
{
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var appConfig = {
    app:  'app',
    dist: 'dist'
  };

  try {
    appConfig.app = require('./bower.json').appPath || appConfig.app;
  } catch (e) {}

  grunt.initConfig(
    {
      pkg: grunt.file.readJSON('package.json'),

      paths: appConfig,

      jade: {
        index: {
          options: {
            pretty: true
          },
          files: {
            '.tmp/index.html': ['<%= paths.app %>/index.jade']
          }
        },
        views: {
          options: {
            pretty: true
          },
          files: [{
            expand: true,
            cwd: '<%= paths.app %>',
            dest: '.tmp',
            src: 'views/*.jade',
            ext: '.html'
          }]
        }
      },

      watch: {
        jade: {
          files: ['<%= paths.app %>/{,*/}*.jade'],
          tasks: ['jade']
        },
        compass: {
          files: ['<%= paths.app %>/styles/{,*/}*.{scss,sass}'],
          tasks: ['compass:server']
        },
        livereload: {
          options: {
            livereload: LIVERELOAD_PORT
          },
          files: [
            '.tmp/{,*/}*.html',
            '{.tmp,<%= paths.app %>}/styles/{,*/}*.css',
            '{.tmp,<%= paths.app %>}/scripts/{,*/}*.js',
            '<%= paths.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      },

      connect: {
        options: {
          port: 9000,
          // Change this to '0.0.0.0' to access the server from outside.
          hostname: '0.0.0.0' //'localhost'
        },
        livereload: {
          options: {
            middleware: function (connect)
            {
              return [
                lrSnippet,
                mountFolder(connect, '.tmp'),
                mountFolder(connect, appConfig.app)
              ];
            }
          }
        },
        test: {
          options: {
            middleware: function (connect)
            {
              return [
                mountFolder(connect, '.tmp'),
                mountFolder(connect, 'test')
              ];
            }
          }
        },
        dist: {
          options: {
            middleware: function (connect)
            {
              return [
                mountFolder(connect, appConfig.dist)
              ];
            }
          }
        }
      },

      clean: {
        dist: {
          files: [{
            dot: true,
            src: [
              '.tmp',
              '<%= paths.dist %>/*',
              '!<%= paths.dist %>/vendors*',
              '!<%= paths.dist %>/WEB-INF*',
              '!<%= paths.dist %>/.git*'
            ]
          }]
        },
        server: '.tmp'
      },

      jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        all: [
          'Gruntfile.js',
          '<%= paths.app %>/scripts/{,*/}*.js'
        ]
      },

      compass: {
        options: {
          sassDir: '<%= paths.app %>/styles',
          cssDir: '.tmp/styles',
          generatedImagesDir: '.tmp/images/generated',
          imagesDir: '<%= paths.app %>/images',
          javascriptsDir: '<%= paths.app %>/scripts',
          fontsDir: '<%= paths.app %>/styles/fonts',
          importPath: '<%= paths.app %>/vendors',
          httpImagesPath: '/images',
          httpGeneratedImagesPath: '/images/generated',
          httpFontsPath: '/styles/fonts',
          relativeAssets: false
        },
        dist: {},
        server: {
          options: {
            debugInfo: true
          }
        }
      },

      /*
      concat: {
       dist: {}
       },
       */

      rev: {
        dist: {
          files: {
            src: [
              '<%= paths.dist %>/scripts/main.js',
              '<%= paths.dist %>/styles/{,*/}*.css',
              '<%= paths.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
              '<%= paths.dist %>/styles/fonts/*'
            ]
          }
        }
      },

      useminPrepare: {
        html: '.tmp/index.html',
        options: {
          dest: '<%= paths.dist %>'
        }
      },

      usemin: {
        html: ['<%= paths.dist %>/{,*/}*.html'],
        css: ['<%= paths.dist %>/styles/{,*/}*.css'],
        options: {
          dirs: ['<%= paths.dist %>']
        }
      },

      imagemin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= paths.app %>/images',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: '<%= paths.dist %>/images'
          }]
        }
      },

      cssmin: {
        // By default, your `index.html` <!-- Usemin Block --> will take care of
        // minification. This option is pre-configured if you do not wish to use
        // Usemin blocks.
        // dist: {
        //   files: {
        //     '<%= paths.dist %>/styles/main.css': [
        //       '.tmp/styles/{,*/}*.css',
        //       '<%= paths.app %>/styles/{,*/}*.css'
        //     ]
        //   }
        // }
      },

      htmlmin: {
        dist: {
          options: {
            /*removeCommentsFromCDATA: true,
             // https://github.com/paths/grunt-usemin/issues/44
             //collapseWhitespace: true,
             collapseBooleanAttributes: true,
             removeAttributeQuotes: true,
             removeRedundantAttributes: true,
             useShortDoctype: true,
             removeEmptyAttributes: true,
             removeOptionalTags: true*/
          },
          files: [{
            expand: true,
            cwd: '.tmp',
            src: ['*.html', 'views/*.html'],
            dest: '<%= paths.dist %>'
          }]
        }
      },

      copy: {
        dist: {
          files: [{
            expand: true,
            dot: true,
            cwd: '<%= paths.app %>',
            dest: '<%= paths.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              'vendors/**/*',
              'images/{,*/}*.{gif,webp}',
              'styles/fonts/*'
            ]
          }, {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= paths.dist %>/images',
            src: [
              'generated/*'
            ]
          }]
        }
      },

      concurrent: {
        server: [
          'compass:server',
          'jade'
        ],
        test: [
          'compass'
        ]
      },

      karma: {
        unit: {
          configFile: 'karma.conf.js',
          singleRun: false
        },
        end: {
          configFile: 'karma-e2e.conf.js',
          singleRun: false
        }
      },

      ngmin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= paths.dist %>/scripts',
            src: '**/*.js',
            dest: '<%= paths.dist %>/scripts'
          }]
        }
      },

      requirejs: {
        compile: {
          options: {
            appDir: '<%= paths.app %>/scripts/',
            baseUrl: '.',
            dir: '<%= paths.dist %>/scripts/',
            optimize: 'uglify',
            mainConfigFile:'./<%= paths.app %>/scripts/main.js',
            logLevel: 0,
            findNestedDependencies: true,
            fileExclusionRegExp: /^\./,
            inlineText: true
          }
        }
      },

      changelog: {
        options: {
          dest: 'CHANGELOG.md',
          versionFile: 'package.json'
        }
      },

      release: {
        options: {
          commitMessage: '<%= version %>',
          tagName: 'v<%= version %>',
          tagMessage: 'tagging version <%= version %>',
          bump: false,
          file: 'package.json',
          add: true,
          commit: true,
          tag: true,
          push: true,
          pushTags: true,
          npm: false
        }
      },

      stage: {
        options: {
          files: ['CHANGELOG.md']
        }
      },

      replace: {
        dist: {
          options: {
            variables: {
              version: '<%= pkg.version %>',
              released: grunt.template.today('dddd, mmmm dS, yyyy, h:MM:ss TT')
            }
          },
          prefix: '@@',
          files: [
            {
              expand: true,
              flatten: true,
              src: ['<%= paths.dist %>/scripts/config.js'],
              dest: '<%= paths.dist %>/scripts/'
            }
          ]
        }
      }
    });

  grunt.registerTask('bump',
    'bump manifest version',
    function (type)
    {
      var options = this.options({
        file: grunt.config('pkgFile') || 'package.json'
      });

      function setup(file, type) {
        var pkg = grunt.file.readJSON(file);
        var newVersion = pkg.version = semver.inc(pkg.version, type || 'patch');
        return {
          file: file,
          pkg: pkg,
          newVersion: newVersion
        };
      }

      var config = setup(options.file, type);
      grunt.file.write(config.file, JSON.stringify(config.pkg, null, '  ') + '\n');
      grunt.log.ok('Version bumped to ' + config.newVersion);
    }
  );

  grunt.registerTask('stage',
    'git add files before running the release task',
    function ()
    {
      var files = this.options().files;
      grunt.util.spawn({

        // TODO (Test this if it is really needed git.cmd??)
        // cmd: process.platform === 'win32' ? 'git.cmd' : 'git',
        cmd: 'git',

        args: ['add'].concat(files)
      }, grunt.task.current.async());
    }
  );

  grunt.registerTask('server',
    'start a web server with extras',
    function (target)
    {
      if (target === 'dist')
      {
        return grunt.task.run(['build', 'connect:dist:keepalive']);
      }

      grunt.task.run([
        'clean:server',
        'concurrent:server',
        'connect:livereload',
        'watch'
      ]);
    }
  );

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'compass:dist',
    'jade',
    'useminPrepare',
    'imagemin',
    'htmlmin',
    'concat',
    'copy',
    'ngmin',
    'cssmin',
    'requirejs',
    'rev',
    'usemin',
    'replace'
  ]);

  grunt.registerTask('patch', [
    'bump:patch',
    'changelog',
    'stage',
    'release:patch',
    'replace'
  ]);

  grunt.registerTask('minor', [
    'bump:minor',
    'changelog',
    'stage',
    'release:minor',
    'replace'
  ]);

  grunt.registerTask('major', [
    'bump:major',
    'changelog',
    'stage',
    'release:major',
    'replace'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};