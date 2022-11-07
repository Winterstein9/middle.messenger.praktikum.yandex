import User from "./user"
import {users} from "../data/dataUsers"


//объект информации пользователя который передается из dataUsers
//{ img: "#", user: true, name: "Duglas", lastMessage: "Hello", lastTimeMessage: "22:15", newMessage: "7" }

//требующиеся аргументы для создания представления контакта с пользователем
//makeUser(img:string|null, name:string, lastMessage:string|null, lastTimeMessage:string|null, newMessage:string|null){

//формирует динамический лист
class UsersList{
    usersList:string=""
    constructor(users: any[]){
        users.map((user: any)=>{     
             this.usersList+=new User().makeUser(user.img, user.name, user.lastMessage, user.lastTimeMessage, user.newMessage)
        })
    }

    getUsersList():string{
        return this.usersList
    }
}

export default new UsersList(users).getUsersList()