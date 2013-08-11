describe('Simple E2e Test', function ()
{

  it('should open the partial 1 page and check div test', function ()
  {
    browser().navigateTo('/#/partial1');

    sleep(1);

    expect(element('#test').html()).toEqual('Hi Test User');

  });


  it('should open the partial 2 (contact) page and fill the form', function ()
  {
    browser().navigateTo('/#/partial2');

    sleep(1);

		input('contact.name').enter('Jack Sparrow');

		input('contact.email').enter('jacksparrow@pirates.com');

		input('contact.message').enter('The lights and candles to be put out at eight oclock at night: if any of the crew, after that hour still remained inclined for drinking, they were to do it on the open deck.');

		input('contact.confirmed').check(true);
		
		sleep(20);

		element(':button').click();

  });
});