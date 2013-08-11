define(
  ['filters/filters', 'config'],
  function (filters, config)
  {
    'use strict';

    filters.filter('interpolate',
      [
        function ()
        {
          return function (text)
          {
            text = String(text).replace(/\%RELEASED\%/mg, config.app.released);

            return String(text).replace(/\%VERSION\%/mg, config.app.version);
          }
        }
      ]
    );
  }
);
