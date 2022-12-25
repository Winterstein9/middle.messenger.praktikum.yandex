import User from "./user"
import users from "../data/chatUsers"
import type {UsersT, UserT} from "../data/chatUsers"

 class UsersList{
    usersList:string=""
    constructor(users: UsersT){
        users.map((user: UserT)=>{
            //if(user.first_name!="myMessage"){
                this.usersList+=new User().makeUser(user.first_name, user.second_name, user.display_name, user.login, user.avatar)
    //first_name:string, second_name?:string|null, display_name?:string|undefined, login?:string|undefined, avatar?:string|null
            //}
        })
    }

    getUsersList():string{
        return this.usersList
    }
}

export default new UsersList(users).getUsersList()

