define(
  ['angularMocks', 'controllers/controllers', 'controllers/partial1'],
  function()
  {
    describe('Partial1 Controller',
      function ()
      {
        beforeEach(module('controllers'));

        it('should ....',
          inject(function ()
          {
            //spec body
          })
        );
      }
    );
  }
);