define(
  ['services/services'],
  function (services)
  {
    'use strict';

    services.factory('User',
      [
        function ()
        {
          return {
            get: function ()
            {
              return 'Test User';
            }
          };
        }
      ]
    );
  }
);