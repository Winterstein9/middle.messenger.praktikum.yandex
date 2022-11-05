import chathbs from "./chat_with_user.hbs"
import chat_listhbs from "./chat_list.hbs"
import {users} from "./dataChat.ts"
import "./chat_list.styl"
import "./chat_with_user.styl"

const chat_with_user=()=>{
    document.body.innerHTML=chathbs({users:users})
    document.querySelector("#title").textContent="chat_with_user"
}

const chat_list=()=>{
    document.body.innerHTML=chat_listhbs({users:users})
    document.querySelector("#title").textContent="chat_list"
}


export {chat_with_user, chat_list}