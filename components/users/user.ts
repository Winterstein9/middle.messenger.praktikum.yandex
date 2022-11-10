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