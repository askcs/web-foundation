define(
  ['controllers/controllers'],
  function (controllers)
  {
    'use strict';

    controllers.controller ('partial2',
      [
        '$scope',
        function ($scope)
        {
          $scope.contact = {
            name:       null,
            email:      null,
            message:    null,
            confirmed:  false
          };

          $scope.send = function ()
          {
            $scope.sending = $scope.contact;
          };
        }
      ]
    );
  }
);