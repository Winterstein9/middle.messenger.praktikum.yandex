import User from "./user"
import {users} from "../data/dataUsers"

class UsersList{
    usersList:string=""
    constructor(users: any[]){
        users.map((user: any)=>{     
            if(!user.active){
                this.usersList+=new User().makeUser(user.img, user.name, user.lastMessage, user.lastTimeMessage, user.newMessage)
            }else{
                this.usersList+=new User().makeActiveUser(user.img, user.name, user.lastMessage, user.lastTimeMessage, user.newMessage)
            }
        })
    }

    getUsersList():string{
        return this.usersList
    }
}

export default new UsersList(users).getUsersList()