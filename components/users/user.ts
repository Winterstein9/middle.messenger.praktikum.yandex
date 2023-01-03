import user from "./user.hbs"
import activeUser from "./activeUser.hbs"

export default class User{
    makeUser(img:string|undefined, name:string, lastMessage:string|undefined, lastTimeMessage:string|undefined, newMessage:string|undefined){
        return user({img:img, name:name, lastMessage:lastMessage, lastTimeMessage:lastTimeMessage, newMessage:newMessage})
    }

    makeActiveUser(img:string|undefined, name:string, lastMessage:string|undefined, lastTimeMessage:string|undefined, newMessage:string|undefined){
        return activeUser({img:img, name:name, lastMessage:lastMessage, lastTimeMessage:lastTimeMessage, newMessage:newMessage})
    }
}