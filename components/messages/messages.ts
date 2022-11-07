import Message from "./message"
import {users} from "../data/dataUsers"


//объект информации пользователя который передается из dataUsers
//{ img: "#", user: true, name: "Duglas", lastMessage: "Hello", lastTimeMessage: "22:15", newMessage: "7" }

//требующиеся аргументы для создания представления контакта с пользователем
//makeUser(img:string|null, name:string, lastMessage:string|null, lastTimeMessage:string|null, newMessage:string|null){

//формирует динамический лист
class Messages{
    messages:string=""
    constructor(users: any[]){
        users.map((user: any)=>{  
            if(user.active&&user.messages.length>0){

                user.messages.map((m:any)=>{
                    if(m.message){
                        this.messages+=new Message().makeUserMessage(m.message, m.img, m.time)
                    }else{
                        this.messages+=new Message().makeMyMesssage(m.myMessage, m.time)
                    }
                })

            }
        })
    }

    getMessages():string{
        return this.messages
    }
}

export default new Messages(users).getMessages()