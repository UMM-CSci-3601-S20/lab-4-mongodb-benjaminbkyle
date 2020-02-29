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

  it('Should type something in the category filter and check that it returned the correct elements', async () => {
    await page.typeInput('todo-category-input', 'video games');

    // All of the todos returned should have the category we are filtering by
    page.getTodoListItems().each(e => {
      expect(e.element(by.className('todo-list-role')).getText()).toEqual('video games');
    });
  });
});
