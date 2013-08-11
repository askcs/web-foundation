define(
  ['angularMocks', 'controllers/controllers', 'controllers/home'],
  function()
  {
    describe('Home Controller',
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