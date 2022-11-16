import "./style.css"
import "./index.styl"
import { idea } from "./idea"

import type {Idea, Page, Component, Data} from "./idea"


class Navigator{

    nav:HTMLElement
    pages:Idea
    title:HTMLElement|null=document.querySelector("#title")
    sail: Record<string, Page> = {}

    constructor(idea:Idea){
        this.pages=idea
        this.nav=document.createElement('nav')
        this.nav.classList.add("in__navigator")

        this.pages.map((page:Page)=>{
            this.setSail(page)
            this.setNavLinks(page)
        })

        this.getPage()
    }

    setSail(page:Page){
        if(page.id!="/"){
            this.sail[`/${page.id}`]=page
        }else{
            this.sail["/"]=page
        }
    }

    setNavLinks(page:Page){
        let a:HTMLElement = document.createElement('a')
        a.textContent=page.name
        a.setAttribute("id",page.id)
        a.setAttribute("href",page.id)
        a.classList.add("in__navigator__a")
        this.nav.appendChild(a)
    }

    getPage(){
       let getpage:string = document.URL
       let index:number=getpage.indexOf("//")
       index=getpage.indexOf("/",index+2)
       let link:string=getpage.substr(index)
       let web:Page = this.sail[link]

        if(web){
            document.body.innerHTML=web.page()
            this.setTitle(web.title)
            if(web.components){
                this.addComponents(web.components)
            }
            if(web.data){
                this.addData(web.data)
            }
            document.body.appendChild(this.nav)
        }else{
            document.body.innerHTML=this.sail["/404"].page()
            this.setTitle(this.sail["/404"].title)
        }
    }

    setTitle(title:string){
        if(this.title){
            this.title.textContent=title
        }
    }

    addComponents(components: Component){
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
}

new Navigator(idea)