var tests = Object.keys(window.__karma__.files)
              .filter(function (file)
                      {
                        // run tests - only files ending with "Spec.js"
                        return /Spec\.js$/.test(file);
                      }
              );

requirejs.config(
  {
    baseUrl: '/base/app/scripts',

    paths: {
      angular:      '../vendors/angular/angular.min',
      jquery:       '../vendors/jquery/jquery.min',
      domReady:     '../vendors/requirejs-domready/domReady',
      angularMocks: '../vendors/angular-mocks/angular-mocks',
      unitTest:     '../../test/spec'
    },

    shim: {
      angular: {
        exports: 'angular',
        deps:    ['jquery']
      },
      angularMocks: {
        deps: ['angular']
      }
    },

    deps: tests,

    callback: window.__karma__.start
  }
);
