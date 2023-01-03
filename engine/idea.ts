import sign_in from "../views/sign_in/sign_in";
import sign_up from "../views/sign_up/sign_up";
import settings from "../views/settings/settings";
import change_img from "../views/change_img/change_img";
import chats from "../views/chat/chats";
import password from "../views/password/password";
import error404 from "../views/errors/404";
import error500 from "../views/errors/500";
import signInButton from "../components/signInButton/signInButton";
import { CChat } from "../controllers/chat/CChat";
import { CСhangeIMG } from "../controllers/change_img/CChange_img";
import { CSettings } from "../controllers/settings/CSettings";

import ValidForm from "./validForm";

export type { Idea, Page, Component, Data };

type Idea = Array<Page>;

type Page = {
  name: string;
  id: string;
  title: string;
  page: () => string;
  control?: any;
  valid?: any;
  components?: Component;
  data?: Data;
};

type Component = [
  {
    component: any;
    selector: string;
    args: object;
  }
];

type Data = Array<Record<string, string>>;

export const idea: Idea = [
  {
    name: "sign_in",
    id: "/",
    title: "sign_in",
    page: sign_in,
    valid: ValidForm,
    components: [
      {
        component: signInButton,
        selector: ".in__div__button__sign__in",
        args: {
          butName: "butSignIn",
          butValue: "Sign in",
          butClass: "but_index",
        },
      },
    ],
  },
  {
    name: "sign up",
    id: "sign_up",
    title: "sign up",
    page: sign_up,
    valid: ValidForm,
  },
  {
    name: "settings",
    id: "settings",
    title: "settings",
    page: settings,
    valid: ValidForm,
    control: CSettings,
  },
  {
    name: "change_img",
    id: "change_img",
    title: "change img",
    page: change_img,
    valid: ValidForm,
    control: CСhangeIMG,
  },
  {
    name: "password",
    id: "password",
    title: "change password",
    page: password,
    valid: ValidForm,
  },
  {
    name: "chats",
    id: "chats",
    title: "chats",
    page: chats,
    valid: ValidForm,
    control: CChat,
  },
  {
    name: "404",
    id: "404",
    title: "error 404",
    page: error404,
  },
  {
    name: "500",
    id: "500",
    title: "error 500",
    page: error500,
  },
];
