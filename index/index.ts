import "./style.css"
import "./index.styl"
import { idea } from "./idea"
import ValidForm from "./validForm"

import type {Idea, Component, Data} from "./idea"

class Navigator{

    nav:HTMLElement
    pages:Idea
    title:HTMLElement|null=document.querySelector("#title")

    constructor(idea:Idea){

        this.pages=idea
        this.nav=document.createElement('nav')
        this.nav.classList.add("in__navigator")
        this.pages.map((link)=>{
            let a:HTMLElement = document.createElement('a')
            a.textContent=link.name
            a.setAttribute("id",link.id)
            a.classList.add("in__navigator__a")
            this.addEvent(a, link.page, link.title, link.components, link.data)
            this.nav.appendChild(a)
        })
        this.connect(this.pages[0].page, this.pages[0].title, this.pages[0].components, this.pages[0].data)
    }

    connect(page:object, title:string, components:Component|undefined=undefined, data:Data|undefined=undefined){
        if(this.title){
            this.title.textContent=title
        }
        document.body.innerHTML=page()
        document.body.appendChild(this.nav)

        this.internalLinks()

        if(components){
            this.addComponents(components)
        }
        if(data){
            this.addData(data)
        }
        new ValidForm()
    }

    addEvent(element:HTMLElement, page:object, title:string, components:Component|undefined, data:Data|undefined, event:string="click"){
        element.addEventListener(event,()=>{
            this.connect(page, title, components, data)
        })
    }

    addComponents(components:Component){
        let containerComponent:HTMLElement|null
        if(components.length==1){
            containerComponent=document.querySelector(components[0].selector)
            if(containerComponent){
                containerComponent.innerHTML=new components[0].component().add(components[0].args)
            }
        }else{
            components.map((component)=>{
                containerComponent=document.querySelector(component.selector)
                if(containerComponent){
                    containerComponent.innerHTML+=new component.component().add(component.args)
                }
            })
        }
    }

    addData(data:Data){
        let dataContainert:HTMLElement|null
        if(data.length==1){
            dataContainert=document.querySelector(data[0].selector)
            if(dataContainert){
                dataContainert.innerHTML=data[0].data
            }
            
        }else{
            data.map((data)=>{
                dataContainert=document.querySelector(data.selector)
                if(dataContainert){
                    dataContainert.innerHTML=data.data
                }
            })
        }
    }

    internalLinks(){
        let a_profile:HTMLElement|null = document.querySelector(".internalLinks")
        let a_in__link__sign__up:HTMLElement|null = document.querySelector(".in__link__sign__up")

        if(a_profile){
            a_profile.addEventListener("click",(e)=>{
                e.preventDefault()
                if(this.title){
                    this.title.textContent="profile"
                }
                document.body.innerHTML=profile()
                document.body.appendChild(this.nav)
                new ValidForm()
            })
        }else if(a_in__link__sign__up){
            a_in__link__sign__up.addEventListener("click",(e)=>{
                e.preventDefault()
                if(this.title){
                    this.title.textContent="sign up"
                }
                document.body.innerHTML=sign_up()
                document.body.appendChild(this.nav)
                new ValidForm()
            })
        }
    }
}

new Navigator(idea)