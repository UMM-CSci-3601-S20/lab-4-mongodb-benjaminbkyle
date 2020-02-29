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
    let count = 0;
    // All of the todos returned should have the category we are filtering by
    page.getTodoListItems().each(e => {
      count++;
    });
    expect(count > 0);
    //expect(count === 300); - passes when using default "dev" database file w/300 todos. Otherwise, adding will break this test
  });
});
