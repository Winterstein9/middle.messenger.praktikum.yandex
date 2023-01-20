//import "../index/index.html"
import { idea } from "./idea";
import type { Idea, Page, Component, Data } from "./idea";

export class Navigator {
  nav: HTMLElement;
  pages: Idea;
  title: HTMLElement | null = document.querySelector("#title");
  sail: Record<string, Page> = {};

  private static _Navigator: Navigator;

  constructor() {
    if (Navigator._Navigator) {
      return Navigator._Navigator;
    }
    Navigator._Navigator = this;

    this.pages = idea;
    this.pages.map((page: Page) => {
      this.setSail(page);
    });
  }

  setSail(page: Page) {
    if (page.id != "/") {
      this.sail[`/${page.id}`] = page;
    } else {
      this.sail["/"] = page;
    }
  }

  segue(path?: string | null) {
    let link = path || document.location.pathname;
    if (path) {
      document.location.pathname = path;
    }
    let web: Page = this.sail[link];
    if (web) {
      document.body.innerHTML = web.page();
      this.setTitle(web.title);
      if (web.components) {
        this.addComponents(web.components);
      }
      if (web.data) {
        this.addData(web.data);
      }

      if (web.control) {
        new web.control();
      }
      if (web.valid) {
        new web.valid();
      }
    } else {
      document.body.innerHTML = this.sail["/404"].page();
      this.setTitle(this.sail["/404"].title);
    }
  }

  setTitle(title: string) {
    if (this.title) {
      this.title.textContent = title;
    }
  }

  addComponents(components: Component) {
    let containerComponent: HTMLElement | null;
    if (components.length == 1) {
      containerComponent = document.querySelector(components[0].selector);
      if (containerComponent) {
        containerComponent.innerHTML = new components[0].component().add(
          components[0].args
        );
      }
    } else {
      components.map((component) => {
        containerComponent = document.querySelector(component.selector);
        if (containerComponent) {
          containerComponent.innerHTML += new component.component().add(
            component.args
          );
        }
      });
    }
  }

  addData(data: Data) {
    let dataContainert: HTMLElement | null;
    if (data.length == 1) {
      dataContainert = document.querySelector(data[0].selector);
      if (dataContainert) {
        dataContainert.innerHTML = data[0].data;
      }
    } else {
      data.map((data) => {
        dataContainert = document.querySelector(data.selector);
        if (dataContainert) {
          dataContainert.innerHTML = data.data;
        }
      });
    }
  }
}

new Navigator().segue();
