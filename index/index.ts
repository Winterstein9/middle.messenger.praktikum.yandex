import "./style.styl"
import "./index.styl"
import { idea } from "./idea"
import ValidForm from "./validForm"


class Navigator{

    nav:HTMLElement
    pages:any[]
    title:HTMLElement|null=document.querySelector("#title")

    constructor(idea:any[]){
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

    connect(page:any, title:string, components:any[]|undefined=undefined, data:any[]|undefined=undefined){
        if(this.title){
            this.title.textContent=title
        }
        document.body.innerHTML=page()
        document.body.appendChild(this.nav)

        if(components){
            this.addComponents(components)
        }
        if(data){
            this.addData(data)
        }
        new ValidForm()
    }

    addEvent(element:HTMLElement, page:any, title:string, components:any[]|undefined, data:any[]|undefined, event:string="click"){
        element.addEventListener(event,()=>{
            this.connect(page, title, components, data)
        })
    }

    addComponents(components: any[]){
        if(components.length==1){
            document.querySelector(components[0].selector).innerHTML=new components[0].component().add(components[0].args)
        }else{
            components.map((component)=>{
                document.querySelector(component.selector).innerHTML+=new component.component().add(component.args)
            })
        }
    }

    addData(data:any[]){
        if(data.length==1){
            document.querySelector(data[0].selector).innerHTML=data[0].data
        }else{
            data.map((data)=>{
                document.querySelector(data.selector).innerHTML=data.data
            })
        }
    }
}

new Navigator(idea)