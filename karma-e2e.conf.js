module.exports = function (karma)
{
  'use strict';

  karma.set({
    frameworks: ['ng-scenario'],
    files: [
      {pattern: 'app/vendors/**/*.js',        included: false},
      {pattern: 'app/scripts/*.js',           included: false},
      {pattern: 'app/scripts/**/*.js',        included: false},
      {pattern: 'test/spec/controllers/*.js', included: false},
      {pattern: 'test/spec/directives/*.js',  included: false},
      {pattern: 'test/spec/filters/*.js',     included: false},
      {pattern: 'test/spec/services/*.js',    included: false},
      'test/e2e/scenarios/*.js'
    ],
    basePath: '',
    exclude: [],
    reporters: ['progress'],
    port: 8080,
    runnerPort: 9100,
    colors: true,
    logLevel: karma.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeCanary'],
    captureTimeout: 30000,
    singleRun: false,
    proxies: {
      '/': 'http://localhost:9000/'
    },
    urlRoot: '/_karma_/',
    plugins: [
      'karma-ng-scenario',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher'
    ]
  });
};