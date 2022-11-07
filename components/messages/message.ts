import userMessage from "./userMessage.hbs"
import myMessage from "./myMessage.hbs"

export default class Message{

    makeUserMessage(message:string, img:any|undefined, time:string){
        return userMessage({message:message, img:img, time:time})
    }

    makeMyMesssage(message:string, time:string){
        return myMessage({message:message, time:time})
    }
}

/*
<div  class="ch__message_left ch__message">
    <span>{{this.message}}</span>
    <img src="{{this.img}}" alt="img" class="ch__img__chat">
    <span class="ch__time__message">{{this.time}}</span>
</div>
*/