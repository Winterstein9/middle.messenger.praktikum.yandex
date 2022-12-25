import user from "./user.hbs"
import activeUser from "./activeUser.hbs"

export default class User{
    makeUser(first_name:string, second_name?:string, display_name?:string|null, login?:string|undefined, avatar?:string|null){
        return user({first_name:first_name, second_name:second_name, display_name:display_name, login:login, avatar:avatar})
    }

    makeActiveUser(first_name:string, second_name?:string, display_name?:string|null, login?:string|undefined, avatar?:string|null){
        return activeUser({ifirst_name:first_name, second_name:second_name, display_name:display_name, login:login, avatar:avatar})
    }
}