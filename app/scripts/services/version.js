define(
  ['services/services', 'config'],
  function (services, config)
  {
    'use strict';

    services.value('version', config.app.version);
  }
);