import { HTTPTransport } from "./HTTPTransport";
import { Navigator } from "./navigator";
import { idea } from "./idea";

import { CChat } from "../controllers/chat/CChat";

export default class ValidForm {
  unForms: NodeList;
  inputs: NodeListOf<HTMLInputElement> | null;
  HTTPTransport: HTTPTransport = new HTTPTransport();

  chatController: CChat = new CChat();

  ids: Record<string, RegExp> = {
    first_name: new RegExp("^[A-Za-z0-9_-]{3,16}$"),
    second_name: new RegExp("^[A-Za-z0-9_-]{3,16}$"),
    email: new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$", "i"),
    phone: new RegExp("^[+0-9_-]{11,12}$"),
    password: new RegExp("[a-z0-9_-]{3,16}$"),
    login: new RegExp("^[A-Za-z0-9_-]{3,16}$"),
    chatName: new RegExp("[A-Za-z0-9]{3,16}$"),
    searchUserName: new RegExp("^[A-Za-z0-9_-]{3,10}$"),
    oldPassword: new RegExp("[a-z0-9_-]{3,16}$"),
    newPassword: new RegExp("[a-z0-9_-]{3,16}$"),
  };

  userData: Record<string, string> = {};

  constructor() {
    if (location.pathname == "/") {
      let login = localStorage.getItem("Login");
      if (login) {
        new Navigator(idea, "/chats");
      }
    }

    this.unForms = document.querySelectorAll(".un__form");
    if (this.unForms !== null) {
      this.unForms.forEach((form: HTMLFormElement) => {
        let inputs: NodeListOf<HTMLInputElement> | null =
          form.querySelectorAll(".un__form > input");
        this.setInputsEvents(inputs);

        form.addEventListener("submit", (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          this.validSubmit(inputs);
        });
      });
    }
  }

  setInputsEvents(inputs: NodeListOf<HTMLInputElement> | null) {
    if (this.unForms) {
      this.validFocus(inputs);
      this.validBlur(inputs);
      this.validKeyup(inputs);
    }
  }

  validSubmit(inputs: NodeListOf<HTMLInputElement> | null) {
    this.inputs = inputs;
    if (this.inputs !== null && this.inputs !== undefined) {
      this.inputs.forEach((input: HTMLInputElement) => {
        let result: string[] | null = input.value.match(this.ids[input.name]);
        if (result == null) {
          this.addInputError(input);
        } else {
          this.removeInputError(input);
          this.userData[input.name] = input.value;
          if (this.inputs?.length == Object.keys(this.userData).length) {
            let location: string = document.location.pathname;
            if (location == "/") {
              this.HTTPTransport.post("auth/signin", {
                method: "POST",
                data: this.userData,
              }).then((ans) => {
                console.log("ans", ans);
                if (ans === "OK") {
                  console.log("ans OK", ans);
                  new Navigator(idea, "/chats");
                }
              });
            } else if (location == "/sign_up") {
              this.HTTPTransport.post("auth/signup", {
                method: "POST",
                data: this.userData,
              }).then((ans) => {
                if (ans.id) {
                  new Navigator(idea, "/chats");
                }
              });
            } else if (location == "/settings") {
              this.userData.display_name = this.userData.login;
              this.HTTPTransport.put("user/profile", {
                method: "PUT",
                data: this.userData,
              });
            } else if (location == "/chats") {
              if (input.name == "chatName") {
                this.chatController.addNew??hat(this.userData[input.name]);
                input.value = "";
              } else {
                this.chatController.searchUser2(this.userData[input.name]);
              }
            } else if (location == "/password") {
              this.HTTPTransport.put("user/password", {
                method: "PUT",
                data: this.userData,
              }).then(() => {});
            }
            this.userData = {};
          }
        }
      });
    }
  }

  validFocus(inputs: NodeListOf<HTMLInputElement> | null) {
    inputs?.forEach((input) => {
      input.addEventListener("focus", () => {
        let result: string[] | null = input.value.match(this.ids[input.name]);
        if (result == null) {
          this.addInputError(input);
        } else {
          this.removeInputError(input);
        }
      });
    });
  }

  validBlur(inputs: NodeListOf<HTMLInputElement> | null) {
    inputs?.forEach((input) => {
      input.addEventListener("blur", () => {
        let result: string[] | null = input.value.match(this.ids[input.name]);
        if (result == null) {
          this.addInputError(input);
        } else {
          this.removeInputError(input);
        }
      });
    });
  }

  validKeyup(inputs: NodeListOf<HTMLInputElement> | null) {
    inputs?.forEach((input) => {
      input.addEventListener("keyup", () => {
        let result: string[] | null = input.value.match(this.ids[input.name]);
        if (result == null) {
          this.addInputError(input);
        } else {
          this.removeInputError(input);
        }
      });
    });
  }

  addInputError(input: HTMLInputElement) {
    input.style.borderBottomColor = "red";
  }

  removeInputError(input: HTMLInputElement) {
    input.style.borderBottomColor = "#51b5c5";
  }
}
