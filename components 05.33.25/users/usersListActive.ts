import User from "./user"
import {users} from "../data/dataUsers"
import topNameActiveUser from "./topNameActiveUser.hbs"

import type {UsersT, UserT} from "../data/dataUsers"

class UsersList{
    usersList:string=""
    topNameActiveUser:string=""
    constructor(users: UsersT){
        users.map((user: UserT)=>{    
            if(user.name!="myMessage"){ 
                if(!user.active){
                    this.usersList+=new User().makeUser(user.img, user.name, user.lastMessage, user.lastTimeMessage, user.newMessage)
                }else{
                    this.usersList+=new User().makeActiveUser(user.img, user.name, user.lastMessage, user.lastTimeMessage, user.newMessage)
                    this.topNameActiveUser=topNameActiveUser({topNameActiveUser:user.name})
                }
            }
        })
    }

    getUsersList():Record<string, string>{
        return {
            usersList: this.usersList,
            topNameActiveUser: this.topNameActiveUser
        }
    }
}

let usersListActive = new UsersList(users).getUsersList()

export {usersListActive}