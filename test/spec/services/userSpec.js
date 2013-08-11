define(
  ['angularMocks', 'services/services', 'services/user'],
  function()
  {
    describe('User Service',
      function ()
      {
        beforeEach(module('services'));

        var user;

        beforeEach(inject(function (User)
        {
          user = User;
        }));

        it('should have user',
          function()
          {
            expect(user.get()).toEqual('Test User');
          }
        );

        it('should not equal to user',
          function()
          {
            expect(user.get() + '-test').not.toEqual('Test User 2');
          }
        );

        it('should be equal to changed user',
          function()
          {
            expect(user.get() + ' -test').toEqual('Test User -test');
          }
        );
      }
    );
  }
);