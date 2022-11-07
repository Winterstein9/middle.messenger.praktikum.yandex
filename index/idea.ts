import index from "./index.hbs"
import sign_up from "/sign_up/sign_up"
import profile from "/profile/profile"
import chat_with_user from "/chat/chat"
import chat_list from "/chat/chat_list"
import error404 from "/errors/404"
import error500 from "/errors/500"
import ccButton from "../components/cButton/cButton"
import userList from "../components/users/usersList"
import userListActive from "../components/users/usersListActive"
import messages from "../components/messages/messages"

export const idea:any[]=[
    {
        name:"index",
        id:"index",
        title:"index",
        page:index,
        components:[
            {
                component:ccButton, 
                selector:".in__div__button__sign__in",
                args:{butName:"butSignIn",butValue:"Sign in", butClass:"but_index"}
            }
        ]
    },
    {
        name:"sign up",
        id:"sign_up",
        title:"sign up",
        page:sign_up
    },
    {
        name:"profile",
        id:"profile",
        title:"profile",
        page:profile
    },
    {
        name:"chat list",
        id:"chat_list",
        title:"chat list",
        page:chat_list,
        data:[
            {
                selector:".chl__contacts",
                data:userList
            }
        ]
    },
    {
        name:"chat",
        id:"chat_with_user",
        title:"chat",
        page:chat_with_user,
        data:[
            {
                selector:".ch__contacts",
                data:userListActive
            },
            {
                selector:".ch__div__messages",
                data:messages
            }
        ]
    },
    {
        name:"404",
        id:"404",
        title:"error 404",
        page:error404
    },
    {
        name:"500",
        id:"500",
        title:"error 500",
        page:error500
    }
]