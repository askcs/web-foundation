define(
  ['angularMocks', 'services/services', 'services/version'],
  function()
  {
    describe('Version Service',
      function ()
      {
        beforeEach(module('services'));

        it('should return current version',
          inject(function (version)
          {
            expect(version).toEqual('@@version');
          })
        );
      }
    );
  }
);