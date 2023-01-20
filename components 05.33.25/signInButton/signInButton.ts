import "./signInButton.styl";
import Block from "../mold/block";
import signInButtonHBS from "./signInButton.hbs";

type signInButtonData = {
  butName: string;
  butValue: string;
  butClass: string;
};

export default class signInButton extends Block {
  add({ butName, butValue, butClass }: signInButtonData): HTMLInputElement {
    return signInButtonHBS({ butName, butValue, butClass });
  }
}
