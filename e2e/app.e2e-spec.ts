import { DemoNG2Page } from './app.po';

describe('demo-ng2 App', function() {
  let page: DemoNG2Page;

  beforeEach(() => {
    page = new DemoNG2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
