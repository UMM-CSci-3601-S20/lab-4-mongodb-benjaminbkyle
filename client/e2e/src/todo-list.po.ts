import {browser, by, element, Key, ElementFinder} from 'protractor';

export class TodoPage {
  navigateTo() {
    return browser.get('/todos');
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  getTodoTitle() {
    const title = element(by.className('todo-list-title')).getText();
    return title;
  }

  async typeInput(inputId: string, text: string) {
    const input = element(by.id(inputId));
    await input.click();
    await input.sendKeys(text);
  }

  selectMatSelectValue(selectID: string, value: string) {
    const sel = element(by.id(selectID));
    return sel.click().then(() => {
      return element(by.css('mat-option[value="' + value + '"]')).click();
    });
  }

  getTodoListItems() {
    return element(by.className('todo-nav-list')).all(by.className('todo-list-item'));
  }

  clickAddTodoFAB() {
    return element(by.className('add-todo-fab')).click();
  }
}
