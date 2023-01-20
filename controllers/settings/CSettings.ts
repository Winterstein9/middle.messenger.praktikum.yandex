import { HTTPTransport } from "../../engine/HTTPTransport";
import { Navigator } from "../../engine/navigator";

export class CSettings {
  HTTPTransport: HTTPTransport = new HTTPTransport();
  Navigator: Navigator = new Navigator();
  constructor() {
    this.getDataUser();
    this.logout();
  }

  getDataUser() {
    this.HTTPTransport.get("auth/user", { method: "GET" }).then((ans) => {
      const inputs = document.querySelectorAll(".un__form > input");
      if (inputs) {
        inputs.forEach((input: HTMLInputElement) => {
          for (let i in ans) {
            if (input.name == i) {
              input.value = ans[i];
            }
          }
        });
      }
    }).catch((err: string) => {
        console.error("error", err);
      });
  }

  logout() {
    document.querySelector("#logout")?.addEventListener("click", (e) => {
      e.preventDefault();
      new HTTPTransport().get("auth/logout", { method: "POST" }).then((ans) => {
        if (ans === "OK") {
          this.Navigator.segue("/");
        }else {
          console.log("exit")
          this.Navigator.segue("/");
        }
      });
    });
  }
}
