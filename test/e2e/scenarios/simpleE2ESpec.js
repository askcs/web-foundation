describe('Simple E2e Test', function ()
{
  it('Should open the front page and check', function ()
  {
    browser().navigateTo('/#/partial1');

    sleep(1);

    expect(element('#test').html()).toEqual('Hi Test User');

  });
});