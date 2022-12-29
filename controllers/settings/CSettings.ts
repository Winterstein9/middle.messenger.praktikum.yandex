import { HTTPTransport } from "../../engine/HTTPTransport";
import { Navigator } from "../../engine/navigator";
import { idea } from "../../engine/idea";

export class CSettings {
  HTTPTransport: HTTPTransport = new HTTPTransport();
  constructor() {
    this.getDataUser();
    this.logout();
  }

  getDataUser() {
    this.HTTPTransport.get("auth/user", { method: "GET" }).then((ans) => {
      let inputs = document.querySelectorAll(".un__form > input");
      if (inputs) {
        inputs.forEach((input: HTMLInputElement) => {
          for (let i in ans) {
            if (input.name == i) {
              input.value = ans[i];
            }
          }
        });
      }
    });
  }

  logout() {
    document.querySelector("#logout")?.addEventListener("click", (e) => {
      e.preventDefault();
      new HTTPTransport().get("auth/logout", { method: "POST" }).then((ans) => {
        if (ans === "OK") {
          localStorage.clear();
          new Navigator(idea, "/");
        }
      });
    });
  }
}
