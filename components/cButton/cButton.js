import Block from "../mold/block";
import cButton from "./cButton.hbs"
import "./cButton.styl"


export default class ccButton extends Block{

    render(butName, butValue){
        console.log("render")
        return cButton({butName:butName, butValue:butValue})
    }
}