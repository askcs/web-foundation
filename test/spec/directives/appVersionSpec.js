define(
  ['angularMocks', 'directives/directives', 'directives/appVersion'],
  function()
  {
    describe('App Version Directive',
      function ()
      {
        beforeEach(module('directives'));

        it('should print current version',
          function ()
          {
            module(function ($provide)
            {
              $provide.value('version', 'TEST_VER');
            });

            inject(function ($compile, $rootScope)
            {
              var element = $compile('<span app-version></span>')($rootScope);
              expect(element.text()).toEqual('TEST_VER');
            });
          }
        );
      }
    );
  }
);