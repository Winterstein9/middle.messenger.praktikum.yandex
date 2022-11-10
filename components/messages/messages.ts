import Message from "./message"
import {users} from "../data/dataUsers"

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