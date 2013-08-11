define(
  ['app'],
  function (app)
  {
    'use strict';

    app.run(
      [
        '$rootScope', '$location',
        function($rootScope, $location)
        {
          $rootScope.$on('$routeChangeStart', function (event, next, current)
          {
            // Remove this lines on production, eye-candy purple background for the home/splash page
            ($location.path() == '/home') ? $('body').addClass('bs-docs-home') : $('body').removeClass('bs-docs-home');
          });

          $rootScope.$on('$routeChangeSuccess', function (event, current, previous)
          {
          });

          $rootScope.$on('$routeChangeError', function (event, current, previous, rejection)
          {
            console.error('Error: changing routes!');
          });
        }
      ]
    );
  }
);