import { browser, by, element, Key, ElementFinder } from 'protractor';

export interface TestTodo {
  owner: string;
  status: boolean;
  body: string;
  category: string;
}

export class TodoPage{
  navigateTo() {
    return browser.get('/todos/new');
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  getTitle() {
    const title = element(by.className('add-todo-title')).getText();
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

  clickAddTodo() {
    return element(by.buttonText('ADD USER')).click();
  }

  async addTodo(newTodo: TestTodo) {
    await this.typeInput('ownerField', newTodo.owner);
    await this.typeInput('categoryField', newTodo.category);
    await this.typeInput('bodyField', newTodo.body);
    await this.selectMatSelectValue('statusField', newTodo.status.toString());
    return this.clickAddTodo();
  }
}
