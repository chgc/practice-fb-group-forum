import { FbforumPage } from './app.po';

describe('fbforum App', function() {
  let page: FbforumPage;

  beforeEach(() => {
    page = new FbforumPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
