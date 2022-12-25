import userMessage from "./userMessage.hbs"
import myMessage from "./myMessage.hbs"

export default class Message{
    makeUserMessage(message:string, img:string|undefined, time:string){
        return userMessage({message:message, img:img, time:time})
    }

    makeMyMesssage(message:string, img:string|undefined, time:string){
        return myMessage({message:message, img:img, time:time})
    }
}