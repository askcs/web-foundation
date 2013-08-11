define(
  ['controllers/controllers', 'config'],
  function (controllers, config)
  {
    'use strict';

    controllers.controller ('home',
      [
        '$scope',
        function ($scope)
        {
          // console.log('config ->', config);
          $scope.naming = 'Cengiz';
        }
      ]
    );
  }
);