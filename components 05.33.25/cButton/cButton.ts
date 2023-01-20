import "./cButton.styl"
import Block from "../mold/block"
import cButton from "./cButton.hbs"

type ccButtonData={
    butName:string,
    butValue:string,
    butClass:string
}

export default class ccButton extends Block{
    add({butName, butValue, butClass}:ccButtonData):HTMLInputElement{
        return cButton({butName, butValue, butClass})
    }
}