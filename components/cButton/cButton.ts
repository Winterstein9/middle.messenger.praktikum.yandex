import "./cButton.styl"
import Block from "../mold/block"
import cButton from "./cButton.hbs"


export default class ccButton extends Block{
    add({butName, butValue, butClass}:any):HTMLInputElement{
        return cButton({butName, butValue, butClass})
    }
}