//import "./user.styl"
import user from "./user.hbs"
import activeUser from "./activeUser.hbs"

export default class User{

    makeUser(img:string|null, name:string, lastMessage:string|null, lastTimeMessage:string|null, newMessage:string|null){
        return user({img:img, name:name, lastMessage:lastMessage, lastTimeMessage:lastTimeMessage, newMessage:newMessage})
    }

    makeActiveUser(img:string|null, name:string, lastMessage:string|null, lastTimeMessage:string|null, newMessage:string|null){
        return activeUser({img:img, name:name, lastMessage:lastMessage, lastTimeMessage:lastTimeMessage, newMessage:newMessage})
    }
}

/*
<div class="ch__contact_with_user">
    <div class="ch__div__img">
        <img src="{{this.img}}" alt="img">
    </div>
    <div class="ch__user__and__message">
    <span class="ch__list__user__name">{{this.name}}</span>
    <span class="ch__last__message">{{this.lastMessage}}</span>
    </div>
    <div class="ch__lastTime__and__countNewMessage">
        <div class="ch__lastTimeMessage__div">
            <span class="ch__last__time__message">{{this.lastTimeMessage}}</span>
        </div>
    <div class="ch__div__count__new__message">
        <span class="ch__count__new__message">{{this.newMessage}}</span>
    </div>
    </div>
</div>
*/