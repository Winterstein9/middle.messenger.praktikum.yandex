import User from "./user"
import {users} from "../data/dataUsers"
import topNameActiveUser from "./topNameActiveUser.hbs"

import type {UsersT, UserT} from "../data/chatUsers"

class UsersList{
    usersList:string=""
    topNameActiveUser:string=""
    constructor(users: UsersT){
        users.map((user: UserT)=>{    
            if(user.first_name!="myMessage"){ 
                //if(!user.active){
                    this.usersList+=new User().makeUser(user.first_name, user.second_name, user.display_name, user.login, user.avatar)
                //}else{
                //    this.usersList+=new User().makeActiveUser(user.first_name, user.second_name, user.display_name, user.login, user.avatar)
                //    this.topNameActiveUser=topNameActiveUser({topNameActiveUser:user.first_name})
                //}
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