import { browser, protractor, by, element, utils } from 'protractor';
import { AddTodoPage, TestTodo } from './add-todo.po';
import { E2EUtil } from './e2e.util';
import { stringify } from 'querystring';

describe('Add todo', () => {
  let page: AddTodoPage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new AddTodoPage();
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    expect(page.getTitle()).toEqual('New Todo');
  });


  it('Should enable and disable the add todo button', async () => {
    expect(element(by.buttonText('ADD TODO')).isEnabled()).toBe(false);
    await page.typeInput('ownerField', 'test');
    expect(element(by.buttonText('ADD TODO')).isEnabled()).toBe(false);
    await page.typeInput('categoryField', 'testing');
    expect(element(by.buttonText('ADD TODO')).isEnabled()).toBe(false);
    await page.typeInput('bodyField', 'example text');
    expect(element(by.buttonText('ADD TODO')).isEnabled()).toBe(false);
    await page.selectMatSelectValue('statusField', 'true');
    expect(element(by.buttonText('ADD TODO')).isEnabled()).toBe(true);
  });

  it('Should add a new todo and go to the right page', async () => {
    const todo: TestTodo = {
      owner: E2EUtil.randomAlpha(10),
      status: 'true',
      body: E2EUtil.randomAlpha(30),
      category: E2EUtil.randomAlpha(15)
    };

    await page.addTodo(todo);

    // url should not change as we do not navigate away from the page
    await browser.wait(EC.urlContains('todos/new'), 10000);
  });

});
