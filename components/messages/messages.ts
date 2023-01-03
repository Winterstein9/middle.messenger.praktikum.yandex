import Message from "./message"
import {users} from "../data/dataUsers"

import type {MessageT, UsersT, UserT} from "../data/dataUsers"


class Messages{
    messages:string=""
    constructor(users: UsersT){
        users.map((user: UserT)=>{  
            if(user.active&&user.messages!==undefined){
                user.messages.map((m:MessageT)=>{
                    if(m.message){//   {message : "Папка dist и .DS_Store остались в проекте", time : "8:08"},
                        this.messages+=new Message().makeUserMessage(m.message, m.img, m.time)
                    }else if(m.myMessage){
                        this.messages+=new Message().makeMyMesssage(m.myMessage, m.img, m.time)
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