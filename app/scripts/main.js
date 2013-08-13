if (window.location.port == '8080')
{
  document.getElementsByTagName('html')[0].setAttribute('ng-app');
}

require.config (
  {
    paths: {
      angular:  '../vendors/angular/angular',
      jquery:   '../vendors/jquery/jquery.min',
      domReady: '../vendors/requirejs-domready/domReady'
    },
    shim: {
      angular: {
        deps:     ['jquery'],
        exports:  'angular'
      }
    }
  }
);

require (
  [
    'angular',
    'app',
    'domReady',
    'run',
    'config',
    'controllers/home',
    'controllers/partial1',
    'controllers/partial2',
    'directives/appVersion',
    'filters/interpolate',
    'services/version',
    'services/user'
    // Any individual controller, service, directive or filter file
    // that you add will need to be pulled in here.
  ],
  function (angular, app, domReady)
  {
    'use strict';

    // $('html').removeAttr('ng-app');

    app.config(
      [
        '$routeProvider',
        function ($routeProvider)
        {
          $routeProvider
            .when('/home',
            {
              templateUrl:  'views/home.html',
              controller:   'home'
            })
            .when('/partial1',
            {
              templateUrl:  'views/partial1.html',
              controller:   'partial1'
            })
            .when('/partial2',
            {
              templateUrl:  'views/partial2.html',
              controller:   'partial2'
            })
            .otherwise({
              redirectTo: '/home'
            });
        }
      ]
    );

    domReady(function ()
      {
        angular.bootstrap(document, ['MyApp']);
      }
    );

  }
);