import { TodoPage } from './todo-list.po';
import { browser, protractor, by, element } from 'protractor';

describe('Todo list', () => {
  let page: TodoPage;
  const EC = protractor.ExpectedConditions;

  // make a new page and navigate to it before each test
  beforeEach(() => {
    page = new TodoPage();
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  // ---------- Filtering Tests ---------- //
  // ---------- Body Filtering ---------- //
  it('Check that there is one todo with body provided from DB', async () => {
    await page.typeInput('todo-body-input', 'Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.');

    // All of the todos returned should have the body we are filtering by
    page.getTodoListItems().each( async e => {
      const body = await e.element(by.className('todo-list-body')).getText();
      expect(body.toLowerCase()
      .includes('ullamco irure laborum magna dolor non. anim occaecat adipisicing cillum eu magna in.')).toBe(true);
    });

  });

  it('Check that all todos returned contain the substring \'tempor\' in body', async () => {
    await page.typeInput('todo-body-input', 'tempor');

    // All todos should have this body as a substring
    page.getTodoListItems().each(async e => {
      const body = await e.element(by.className('todo-list-body')).getText();
      expect(body.toLowerCase().includes('tempor')).toBe(true);
    });

  });

  it('Should type \'asddfjkfjksdjfkd\' in the body filter and check that it returned no todos', async () => {
    await page.typeInput('todo-body-input', 'asddfjkfjksdjfkd');

    // Should be no todos with this body
    page.getTodoListItems().each(async e => {
      const body = await e.element(by.className('todo-list-body')).getText();
      expect(body.toLowerCase().length === 0).toBe(true);
    });
  });

  it('Should type empty string in the body filter and check that it returned all todos (no filtering)', async () => {
    await page.typeInput('todo-body-input', '');

    // Should be all todos with this body
    page.getTodoListItems().each(async e => {
      const body = await e.element(by.className('todo-list-body')).getText();
      expect(body.toLowerCase().length > 0).toBe(true);
     });
  });



  // ---------- Category Filtering ---------- //
  it('Should type video games in the category filter and check that it returned the correct elements', async () => {
    await page.typeInput('todo-category-input', 'video games');

    // All of the todos returned should have the category we are filtering by
    page.getTodoListItems().each(e => {
      expect(e.element(by.className('todo-list-category')).getText()).toEqual('video games');
    });
  });

  it('Should type asddfjkfjksdjfkd in the category filter and check that it returned no todos', async () => {
    await page.typeInput('todo-category-input', 'asddfjkfjksdjfkd');

    // All of the todos returned should have the category we are filtering by
    page.getTodoListItems().each(e => {
      expect(e.element(by.className('todo-list-category')).count().toEqual(0));
    });
  });

  it('Should type empty string in the category filter and check that it returned all todos (no filtering)', async () => {
    await page.typeInput('todo-category-input', '');
    // All of the todos returned should have the category we are filtering by
    page.getTodoListItems().each(e => {

    });
  });
});
