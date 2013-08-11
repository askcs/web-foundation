define(
  ['angularMocks', 'filters/filters', 'filters/interpolate'],
  function()
  {
    describe('Interpolate Filter',
      function ()
      {
        beforeEach(module('filters'));

        beforeEach(module(function ($provide)
        {
          $provide.value('version', '@@version');
        }));

        it('should replace VERSION',
          inject(function (interpolateFilter)
          {
            expect(interpolateFilter('before %VERSION% after')).toEqual('before @@version after');
          })
        );
      }
    );
  }
);