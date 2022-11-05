import Handlebars from "handlebars"
import "./style.styl"
import "./index.styl"
import index from "./index.hbs"
import butSignIn from "/components/button/button.ts"

import ccButton from "/components/cButton/cButton.js"

Handlebars.registerPartial('index',`<a href="/index.html" class="index">index</a>`)

document.body.innerHTML=index()

//document.querySelector(".in__div__button__sign__in").innerHTML=butSignIn("butSignIn","Sign in")

document.querySelector(".in__div__button__sign__in").innerHTML=new ccButton().render("butSignIn","Sign in")




import sign_up from "/sign_up/sign_up"
document.querySelector("#sign_up").addEventListener("click",()=>{
    sign_up()
})

import profile from "/profile/profile"
document.querySelector("#profile").addEventListener("click",()=>{
    profile()
})

import {chat_with_user} from "/chat/chat"
document.querySelector("#chat").addEventListener("click",()=>{
    chat_with_user()
})

import {chat_list} from "/chat/chat"
document.querySelector("#chat_list").addEventListener("click",()=>{
    chat_list()
})

import {error404} from "/errors/errors"
document.querySelector("#error404").addEventListener("click",()=>{
    error404()
})

import {error500} from "/errors/errors"
document.querySelector("#error500").addEventListener("click",()=>{
    error500()
})

/*enum links{

}*/

class Navigator{

    links:string[]=[
        'index', 'profile','400','404','chat_list','chat_with_user'
    ]

    

    connect(){

    }
}

const navigator = new Navigator()